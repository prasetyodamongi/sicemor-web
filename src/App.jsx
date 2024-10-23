import './App.css'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import logo from './assets/image_sicemor.png'
import { Route, Routes } from 'react-router-dom';

function App() {

  const handleClickLogin = () => {
    alert('Fitur login belum tersedia!')
  }

  return (
    <>
      <div className='container'>
        <header className='header'>
          <img src={logo} className='logo'></img>
          <button className='login-button' onClick={handleClickLogin}>
            Login
          </button>
        </header>
        <Routes>
          <Route path='/kuisioner' element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path='/' element={<Home />} />
        </Routes>
        <footer className='footer'>Copyright © 2023 Universitas Trinita</footer>
      </div>
    </>
  );
}

export default App
