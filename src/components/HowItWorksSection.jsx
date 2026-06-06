import React from 'react';

export function HowItWorksSection() {
  // Palet Warna:
  // Primary: #4675C0
  // Light:   #8FC8EB
  // Dark:    #19335A
  // Muted:   #697A98
  // Pale:    #B6BFD6

  const steps = [
    {
      id: "01",
      title: "Buka Halaman Peta",
      desc: "Akses menu Peta untuk memuat titik apotek di kawasan Panam, Pekanbaru.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      )
    },
    {
      id: "02",
      title: "Aktifkan Filter",
      desc: "Gunakan filter untuk menyaring apotek berdasarkan kelurahan, kecamatan, atau layanan 24 jam.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
        </svg>
      )
    },
    {
      id: "03",
      title: "Klik Lokasi Marker",
      desc: "Pilih marker pada peta untuk melihat nama apotek, alamat, telepon, jam buka, dan koordinat.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
        </svg>
      )
    },
    {
      id: "04",
      title: "Analisis Data",
      desc: "Dapatkan wawasan mengenai persebaran fasilitas farmasi pada setiap wilayah layanan.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative px-8 py-24 bg-[#4675C0]/5 overflow-hidden">
      
      {/* CSS Animation */}
      <style>{`
        @keyframes fadeInUpStep {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-step {
          animation: fadeInUpStep 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* --- Header Section --- */}
        <div className="text-center mb-16 animate-step">
          <h2 className="text-3xl md:text-4xl font-bold text-[#19335A] mb-4">
            Cara Kerja Sistem
          </h2>
          <p className="text-[#697A98] max-w-2xl mx-auto text-lg">
            Panduan singkat menggunakan WebGIS untuk mengeksplorasi data apotek dengan efektif.
          </p>
        </div>

        {/* --- Steps Grid --- */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-10">
          
          {/* Garis Konektor (Desktop Only) - Hiasan */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-[#B6BFD6] -translate-y-1/2 -z-10" />

          {steps.map((step, index) => (
            <div 
              key={index}
              className="animate-step group relative bg-white border border-[#B6BFD6]/60 p-8 rounded-2xl hover:border-[#4675C0] hover:shadow-lg transition-all duration-300 ease-in-out"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Nomor Background Besar (Watermark style) */}
              <span className="absolute -top-2 -right-2 text-8xl font-black text-[#F1F5F9] group-hover:text-[#4675C0]/5 transition-colors duration-300 select-none z-0">
                {step.id}
              </span>

              <div className="relative z-10">
                {/* Icon Wrapper */}
                <div className="w-14 h-14 mb-6 rounded-2xl bg-[#8FC8EB]/20 text-[#4675C0] flex items-center justify-center group-hover:bg-[#4675C0] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                  {step.icon}
                </div>

                {/* Content */}
                <h4 className="text-xl font-bold text-[#19335A] mb-3 group-hover:text-[#4675C0] transition-colors">
                  {step.title}
                </h4>
                <p className="text-[#697A98] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
