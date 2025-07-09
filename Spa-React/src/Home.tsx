
const Home = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <h1 className="text-4xl font-bold text-blue-700 mb-4">Bienvenido al Spa</h1>
    <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 max-w-xl text-center">
      Relájate y disfruta nuestros servicios de peluquería y spa. Reserva tu turno y vive una experiencia única de bienestar.
    </p>
    <img
      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
      alt="Spa"
      className="rounded-lg shadow-lg w-full max-w-md"
    />
  </div>
);

export default Home;
