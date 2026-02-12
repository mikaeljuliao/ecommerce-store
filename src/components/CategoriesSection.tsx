import { getCategorias } from '../services/products'
import CategoryCard from './CategoryCard'

export function CategoriesSection() {
  const categorias = getCategorias()

  return (
    <section
      id="categorias"
      className="max-w-7xl mx-auto px-6 mb-24"
    >
      {/* TÍTULO CENTRALIZADO */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-[rgb(var(--primary))]">
          Explore por categorias
        </h2>

        <p className="mt-2 text-sm text-[rgb(var(--text-muted))]">
          Encontre rapidamente o que você procura
        </p>
      </div>

      {/* GRID CENTRALIZADO */}
      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8">
          {categorias.map((categoria) => (
            <CategoryCard
              key={categoria.slug}
              slug={categoria.slug}
              nome={categoria.nome}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
