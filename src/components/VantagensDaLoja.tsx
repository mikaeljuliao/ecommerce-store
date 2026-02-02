import {
  Truck,
  ShieldCheck,
  RefreshCcw,
  Headset
} from 'lucide-react'

export function VantagensDaLoja() {
  const vantagens = [
    { icon: Truck, texto: 'Entrega rápida' },
    { icon: ShieldCheck, texto: 'Pagamento seguro' },
    { icon: RefreshCcw, texto: 'Troca fácil' },
    { icon: Headset, texto: 'Suporte 24h' }
  ]

  return (
    <section className="w-full bg-[rgb(var(--bg-secondary))] py-16 mb-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-2">
            Por que comprar conosco?
          </h2>
          <p className="text-sm text-[rgb(var(--text-muted))]">
            Benefícios pensados para facilitar sua experiência
          </p>
        </div>

        {/* BENEFÍCIOS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {vantagens.map(({ icon: Icon, texto }) => (
            <div
              key={texto}
              className="
                flex items-center gap-4
                p-5
                rounded-2xl
                bg-[rgb(var(--bg))]
                border
                border-[rgb(var(--border))]
                hover:border-[rgb(var(--primary))]
                transition
              "
            >
              <div
                className="
                  flex items-center justify-center
                  w-11 h-11
                  rounded-full
                  bg-[rgb(var(--primary)/0.12)]
                  shrink-0
                "
              >
                <Icon
                  size={20}
                  className="text-[rgb(var(--primary))]"
                />
              </div>

              <span className="text-sm font-medium leading-snug">
                {texto}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
