import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Product as ProductType } from '../types/Product'
import { getProdutoPorId } from '../services/products'
import { useCart } from '../context/CartContext'
import { ProdutosRelacionados } from '../components/ProdutosRelacionados'

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const { adicionarProduto } = useCart()

  const [quantidade, setQuantidade] = useState(1)
  const [adicionado, setAdicionado] = useState(false)

  const [product, setProduct] = useState<ProductType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}, [id])

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
      if (!data) setError('Produto não encontrado')
      else setProduct(data)
    } catch {
      setError('Erro ao carregar produto')
    } finally {
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return <p className="px-6 py-12 text-gray-500">Carregando...</p>
  }

  if (error || !product) {
    return (
      <p className="px-6 py-12 text-red-600">
        {error ?? 'Produto não encontrado'}
      </p>
    )
  }

  const precoFinal = product.preco_desconto ?? product.preco

  return (
    <section className="min-h-[calc(100vh-160px)] px-6 py-12 bg-[rgb(var(--bg))]">
      <div className="max-w-6xl mx-auto bg-[rgb(var(--surface))] rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* IMAGEM */}
          <div className="flex items-center justify-center bg-[rgb(var(--bg-secondary))] rounded-xl p-6">
            <img
              src={product.imagens[0]}
              alt={product.titulo}
              className="max-h-[420px] object-contain"
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">
              {product.titulo}
            </h1>

            <p className="text-gray-500 mb-8">
              {product.descricao}
            </p>

            {product.preco_desconto && (
              <p className="text-sm line-through text-gray-400">
                R$ {product.preco.toFixed(2)}
              </p>
            )}

            <p className="text-4xl font-bold text-blue-600 mb-6">
              R$ {precoFinal.toFixed(2)}
            </p>

            {/* QUANTIDADE */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-medium text-gray-700">
                Quantidade:
              </span>

              <select
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
                className="
                  px-4 py-2 rounded-lg border
                  bg-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800
                "
              >
                {[1, 2, 3, 4, 5, 6].map(q => (
                  <option key={q} value={q}>
                    {q} unidade{q > 1 && 's'}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                adicionarProduto(product, quantidade)
                setAdicionado(true)
                setTimeout(() => setAdicionado(false), 1500)
              }}
              className={`
                w-full py-4 rounded-xl
                font-semibold text-lg
                transition
                ${
                  adicionado
                    ? 'bg-green-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                }
                text-white
              `}
            >
              {adicionado ? '✔ Adicionado' : 'Adicionar ao carrinho'}
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 PRODUTOS RELACIONADOS */}
      <ProdutosRelacionados
        categoriaAtual={product.categoria}
        produtoAtualId={product.id}
      />
    </section>
  )
}
