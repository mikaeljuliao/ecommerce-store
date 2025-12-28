import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header  className="bg-slate-900 text-white p-4">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/carrinho">Carrinho</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
