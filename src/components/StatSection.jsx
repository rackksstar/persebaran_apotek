import React from 'react';

export function StatSection() {
  // Palet Warna:
  // Primary: #4675C0
  // Light:   #8FC8EB
  // Dark:    #19335A
  // Muted:   #697A98

  const stats = [
    {
      id: 1,
      label: "Total Apotek",
      value: "15",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      ),
      delay: "0ms",
    },
    {
      id: 2,
      label: "Kecamatan",
      value: "2",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      ),
      delay: "150ms",
    },
    {
      id: 3,
      label: "Apotek 24 Jam",
      value: "2",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.216c-.25.051-.5.099-.75.145m-15.482 0a75.453 75.453 0 00-5.683 2.809m0 0v1.066c0 1.258.08 2.522.234 3.774.155 1.252.486 2.482.986 3.65m8.948-11.232a59.68 59.68 0 01-5.91 2.272M12 3.493c.75.159 1.5.34 2.245.542" />
        </svg>
      ),
      delay: "300ms",
    },
  ];

  return (
    // 1. BACKGROUND GRADIENT: Biru Muda (Atas) ke Putih (Bawah)
    // 'from-[#F0F8FF]' adalah warna AliceBlue yg sangat mirip hero section
    // 'to-white' membuat bagian bawah terang menyatu dengan section berikutnya
    <section className="relative px-8 py-20 bg-gradient-to-b from-[#F0F8FF] to-white border-b border-[#B6BFD6]/30">
      
      <style>{`
        @keyframes fadeInUpCard {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-card {
          animation: fadeInUpCard 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
      `}</style>

      {/* Dekorasi Background Halus (Opsional) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#8FC8EB]/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-[#4675C0]/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 2. TEXT HEADER: Kembali ke warna Biru Tua (#19335A) karena background terang */}
        <div className="text-center mb-12 animate-card">
          <h2 className="text-3xl font-bold text-[#19335A]">Ringkasan Data</h2>
          <p className="text-[#697A98] mt-2 text-lg">Gambaran umum persebaran apotek Panam dari layer QGIS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {stats.map((stat) => (
            <div
              key={stat.id}
              style={{ animationDelay: stat.delay }}
              className="
                animate-card
                group relative
                bg-white 
                rounded-2xl 
                p-8 
                text-center 
                /* Border halus */
                border border-[#B6BFD6]/50
                /* Shadow lembut berwarna biru agar menyatu dengan nuansa langit */
                shadow-[0_4px_20px_rgba(143,200,235,0.15)] 
                hover:shadow-[0_15px_30px_rgba(70,117,192,0.15)] 
                hover:-translate-y-2 
                transition-all duration-300 ease-out
              "
            >
              {/* Decorative Blob dalam kartu */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#8FC8EB]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Icon Container */}
              <div className="relative mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-2xl bg-[#8FC8EB]/15 text-[#4675C0] group-hover:bg-[#4675C0] group-hover:text-white transition-colors duration-300">
                {stat.icon}
              </div>

              {/* Value & Label */}
              <h3 className="relative text-5xl font-extrabold text-[#19335A] tracking-tight mb-2">
                {stat.value}
              </h3>

              <p className="relative text-[#697A98] font-medium uppercase tracking-wide text-sm group-hover:text-[#4675C0] transition-colors">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
