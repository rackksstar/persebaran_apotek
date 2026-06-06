import React, { useEffect, useMemo, useState } from "react";
import { FilterPanel } from "../components/FilterPanel";
import { MapView } from "../components/MapView";
import { loadApotekFromQgisProject, qgisProject } from "../data/qgisApotek";

export default function MapPage() {
  const [apotekPanam, setApotekPanam] = useState([]);
  const [loadStatus, setLoadStatus] = useState("loading");
  const [filters, setFilters] = useState({
    search: "",
    kelurahan: [],
    kecamatan: [],
    open24Hours: false,
  });

  useEffect(() => {
    let ignore = false;

    loadApotekFromQgisProject()
      .then((data) => {
        if (!ignore) {
          setApotekPanam(data);
          setLoadStatus("ready");
        }
      })
      .catch(() => {
        if (!ignore) {
          setLoadStatus("error");
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const filteredApotek = useMemo(() => {
    const searchText = filters.search.trim().toLowerCase();

    return apotekPanam.filter((apotek) => {
      const searchableText = [
        apotek.nama,
        apotek.alamat,
        apotek.kelurahan,
        apotek.kecamatan,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !searchText || searchableText.includes(searchText);
      const matchesKelurahan =
        filters.kelurahan.length === 0 ||
        filters.kelurahan.includes(apotek.kelurahan);
      const matchesKecamatan =
        filters.kecamatan.length === 0 ||
        filters.kecamatan.includes(apotek.kecamatan);
      const matchesHours = !filters.open24Hours || apotek.jamBuka === "24 Jam";

      return matchesSearch && matchesKelurahan && matchesKecamatan && matchesHours;
    });
  }, [apotekPanam, filters]);

  return (
    <main className="w-full bg-gradient-to-b from-[#F0F8FF] via-white to-white pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#19335A] tracking-tight">
              Peta Persebaran Apotek Panam
            </h2>
            <p className="text-[#697A98] mt-1">
              Eksplorasi lokasi apotek di kawasan Panam, Pekanbaru, Riau berdasarkan layer QGIS {qgisProject.layerName}.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#B6BFD6] shadow-sm text-sm text-[#19335A]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {loadStatus === "loading"
              ? "Memuat data QGIS"
              : `${filteredApotek.length} dari ${apotekPanam.length} apotek tampil`}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-1 lg:sticky lg:top-28 z-10">
            <FilterPanel
              apotek={apotekPanam}
              filters={filters}
              onFiltersChange={setFilters}
              qgisProject={qgisProject}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(143,200,235,0.15)] border border-[#B6BFD6]/50 overflow-hidden min-h-[600px] relative z-0">
              <MapView
                apotek={filteredApotek}
                totalApotek={apotekPanam.length}
                loadStatus={loadStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
