// src/App.jsx
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import Layout from './Layout/Layout';

import Home from './Routes/Home';
import Detail from './Components/Detail';
import Login from './Routes/Login';
import Register from './Routes/Register';

import AdminPanel from './Routes/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h1>404 not found</h1>} />
            <Route path="/adminpanel" element={<AdminPanel/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
