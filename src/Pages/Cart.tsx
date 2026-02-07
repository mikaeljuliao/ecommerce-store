import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const {
    itens,
    removerProduto,
    alterarQuantidade,
    total
  } = useCart()

  // total sem desconto (preço original)
  const totalSemDesconto = itens.reduce((soma, item) => {
    return soma + item.produto.preco * item.quantidade
  }, 0)

  const economia = totalSemDesconto - total
  const freteGratis = true

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
            className="
              inline-block mt-6 px-6 py-3 rounded-xl
              bg-blue-600 text-white font-semibold
            "
          >
            Continuar comprando
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-[calc(100vh-160px)] px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Carrinho de compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* PRODUTOS */}
          <div className="lg:col-span-2 space-y-6">
            {itens.map(item => {
              const precoFinal =
                item.produto.preco_desconto ??
                item.produto.preco

              return (
                <div
                  key={item.produto.id}
                  className="flex gap-4 p-4 rounded-xl border"
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

                    {/* PREÇOS */}
                    {item.produto.preco_desconto && (
                      <p className="text-sm text-gray-500 line-through">
                        R$ {item.produto.preco.toFixed(2)}
                      </p>
                    )}

                    <p className="font-bold text-lg">
                      R$ {(precoFinal * item.quantidade).toFixed(2)}
                    </p>

                    {/* QUANTIDADE */}
                    <div className="flex items-center gap-3 mt-3">
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

                      <button
                        onClick={() =>
                          removerProduto(item.produto.id)
                        }
                        className="ml-4 text-sm text-red-500"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* RESUMO DO PEDIDO */}
          <aside
            className="
              sticky top-24 h-fit
              p-6 rounded-xl border
              bg-[rgb(var(--bg-secondary))]
            "
          >
            <h2 className="text-xl font-semibold mb-6">
              Resumo do pedido
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {totalSemDesconto.toFixed(2)}</span>
              </div>

              {economia > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Você economiza</span>
                  <span>- R$ {economia.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Frete</span>
                <span className="text-green-600 font-semibold">
                  {freteGratis ? 'Grátis' : 'Calculado no checkout'}
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-blue-600">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              className="
                w-full mt-6 py-3 rounded-xl
                bg-blue-600 text-white
                font-semibold
                hover:bg-blue-700 transition
              "
            >
              Finalizar compra
            </button>

            {/* CONTINUAR COMPRANDO */}
            <Link
              to="/"
              className="
                block mt-4 text-center text-sm
                text-blue-600 hover:underline
              "
            >
              Continuar comprando
            </Link>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Compra segura • Frete grátis • Sem cobrança agora
            </p>
          </aside>

        </div>
      </div>
    </section>
  )
}
