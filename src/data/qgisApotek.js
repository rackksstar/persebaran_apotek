export const qgisProject = {
  name: "persebaran_apotek.qgz",
  url: `${import.meta.env.BASE_URL}data/persebaran_apotek.qgz`,
  layerName: "apotek_panam",
  baseLayerName: "OpenStreetMap",
  tileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  crs: "EPSG:4326",
  xField: "longitude",
  yField: "latitude",
  labelField: "nama",
};

const ZIP_LOCAL_FILE_HEADER = 0x04034b50;
const ZIP_CENTRAL_DIRECTORY = 0x02014b50;
const ZIP_END_OF_CENTRAL_DIRECTORY = 0x06054b50;

function findEndOfCentralDirectory(view) {
  const minOffset = Math.max(0, view.byteLength - 65557);

  for (let offset = view.byteLength - 22; offset >= minOffset; offset -= 1) {
    if (view.getUint32(offset, true) === ZIP_END_OF_CENTRAL_DIRECTORY) {
      return offset;
    }
  }

  throw new Error("Format QGZ tidak valid: central directory tidak ditemukan");
}

function readZipEntries(buffer) {
  const view = new DataView(buffer);
  const decoder = new TextDecoder();
  const eocdOffset = findEndOfCentralDirectory(view);
  const entryCount = view.getUint16(eocdOffset + 10, true);
  let offset = view.getUint32(eocdOffset + 16, true);
  const entries = [];

  for (let index = 0; index < entryCount; index += 1) {
    if (view.getUint32(offset, true) !== ZIP_CENTRAL_DIRECTORY) {
      throw new Error("Format QGZ tidak valid: entri ZIP rusak");
    }

    const method = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const uncompressedSize = view.getUint32(offset + 24, true);
    const fileNameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localHeaderOffset = view.getUint32(offset + 42, true);
    const fileNameBytes = new Uint8Array(buffer, offset + 46, fileNameLength);
    const fileName = decoder.decode(fileNameBytes).replaceAll("\\", "/");

    entries.push({
      fileName,
      method,
      compressedSize,
      uncompressedSize,
      localHeaderOffset,
    });

    offset += 46 + fileNameLength + extraLength + commentLength;
  }

  return entries;
}

async function inflateRaw(bytes) {
  if (!("DecompressionStream" in window)) {
    throw new Error("Browser tidak mendukung ekstraksi QGZ terkompresi");
  }

  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function extractTextFromQgz(buffer, entryName) {
  const view = new DataView(buffer);
  const entries = readZipEntries(buffer);
  const normalizedEntryName = entryName.replaceAll("\\", "/").replace(/^\.\//, "");
  const entry = entries.find((item) => item.fileName.endsWith(normalizedEntryName));

  if (!entry) {
    throw new Error(`${entryName} tidak ditemukan di dalam ${qgisProject.name}`);
  }

  const localOffset = entry.localHeaderOffset;
  if (view.getUint32(localOffset, true) !== ZIP_LOCAL_FILE_HEADER) {
    throw new Error("Format QGZ tidak valid: local header tidak ditemukan");
  }

  const fileNameLength = view.getUint16(localOffset + 26, true);
  const extraLength = view.getUint16(localOffset + 28, true);
  const dataOffset = localOffset + 30 + fileNameLength + extraLength;
  const compressedBytes = new Uint8Array(buffer, dataOffset, entry.compressedSize);
  let fileBytes;

  if (entry.method === 0) {
    fileBytes = compressedBytes;
  } else if (entry.method === 8) {
    fileBytes = await inflateRaw(compressedBytes);
  } else {
    throw new Error(`Metode kompresi QGZ tidak didukung: ${entry.method}`);
  }

  if (entry.uncompressedSize > 0 && fileBytes.byteLength !== entry.uncompressedSize) {
    throw new Error("Ukuran data hasil ekstraksi QGZ tidak sesuai");
  }

  return new TextDecoder().decode(fileBytes);
}

function getProjectEntryName(buffer) {
  const projectEntry = readZipEntries(buffer).find((entry) => entry.fileName.endsWith(".qgs"));

  if (!projectEntry) {
    throw new Error("File project .qgs tidak ditemukan di dalam QGZ");
  }

  return projectEntry.fileName;
}

function getLayerNode(projectText) {
  const document = new DOMParser().parseFromString(projectText, "application/xml");
  const layers = [...document.querySelectorAll("projectlayers > maplayer")];
  const layer = layers.find((item) => {
    const layerName = item.querySelector("layername")?.textContent?.trim();
    return layerName === qgisProject.layerName;
  });

  if (!layer) {
    throw new Error(`Layer ${qgisProject.layerName} tidak ditemukan di project QGIS`);
  }

  return layer;
}

function getLayerSourceName(layer) {
  const source = layer.querySelector("datasource")?.textContent?.trim();

  if (!source) {
    throw new Error(`Datasource layer ${qgisProject.layerName} tidak ditemukan`);
  }

  const [sourcePath] = source.replace(/^file:/, "").split("?");
  const normalizedPath = decodeURIComponent(sourcePath)
    .replaceAll("\\", "/")
    .replace(/^file:\/\/\//, "")
    .replace(/^\.\//, "");

  return normalizedPath.split("/").filter(Boolean).at(-1);
}

function splitDelimitedLine(line) {
  const values = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && nextChar === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current);
  return values;
}

function parseLayerRows(sourceText) {
  const lines = sourceText.trim().split(/\r?\n/).filter(Boolean);
  const headers = splitDelimitedLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = splitDelimitedLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function normalizeApotekFeature(row) {
  return {
    id: Number(row.id),
    nama: row.nama,
    alamat: row.alamat,
    kelurahan: row.kelurahan,
    kecamatan: row.kecamatan,
    telepon: row.telepon,
    jamBuka: row.jam_buka,
    longitude: Number(row[qgisProject.xField]),
    latitude: Number(row[qgisProject.yField]),
  };
}

export async function loadApotekFromQgisProject() {
  const response = await fetch(qgisProject.url);

  if (!response.ok) {
    throw new Error(`Gagal memuat ${qgisProject.url}`);
  }

  const qgzBuffer = await response.arrayBuffer();
  const projectText = await extractTextFromQgz(qgzBuffer, getProjectEntryName(qgzBuffer));
  const layer = getLayerNode(projectText);
  const layerSourceName = getLayerSourceName(layer);
  const layerSourceText = await extractTextFromQgz(qgzBuffer, layerSourceName);

  return parseLayerRows(layerSourceText).map(normalizeApotekFeature);
}
