import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home'

function App() {
  

  return (
    <BrowserRouter>
          <Routes>
              <Route path="/" element= {<Home/>}/>
              <Route path="/detail/:id" element={<Detail/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="*" element={<h1>404 not found</h1>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
