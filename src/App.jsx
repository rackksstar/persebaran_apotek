import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <HashRouter>
      {/* Container Utama */}
      <div className="min-h-screen flex flex-col">
        
        <Navbar />

        {/* PERBAIKAN DISINI: 
           Tambahkan div dengan 'flex-grow'.
           Ini akan mengambil semua sisa ruang antara Navbar dan Footer.
        */}
        <div className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/peta" element={<MapPage />} />
            <Route path="/tentang" element={<AboutPage />} />
          </Routes>
        </div>

        <Footer />
        
      </div>
    </HashRouter>
  );
}
