import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export function BaseLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
