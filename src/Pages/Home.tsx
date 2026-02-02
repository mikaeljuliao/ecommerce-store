import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { getCategorias } from '../services/products'
import { Hero } from '../components/Hero'
import { CategoriesSection } from '../components/CategoriesSection'
import { VantagensDaLoja } from '../components/VantagensDaLoja'
import { useCart } from '../context/CartContext'
import { BlocoPromocional } from '../components/BlocoPromocional'


export default function Home() {
  const categorias = getCategorias()
  const { adicionarProduto } = useCart()

  // 🔹 todos os produtos
  const todosProdutos = categorias.flatMap(
    (categoria) => categoria.produtos
  )

  // 🔹 filtros
  const promocoes = todosProdutos.filter(p => p.em_promocao)
  const maisVendidos = todosProdutos.filter(p => p.mais_vendido)

  // 🔹 responsivo
  const [itemsPerPage, setItemsPerPage] = useState(2)

  // 🔹 páginas independentes
  const [pageMaisVendidos, setPageMaisVendidos] = useState(0)
  const [pagePromocoes, setPagePromocoes] = useState(0)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(5)
      } else {
        setItemsPerPage(2)
      }
      setPageMaisVendidos(0)
      setPagePromocoes(0)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 🔥 MAIS VENDIDOS
  const startMV = pageMaisVendidos * itemsPerPage
  const endMV = startMV + itemsPerPage

  const maisVendidosVisiveis = maisVendidos.slice(startMV, endMV)
  const canGoPrevMV = pageMaisVendidos > 0
  const canGoNextMV = endMV < maisVendidos.length

  // 💸 PROMOÇÕES
  const startPromo = pagePromocoes * itemsPerPage
  const endPromo = startPromo + itemsPerPage

  const promocoesVisiveis = promocoes.slice(startPromo, endPromo)
  const canGoPrevPromo = pagePromocoes > 0
  const canGoNextPromo = endPromo < promocoes.length

  return (
    <section className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <div className="max-w-full mx-auto">

        {/* HERO */}
        <section className="mb-16">
          <Hero />
        </section>

        {/* ✅ VANTAGENS DA LOJA */}
        <VantagensDaLoja />

        {/* CATEGORIAS */}
        <CategoriesSection />

        {/* 🔥 MAIS VENDIDOS */}
        <section className="mb-20 max-w-7xl mx-auto px-4 relative">
          <h2 className="text-2xl font-semibold mb-6">
            🔥 Mais vendidos
          </h2>

          {canGoPrevMV && (
            <button
              onClick={() => setPageMaisVendidos(p => p - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border bg-[rgb(var(--bg-secondary))]"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {canGoNextMV && (
            <button
              onClick={() => setPageMaisVendidos(p => p + 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border bg-[rgb(var(--bg-secondary))]"
            >
              <ChevronRight size={22} />
            </button>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {maisVendidosVisiveis.map(produto => (
              <Link
                key={produto.id}
                to={`/produto/${produto.id}`}
                className="rounded-xl border bg-[rgb(var(--bg-secondary))]"
              >
                <div className="aspect-square p-3 flex items-center justify-center">
                  <img
                    src={produto.imagens[0]}
                    alt={produto.titulo}
                    className="max-h-full object-contain"
                  />
                </div>

                <div className="p-3">
                  <h3 className="text-sm line-clamp-2 min-h-[2.5rem] mb-2">
                    {produto.titulo}
                  </h3>

                  <div className="min-h-[2.25rem] mb-3">
                    {produto.em_promocao ? (
                      <>
                        <span className="text-xs line-through block text-gray-400">
                          R$ {produto.preco.toFixed(2)}
                        </span>
                        <span className="font-semibold text-green-600">
                          R$ {produto.preco_desconto!.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="font-semibold text-green-600">
                        R$ {produto.preco.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      adicionarProduto(produto, 1)
                    }}
                    className="w-full py-2 text-sm font-semibold rounded-lg bg-[rgb(var(--primary))] text-white"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>


        <BlocoPromocional />

        {/* 💸 PROMOÇÕES */}
        <section className="mb-24 max-w-7xl mx-auto px-4 relative">
          <h2 className="text-2xl font-semibold mb-6">
            💸 Promoções
          </h2>

          {canGoPrevPromo && (
            <button
              onClick={() => setPagePromocoes(p => p - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border bg-[rgb(var(--bg-secondary))]"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {canGoNextPromo && (
            <button
              onClick={() => setPagePromocoes(p => p + 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border bg-[rgb(var(--bg-secondary))]"
            >
              <ChevronRight size={22} />
            </button>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {promocoesVisiveis.map(produto => (
              <Link
                key={produto.id}
                to={`/produto/${produto.id}`}
                className="rounded-xl border bg-[rgb(var(--bg-secondary))]"
              >
                <div className="aspect-square p-3 flex items-center justify-center">
                  <img
                    src={produto.imagens[0]}
                    alt={produto.titulo}
                    className="max-h-full object-contain"
                  />
                </div>

                <div className="p-3">
                  <h3 className="text-sm line-clamp-2 min-h-[2.5rem] mb-1">
                    {produto.titulo}
                  </h3>

                  <div className="min-h-[1.5rem]">
                    <span className="text-xs line-through block text-gray-400">
                      R$ {produto.preco.toFixed(2)}
                    </span>
                    <span className="font-semibold text-green-600">
                      R$ {produto.preco_desconto!.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      adicionarProduto(produto, 1)
                    }}
                    className="mt-3 w-full py-2 text-sm font-semibold rounded-lg bg-[rgb(var(--primary))] text-white"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </section>
  )
}
