import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { BaseLayout } from './layouts/BaseLayout'
import { ScrollToTop } from './routes/AppRoutes'

import Home from './Pages/Home'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import { Category } from './Pages/Category'
import Sobre from './Pages/Sobre'
import PoliticaDePrivacidade from './Pages/PoliticaDePrivacidade'
import TermosDeUso from './Pages/TermosDeUso'
import TrocasEDevolucoes from './Pages/TrocasEDevolucoes'

type Theme = 'light' | 'dark'

function App() {
  /* =========================================
     CONTROLE GLOBAL DE TEMA
     FONTE ÚNICA DA VERDADE:
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
      {/* 🔝 garante scroll ao topo em qualquer mudança de rota */}
      <ScrollToTop />

      <Routes>
        <Route
          element={
            <BaseLayout
              theme={theme}
              setTheme={setTheme}
            />
          }
        >
          {/* PÁGINAS PRINCIPAIS */}
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<Product />} />
          <Route path="/carrinho" element={<Cart />} />

          {/* CATEGORIA */}
          <Route path="/categoria/:slug" element={<Category />} />

          {/* =========================
              INSTITUCIONAL
          ========================= */}
          <Route path="/sobre" element={<Sobre />} />
          <Route
            path="/politica-de-privacidade"
            element={<PoliticaDePrivacidade />}
          />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
          <Route
            path="/trocas-e-devolucoes"
            element={<TrocasEDevolucoes />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
