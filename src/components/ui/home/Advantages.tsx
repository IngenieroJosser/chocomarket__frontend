const Advantages = () => {
  const advantages = [
    {
      title: 'Atención al Cliente',
      description: 'Nuestro equipo dedicado ofrece asistencia oportuna, comprometido a resolver tus dudas.',
      linkText: 'Contáctanos',
      linkHref: 'https://api.whatsapp.com/send?phone=+573232842193&text=%C2%A1Hola!%20En%20*Choc%C3%B3Market*%20ofrecemos%20productos%20aut%C3%A9nticos%20del%20Choc%C3%B3%2C%20conectando%20a%20productores%20locales%20con%20el%20mundo.%20%C2%BFEn%20qu%C3%A9%20podemos%20ayudarte%3F',
    },
    {
      title: 'Satisfacción Garantizada',
      description: 'Invierte en nuestros productos con total confianza, respaldado por nuestra garantía de satisfacción de 30 días.',
      linkText: 'Aprende más',
      linkHref: 'https://api.whatsapp.com/send?phone=+573232842193&text=%C2%A1Hola!%20En%20*Choc%C3%B3Market*%20ofrecemos%20productos%20aut%C3%A9nticos%20del%20Choc%C3%B3%2C%20conectando%20a%20productores%20locales%20con%20el%20mundo.%20%C2%BFEn%20qu%C3%A9%20podemos%20ayudarte%3F',
    },
    {
      title: 'Envío Gratis',
      description: 'Disfruta de una experiencia de compra sin interrupciones, facilitada por nuestro servicio de envío gratuito.',
      linkText: 'Aprende más',
      linkHref: 'https://api.whatsapp.com/send?phone=+573232842193&text=%C2%A1Hola!%20En%20*Choc%C3%B3Market*%20ofrecemos%20productos%20aut%C3%A9nticos%20del%20Choc%C3%B3%2C%20conectando%20a%20productores%20locales%20con%20el%20mundo.%20%C2%BFEn%20qu%C3%A9%20podemos%20ayudarte%3F',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-6 hover:rounded-lg transition-colors"
            >
              <h3 className="text-xl font-bold uppercase text-end text-[#008060]">{advantage.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {advantage.description}
              </p>
              <a
                href={advantage.linkHref}
                className={`mt-2 font-bold transition-colors uppercase text-end duration-300 ${
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
