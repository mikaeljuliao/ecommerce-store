import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Product } from '../types/Product'
import { getProdutoPorId } from '../services/products'

export default function Product() {
  const { id } = useParams<{ id: string }>()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('ID do produto não encontrado')
      setLoading(false)
      return
    }

    // converte string da URL para number (seu JSON usa number)
    const productId = Number(id)

    if (Number.isNaN(productId)) {
      setError('ID do produto inválido')
      setLoading(false)
      return
    }

    try {
      const data = getProdutoPorId(productId)

      if (!data) {
        setError('Produto não encontrado')
      } else {
        setProduct(data)
      }
    } catch {
      setError('Erro ao carregar produto')
    } finally {
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return <p className="text-white px-6 py-12">Carregando...</p>
  }

  if (error) {
    return <p className="text-red-500 px-6 py-12">{error}</p>
  }

  if (!product) {
    return <p className="text-red-500 px-6 py-12">Produto não encontrado</p>
  }

  const imagemPrincipal = product.imagens[0]
  const precoFinal = product.preco_desconto ?? product.preco

  return (
    <section className="bg-slate-900 min-h-[calc(100vh-160px)] px-6 py-12">
      <div className="max-w-6xl mx-auto bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">

          {/* IMAGEM */}
          <div className="flex items-center justify-center bg-slate-900 rounded-xl p-6">
            <img
              src={imagemPrincipal}
              alt={product.titulo}
              className="max-h-[420px] object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">
                {product.titulo}
              </h1>

              <p className="text-slate-300 leading-relaxed mb-6">
                {product.descricao}
              </p>
            </div>

            {/* PREÇO + CTA */}
            <div className="border-t border-slate-700 pt-6">
              {product.preco_desconto && (
                <p className="text-slate-400 line-through mb-1">
                  R$ {product.preco.toFixed(2)}
                </p>
              )}

              <p className="text-3xl font-bold text-green-400 mb-4">
                R$ {precoFinal.toFixed(2)}
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