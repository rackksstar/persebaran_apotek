import React from 'react';

export function TujuanManfaatSection() {
  // Palet Warna:
  // Primary: #4675C0
  // Light:   #8FC8EB
  // Dark:    #19335A
  // Muted:   #697A98
  // Pale:    #B6BFD6

  return (
    <section className="relative px-8 py-24 bg-white overflow-hidden">
      
      {/* === ANIMATION STYLES === */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-section {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
      `}</style>

      {/* Background Decoration (Subtle Blobs) */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-[#8FC8EB]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[500px] h-[500px] bg-[#B6BFD6]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* === HEADER SECTION === */}
        <div className="text-center mb-16 max-w-3xl mx-auto animate-section">
          <h2 className="text-3xl md:text-4xl font-bold text-[#19335A] mb-6 tracking-tight">
            Tujuan & Manfaat Sistem
          </h2>
          <p className="text-[#697A98] text-lg leading-relaxed">
            Sistem Informasi Geografis (SIG) ini dikembangkan untuk mendukung 
            penyajian informasi persebaran apotek di kawasan Panam, Pekanbaru secara 
            spasial, transparan, dan interaktif.
          </p>
        </div>

        {/* === GRID CONTENT === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

          {/* --- KARTU TUJUAN --- */}
          <div 
            className="animate-section group bg-white border border-[#B6BFD6]/50 rounded-2xl p-8 lg:p-10 hover:border-[#4675C0] hover:shadow-[0_10px_40px_-10px_rgba(70,117,192,0.1)] transition-all duration-300 ease-out"
            style={{ animationDelay: '150ms' }}
          >
            {/* Header Kartu */}
            <div className="flex items-start gap-5 mb-6">
              <div className="shrink-0 w-14 h-14 rounded-xl bg-[#8FC8EB]/15 text-[#4675C0] flex items-center justify-center group-hover:bg-[#4675C0] group-hover:text-white transition-colors duration-300">
                {/* Icon Target */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#19335A] mb-1">Tujuan Sistem</h3>
                <p className="text-sm text-[#697A98]">Visi utama pengembangan aplikasi</p>
              </div>
            </div>

            {/* List Items */}
            <ul className="space-y-4">
              {[
                "Menyediakan peta digital persebaran apotek di Panam, Pekanbaru.",
                "Mengintegrasikan data QGIS, koordinat, alamat, dan jam buka dalam satu platform web.",
                "Menyajikan informasi lokasi apotek yang cepat, akurat, dan mudah dibaca.",
                "Mendukung analisis ketersediaan fasilitas farmasi berbasis wilayah."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[#697A98] text-[15px] leading-relaxed">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#8FC8EB]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#4675C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* --- KARTU MANFAAT --- */}
          <div 
            className="animate-section group bg-white border border-[#B6BFD6]/50 rounded-2xl p-8 lg:p-10 hover:border-[#4675C0] hover:shadow-[0_10px_40px_-10px_rgba(70,117,192,0.1)] transition-all duration-300 ease-out"
            style={{ animationDelay: '300ms' }}
          >
            {/* Header Kartu */}
            <div className="flex items-start gap-5 mb-6">
              <div className="shrink-0 w-14 h-14 rounded-xl bg-[#B6BFD6]/20 text-[#19335A] flex items-center justify-center group-hover:bg-[#19335A] group-hover:text-white transition-colors duration-300">
                {/* Icon Lightbulb/Benefit */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#19335A] mb-1">Manfaat Sistem</h3>
                <p className="text-sm text-[#697A98]">Dampak positif bagi pengguna</p>
              </div>
            </div>

            {/* List Items */}
            <ul className="space-y-4">
              {[
                "Memudahkan masyarakat menemukan apotek terdekat beserta jam layanan.",
                "Bahan pendukung analisis ketersediaan layanan farmasi di wilayah Panam.",
                "Visualisasi data yang informatif untuk kebutuhan riset, survei, dan pemetaan.",
                "Media informasi publik yang inklusif dan mudah diakses semua kalangan."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[#697A98] text-[15px] leading-relaxed">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#B6BFD6]/30 flex items-center justify-center">
                     <svg className="w-3 h-3 text-[#19335A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
