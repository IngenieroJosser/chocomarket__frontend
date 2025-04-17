import Image from "next/image"

const Presentation = () => {
  const imagesPresentation = [
    {
      src: '/presentation-img1.webp',
      alt: 'Aventura en la naturaleza',
      title: 'Naturaleza Viva',
    },
    {
      src: '/presentation-img4.webp',
      alt: 'Tour cultural',
      title: 'Cultura y Tradición',
    },
    {
      src: '/presentation-img6.webp',
      alt: 'Rutas mágicas',
      title: 'Rutas Mágicas',
    },
    {
      src: '/presentation-img5.webp',
      alt: 'Joss Vibes',
      title: 'Joss Vibes',
    },
  ]

  return (
    <section className="flex flex-col md:flex-row justify-center items-stretch gap-6 px-6 max-w-7xl mx-auto my-24">
      {/* Imagen destacada a la izquierda */}
      <div className="w-full md:w-2/3 flex justify-center items-center relative group">
        <div className="relative w-full max-w-[670px] h-full overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src={imagesPresentation[0].src}
            alt={imagesPresentation[0].alt}
            width={700}
            height={700}
            priority
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center text-white p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{imagesPresentation[0].title}</h2>
              <button aria-label="Botón para ver información" className="bg-white cursor-pointer text-black px-4 py-2 rounded-md hover:bg-gray-200 transition">Ver más</button>
            </div>
          </div>
        </div>
      </div>

      {/* Columna derecha: tres imágenes verticales */}
      <div className="w-full md:w-1/3 flex flex-col justify-between gap-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="relative group w-full h-[275px] overflow-hidden rounded-2xl shadow-xl">
            <Image 
              src={imagesPresentation[index].src}
              alt={imagesPresentation[index].alt}
              width={550}
              height={275}
              priority
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center text-white p-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">{imagesPresentation[index].title}</h2>
                <button aria-label="Botón para ver información" className="bg-white cursor-pointer text-black px-3 py-1 rounded hover:bg-gray-200 transition">Ver más</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Presentation
