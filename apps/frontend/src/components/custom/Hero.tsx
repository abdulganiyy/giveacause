export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center justify-center px-6 md:px-12"
      style={{
        backgroundImage: "url('/children.jpg')", // Replace with your image path
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
          Empower Dreams. Fund Hope.
        </h1>
        <p className="text-lg md:text-xl mb-8 drop-shadow-md">
          Launch your campaign in minutes and reach a global community of
          supporters.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition">
            Start a Campaign
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white border border-white px-6 py-3 rounded-xl font-semibold transition">
            Browse Causes
          </button>
        </div>
      </div>
    </section>
  );
}
