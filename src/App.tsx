import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/about'
import Contact from './pages/contact'
import Docs from './pages/docs'
import Home from './pages/home'
import NotFound from './pages/not-found'
import Privacy from './pages/privacy'
import Product from './pages/product'
import Work from './pages/work'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/:slug" element={<Product />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
