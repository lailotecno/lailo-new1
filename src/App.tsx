import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import SearchProperties from './pages/Search/SearchProperties';
import SearchVehicles from './pages/Search/SearchVehicles';
import FavoriteProperties from './pages/Favorites/FavoriteProperties';
import FavoriteVehicles from './pages/Favorites/FavoriteVehicles';
import Auctioneers from './pages/Auctioneers/Auctioneers';
import Settings from './pages/Settings/Settings';
import Profile from './pages/Settings/Profile';
import Subscription from './pages/Settings/Subscription';
import Alerts from './pages/Settings/Alerts';
import Reports from './pages/Settings/Reports';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Admin from './pages/Admin/Admin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes - without layout */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        
        {/* Main app routes - with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* Simplified search routes */}
          <Route path="/buscador" element={<SearchProperties />} />
          <Route path="/buscador/imoveis" element={<SearchProperties />} />
          <Route path="/buscador/veiculos" element={<SearchVehicles />} />
          
          {/* Simplified favorites routes */}
          <Route path="/favoritos" element={<FavoriteProperties />} />
          <Route path="/favoritos/imoveis" element={<FavoriteProperties />} />
          <Route path="/favoritos/veiculos" element={<FavoriteVehicles />} />
          
          {/* Other routes */}
          <Route path="/leiloeiros" element={<Auctioneers />} />
          
          {/* Settings routes */}
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="/configuracoes/perfil" element={<Profile />} />
          <Route path="/configuracoes/assinatura" element={<Subscription />} />
          <Route path="/configuracoes/alertas" element={<Alerts />} />
          <Route path="/configuracoes/laudos" element={<Reports />} />
          
          {/* Admin route */}
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;