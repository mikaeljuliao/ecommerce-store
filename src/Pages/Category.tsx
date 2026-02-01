import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import ProductCard from '../components/ProductCard'
import { getProdutosPorCategoria } from '../services/products'
import type { Product } from '../types/Product'

export function Category() {
  const { slug } = useParams<{ slug: string }>()

  const produtos: Product[] = slug
    ? getProdutosPorCategoria(slug)
    : []

  // 🔹 colunas e paginação
  const [columns, setColumns] = useState(2)
  const [page, setPage] = useState(0)

  // 🔹 breakpoints CORRETOS (sem cards espremidos)
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth

      if (width >= 1280) {
        setColumns(5)
      } else if (width >= 1024) {
        setColumns(4)
      } else if (width >= 768) {
        setColumns(3)
      } else {
        setColumns(2)
      }

      setPage(0)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 🔹 paginação estilo carrossel
  const itemsPerPage = columns
  const start = page * itemsPerPage
  const end = start + itemsPerPage

  const produtosVisiveis = produtos.slice(start, end)
  const canGoPrev = page > 0
  const canGoNext = end < produtos.length

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* HEADER */}
      <div className="mb-8">
        <nav className="text-sm mb-3 text-[rgb(var(--text-muted))]">
          <Link to="/" className="hover:text-[rgb(var(--primary))] transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{slug}</span>
        </nav>

        <h1 className="text-3xl font-semibold capitalize text-[rgb(var(--text))]">
          {slug}
        </h1>
      </div>

      {produtos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-[rgb(var(--text-muted))] mb-4">
            Nenhum produto encontrado para essa categoria.
          </p>

          <Link
            to="/"
            className="px-6 py-3 rounded-lg bg-[rgb(var(--primary))] text-white hover:opacity-90 transition"
          >
            Voltar para a loja
          </Link>
        </div>
      ) : (
        <section className="relative">

          {/* BOTÃO ESQUERDA */}
          {canGoPrev && (
            <button
              onClick={() => setPage(p => p - 1)}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border bg-[rgb(var(--bg-secondary))]"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* BOTÃO DIREITA */}
          {canGoNext && (
            <button
              onClick={() => setPage(p => p + 1)}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border bg-[rgb(var(--bg-secondary))]"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* GRID RESPONSIVO ESTÁVEL */}
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {produtosVisiveis.map(produto => (
              <ProductCard
                key={produto.id}
                produto={produto}
                showCTA
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
