export default function Categories() {
  const items = [
    {
      title: "Education",
      image: "/children.jpg",
    },
    {
      title: "Medical Support",
      image: "/children.jpg",
    },
    {
      title: "Disaster Relief",
      image: "/children.jpg",
    },
    {
      title: "Mosque",
      image: "/children.jpg",
    },
  ];

  return (
    <section className="py-10 px-6 md:px-12 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
        Campaign Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative h-72 rounded-2xl overflow-hidden group"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold drop-shadow-lg">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
