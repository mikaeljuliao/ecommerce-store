import { useEffect } from 'react'

export default function Sobre() {
  /* =========================================
     AO ENTRAR NA PÁGINA
     - garante scroll no topo
  ========================================= */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <section className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <div className="max-w-5xl mx-auto px-6 py-24 space-y-20">

        {/* ================= HERO ================= */}
        <header className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Sobre a Setup
            <span className="text-[rgb(var(--primary))]">Store</span>
          </h1>

          <p className="max-w-3xl text-lg text-[rgb(var(--text-muted))] leading-relaxed">
            A SetupStore é um projeto de e-commerce moderno, criado para
            simular uma aplicação real de produção, com foco em
            performance, organização de código e experiência do usuário.
          </p>
        </header>

        {/* ================= MISSÃO ================= */}
        <section className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Nossa missão
            </h2>

            <p className="text-[rgb(var(--text-muted))] leading-relaxed">
              Criar uma base sólida e escalável para estudo e evolução,
              aplicando boas práticas de front-end como componentização,
              arquitetura limpa e padrões modernos do ecossistema React.
            </p>

            <p className="text-[rgb(var(--text-muted))] leading-relaxed">
              O projeto foi pensado para crescer: novas páginas, integrações,
              melhorias visuais e funcionalidades podem ser adicionadas sem
              retrabalho.
            </p>
          </div>

          {/* CARD */}
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))] p-8 space-y-4">
            <h3 className="font-semibold text-lg">
              O que você encontra aqui
            </h3>

            <ul className="space-y-3 text-sm text-[rgb(var(--text-muted))]">
              <li>• Navegação por categorias com slug dinâmico</li>
              <li>• Carrinho com contexto global</li>
              <li>• Tema light/dark persistente</li>
              <li>• Layout responsivo e acessível</li>
              <li>• Código limpo e organizado</li>
            </ul>
          </div>
        </section>

        {/* ================= STACK ================= */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Tecnologias utilizadas
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              'React',
              'TypeScript',
              'React Router',
              'Context API',
              'Tailwind CSS',
              'Vite'
            ].map(tech => (
              <div
                key={tech}
                className="
                  rounded-xl
                  border border-[rgb(var(--border))]
                  bg-[rgb(var(--bg-secondary))]
                  px-4 py-3
                  text-sm
                  font-medium
                  text-center
                "
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* ================= FOOTER DA PÁGINA ================= */}
        <footer className="pt-10 border-t border-[rgb(var(--border))]">
          <p className="text-sm text-[rgb(var(--text-muted))]">
            Projeto desenvolvido com foco em aprendizado, qualidade de código
            e boas práticas de front-end.
          </p>
        </footer>

      </div>
    </section>
  )
}
