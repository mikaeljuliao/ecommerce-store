import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

type Theme = 'light' | 'dark'

interface BaseLayoutProps {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export function BaseLayout({ theme, setTheme }: BaseLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* NAVBAR */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* CONTEÚDO DAS PÁGINAS */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
