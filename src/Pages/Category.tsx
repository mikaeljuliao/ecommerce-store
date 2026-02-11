import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProdutosPorCategoria } from '../services/products'
import type { Product } from '../types/Product'

export function Category() {
  const { slug } = useParams<{ slug: string }>()

  const produtos: Product[] = slug
    ? getProdutosPorCategoria(slug)
    : []

  return (
    <div className="w-full">

      {/* CONTAINER CONTROLADO */}
      <div className="
        max-w-[1400px] 
        mx-auto 
        px-4 sm:px-6 lg:px-8 
        py-8 sm:py-10 lg:py-12
      ">

        {/* HEADER */}
        <div className="mb-6 sm:mb-8">
          <nav className="text-xs sm:text-sm mb-2 text-[rgb(var(--text-muted))]">
            <Link
              to="/"
              className="hover:text-[rgb(var(--primary))] transition"
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="capitalize">{slug}</span>
          </nav>

          <h1 className="
            text-2xl sm:text-3xl lg:text-4xl
            font-semibold
            capitalize
            text-[rgb(var(--text))]
          ">
            {slug}
          </h1>
        </div>

        {/* SEM PRODUTOS */}
        {produtos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-base text-[rgb(var(--text-muted))] mb-4">
              Nenhum produto encontrado para essa categoria.
            </p>

            <Link
              to="/"
              className="px-6 py-3 rounded-lg bg-[rgb(var(--primary))] text-white hover:opacity-90 transition"
            >
              Voltar para a loja
            </Link>
          </div>
        ) : (

          /* GRID PROFISSIONAL */
          <div className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-3
            sm:gap-4
            lg:gap-6
          ">
            {produtos.map(produto => (
              <ProductCard
                key={produto.id}
                produto={produto}
                showCTA
              />
            ))}
          </div>

        )}
      </div>
    </div>
  )
}
