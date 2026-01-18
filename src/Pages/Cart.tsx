import { Link } from 'react-router-dom'

export default function Cart() {
  return (
    <section
      className="
        min-h-[calc(100vh-160px)]
        px-6 py-12
        bg-[rgb(var(--bg))]
      "
    >
      <div className="max-w-4xl mx-auto">

        {/* TÍTULO */}
        <h1 className="text-3xl font-bold mb-6">
          Carrinho
        </h1>

        {/* CONTAINER */}
        <div
          className="
            rounded-2xl p-10
            bg-[rgb(var(--surface))]
            shadow-xl
          "
        >
          {/* ESTADO VAZIO */}
          <div className="flex flex-col items-center text-center gap-4">

            <span className="text-6xl">🛒</span>

            <h2 className="text-xl font-semibold">
              Seu carrinho está vazio
            </h2>

            <p className="text-[rgb(var(--text-muted))] max-w-md">
              Adicione produtos ao carrinho para continuar sua compra
              e montar seu setup ideal.
            </p>

            <Link
              to="/"
              className="
                mt-4 inline-flex items-center justify-center
                px-8 py-4 rounded-xl text-lg font-semibold
                bg-[rgb(var(--primary))]
                hover:bg-[rgb(var(--primary-hover))]
                text-white
                transition-all duration-200
              "
            >
              Voltar para a loja
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
