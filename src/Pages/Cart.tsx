import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const {
    itens,
    removerProduto,
    alterarQuantidade,
    total
  } = useCart()

  if (itens.length === 0) {
    return (
      <section className="min-h-[calc(100vh-160px)] px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-6xl">🛒</span>
          <h1 className="text-2xl font-bold mt-4">
            Seu carrinho está vazio
          </h1>
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-3 rounded-xl
                       bg-blue-600 text-white font-semibold"
          >
            Voltar para a loja
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-[calc(100vh-160px)] px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Carrinho
        </h1>

        <div className="space-y-6">
          {itens.map((item) => {
            const preco =
              item.produto.preco_desconto ??
              item.produto.preco

            return (
              <div
                key={item.produto.id}
                className="flex gap-4 items-center
                           p-4 rounded-xl border"
              >
                <img
                  src={item.produto.imagens[0]}
                  alt={item.produto.titulo}
                  className="w-24 h-24 object-contain"
                />

                <div className="flex-1">
                  <h2 className="font-semibold">
                    {item.produto.titulo}
                  </h2>

                  {/* CONTROLE DE QUANTIDADE */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() =>
                        alterarQuantidade(
                          item.produto.id,
                          item.quantidade - 1
                        )
                      }
                      className="px-3 py-1 border rounded"
                    >
                      −
                    </button>

                    <span>{item.quantidade}</span>

                    <button
                      onClick={() =>
                        alterarQuantidade(
                          item.produto.id,
                          item.quantidade + 1
                        )
                      }
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold mt-2">
                    R$ {(preco * item.quantidade).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() =>
                    removerProduto(item.produto.id)
                  }
                  className="text-red-500 font-semibold"
                >
                  Remover
                </button>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex justify-between items-center
                        border-t pt-6">
          <span className="text-xl font-semibold">
            Total
          </span>

          <span className="text-2xl font-bold text-blue-600">
            R$ {total.toFixed(2)}
          </span>
        </div>
      </div>
    </section>
  )
}
