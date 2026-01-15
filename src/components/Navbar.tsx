import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategorias } from '../services/products'

export function Navbar() {
  const categorias = getCategorias()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 relative z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-xl font-bold text-white tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          Setup<span className="text-blue-500">Store</span>
        </Link>

        {/* DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className="text-zinc-300 hover:text-white transition">
            Home
          </Link>

          {/* DROPDOWN */}
          <div className="relative group">
            <span className="text-zinc-300 hover:text-white cursor-pointer px-2 py-1">
              Categorias
            </span>

            <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl min-w-[220px]">
                <ul>
                  {categorias.map((categoria) => (
                    <li key={categoria.slug}>
                      <a
                        href={`/#${categoria.slug}`}
                        className="block px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
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
            className="hidden md:block relative text-zinc-300 hover:text-white"
          >
            🛒
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
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

      {/* MENU MOBILE (NÃO FULLSCREEN) */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 shadow-lg">

          <div className="px-6 py-5 flex flex-col gap-6">

            {/* LINKS */}
            <nav className="flex flex-col gap-4 text-base font-medium">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link to="/carrinho" onClick={() => setMenuOpen(false)}>
                Carrinho
                <span className="ml-2 text-sm text-zinc-400">(0)</span>
              </Link>
            </nav>

            {/* CATEGORIAS */}
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
                      hover:bg-zinc-700 transition
                    "
                  >
                    {categoria.nome}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  )
}
