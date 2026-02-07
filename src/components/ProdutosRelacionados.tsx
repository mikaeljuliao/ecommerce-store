import { Link } from 'react-router-dom'
import type { Product } from '../types/Product'
import produtos from '../data/produtos.json'

interface ProdutosRelacionadosProps {
  categoriaAtual: string
  produtoAtualId: number
}

export function ProdutosRelacionados({
  categoriaAtual,
  produtoAtualId
}: ProdutosRelacionadosProps) {
  const todosOsProdutos: Product[] = produtos.categorias.flatMap(
    (categoria: { produtos: Product[] }) => categoria.produtos
  )

  const produtosRelacionados = todosOsProdutos.filter(
    (produto) =>
      produto.categoria === categoriaAtual &&
      produto.id !== produtoAtualId
  )

  if (produtosRelacionados.length === 0) return null

  return (
    <section className="mt-24">
      {/* TÍTULO */}
      <div className="mb-8">
        <h2 className="text-xl md:text-3xl font-bold">
          Produtos relacionados
        </h2>
        <p className="text-lg text-gray-500 mt-1">
          Itens semelhantes que podem te interessar
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {produtosRelacionados.map((produto) => {
          const precoFinal =
            produto.preco_desconto ?? produto.preco

          return (
            <Link
              key={produto.id}
              to={`/produto/${produto.id}`}
              className="
                group
                bg-[rgb(var(--bg-secondary))]
                rounded-2xl
                shadow-md
                hover:shadow-xl
                transition
                overflow-hidden
                flex flex-col
                relative
              "
            >
              {/* BADGES */}
              {produto.em_promocao && (
                <span className="
                  absolute top-4 left-4
                  bg-red-500 text-white
                  text-xs font-semibold
                  px-3 py-1 rounded-full
                ">
                  Promoção
                </span>
              )}

              {produto.mais_vendido && !produto.em_promocao && (
                <span className="
                  absolute top-4 left-4
                  bg-blue-600 text-white
                  text-xs font-semibold
                  px-3 py-1 rounded-full
                ">
                  Mais vendido
                </span>
              )}

              {/* IMAGEM */}
              <div className="
                p-6
                flex items-center justify-center
                transition-transform
                group-hover:scale-105
              ">
                <img
                  src={produto.imagens[0]}
                  alt={produto.titulo}
                  className="h-40 object-contain"
                />
              </div>

              {/* INFO */}
              <div className="px-6 pb-6 flex flex-col gap-2 flex-1">
                <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">
                  {produto.titulo}
                </h3>

                {produto.preco_desconto && (
                  <span className="text-xs line-through text-gray-400">
                    R$ {produto.preco.toFixed(2)}
                  </span>
                )}

                <span className="text-lg font-bold text-blue-600 mt-auto">
                  R$ {precoFinal.toFixed(2)}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
