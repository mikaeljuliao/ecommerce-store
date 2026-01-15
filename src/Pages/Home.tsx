import { Link } from 'react-router-dom'
import { getCategorias } from '../services/products'

export default function Home() {
  const categorias = getCategorias()

  return (
    <section className="bg-zinc-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HERO / INTRODUÇÃO */}
        <section
          id="home"
          className="
            mb-14
            scroll-mt-24
          "
        >
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-2xl p-10 flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Monte seu setup ideal
            </h1>

            <p className="text-zinc-300 max-w-2xl">
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
            className="
              mb-16
              scroll-mt-24
              animate-fade-up
            "
          >
            {/* TÍTULO */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {categoria.nome}
              </h2>

              <span className="text-sm text-zinc-400 cursor-pointer hover:text-white transition">
                Ver mais
              </span>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoria.produtos.map((produto) => (
                <Link
                  key={produto.id}
                  to={`/produto/${produto.id}`}
                  className="
                    bg-zinc-900 rounded-xl
                    border border-zinc-800
                    hover:border-zinc-600
                    transition-all duration-200
                    overflow-hidden
                    group
                    hover:-translate-y-1
                  "
                >
                  {/* IMAGEM */}
                  <div className="aspect-square bg-white flex items-center justify-center p-4">
                    <img
                      src={produto.imagens[0]}
                      alt={produto.titulo}
                      className="
                        max-h-full max-w-full
                        object-contain
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
                          <span className="text-xs text-zinc-400 line-through block">
                            R$ {produto.preco.toFixed(2)}
                          </span>
                          <span className="text-lg font-bold text-green-500">
                            R$ {produto.preco_desconto.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-green-500">
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