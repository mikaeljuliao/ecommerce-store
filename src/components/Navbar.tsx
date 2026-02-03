import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategorias } from '../services/products'
import { useCart } from '../context/CartContext'

type Theme = 'light' | 'dark'

interface NavbarProps {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export function Navbar({ theme, setTheme }: NavbarProps) {
  const categorias = getCategorias()
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItens } = useCart()

  function toggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <header
      className="
        sticky top-0 z-50 border-b
        animate-slide-down
        bg-[rgb(var(--bg-secondary))]
        border-[rgb(var(--border))]
      "
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <a
          href="/#home"
          onClick={() => setMenuOpen(false)}
          className="text-xl font-bold tracking-tight text-[rgb(var(--text))] hover:opacity-80 transition"
        >
          Setup
          <span className="text-[rgb(var(--primary))]">Store</span>
        </a>

        {/* NAV DESKTOP */}
        <nav className="hidden md:block" aria-label="Menu principal">
          <ul className="flex items-center gap-8 text-sm">

            {/* HOME */}
            <li>
              <a
                href="/#home"
                className="
                  relative
                  text-[rgb(var(--text-muted))]
                  hover:text-[rgb(var(--text))]
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0
                  after:bg-[rgb(var(--primary))]
                  hover:after:w-full
                  after:transition-all
                "
              >
                Home
              </a>
            </li>

            {/* CATEGORIAS */}
            <li className="relative group">
              <span className="cursor-pointer px-2 py-1 inline-flex items-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] transition">
                Categorias
              </span>

              <div className="absolute left-0 top-full pt-3 opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all z-50">
                <ul className="rounded-xl shadow-xl min-w-[220px] border bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border))]">
                  {categorias.map(categoria => (
                    <li key={categoria.slug}>
                      <Link
                        to={`/categoria/${categoria.slug}`}
                        className="block px-4 py-3 text-sm text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--bg))] hover:text-[rgb(var(--text))] transition"
                      >
                        {categoria.nome}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* SOBRE */}
            <li>
              <Link
                to="/sobre"
                className="
                  text-[rgb(var(--text-muted))]
                  hover:text-[rgb(var(--text))]
                  transition
                "
              >
                Sobre
              </Link>
            </li>

          </ul>
        </nav>

        {/* AÇÕES */}
        <div className="flex items-center gap-4">

          {/* TEMA */}
          <button
            onClick={toggleTheme}
            className="text-lg text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] transition"
            title="Alternar tema"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* CARRINHO */}
          <Link
            to="/carrinho"
            className="hidden md:block relative text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] transition"
          >
            🛒
            {totalItens > 0 && (
              <span
                className="
                  absolute -top-2 -right-2
                  bg-[rgb(var(--primary))]
                  text-white text-xs
                  w-5 h-5
                  flex items-center justify-center
                  rounded-full
                "
              >
                {totalItens}
              </span>
            )}
          </Link>

          {/* MENU MOBILE */}
          <button
            className="md:hidden text-2xl text-[rgb(var(--text))]"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Abrir menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* NAV MOBILE */}
      <nav
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-label="Menu mobile"
      >
        <ul className="border-t shadow-lg px-6 py-6 flex flex-col gap-6 bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border))]">

          <li>
            <a
              href="/#home"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[rgb(var(--primary))] transition"
            >
              Home
            </a>
          </li>

          <li>
            <Link
              to="/sobre"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[rgb(var(--primary))] transition"
            >
              Sobre
            </Link>
          </li>

          <li>
            <Link
              to="/carrinho"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[rgb(var(--primary))] transition"
            >
              Carrinho
              {totalItens > 0 && (
                <span className="ml-2 text-xs font-bold text-[rgb(var(--primary))]">
                  ({totalItens})
                </span>
              )}
            </Link>
          </li>

          {/* CATEGORIAS MOBILE */}
          <li>
            <p className="text-xs uppercase mb-4 text-[rgb(var(--text-muted))]">
              Categorias
            </p>

            <ul className="grid grid-cols-2 gap-3">
              {categorias.map(categoria => (
                <li key={categoria.slug}>
                  <Link
                    to={`/categoria/${categoria.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm bg-[rgb(var(--bg))] hover:bg-[rgb(var(--primary))] hover:text-white transition"
                  >
                    {categoria.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

        </ul>
      </nav>
    </header>
  )
}
