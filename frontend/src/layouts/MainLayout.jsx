import Navbar from "../components/navbar"

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

export default MainLayout