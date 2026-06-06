import React from 'react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  // Palet Warna:
  // Primary: #4675C0 (Tombol Utama, Aksen)
  // Dark:    #19335A (Teks Judul, Hover Button)
  // Light:   #8FC8EB (Glow Background)
  // Muted:   #697A98 (Teks Deskripsi)
  // Pale:    #B6BFD6 (Border, Garis Halus)

  return (
    <section className="relative bg-white overflow-hidden pt-28 pb-32">
      
      {/* === STYLE BLOCK UNTUK ANIMASI === */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        .animate-fade-in-up {
          opacity: 0; 
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-pulse-glow {
          animation: pulseGlow 8s ease-in-out infinite;
        }
      `}</style>

      {/* === BACKGROUND LAYERS === */}
      {/* Layer 1: Base Background */}
      <div className="absolute inset-0 bg-white" />

      {/* Layer 2: Radial Glow Effect (Menggunakan warna Light #8FC8EB) */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_-10%,_#8FC8EB_0%,_rgba(255,255,255,0)_100%)] opacity-40 animate-pulse-glow" />
      
      {/* Layer 3: Garis Aksen Halus (Menggunakan warna Pale #B6BFD6) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B6BFD6] to-transparent opacity-60" />

      
      {/* === CONTENT === */}
      <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
        
        {/* Badge / Label Atas */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#B6BFD6]/50 shadow-sm mb-8 hover:border-[#8FC8EB] transition-colors cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4675C0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4675C0]"></span>
          </span>
          <span className="text-sm font-semibold text-[#19335A] tracking-wide">
            WebGIS Fasilitas Farmasi Panam
          </span>
        </div>

        {/* Judul Utama */}
        <h1 
          className="animate-fade-in-up text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#19335A] tracking-tight mb-6 leading-[1.1]"
          style={{ animationDelay: '150ms' }}
        >
          Persebaran Apotek <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4675C0] to-[#19335A]">
            Panam Pekanbaru
          </span>
        </h1>

        {/* Deskripsi */}
        <p 
          className="animate-fade-in-up text-lg md:text-xl text-[#697A98] max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
          style={{ animationDelay: '300ms' }}
        >
          Sistem Informasi Geografis (SIG) berbasis web yang menampilkan
          titik apotek, alamat, jam buka, dan wilayah administrasi secara interaktif
          untuk mendukung akses informasi layanan farmasi.
        </p>

        {/* Tombol CTA */}
        <div 
          className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-5"
          style={{ animationDelay: '450ms' }}
        >
          
          {/* Tombol Lihat Peta (Primary - Sesuai Request) */}
          <Link 
            to="/peta" 
            className="group px-8 py-4 rounded-full font-semibold text-white bg-[#4675C0] hover:bg-[#19335A] shadow-[0_4px_14px_0_rgba(70,117,192,0.39)] hover:shadow-[0_6px_20px_rgba(25,51,90,0.23)] hover:-translate-y-1 transition-all duration-300 ease-out flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 opacity-90 group-hover:scale-110 transition-transform">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Lihat Peta
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>

          {/* Tombol Tentang Sistem (Secondary) */}
          <Link 
            to="/tentang"
            className="px-8 py-4 rounded-full font-semibold text-[#697A98] bg-white border border-[#B6BFD6] hover:text-[#4675C0] hover:border-[#4675C0] hover:bg-[#8FC8EB]/5 hover:-translate-y-1 transition-all duration-300 ease-out flex items-center justify-center gap-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            Tentang Sistem
          </Link>

        </div>
      </div>
    </section>
  );
}
