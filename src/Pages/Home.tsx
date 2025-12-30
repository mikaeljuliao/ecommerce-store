import { useEffect, useState } from 'react'
import type { Product } from '../types/Product'
import { getAllProducts } from '../services/products'
import { Link } from 'react-router-dom'

export function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts()
        setProducts(data)
      } catch (err) {
        setError('Erro ao carregar produtos')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, []) 

  if (loading) {
    return <p className="text-white">Carregando...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
    <Link
    key={product.id}
    to={`/produto/${product.id}`}
    className="block"
     >
    <div className="bg-slate-800 text-white p-4 rounded">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 mx-auto object-contain"
      />

      <h2 className="mt-4 font-semibold">
        {product.title}
      </h2>

      <p className="mt-2 font-bold">
        R$ {product.price}
      </p>
    </div>
    </Link>
    ))}

    </div>
  )
}
