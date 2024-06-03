import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import PasswordResetRequest from './components/PasswordResetRequest'
import PasswordReset from './components/PasswordReset'
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoutes'

function App() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/' || location.pathname === '/cadastro' || location.pathname.includes('redefinicao_de_senha')
  // mostra a navbar se não for página de login ou cadastro

  return (
    <div>
      {hideNavbar ? null : <Navbar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastro' element={<Register />} />
        <Route path='/requisicao/redefinicao_de_senha' element={<PasswordResetRequest />} />
        <Route path='/redefinicao_de_senha/:token' element={<PasswordReset />} />

        {/* rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path='/inicio' element={<Home />} />
          <Route path='/sobre' element={<About />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App