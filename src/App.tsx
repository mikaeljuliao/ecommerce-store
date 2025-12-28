import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BaseLayout } from './layouts/BaseLayout'
import {Home} from './Pages/Home'
import Product from './Pages/Product'
import Cart from './Pages/Cart'


function App() {
  return (
    <BrowserRouter>
      <BaseLayout>
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/produto/:id" element={<Product />} />
           <Route path="/carrinho" element={<Cart />} />
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  )
}

export default App
