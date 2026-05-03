import { useEffect, useState } from "react"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="font-semibold text-lg tracking-tight">
          <span className="text-orange-500">Kirana</span>
          <span className="text-orange-300 ml-1">IQ</span>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#" className="hover:text-black">Features</a>
          <a href="#" className="hover:text-black">How it Works</a>
          <a href="#" className="hover:text-black">Pricing</a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-600 hover:text-black">
            Log in
          </button>

          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition">
            Sign up
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar