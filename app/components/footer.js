import { SiTiktok, SiInstagram, SiWhatsapp } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 text-white mt-16 border-t-4 border-gray-200"> 
        <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between text-gray-400">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="text-3xl font-bold mb-4">
              <span className="text-red-500">L</span>SW
            </div>
            <p className="text-sm">
              Komunitas LSW sekarang menyediakan Tempat top up game termurah, tercepat, dan terpercaya di Indonesia. Proses Otomatis cepat dan lancar! Tersedia berbagai macam pembayaran Transfer Bank, E-Wallet, Scan QR, Alfamart, & Indomart yg pasti memudahkan anda untuk bertransaksi.
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">PETA SITUS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-gray-800">Beranda</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-800">Cek Pesanan</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-800">Masuk</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-800">Daftar</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">TOP UP LAINNYA</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-gray-800">Mobile Legends</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-800">PUBG Mobile</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-800">Free Fire</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-800">Genshin Impact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">SOSIAL MEDIA</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-800">
                <SiTiktok size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800">
                <SiInstagram size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800">
                <SiWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
