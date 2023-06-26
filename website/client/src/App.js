import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss';
import Header from './components/header/Header.js';
import Footer from './components/footer/Footer';
import Home from './components/pages/Home.js';
import Tool from "./components/pages/Tool";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Checkout from "./components/pages/Checkout";
import Offers from "./components/pages/Offers";
import StickyFooter from "./components/pages/StickyFooter";
import Dashboard from "./components/pages/dashboard/Dashboard";

function App() {

  return (
    <Router className="App">
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/tool" element={<Tool/>}/>
        <Route exact path="/offers" element={<Offers/>}/>
        <Route exact path="/sign_in" element={<SignIn/>}/>
        <Route exact path="/sign_up" element={<SignUp/>}/>
        <Route exact path="/checkout" element={<Checkout/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      <StickyFooter/>
    </Router>
  );
}

export default App;
