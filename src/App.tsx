import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Product from './pages/product'
import Work from './pages/work'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}
