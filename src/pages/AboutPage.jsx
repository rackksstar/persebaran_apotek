import React from 'react';

export default function AboutPage() {
  // Palet Warna:
  // Dark:    #19335A
  // Primary: #4675C0
  // Muted:   #697A98
  // Light:   #8FC8EB
  // Pale:    #B6BFD6

  return (
    // PERUBAHAN UTAMA:
    // 1. pt-28: Memberi jarak 7rem (112px) dari atas agar TIDAK ketutup Navbar.
    // 2. bg-gradient... : Menyamakan background dengan halaman Home & Map agar konsisten.
    // 3. Hapus 'min-h-screen' (biar footer otomatis nempel di bawah konten tanpa gap aneh).
    <main className="w-full bg-gradient-to-b from-[#F0F8FF] via-white to-white pt-28 pb-16 px-6 md:px-12">
      
      {/* CSS Animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-up {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
      `}</style>

      <div className="max-w-5xl mx-auto">

        {/* === HEADER SECTION === */}
        <div className="text-center mb-16 animate-up">
          <span className="inline-block py-1 px-3 rounded-full bg-[#8FC8EB]/20 text-[#4675C0] text-sm font-semibold mb-4 tracking-wide">
            Tentang Aplikasi
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#19335A] mb-6 tracking-tight">
            WebGIS Persebaran Apotek
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#8FC8EB] to-[#4675C0] mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-[#697A98] max-w-3xl mx-auto leading-relaxed">
            Sistem Informasi Geografis berbasis web yang dirancang untuk memvisualisasikan 
            data lokasi dan profil apotek di kawasan Panam, Pekanbaru 
            secara interaktif dan transparan.
          </p>
        </div>

        {/* === GRID CONTENT === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          {/* Kartu: Tujuan Pengembangan */}
          <section 
            className="animate-up bg-white rounded-2xl p-8 border border-[#B6BFD6]/40 shadow-sm hover:shadow-lg hover:border-[#4675C0]/50 transition-all duration-300"
            style={{ animationDelay: '150ms' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#8FC8EB]/20 text-[#4675C0] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#19335A]">Tujuan Utama</h2>
            </div>
            
            <ul className="space-y-4">
              {[
                "Menyediakan informasi spasial lokasi apotek yang akurat.",
                "Menghubungkan data QGIS dengan tampilan WebGIS interaktif.",
                "Memudahkan masyarakat mencari apotek terdekat dan jam bukanya.",
                "Mengintegrasikan data farmasi dalam satu platform digital."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[#697A98] text-[15px] leading-relaxed">
                  <svg className="w-5 h-5 text-[#4675C0] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Kartu: Teknologi */}
          <section 
            className="animate-up bg-white rounded-2xl p-8 border border-[#B6BFD6]/40 shadow-sm hover:shadow-lg hover:border-[#4675C0]/50 transition-all duration-300"
            style={{ animationDelay: '300ms' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#B6BFD6]/30 text-[#19335A] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#19335A]">Teknologi</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "React JS", desc: "Frontend Library" },
                { name: "Tailwind CSS", desc: "Modern Styling" },
                { name: "QGIS", desc: "Project GIS Source" },
                { name: "QGZ Layer", desc: "Spatial Point Data" }
              ].map((tech, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-[#8FC8EB]/10 hover:border-[#8FC8EB] transition-colors group">
                  <h4 className="font-bold text-[#19335A] group-hover:text-[#4675C0] transition-colors">{tech.name}</h4>
                  <p className="text-xs text-[#697A98] mt-1">{tech.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* === PENUTUP / FOOTER QUOTE === */}
        <div 
          className="animate-up bg-gradient-to-r from-[#19335A] to-[#254B7A] rounded-2xl p-8 text-center text-white shadow-xl shadow-blue-900/10"
          style={{ animationDelay: '450ms' }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-3">Harapan Pengembangan</h3>
            <p className="text-[#B6BFD6] leading-relaxed opacity-90">
              "Sistem ini diharapkan dapat menjadi media informasi yang handal dan pendukung 
              analisis ketersediaan layanan farmasi, khususnya terkait persebaran apotek 
              di kawasan Panam, Pekanbaru."
            </p>
            <div className="mt-6 flex justify-center gap-2">
               <div className="w-2 h-2 rounded-full bg-[#8FC8EB]"></div>
               <div className="w-2 h-2 rounded-full bg-[#8FC8EB]/50"></div>
               <div className="w-2 h-2 rounded-full bg-[#8FC8EB]/30"></div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
