import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Routes/Home'
import Detail from './Components/Detail'

function App() {
  return (
      
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}/>
          <Route path="/" element= {<Home/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>
          {/* <Route path="/contact" element={<Contact/>}/> */}
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </BrowserRouter>

  )
  }
export default App
