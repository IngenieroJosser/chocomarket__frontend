import Image from "next/image";

const NewCollection = () => {
  const collections = [
    {
      id: 1,
      title: "Colección Primavera",
      description: "Explora nuestra nueva colección con estilos frescos y vibrantes.",
      imageUrl: "/presentation-img6.webp",
    },
    {
      id: 2,
      title: "Edición Limitada",
      description: "Descubre piezas únicas de nuestra edición limitada.",
      imageUrl: "/presentation-img3.webp",
    },
    {
      id: 3,
      title: "Estilo Urbano",
      description: "Diseños modernos y versátiles para la ciudad.",
      imageUrl: "/presentation-img1.webp",
    },
  ];

  return (
    <section className="py-12 mt-11">
      <div className="container mx-auto px-4">
        <h2 className="text-sm font-bold uppercase text-[#008060] mb-8">
          Nuevas Colecciones
        </h2>
        <div className="flex gap-4 h-96">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative flex-1 overflow-hidden rounded-lg shadow-md transition-all duration-500 hover:flex-[3]"
            >
              {/* Imagen */}
              <Image
                src={collection.imageUrl}
                alt={collection.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500"
              />

              {/* Descripción */}
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white text-center p-4 transition-opacity duration-500">
                <h3 className="text-2xl font-semibold">{collection.title}</h3>
                <p className="mt-2">{collection.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewCollection;
