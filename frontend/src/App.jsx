import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import BlogList from './pages/BlogList.jsx'
import BlogDetail from './pages/BlogDetail.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const stored = window.localStorage.getItem('theme')
    if (stored) {
      setTheme(stored)
      return
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="mx-auto flex max-w-[1240px] flex-col gap-14 px-6 pb-12 pt-6 max-[720px]:px-4 max-[720px]:pt-4">
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
      <main className="flex flex-col gap-16 max-[1024px]:gap-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
