import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import Layout from './Layout/Layout';

import Home from './Routes/Home';
import Detail from './Components/Detail';
import Login from './Routes/Login';
import Register from './Routes/Register';
import AdminPanel from './Routes/AdminPanel';
import CateringContext from './Components/utils/globalContext';

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CateringContext>          
          <Routes>
            <Route path="/" element={<Layout userData={userData} />}>
              <Route index element={<Home />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/login" element={<Login setUserData={setUserData} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/adminpanel" element={<AdminPanel />} />
              <Route path="*" element={<h1>404 not found</h1>} />
            </Route>
          </Routes>
        </CateringContext>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
