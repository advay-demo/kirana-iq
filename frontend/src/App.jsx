import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"

function App() {
  return (
    <MainLayout>
      
      <div className="pt-20">
        <Home />
      </div>
    </MainLayout>
  )
}

export default App