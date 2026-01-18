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
    return (
      <p className="px-6 py-12 text-[rgb(var(--text-muted))]">
        Carregando...
      </p>
    )
  }

  if (error || !product) {
    return (
      <p className="px-6 py-12 text-red-600 dark:text-red-400">
        {error ?? 'Produto não encontrado'}
      </p>
    )
  }

  const imagemPrincipal = product.imagens[0]
  const precoFinal = product.preco_desconto ?? product.preco

  return (
    <section
      className="
        min-h-[calc(100vh-160px)]
        px-6 py-12
        bg-[rgb(var(--bg))]
      "
    >
      <div
        className="
          max-w-6xl mx-auto rounded-2xl shadow-xl overflow-hidden
          bg-[rgb(var(--surface))]
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">

          {/* IMAGEM */}
          <div
            className="
              flex items-center justify-center rounded-xl p-6
              bg-[rgb(var(--bg-secondary))]
            "
          >
            <img
              src={imagemPrincipal}
              alt={product.titulo}
              className="
                max-h-[420px] object-contain
                transition-transform duration-300
                hover:scale-105
              "
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4">
                {product.titulo}
              </h1>

              <p className="leading-relaxed mb-6 text-[rgb(var(--text-muted))]">
                {product.descricao}
              </p>
            </div>

            {/* PREÇO + CTA */}
            <div
              className="
                border-t pt-6
                border-[rgb(var(--bg-secondary))]
              "
            >
              {product.preco_desconto && (
                <p className="text-sm text-[rgb(var(--text-muted))] line-through mb-1">
                  R$ {product.preco.toFixed(2)}
                </p>
              )}

              <p className="text-3xl font-bold mb-4 text-[rgb(var(--primary))]">
                R$ {precoFinal.toFixed(2)}
              </p>

              <button
                className="
                  w-full py-4 rounded-xl text-lg font-semibold
                  bg-[rgb(var(--primary))]
                  hover:bg-[rgb(var(--primary-hover))]
                  text-white
                  transition-all duration-200
                "
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
