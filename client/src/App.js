import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AuthRedirect } from './context/ProtectedRoute';
import { Header } from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { UserProfile }  from './pages/UserProfile';
import { Product }  from './pages/Product';
import { Cart }  from './pages/Cart';
import { Order }  from './pages/Order';
import { Policy }  from './pages/Policy';
import { TermsOfService }  from './pages/Terms';
import { NotFoundPage }  from './pages/404';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <AuthProvider>    
      <BrowserRouter>
        <Header/> 
        <Routes>
          <Route exact={true} path="/" element={<Home/>}/>
          <Route exact={true} path="/about" element={<About/>}/>
          <Route exact={true} path="/contact" element={<Contact/>}/>
          <Route exact={true} path="/signup" element={<Signup/>}/>
          <Route exact={true} path="/login" element={<AuthRedirect><Login/></AuthRedirect>}/>
          <Route exact={true} path="/profile" element={ <UserProfile/> }/>
          <Route exact={true} path="/product" element={ <ProtectedRoute><Product/></ProtectedRoute> }/>
          <Route exact={true} path="/cart" element={ <ProtectedRoute><Cart/></ProtectedRoute> }/>
          <Route exact={true} path="/order" element={ <ProtectedRoute><Order/></ProtectedRoute> }/>
          <Route exact={true} path="/privacy-policy" element={<Policy/>}/>
          <Route exact={true} path="/terms-of-services" element={<TermsOfService/>}/>
          <Route exact={true} path="*" element={<NotFoundPage/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
