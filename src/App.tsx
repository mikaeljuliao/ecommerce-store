import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BaseLayout } from './layouts/BaseLayout'
import Home from './Pages/Home'
import Product from './Pages/Product'
import Cart from './Pages/Cart'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<Product />} />
          <Route path="/carrinho" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
