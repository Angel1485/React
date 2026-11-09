import './App.css'
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Perfil from './page/Perfil';
import Login from './page/Login';
import Registrar from './page/Registrar';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element = {<Login />} />
          <Route element = {<ProtectedRoute/>} >
            <Route  path = "/perfil" element ={<Perfil/>}/>
          </Route>
          <Route path="*" element = {<Navigate to="/login" replace/>} />
          <Route path="/registrar" element={<Registrar/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
