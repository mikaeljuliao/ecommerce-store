import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProdutosPorCategoria } from '../services/products'
import type { Product } from '../types/Product'

export  function Category() {
  const { slug } = useParams<{ slug: string }>()

  const produtos: Product[] = slug
    ? getProdutosPorCategoria(slug)
    : []

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6 capitalize">
        {slug}
      </h1>

      {produtos.length === 0 ? (
        <p className="text-gray-500">
          Nenhum produto encontrado para essa categoria.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <ProductCard
              key={produto.id}
              produto={produto}
            />
          ))}
        </div>
      )}
    </div>
  )
}
