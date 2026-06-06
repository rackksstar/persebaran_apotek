import React, { useMemo } from "react";

function toggleValue(values, value) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function FilterPanel({ apotek, filters, onFiltersChange, qgisProject }) {
  const kelurahanOptions = useMemo(
    () => [...new Set(apotek.map((item) => item.kelurahan))].sort(),
    [apotek]
  );
  const kecamatanOptions = useMemo(
    () => [...new Set(apotek.map((item) => item.kecamatan))].sort(),
    [apotek]
  );

  const updateFilters = (nextFilters) => {
    onFiltersChange({ ...filters, ...nextFilters });
  };

  const resetFilters = () => {
    onFiltersChange({
      search: "",
      kelurahan: [],
      kecamatan: [],
      open24Hours: false,
    });
  };

  return (
    <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-[#19335A] flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
          Filter Data
        </h3>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs font-medium text-[#4675C0] hover:text-[#19335A] hover:underline transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="p-5 space-y-6">
        <div>
          <label htmlFor="search-apotek" className="text-sm font-semibold text-[#19335A] mb-3 block uppercase tracking-wider">
            Cari Apotek
          </label>
          <input
            id="search-apotek"
            type="search"
            value={filters.search}
            onChange={(event) => updateFilters({ search: event.target.value })}
            placeholder="Nama, alamat, kelurahan"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-[#19335A] outline-none transition focus:border-[#4675C0] focus:bg-white focus:ring-4 focus:ring-[#4675C0]/10"
          />
        </div>

        <div className="h-px bg-slate-100 w-full" />

        <div>
          <h4 className="text-sm font-semibold text-[#19335A] mb-3 uppercase tracking-wider">Kelurahan</h4>
          <div className="space-y-2.5">
            {kelurahanOptions.map((item) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.kelurahan.includes(item)}
                    onChange={() => updateFilters({ kelurahan: toggleValue(filters.kelurahan, item) })}
                    className="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-[#4675C0] checked:border-[#4675C0] focus:ring-2 focus:ring-[#4675C0]/20 transition-all"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm text-[#697A98] group-hover:text-[#4675C0] transition-colors">{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full" />

        <div>
          <h4 className="text-sm font-semibold text-[#19335A] mb-3 uppercase tracking-wider">Kecamatan</h4>
          <div className="space-y-2.5">
            {kecamatanOptions.map((item) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.kecamatan.includes(item)}
                    onChange={() => updateFilters({ kecamatan: toggleValue(filters.kecamatan, item) })}
                    className="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-[#4675C0] checked:border-[#4675C0] focus:ring-2 focus:ring-[#4675C0]/20 transition-all"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm text-[#697A98] group-hover:text-[#4675C0] transition-colors">{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full" />

        <label className="flex items-center justify-between gap-4 cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
          <span>
            <span className="block text-sm font-semibold text-[#19335A]">Buka 24 jam</span>
            <span className="block text-xs text-[#697A98]">Tampilkan apotek dengan jam buka penuh.</span>
          </span>
          <input
            type="checkbox"
            checked={filters.open24Hours}
            onChange={(event) => updateFilters({ open24Hours: event.target.checked })}
            className="h-5 w-5 rounded border-slate-300 text-[#4675C0] focus:ring-[#4675C0]"
          />
        </label>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <p className="text-xs leading-relaxed text-[#697A98]">
          Data dimuat langsung dari file QGIS {qgisProject.name}, layer {qgisProject.layerName} ({qgisProject.crs}).
        </p>
        <a
          href={qgisProject.url}
          className="mt-3 inline-flex text-xs font-semibold text-[#4675C0] hover:text-[#19335A] hover:underline"
        >
          Unduh project QGIS
        </a>
      </div>
    </aside>
  );
}
