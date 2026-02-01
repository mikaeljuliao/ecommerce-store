import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { BaseLayout } from './layouts/BaseLayout'
import Home from './Pages/Home'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import { Category } from './Pages/Category'

type Theme = 'light' | 'dark'

function App() {
  /* =========================================
     CONTROLE GLOBAL DE TEMA
     A ÚNICA FONTE DA VERDADE:
     - classe .dark no body
  ========================================= */
  const [theme, setTheme] = useState<Theme>('light')

  /* =========================================
     AO INICIAR
     - carrega tema salvo
  ========================================= */
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null

    if (savedTheme === 'dark') {
      document.body.classList.add('dark')
      setTheme('dark')
    } else {
      document.body.classList.remove('dark')
      setTheme('light')
    }
  }, [])

  /* =========================================
     QUANDO O TEMA MUDA
     - atualiza body
     - salva no localStorage
  ========================================= */
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <BaseLayout
              theme={theme}
              setTheme={setTheme}
            />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<Product />} />
          <Route path="/carrinho" element={<Cart />} />

          {/* =========================================
             PÁGINA DE CATEGORIA
             slug vem da URL:
             /categoria/:slug
          ========================================= */}
          <Route path="/categoria/:slug" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
