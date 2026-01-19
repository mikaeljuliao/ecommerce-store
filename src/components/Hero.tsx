import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section
      className="
        relative
        rounded-3xl
        border border-[rgb(var(--border))]
        bg-[rgb(var(--bg-secondary))]
        overflow-hidden
      "
    >
      {/* grid técnico de fundo */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]
          bg-[size:40px_40px]
          opacity-40
        "
      />

      {/* gradiente sutil */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-gradient-to-br
          from-[rgb(var(--primary))/12]
          via-transparent
          to-transparent
        "
      />

      <div className="relative z-10 px-10 py-20 md:px-16">
        <div className="max-w-3xl flex flex-col gap-8">

          {/* TAG TECNOLÓGICA */}
          <span
            className="
              w-fit
              px-4 py-1.5
              rounded-full
              text-xs font-medium
              border
              border-[rgb(var(--border))]
              text-[rgb(var(--text-muted))]
            "
          >
            Plataforma de e-commerce • React + TypeScript
          </span>

          {/* HEADLINE */}
          <h1
            className="
              text-4xl md:text-5xl
              font-extrabold
              leading-tight
              text-[rgb(var(--primary))]
            "
          >
            E-commerce de tecnologia
            <br />
            com estrutura de produto real
          </h1>

          {/* SUBHEADLINE */}
          <p
            className="
              text-base md:text-lg
              text-[rgb(var(--text-muted))]
            "
          >
            Projeto focado em performance, organização e escalabilidade.
            Um modelo reutilizável de loja online para produtos de setup,
            tecnologia e hardware.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="#categorias"
              className="
                inline-flex items-center justify-center
                px-8 py-4 rounded-xl
                font-semibold
                bg-[rgb(var(--primary))]
                text-white
                hover:bg-[rgb(var(--primary-hover))]
                transition
              "
            >
              Explorar produtos
            </a>

            <span
              className="
                text-sm
                text-[rgb(var(--text-muted))]
              "
            >
              Código limpo • Tema dinâmico • UX consistente
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}
