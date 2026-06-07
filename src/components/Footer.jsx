import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative bg-[#19335A] text-[#B6BFD6] mt-auto">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#8FC8EB] via-[#4675C0] to-[#19335A]" />

      <div className="max-w-7xl mx-auto px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#4675C0] flex items-center justify-center shadow-lg shadow-blue-900/50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-bold tracking-tight">WebGIS Apotek</h4>
            </div>

            <p className="text-sm leading-relaxed text-[#B6BFD6]/80 max-w-sm">
              Sistem Informasi Geografis berbasis web untuk menampilkan persebaran apotek di kawasan Panam, Pekanbaru secara interaktif berdasarkan data QGIS.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
              Sumber Data
              <span className="block w-8 h-0.5 bg-[#4675C0] rounded-full"></span>
            </h5>
            <ul className="space-y-3 text-sm">
              <li>Layer QGIS: apotek_panam</li>
              <li>CRS: EPSG:4326</li>
              <li>Wilayah: Panam, Pekanbaru, Riau</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
              Navigasi
              <span className="block w-8 h-0.5 bg-[#4675C0] rounded-full"></span>
            </h5>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-[#8FC8EB] hover:translate-x-2 transition-all duration-300 inline-block">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/peta" className="hover:text-[#8FC8EB] hover:translate-x-2 transition-all duration-300 inline-block">
                  Peta Persebaran
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="hover:text-[#8FC8EB] hover:translate-x-2 transition-all duration-300 inline-block">
                  Tentang Sistem
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#4675C0]/20 pt-8 text-center">
          <p className="text-xs text-[#B6BFD6]/60">
            Copyright 2025 WebGIS Persebaran Apotek Panam Pekanbaru - Universitas Riau. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
