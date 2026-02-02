export function BlocoPromocional() {
  function handleScrollToCategorias() {
    const section = document.getElementById('categorias')

    section?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <section className="max-w-7xl mx-auto px-4 mb-24">
      <div
        className="
          rounded-2xl
          bg-[rgb(var(--bg-secondary))]
      
          border-[rgb(var(--border))]
          px-6 py-10
          flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        {/* TEXTO */}
        <div>
          <h2 className="text-2xl font-semibold mb-1">
            Frete grátis em compras acima de R$ 299
          </h2>
          <p className="text-sm text-[rgb(var(--text-muted))]">
            Aproveite e garanta seus produtos favoritos com entrega gratuita
          </p>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={handleScrollToCategorias}
          className="
            mt-4 sm:mt-0
            px-6 py-3
            rounded-lg
            bg-[rgb(var(--primary))]
            text-white
            font-semibold
            hover:opacity-90
            transition
          "
        >
          Explorar categorias
        </button>
      </div>
    </section>
  )
}
