import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
//Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { onAuthStateChanged } from 'firebase/auth';

import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';


//context
import { AuthProvider } from './context/AuthContext';
import CreatePost from './CreatePost/CreatePost';
import Dashboard from './Dashboard/Dashboard';




function App() {

const [user, setUser] = useState(undefined)
const {auth} = useAuthentication()

const loadingUser = user == undefined

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);  // Verifique se isso está sendo chamado
      setUser(user);  // Atualiza o estado de 'user' com o valor retornado
    });


    return () => unsubscribe();  // Cleanup do listener ao desmontar o componente
  }, [auth]);

if(loadingUser){
  return <p>Carregando...</p>;
}

  return (
    <>
      <div>
        <AuthProvider value={ {user} }>
             <BrowserRouter>
                <NavBar/>
                  <div className="container">
                    <Routes>
                      <Route path="/" element={<Home/>} />
                      <Route path="/about" element={<About/>} />
                      <Route path="/login" element={!user ? <Login/> : <Navigate to= "/"/>} />
                      <Route path="/register" element={!user ? <Register/> : <Navigate to= "/"/>} />
                      <Route path='/posts/create' element={ user? <CreatePost/>: <Navigate to="/login"/>}/> {/*Essas autenticacoes serve para so deixar que o usuario entre em paginas quando estiver logado*/}
                      <Route path='/dashboard' element={user? <Dashboard/>: <Navigate to="/login"/>}/>
                      
                    </Routes>
                  </div>
                <Footer/>
              </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
