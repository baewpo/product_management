import { ReactElement, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/common/layout';
import Home from './pages/home';
import Login from './pages/login';
import Navbar from './components/common/navigationBar'; 
import PageNotFound from './pages/not-found/PageNotFound';
import AddProduct from './pages/addProduct';

function Router(): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
  };

  return (
    <div className="app min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> {/* Pass isLoggedIn state and onLogout function to Navbar */}
      <Routes>
        {/* Route with Layout */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login onLogin={handleLogin} />} /> {/* Pass onLogin function to Login component */}
          <Route path="/add-product" element={<AddProduct />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Router;
