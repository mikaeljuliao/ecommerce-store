import { Link } from 'react-router-dom'

export function Hero() {

  function scrollParaCategorias(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()

    const section = document.getElementById('categorias')

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section
      className="
        relative overflow-hidden
        min-h-[520px]
        border border-[rgb(var(--border))]
      "
    >
      {/* IMAGEM DE FUNDO */}
      <div className="absolute inset-0">
        <img
          src="/imagem/banners/setup-gamer.png"
          alt="Setup gamer"
          className="w-full h-full object-cover"
        />

        {/* OVERLAY PRINCIPAL */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-black/80
            via-black/55
            to-black/20
          "
        />

        {/* OVERLAY TECNOLÓGICO */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]
            [background-size:22px_22px]
            opacity-30
          "
        />
      </div>

      {/* CONTEÚDO */}
      <div
        className="
          relative z-10
          grid grid-cols-1 lg:grid-cols-2
          gap-14
          p-10 md:p-14
          h-full
        "
      >
        {/* TEXTO */}
        <div className="flex flex-col justify-center gap-6">
          <span
            className="
              w-fit px-4 py-1 rounded-full text-sm font-medium
              bg-white/10 text-white
              backdrop-blur
            "
          >
            E-commerce de tecnologia
          </span>

          <h1
            className="
              text-4xl md:text-5xl font-extrabold leading-tight
              text-white
            "
          >
            Tecnologia certa
            <br />
            <span className="text-[rgb(var(--primary))]">
              para o setup perfeito
            </span>
          </h1>

          <p className="max-w-xl text-lg text-white/80">
            Um e-commerce moderno, reutilizável e focado em performance.
            Ideal para montar setups de alto nível ou servir como base
            para projetos reais.
          </p>

          {/* BOTÕES */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#categorias"
              onClick={scrollParaCategorias}
              className="
                px-6 py-3 rounded-xl font-semibold
                bg-[rgb(var(--primary))]
                text-white
                hover:brightness-110
                transition
              "
            >
              Explorar produtos
            </a>

            <Link
              to="/sobre"
              className="
                px-6 py-3 rounded-xl font-semibold
                border border-white/30
                text-white
                hover:bg-white/10
                transition
              "
            >
              Sobre o projeto
            </Link>
          </div>
        </div>

        <div className="hidden lg:block" />
      </div>
    </section>
  )
}
