import { useEffect } from 'react'

export default function TermosDeUso() {
 
  return (
    <section className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <div className="max-w-4xl mx-auto px-6 py-20">

        <h1 className="text-3xl font-bold mb-6">
          Termos de
          <span className="text-[rgb(var(--primary))]"> Uso</span>
        </h1>

        <div className="space-y-6 text-[rgb(var(--text-muted))] leading-relaxed">

          <p>
            Ao acessar e utilizar a SetupStore, você concorda com os termos
            e condições descritos nesta página. Caso não concorde, recomendamos
            que não utilize a plataforma.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--text))]">
            Uso da plataforma
          </h2>
          <p>
            A SetupStore é um projeto open source com fins educacionais e
            demonstrativos. As informações, produtos e funcionalidades
            apresentadas simulam um e-commerce real.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--text))]">
            Propriedade intelectual
          </h2>
          <p>
            Todo o código-fonte, layout e estrutura do projeto podem ser
            utilizados para estudo e aprendizado, respeitando as licenças
            aplicáveis do repositório.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--text))]">
            Responsabilidades
          </h2>
          <p>
            A SetupStore não se responsabiliza por decisões tomadas com base
            neste projeto, uma vez que se trata de um modelo educacional.
          </p>

        </div>
      </div>
    </section>
  )
}
