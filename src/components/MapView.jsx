import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { qgisProject } from "../data/qgisApotek";

const TILE_SIZE = 256;
const INITIAL_CENTER = {
  latitude: 0.4728,
  longitude: 101.3866,
};

function longitudeToPixelX(longitude, zoom) {
  return ((longitude + 180) / 360) * TILE_SIZE * 2 ** zoom;
}

function latitudeToPixelY(latitude, zoom) {
  const sinLatitude = Math.sin((latitude * Math.PI) / 180);
  return (
    (0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI)) *
    TILE_SIZE *
    2 ** zoom
  );
}

function pixelXToLongitude(pixelX, zoom) {
  return (pixelX / (TILE_SIZE * 2 ** zoom)) * 360 - 180;
}

function pixelYToLatitude(pixelY, zoom) {
  const n = Math.PI - (2 * Math.PI * pixelY) / (TILE_SIZE * 2 ** zoom);
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

function latLngToPixels({ latitude, longitude }, zoom) {
  return {
    x: longitudeToPixelX(longitude, zoom),
    y: latitudeToPixelY(latitude, zoom),
  };
}

function pixelsToLatLng({ x, y }, zoom) {
  return {
    latitude: pixelYToLatitude(y, zoom),
    longitude: pixelXToLongitude(x, zoom),
  };
}

function makeTileUrl(x, y, z) {
  return qgisProject.tileUrl
    .replace("{x}", x)
    .replace("{y}", y)
    .replace("{z}", z);
}

function useElementSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}

export function MapView({ apotek, totalApotek, loadStatus }) {
  const [selectedApotek, setSelectedApotek] = useState(null);
  const [zoom, setZoom] = useState(13);
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [dragState, setDragState] = useState(null);
  const [mapRef, mapSize] = useElementSize();

  useEffect(() => {
    const mapElement = mapRef.current;
    if (!mapElement) return undefined;

    const handleNativeWheel = (event) => {
      event.preventDefault();
      setZoom((value) =>
        event.deltaY < 0 ? Math.min(value + 1, 18) : Math.max(value - 1, 11)
      );
    };

    mapElement.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => mapElement.removeEventListener("wheel", handleNativeWheel);
  }, [mapRef]);

  useEffect(() => {
    if (apotek.length > 0 && !apotek.some((item) => item.id === selectedApotek?.id)) {
      setSelectedApotek(apotek[0]);
    }
  }, [apotek, selectedApotek?.id]);

  useEffect(() => {
    if (apotek.length === 0) return;

    setCenter({
      latitude: apotek.reduce((sum, item) => sum + item.latitude, 0) / apotek.length,
      longitude: apotek.reduce((sum, item) => sum + item.longitude, 0) / apotek.length,
    });
  }, [apotek]);

  const centerPixels = useMemo(() => latLngToPixels(center, zoom), [center, zoom]);

  const topLeft = {
    x: centerPixels.x - mapSize.width / 2,
    y: centerPixels.y - mapSize.height / 2,
  };

  const tiles = useMemo(() => {
    if (mapSize.width === 0 || mapSize.height === 0) return [];

    const minTileX = Math.floor(topLeft.x / TILE_SIZE);
    const maxTileX = Math.floor((topLeft.x + mapSize.width) / TILE_SIZE);
    const minTileY = Math.floor(topLeft.y / TILE_SIZE);
    const maxTileY = Math.floor((topLeft.y + mapSize.height) / TILE_SIZE);
    const maxTileIndex = 2 ** zoom;
    const nextTiles = [];

    for (let x = minTileX; x <= maxTileX; x += 1) {
      for (let y = minTileY; y <= maxTileY; y += 1) {
        if (y < 0 || y >= maxTileIndex) continue;

        const wrappedX = ((x % maxTileIndex) + maxTileIndex) % maxTileIndex;
        nextTiles.push({
          key: `${zoom}-${x}-${y}`,
          x: x * TILE_SIZE - topLeft.x,
          y: y * TILE_SIZE - topLeft.y,
          url: makeTileUrl(wrappedX, y, zoom),
        });
      }
    }

    return nextTiles;
  }, [mapSize.height, mapSize.width, topLeft.x, topLeft.y, zoom]);

  const kelurahanCount = useMemo(
    () => new Set(apotek.map((item) => item.kelurahan)).size,
    [apotek]
  );

  const selectedVisible =
    selectedApotek && apotek.some((item) => item.id === selectedApotek.id);

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragState({
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startCenterPixels: centerPixels,
    });
  };

  const handlePointerMove = (event) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragState.startClientX;
    const deltaY = event.clientY - dragState.startClientY;
    const nextCenterPixels = {
      x: dragState.startCenterPixels.x - deltaX,
      y: dragState.startCenterPixels.y - deltaY,
    };

    setCenter(pixelsToLatLng(nextCenterPixels, zoom));
  };

  const stopDragging = (event) => {
    if (dragState?.pointerId === event.pointerId) {
      setDragState(null);
    }
  };

  return (
    <div
      ref={mapRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className={`relative w-full min-h-[600px] touch-none select-none bg-[#EAF3F7] overflow-hidden ${
        dragState ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div className="absolute inset-0">
        {tiles.map((tile) => (
          <img
            key={tile.key}
            src={tile.url}
            alt=""
            draggable="false"
            className="absolute h-64 w-64 select-none"
            style={{ left: tile.x, top: tile.y }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-white/10 pointer-events-none" />

      <div className="absolute right-3 top-3 z-30 overflow-hidden rounded-lg border border-slate-300 bg-white shadow">
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => setZoom((value) => Math.min(value + 1, 18))}
          className="flex h-10 w-10 items-center justify-center text-xl font-bold text-[#19335A] hover:bg-slate-100"
          aria-label="Perbesar peta"
        >
          +
        </button>
        <div className="h-px bg-slate-200" />
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => setZoom((value) => Math.max(value - 1, 11))}
          className="flex h-10 w-10 items-center justify-center text-2xl font-bold text-[#19335A] hover:bg-slate-100"
          aria-label="Perkecil peta"
        >
          -
        </button>
      </div>

      <div className="absolute left-4 top-4 z-20 max-w-[calc(100%-5rem)] rounded-lg border border-white/70 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#4675C0]">
          Layer {qgisProject.layerName}
        </p>
        <div className="mt-1 flex flex-wrap items-end gap-x-4 gap-y-1">
          <p className="text-2xl font-bold text-[#19335A]">{apotek.length}</p>
          <p className="pb-1 text-sm text-[#697A98]">
            dari {totalApotek} titik apotek, {kelurahanCount} kelurahan
          </p>
        </div>
      </div>

      {apotek.map((item) => {
        const markerPixels = latLngToPixels(item, zoom);
        const left = markerPixels.x - topLeft.x;
        const top = markerPixels.y - topLeft.y;
        const isSelected = selectedApotek?.id === item.id;

        return (
          <button
            key={item.id}
            type="button"
            title={item.nama}
            aria-label={`Lihat detail ${item.nama}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => setSelectedApotek(item)}
            className={`absolute z-10 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg transition hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#4675C0]/30 ${
              isSelected ? "bg-[#19335A]" : "bg-[#D92D20]"
            }`}
            style={{ left, top }}
          >
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
            <span className="pointer-events-none absolute left-1/2 top-full mt-1 max-w-40 -translate-x-1/2 rounded bg-white/95 px-2 py-1 text-[11px] font-semibold leading-tight text-[#19335A] shadow ring-1 ring-slate-200">
              {item.nama}
            </span>
          </button>
        );
      })}

      {loadStatus === "loading" && (
        <div className="absolute inset-x-6 top-1/2 z-20 mx-auto max-w-md -translate-y-1/2 rounded-lg border border-slate-200 bg-white/95 p-5 text-center shadow-lg">
          <h3 className="text-lg font-bold text-[#19335A]">Memuat data QGIS</h3>
          <p className="mt-1 text-sm text-[#697A98]">
            Mengambil layer apotek langsung dari file project QGIS.
          </p>
        </div>
      )}

      {loadStatus === "error" && (
        <div className="absolute inset-x-6 top-1/2 z-20 mx-auto max-w-md -translate-y-1/2 rounded-lg border border-red-100 bg-white/95 p-5 text-center shadow-lg">
          <h3 className="text-lg font-bold text-[#19335A]">Data gagal dimuat</h3>
          <p className="mt-1 text-sm text-[#697A98]">
            Pastikan file /data/persebaran_apotek.qgz tersedia dan berisi layer apotek.
          </p>
        </div>
      )}

      {loadStatus === "ready" && apotek.length === 0 && (
        <div className="absolute inset-x-6 top-1/2 z-20 mx-auto max-w-md -translate-y-1/2 rounded-lg border border-slate-200 bg-white/95 p-5 text-center shadow-lg">
          <h3 className="text-lg font-bold text-[#19335A]">Data tidak ditemukan</h3>
          <p className="mt-1 text-sm text-[#697A98]">
            Coba kurangi filter untuk menampilkan titik apotek di peta.
          </p>
        </div>
      )}

      {loadStatus === "ready" && selectedVisible && (
        <div className="absolute bottom-4 left-4 right-4 z-20 max-w-xl rounded-lg border border-slate-200 bg-white p-4 shadow-xl md:right-auto md:w-[360px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#19335A]">{selectedApotek.nama}</h3>
              <p className="mt-1 text-sm text-[#697A98]">{selectedApotek.alamat}</p>
            </div>
            <span className="shrink-0 rounded-full bg-[#EAF3F7] px-3 py-1 text-xs font-semibold text-[#19335A]">
              {selectedApotek.jamBuka}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Kelurahan</p>
              <p className="font-medium text-[#19335A]">{selectedApotek.kelurahan}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Kecamatan</p>
              <p className="font-medium text-[#19335A]">{selectedApotek.kecamatan}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Telepon</p>
              <p className="font-medium text-[#19335A]">{selectedApotek.telepon}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Koordinat</p>
              <p className="font-medium text-[#19335A]">
                {selectedApotek.latitude}, {selectedApotek.longitude}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={`absolute bottom-4 left-4 z-20 hidden rounded-lg border border-white/70 bg-white/90 px-3 py-2 text-xs text-[#697A98] shadow md:block ${selectedVisible ? "md:hidden" : ""}`}>
        Layer dasar: {qgisProject.baseLayerName}
      </div>

      <div className="absolute bottom-4 right-4 z-20 w-[220px] rounded-lg border border-slate-200 bg-white/95 p-4 text-sm shadow-xl backdrop-blur">
        <h3 className="font-bold text-[#19335A]">Legenda</h3>
        <div className="mt-3 space-y-3">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#D92D20] shadow">
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
            </span>
            <span className="text-[#697A98]">Titik lokasi apotek</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#19335A] shadow">
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
            </span>
            <span className="text-[#697A98]">Apotek terpilih</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded bg-white px-2 py-1 text-[11px] font-semibold text-[#19335A] shadow ring-1 ring-slate-200">
              Nama
            </span>
            <span className="text-[#697A98]">Label nama apotek</span>
          </div>
        </div>
        <div className="mt-4 border-t border-slate-100 pt-3 text-xs leading-relaxed text-[#697A98]">
          Layer: <span className="font-semibold text-[#19335A]">{qgisProject.layerName}</span>
          <br />
          CRS: <span className="font-semibold text-[#19335A]">{qgisProject.crs}</span>
        </div>
      </div>
    </div>
  );
}
