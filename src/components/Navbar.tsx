
import { Link } from 'react-router-dom'

export function Navbar() {
  return (
   <header className='bg-zinc-900 border-b border-zinc-900'>
    <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
     
     
        {/* LOGO */}
      <Link
      to="/"
      className='text-xl font-bold text-white tracking-tight'
      >
         Setup<span className="text-blue-500">Store</span>
      </Link>  

      {/* LINKS (DESKTOP) */}
      <nav className='hidden md:flex items-center gap-8 text-sm'>
        
      <Link
      to="/"
      className='text-zinc-300 hover:text-white transition'
      >
        Home
      </Link>

      <Link
      to="/"
      className='text-zinc-300 hover:text-white transition'
      >
         Categorias
      </Link>
      </nav>

      {/* CARRINHO */}
      <Link
      to="/carrinho"
      className='relative text-zinc-300 hover:text-white transition'
      >
        <span className='text-lg'>🛒</span>
         <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs 
            w-5 h-5 flex items-center justify-center rounded-full">
            0
          </span>
      </Link>
    </div>
   </header>
  )
}
