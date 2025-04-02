const Advantages = () => {
  const advantages = [
    {
      title: "Atención al Cliente",
      description: "Nuestro equipo dedicado ofrece asistencia oportuna, comprometido a resolver tus dudas.",
      linkText: "Contáctanos",
      linkHref: "#",
    },
    {
      title: "Satisfacción Garantizada",
      description: "Invierte en nuestros productos con total confianza, respaldado por nuestra garantía de satisfacción de 30 días.",
      linkText: "Aprende más",
      linkHref: "#",
    },
    {
      title: "Envío Gratis",
      description: "Disfruta de una experiencia de compra sin interrupciones, facilitada por nuestro servicio de envío gratuito.",
      linkText: "Aprende más",
      linkHref: "#",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-6 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <h3 className="text-xl font-bold text-gray-900 uppercase text-end">{advantage.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {advantage.description}
              </p>
              <a
                href={advantage.linkHref}
                className={`mt-2 font-medium transition-colors uppercase text-end duration-300 ${
                  advantage.linkText === "Contáctanos"
                    ? "text-emerald-950 hover:text-emerald-900"
                    : "text-emerald-800 hover:text-emerald-700"
                }`}
              >
                {advantage.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
