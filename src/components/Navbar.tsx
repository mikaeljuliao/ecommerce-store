import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategorias } from '../services/products'

type Theme = 'light' | 'dark'

interface NavbarProps {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export function Navbar({ theme, setTheme }: NavbarProps) {
  const categorias = getCategorias()
  const [menuOpen, setMenuOpen] = useState(false)

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
        transition-colors
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

        {/* DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm">

          {/* HOME */}
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

          {/* DROPDOWN CATEGORIAS */}
          <div className="relative group">
            <span className="cursor-pointer px-2 py-1 inline-flex items-center text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] transition">
              Categorias
            </span>

            <div className="absolute left-0 top-full pt-3 opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all z-50">
              <div className="rounded-xl shadow-xl min-w-[220px] border bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border))]">
                <ul>
                  {categorias.map(categoria => (
                    <li key={categoria.slug}>
                      <a
                        href={`/#${categoria.slug}`}
                        className="block px-4 py-3 text-sm text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--bg))] hover:text-[rgb(var(--text))] transition"
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

          {/* BOTÃO TEMA */}
          <button
            onClick={toggleTheme}
            className="text-lg text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] transition"
            title="Alternar tema"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* CARRINHO DESKTOP */}
          <Link
            to="/carrinho"
            className="hidden md:block relative text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] transition"
          >
            🛒
            <span className="absolute -top-2 -right-2 bg-[rgb(var(--primary))] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              0
            </span>
          </Link>

          {/* BOTÃO MOBILE */}
          <button
            className="md:hidden text-2xl text-[rgb(var(--text))]"
            onClick={() => setMenuOpen(prev => !prev)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="border-t shadow-lg px-6 py-6 flex flex-col gap-6 bg-[rgb(var(--bg-secondary))] border-[rgb(var(--border))]">

          {/* LINKS */}
          <nav className="flex flex-col gap-4 text-base font-medium">
            <a href="/#home" onClick={() => setMenuOpen(false)} className="hover:text-[rgb(var(--primary))] transition">
              Home
            </a>

            <Link to="/carrinho" onClick={() => setMenuOpen(false)} className="hover:text-[rgb(var(--primary))] transition">
              Carrinho
            </Link>
          </nav>

          {/* CATEGORIAS MOBILE */}
          <div>
            <p className="text-xs uppercase mb-4 text-[rgb(var(--text-muted))]">
              Categorias
            </p>

            <div className="grid grid-cols-2 gap-3">
              {categorias.map(categoria => (
                <a
                  key={categoria.slug}
                  href={`/#${categoria.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm bg-[rgb(var(--bg))] text-[rgb(var(--text))] hover:bg-[rgb(var(--primary))] hover:text-white transition-transform hover:scale-[1.03]"
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
