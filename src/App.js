import './index.css';
import Home from './pages/Home';
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Register from './pages/Register';
import { Route, Routes } from 'react-router-dom';
import Play from './pages/Play';
import Input from './components/Input';
import Footer from './pages/Footer';
import Create from './pages/Create';
import Test from './pages/Test';
import Page from './pages/Page';
import Show from './pages/Show';
import Cart from './pages/Cart';

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/play' element={<Play />} />
        <Route path='/input' element={<Input />} />
        <Route path='/create' element={<Create />} />
        <Route path='/test' element={<Test />} />
        <Route path='/:film' element={<Page />} />
        <Route path='/show' element={<Show />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
