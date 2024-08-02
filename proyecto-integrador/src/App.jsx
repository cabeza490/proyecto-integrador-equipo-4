
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Routes/Home'
import { routes } from './utils/routes'
import { Route, Routes } from "react-router-dom";

function App() {
  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={routes.home} element={<Home />} />
      </Routes>
     
    </div>
  )
}

export default App
