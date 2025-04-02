import Image from "next/image";

const Stories = () => {
  const stories = [
    {
      id: 1,
      title: "Transforma tu Hogar con Muebles Cómodos y Funcionales",
      date: "ENE 5, 2023",
      category: "MUEBLES",
      author: "POR MARÍA GÓMEZ",
      image: '/presentation-img4.webp'
    },
    {
      id: 2,
      title: "Optimiza Espacios Pequeños con los Mejores Muebles",
      date: "ENE 12, 2023",
      category: "MUEBLES",
      author: "POR MARÍA GÓMEZ",
      image: '/presentation-img4.webp'
    },
    {
      id: 3,
      title: "Guía Esencial para Elegir el Sofá Perfecto",
      date: "FEB 10, 2023",
      category: "MUEBLES",
      author: "POR MARÍA GÓMEZ",
      image: '/presentation-img4.webp'
    },
    {
      id: 4,
      title: "Equilibrando Estilo y Funcionalidad en el Diseño de Muebles",
      date: "MAR 3, 2023",
      category: "MUEBLES",
      author: "POR MARÍA GÓMEZ",
      image: '/presentation-img4.webp'
    },
  ];

  return (
    <section className="p-8 mt-11">
      <h2 className="font-semibold mb-6 uppercase text-sm text-[#008060]">Historias de ChocóMarket</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stories.map(story => (
          <div key={story.id} className="group overflow-hidden cursor-pointer">
            <div className="relative w-full h-[300px]">
              <Image 
                src={story.image} 
                alt={story.title} 
                layout="fill" 
                objectFit="cover" 
                className="group-hover:scale-105 object-cover transition-transform duration-300"
              />
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-500">{story.date} / {story.category}</p>
              <h3 className="text-lg font-semibold hover:underline mt-1 uppercase">{story.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{story.author}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stories;
