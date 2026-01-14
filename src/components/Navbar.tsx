import { Link } from 'react-router-dom'
import { getCategorias } from '../services/products'

export function Navbar() {
  const categorias = getCategorias()

  return (
    <header className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-xl font-bold text-white tracking-tight"
        >
          Setup<span className="text-blue-500">Store</span>
        </Link>

        {/* LINKS (DESKTOP) */}
        <nav className="hidden md:flex items-center gap-8 text-sm">

          <Link
            to="/"
            className="text-zinc-300 hover:text-white transition"
          >
            Home
          </Link>

          {/* DROPDOWN CATEGORIAS */}
          <div className="relative group">

            <span
              className="
                text-zinc-300 hover:text-white transition
                cursor-pointer px-2 py-1
              "
            >
              Categorias
            </span>

            <div
              className="
                absolute left-0 top-full pt-3
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-200
                z-50
              "
            >
              <div
                className="
                  bg-zinc-900 border border-zinc-800
                  rounded-xl shadow-xl
                  min-w-[220px]
                  overflow-hidden
                "
              >
                <ul className="flex flex-col">
                  {categorias.map((categoria) => (
                    <li key={categoria.slug}>
                      <a
                        href={`/#${categoria.slug}`}
                        className="
                          block px-4 py-3
                          text-sm text-zinc-300
                          hover:bg-zinc-800 hover:text-white
                          transition
                        "
                      >
                        {categoria.nome}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </nav>

        {/* CARRINHO */}
        <Link
          to="/carrinho"
          className="relative text-zinc-300 hover:text-white transition"
        >
          <span className="text-lg">🛒</span>

          <span
            className="
              absolute -top-2 -right-2
              bg-blue-600 text-white text-xs
              w-5 h-5 flex items-center justify-center
              rounded-full
            "
          >
            0
          </span>
        </Link>

      </div>
    </header>
  )
}
