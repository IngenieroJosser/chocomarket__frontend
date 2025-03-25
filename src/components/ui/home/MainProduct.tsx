import Link from "next/link";

const MainProduct = () => {
  const productGrid = [
    {
      img: "/presentation-img5.webp",
      name: "Producto1",
      price: `$3909COP`,
    },
    {
      img: "/presentation-img5.webp",
      name: "Producto2",
      price: `$3909COP`,
    },
    {
      img: "/presentation-img5.webp",
      name: "Producto3",
      price: `$3909COP`,
    },
    {
      img: "/presentation-img5.webp",
      name: "Producto1",
      price: `$3909COP`,
    },
    {
      img: "/presentation-img5.webp",
      name: "Producto1",
      price: `$3909COP`,
    },
  ];

  return (
    <section className="p-10 mt-10">
      <div className="flex flex-col my-[2em] md:flex-row md:justify-between gap-4 md:gap-8 mb-3.5">
        <h3 className="text-2xl font-bold mb-2 md:mb-0">Tus Productos</h3>
        <Link
          href="/shop"
          className="bg-black rounded-md px-5 py-5 text-white text-center md:text-left transition-all ease-in-out hover:bg-gray-900"
        >
          Compra tus productos
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productGrid.map((product, index) => (
          <div
            key={index}
            className="bg-white relative group rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative group">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {/* Botón al hacer hover */}
              <button className="cursor-pointer absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,.6)] bg-opacity-50 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Vista previa
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainProduct;
