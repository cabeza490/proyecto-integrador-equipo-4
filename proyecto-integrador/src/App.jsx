import './App.css'
import Footer from './Components/Footer';
import Navbar from './Components/Navbar'
import Home from './Routes/Home'
import { routes } from './utils/routes'
import { Route, Routes } from "react-router-dom";
=======
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home'


function App() {
  

  return (

    <div className="app">

      <Navbar />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Home/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>


export default App
