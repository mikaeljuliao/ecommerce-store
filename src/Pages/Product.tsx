import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Product as ProductType } from '../types/Product'
import { getProdutoPorId } from '../services/products'

export default function Product() {
  const { id } = useParams<{ id: string }>()

  const [product, setProduct] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('ID do produto não encontrado')
      setLoading(false)
      return
    }

    // 🔒 aqui o TypeScript SABE que é string
    const productId: string = id

    async function loadProduct() {
      try {
        const data = await getProdutoPorId(productId)
        setProduct(data)
      } catch {
        setError('Erro ao carregar produto')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return <p className="text-white">Carregando...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (!product) {
    return <p className="text-red-500">Produto não encontrado</p>
  }

 return (
  <section className="bg-slate-900 min-h-[calc(100vh-160px)] px-6 py-12">
    <div className="max-w-6xl mx-auto bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">

        {/* IMAGEM */}
        <div className="flex items-center justify-center bg-slate-900 rounded-xl p-6">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[420px] object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">
              {product.title}
            </h1>

            <p className="text-slate-300 leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          {/* PREÇO + CTA */}
          <div className="border-t border-slate-700 pt-6">
            <p className="text-3xl font-bold text-green-400 mb-4">
              R$ {product.price}
            </p>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white 
              font-semibold py-4 rounded-xl text-lg"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
)


}
