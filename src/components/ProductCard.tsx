import { Link } from 'react-router-dom'
import type { Product } from '../types/Product'

type Props = {
  produto: Product
}

export default function ProductCard({ produto }: Props) {
  return (
    <Link
      to={`/produto/${produto.id}`}
      className="
        w-[220px]
        shrink-0
        rounded-xl overflow-hidden group
        border bg-[rgb(var(--bg-secondary))]
        border-[rgb(var(--border))]
        transition-all duration-200
        hover:-translate-y-1
        hover:border-[rgb(var(--primary))]
      "
    >
      {/* IMAGEM */}
      <div className="aspect-square flex items-center justify-center p-3">
        <img
          src={produto.imagens[0]}
          alt={produto.titulo}
          className="
            max-h-full max-w-full object-contain
            transition-transform duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* INFO */}
      <div className="p-3 flex flex-col justify-between h-[110px]">
        <h3 className="text-xs font-medium leading-snug line-clamp-2">
          {produto.titulo}
        </h3>

        <div className="mt-2">
          {produto.preco_desconto && (
            <span className="text-[11px] text-[rgb(var(--text-muted))] line-through block">
              R$ {produto.preco.toFixed(2)}
            </span>
          )}

          <span className="text-base font-bold text-[rgb(var(--success))]">
            R$ {(produto.preco_desconto ?? produto.preco).toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  )
}
