
import './App.css'
import Footer from './Components/Footer';
import Navbar from './Components/Navbar'
import Home from './Routes/Home'
import { routes } from './utils/routes'
import { Route, Routes } from "react-router-dom";

function App() {
  

  return (
    <div className="app">
      <Navbar />
      
        <Routes>
          <Route path={routes.home} element={<Home />} />
        </Routes>
     
      <Footer />
    </div>
  )
}

export default App
