import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../types/Product'

type Props = {
  titulo: string
  produtos: Product[]
}

export function ProductCarousel({ titulo, produtos }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollLeft() {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: 'smooth'
    })
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: 'smooth'
    })
  }

  return (
    <section className="max-w-7xl mx-auto px-6 mb-20">
      {/* CABEÇALHO */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[rgb(var(--primary))]">
          {titulo}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="
              p-2 rounded-lg border
              border-[rgb(var(--border))]
              hover:border-[rgb(var(--primary))]
            "
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={scrollRight}
            className="
              p-2 rounded-lg border
              border-[rgb(var(--border))]
              hover:border-[rgb(var(--primary))]
            "
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* CARROSSEL */}
      <div
        ref={scrollRef}
        className="
          flex gap-6 overflow-x-auto scroll-smooth
          pb-4
          scrollbar-hide
        "
      >
        {produtos.map((produto) => (
          <Link
            key={produto.id}
            to={`/produto/${produto.id}`}
            className="
              min-w-[240px]
              rounded-xl overflow-hidden
              border transition
              bg-[rgb(var(--bg-secondary))]
              border-[rgb(var(--border))]
              hover:border-[rgb(var(--primary))]
              hover:-translate-y-1
            "
          >
            {/* IMAGEM */}
            <div className="aspect-square flex items-center justify-center p-4">
              <img
                src={produto.imagens[0]}
                alt={produto.titulo}
                className="max-h-full object-contain"
              />
            </div>

            {/* INFO */}
            <div className="p-4">
              <h3 className="text-sm font-medium line-clamp-2 mb-2">
                {produto.titulo}
              </h3>

              {produto.preco_desconto ? (
                <>
                  <span className="text-xs line-through text-[rgb(var(--text-muted))] block">
                    R$ {produto.preco.toFixed(2)}
                  </span>
                  <span className="text-lg font-bold text-[rgb(var(--success))]">
                    R$ {produto.preco_desconto.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-[rgb(var(--success))]">
                  R$ {produto.preco.toFixed(2)}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
