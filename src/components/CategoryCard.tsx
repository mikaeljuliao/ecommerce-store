import { Link } from 'react-router-dom'
import {
  Gamepad2,
  Cpu,
  Briefcase,
  Package
} from 'lucide-react'

type Props = {
  slug: string
  nome: string
}

export default function CategoryCard({ slug, nome }: Props) {
  const renderIcon = () => {
    switch (slug) {
      case 'gamers':
        return <Gamepad2 size={22} />
      case 'tecnologia':
        return <Cpu size={22} />
      case 'setup':
        return <Briefcase size={22} />
      default:
        return <Package size={22} />
    }
  }

  return (
    <Link
      to={`/categoria/${slug}`}
      className="
        group
        flex items-center gap-4
        h-24 px-5 rounded-xl
        border transition-all duration-200
        bg-[rgb(var(--bg-secondary))]
        border-[rgb(var(--border))]
        hover:border-[rgb(var(--primary))]
        hover:-translate-y-1
      "
    >
      {/* ÍCONE */}
      <div
        className="
          flex items-center justify-center
          w-12 h-12 rounded-lg
          bg-[rgb(var(--bg))]
          border border-[rgb(var(--border))]
          text-[rgb(var(--primary))]
          transition
          group-hover:scale-105
        "
      >
        {renderIcon()}
      </div>

      {/* TEXTO */}
      <div className="flex flex-col">
        <span className="font-semibold leading-tight">
          {nome}
        </span>

        <span className="text-xs text-[rgb(var(--text-muted))]">
          Ver produtos
        </span>
      </div>
    </Link>
  )
}
