import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { getCategorias } from '../services/products'
import { Hero } from '../components/Hero'
import { CategoriesSection } from '../components/CategoriesSection'

export default function Home() {
  const categorias = getCategorias()

  // 🔹 junta todos os produtos
  const todosProdutos = categorias.flatMap(
    (categoria) => categoria.produtos
  )

  // 🔹 promoções (baseado no JSON)
  const promocoes = todosProdutos.filter(
    (produto) => produto.em_promocao
  )

  // 🔹 mais vendidos (PODE TER PROMOÇÃO OU NÃO)
  const maisVendidos = todosProdutos.filter(
    (produto) => produto.mais_vendido
  )

  // refs
  const vendidosRef = useRef<HTMLDivElement | null>(null)

  // estados dos botões
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  function updateScrollButtons(ref: HTMLDivElement | null) {
    if (!ref) return

    const { scrollLeft, scrollWidth, clientWidth } = ref

    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5)
  }

  function scrollNext() {
    if (!vendidosRef.current) return

    vendidosRef.current.scrollBy({
      left: 260,
      behavior: 'smooth'
    })

    setTimeout(() => updateScrollButtons(vendidosRef.current), 300)
  }

  function scrollPrev() {
    if (!vendidosRef.current) return

    vendidosRef.current.scrollBy({
      left: -260,
      behavior: 'smooth'
    })

    setTimeout(() => updateScrollButtons(vendidosRef.current), 300)
  }

  useEffect(() => {
    updateScrollButtons(vendidosRef.current)
  }, [])

  return (
    <section className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <div className="max-w-full mx-auto">

        {/* HERO */}
        <section className="mb-20">
          <Hero />
        </section>

        {/* CATEGORIAS */}
        <CategoriesSection />

        {/* MAIS VENDIDOS */}
        <section className="mb-20 max-w-7xl mx-auto px-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              🔥 Mais vendidos
            </h2>

            <div className="flex gap-2">
              {canScrollLeft && (
                <button
                  onClick={scrollPrev}
                  className="p-2 rounded-full border bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              {canScrollRight && (
                <button
                  onClick={scrollNext}
                  className="p-2 rounded-full border bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>

          <div
            ref={vendidosRef}
            onScroll={() => updateScrollButtons(vendidosRef.current)}
            className="flex gap-4 overflow-hidden scroll-smooth"
          >
            {maisVendidos.map((produto) => (
              <Link
                key={produto.id}
                to={`/produto/${produto.id}`}
                className="min-w-[220px] rounded-xl border bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition"
              >
                <div className="aspect-square p-3 flex items-center justify-center">
                  <img
                    src={produto.imagens[0]}
                    alt={produto.titulo}
                    className="max-h-full object-contain"
                  />
                </div>

                <div className="p-3">
                  <h3 className="text-sm line-clamp-2 mb-2">
                    {produto.titulo}
                  </h3>

                  {produto.em_promocao ? (
                    <>
                      <span className="text-xs line-through text-[rgb(var(--text-muted))] block">
                        R$ {produto.preco.toFixed(2)}
                      </span>
                      <span className="font-semibold text-[rgb(var(--success))]">
                        R$ {produto.preco_desconto!.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold text-[rgb(var(--success))]">
                      R$ {produto.preco.toFixed(2)}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PROMOÇÕES */}
        <section className="mb-24 max-w-7xl mx-auto px-10">
          <h2 className="text-2xl font-semibold mb-6">
            💸 Promoções
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {promocoes.map((produto) => (
              <Link
                key={produto.id}
                to={`/produto/${produto.id}`}
                className="min-w-[220px] rounded-xl border bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition"
              >
                <div className="aspect-square p-3 flex items-center justify-center">
                  <img
                    src={produto.imagens[0]}
                    alt={produto.titulo}
                    className="max-h-full object-contain"
                  />
                </div>

                <div className="p-3">
                  <h3 className="text-sm line-clamp-2 mb-1">
                    {produto.titulo}
                  </h3>

                  <span className="text-xs line-through text-[rgb(var(--text-muted))] block">
                    R$ {produto.preco.toFixed(2)}
                  </span>

                  <span className="font-semibold text-[rgb(var(--success))]">
                    R$ {produto.preco_desconto!.toFixed(2)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </section>
  )
}
