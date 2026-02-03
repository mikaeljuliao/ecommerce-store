import { Link } from 'react-router-dom'
import { getCategorias } from '../services/products'

export function Footer() {
  const categorias = getCategorias()

  return (
    <footer className="mt-24 border-t border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))]">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* LOGO / DESCRIÇÃO */}
          <div>
            <h3 className="text-xl font-bold text-[rgb(var(--text))] mb-3">
              Setup
              <span className="text-[rgb(var(--primary))]">Store</span>
            </h3>

            <p className="text-sm text-[rgb(var(--text-muted))] leading-relaxed">
              Projeto open source de e-commerce moderno,
              focado em performance, clareza e conversão.
            </p>
          </div>

          {/* CATEGORIAS (IGUAL NAVBAR) */}
          <div>
            <h4 className="font-semibold mb-4">
              Categorias
            </h4>

            <ul className="space-y-2 text-sm">
              {categorias.map(categoria => (
                <li key={categoria.slug}>
                  <Link
                    to={`/categoria/${categoria.slug}`}
                    className="
                      text-[rgb(var(--text-muted))]
                      hover:text-[rgb(var(--primary))]
                      transition
                    "
                  >
                    {categoria.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* INSTITUCIONAL */}
          <div>
            <h4 className="font-semibold mb-4">
              Institucional
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/sobre"
                  className="text-[rgb(var(--text-muted))] hover:text-[rgb(var(--primary))] transition"
                >
                  Sobre nós
                </Link>
              </li>

              <li>
                <Link
                  to="/politica-de-privacidade"
                  className="text-[rgb(var(--text-muted))] hover:text-[rgb(var(--primary))] transition"
                >
                  Política de Privacidade
                </Link>
              </li>

              <li>
                <Link
                  to="/termos-de-uso"
                  className="text-[rgb(var(--text-muted))] hover:text-[rgb(var(--primary))] transition"
                >
                  Termos de Uso
                </Link>
              </li>

              <li>
                <Link
                  to="/trocas-e-devolucoes"
                  className="text-[rgb(var(--text-muted))] hover:text-[rgb(var(--primary))] transition"
                >
                  Trocas e Devoluções
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      
    </footer>
  )
}
