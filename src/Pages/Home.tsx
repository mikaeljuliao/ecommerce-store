import { Link } from 'react-router-dom'
import { getCategorias } from '../services/products'

export default function Home() {
  const categorias = getCategorias()

  return (
    <section
      className="
        min-h-screen
        bg-[rgb(var(--bg))]
        text-[rgb(var(--text))]
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HERO / INTRODUÇÃO */}
        <section
          id="home"
          className="mb-14 scroll-mt-24"
        >
          <div
            className="
              rounded-2xl p-10 flex flex-col gap-4
              bg-[rgb(var(--bg-secondary))]
              border border-[rgb(var(--border))]
            "
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[rgb(var(--primary))]">
              Monte seu setup ideal
            </h1>

            <p className="max-w-2xl text-[rgb(var(--text-muted))]">
              Produtos gamers, tecnologia e itens para setup selecionados para quem
              busca performance, conforto e estilo.
            </p>
          </div>
        </section>

        {/* CATEGORIAS */}
        {categorias.map((categoria) => (
          <section
            key={categoria.slug}
            id={categoria.slug}
            className="mb-16 scroll-mt-24 animate-fade-up"
          >
            {/* TÍTULO */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[rgb(var(--primary))]">
                {categoria.nome}
              </h2>

              <span
                className="
                  text-sm cursor-pointer transition
                  text-[rgb(var(--text-muted))]
                  hover:text-[rgb(var(--primary))]
                "
              >
                Ver mais
              </span>
            </div>

            {/* GRID DE PRODUTOS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoria.produtos.map((produto) => (
                <Link
                  key={produto.id}
                  to={`/produto/${produto.id}`}
                  className="
                    rounded-xl overflow-hidden group
                    border transition-all duration-200
                    hover:-translate-y-1
                    bg-[rgb(var(--bg-secondary))]
                    border-[rgb(var(--border))]
                    hover:border-[rgb(var(--primary))]
                  "
                >
                  {/* IMAGEM */}
                  <div className="aspect-square flex items-center justify-center p-4">
                    <img
                      src={produto.imagens[0]}
                      alt={produto.titulo}
                      className="
                        max-h-full max-w-full object-contain
                        transition-transform duration-300
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* INFO */}
                  <div className="p-4 flex flex-col justify-between h-[140px]">
                    <h3 className="text-sm font-medium leading-snug line-clamp-2">
                      {produto.titulo}
                    </h3>

                    <div className="mt-3">
                      {produto.preco_desconto ? (
                        <>
                          <span className="text-xs text-[rgb(var(--text-muted))] line-through block">
                            R$ {produto.preco.toFixed(2)}
                          </span>
                          <span className="text-lg font-bold text-[rgb(var(--success))]">
                            R$ {produto.preco_desconto.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-[rgb(var(--success))]">
                          R$ {produto.preco.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
