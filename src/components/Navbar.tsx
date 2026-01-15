import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategorias } from '../services/products'

export function Navbar() {
  const categorias = getCategorias()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="
        bg-zinc-900 border-b border-zinc-800
        sticky top-0 z-50
        animate-slide-down
      "
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <a
          href="/#home"
          className="
            text-xl font-bold text-white tracking-tight
            hover:opacity-90 transition
          "
          onClick={() => setMenuOpen(false)}
        >
          Setup<span className="text-blue-500">Store</span>
        </a>

        {/* DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm">

          {/* HOME */}
          <a
            href="/#home"
            className="
              text-zinc-300 hover:text-white
              relative after:absolute after:left-0 after:-bottom-1
              after:h-[2px] after:w-0 after:bg-blue-500
              hover:after:w-full after:transition-all
            "
          >
            Home
          </a>

          {/* DROPDOWN CATEGORIAS */}
          <div className="relative group">
            <span
              className="
                text-zinc-300 hover:text-white
                cursor-pointer px-2 py-1
                inline-flex items-center
              "
            >
              Categorias
            </span>

            <div
              className="
                absolute left-0 top-full pt-3
                opacity-0 invisible scale-95
                group-hover:opacity-100 group-hover:visible group-hover:scale-100
                transition-all duration-200 ease-out
                z-50
              "
            >
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl min-w-[220px]">
                <ul>
                  {categorias.map((categoria) => (
                    <li key={categoria.slug}>
                      <a
                        href={`/#${categoria.slug}`}
                        className="
                          block px-4 py-3 text-sm
                          text-zinc-300
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

        {/* AÇÕES */}
        <div className="flex items-center gap-4">

          {/* CARRINHO DESKTOP */}
          <Link
            to="/carrinho"
            className="
              hidden md:block relative
              text-zinc-300 hover:text-white
              transition
            "
          >
            🛒
            <span
              className="
                absolute -top-2 -right-2
                bg-blue-600 text-white text-xs
                w-5 h-5 flex items-center justify-center
                rounded-full
                animate-pulse
              "
            >
              0
            </span>
          </Link>

          {/* BOTÃO MOBILE */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      <div
        className={`
          md:hidden overflow-hidden
          transition-all duration-300 ease-out
          ${menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="bg-zinc-900 border-t border-zinc-800 shadow-lg px-6 py-6 flex flex-col gap-6">

          {/* LINKS */}
          <nav className="flex flex-col gap-4 text-base font-medium">
            <a
              href="/#home"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-400 transition"
            >
              Home
            </a>

            <Link
              to="/carrinho"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-400 transition"
            >
              Carrinho
              <span className="ml-2 text-sm text-zinc-400">(0)</span>
            </Link>
          </nav>

          {/* CATEGORIAS MOBILE */}
          <div>
            <p className="text-xs text-zinc-400 uppercase mb-4">
              Categorias
            </p>

            <div className="grid grid-cols-2 gap-3">
              {categorias.map((categoria) => (
                <a
                  key={categoria.slug}
                  href={`/#${categoria.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="
                    bg-zinc-800 rounded-lg px-4 py-3
                    text-sm text-zinc-200
                    hover:bg-zinc-700 hover:scale-[1.03]
                    transition-transform
                  "
                >
                  {categoria.nome}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}
