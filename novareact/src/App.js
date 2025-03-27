import './App.css';
import HomePage from './page/HomePage';
import Products from './page/Products';
import NotFound from './page/NotFound';
import Secure from './page/Secure';
import Login from './page/Login';
import Example from './page/Example';

import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
function App() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  function logOut() {
    setUser(null);
    navigate("/");
  }
  return (
    <>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>Home</Link>
        <Link to="/Products" style={{ padding: 5 }}>Product</Link>
        <Link to="/Example" style={{ padding: 5 }}>Example</Link>
        <span> | </span>
        {!user && <Link to="/login" style={{ padding: 3 }}>Login</Link>}
        {user && <span onClick={logOut} style={{ padding: 3, cursor: 'pointer' }}>Log out</span>}
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={
          <Secure user={user}><Products /></Secure>
        } />
        <Route path="*" element={<NotFound />} />
        <Route path="/Example" element={<Example />} />
        <Route path="/Login" element={<Login onLogin={setUser} />} />
      </Routes>
    </ >
  );
}

export default App;