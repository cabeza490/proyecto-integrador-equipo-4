import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Routes/Home'
import Detail from './Components/Detail'
import Login from './Routes/Login'

function App() {
  return (
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}> 
            <Route index element= {<Home/>}/>
            <Route path="/detail/:id" element={<Detail/>}/>
            {/* <Route path="/contact" element={<Contact/>}/> */}
            <Route path="*" element={<h1>404 not found</h1>} />
            <Route path="/login" element={<Login/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

  )
  }
export default App
