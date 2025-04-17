const Footer = () => {
  const footerSections = [
    {
      title: "Tienda",
      links: [
        "Todo en la tienda",
        "Ofertas",
        "Novedades",
        "Más vendidos",
        "Colecciones",
        "Mira el catálogo",
        "Marcas",
      ],
    },
    {
      title: "Atención al cliente",
      links: ["Envíos", "Pedidos", "Devoluciones", "Cuenta", "Pagos", "FAQs"],
    },
    {
      title: "Empresa",
      links: ["Acerca de", "Historias", "Contáctanos"],
    },
  ];

  const contactInfo = [
    "(0045) 78 73 727",
    "Lun-Vie 09:00 - 15:30 CET",
    "chocomarket@hola.com",
    "Calle 123 Maple",
    "Quibdó, Chocó, Colombia",
  ];

  return (
    <footer className="border-t">
      <div className="max-w-screen-xl w-full mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-12">
          {/* Secciones principales */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-2">
              <h4 className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#008060]">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="hover:text-gray-900 text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Sección de Contactos */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#008060]">
              Contactos
            </h4>
            <ul className="space-y-2">
              {contactInfo.map((info, index) => (
                <li key={index} className="text-sm">
                  {info}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#008060]">
              Mantente al día
            </h4>
            <p className="text-sm mb-4">
              Suscríbete a nuestro boletín y no te pierdas ninguna novedad, desde
              nuevos productos hasta ofertas exclusivas hechas solo para ti.
            </p>
            <form className="flex flex-col gap-2 max-w-full">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button
                aria-label="Botón para suscribirse para que le lleguen novedades al correo"
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              >
                Suscribirse
              </button>
            </form>
            <p className="text-xs mt-4">
              Al hacer clic en el botón, aceptas nuestra{" "}
              <span className="font-semibold">Política de privacidad</span>
            </p>
          </div>
        </div>

        {/* Sección inferior */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="space-y-2">
                <span className="text-sm font-medium">Moneda</span>
                <select className="text-sm bg-transparent border rounded px-2 py-1">
                  <option>COP $</option>
                </select>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium">Idioma</span>
                <select className="text-sm bg-transparent border rounded px-2 py-1">
                  <option>Español</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Métodos de pago:</span>
              <div className="flex gap-2">
                {["VISA", "AMEX", "DINERS CLUB"].map((method, index) => (
                  <span key={index} className="text-gray-600 text-sm">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-sm mt-8">
            © ChocóMarket. Todos los productos de esta tienda son solo para
            demostración.
            <br />
            Los productos de esta tienda provienen del catálogo de Serralunga.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
