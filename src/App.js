import './App.css';
import Login from './features/Login/Login';
import Signup from './features/Login/Signup';
import Home from './features/Home/Home';
import { Routes,Route, BrowserRouter, Navigate} from 'react-router-dom';
import AuthContextProvider, { AuthContext } from './store/context/Auth';
import { useContext, useEffect } from 'react';
import LearningApp from './features/Learnings/LearningApp';
import ProtectedRoute from './auth/ProtectedRoute'

function App() {
  const authCtx = useContext(AuthContext);  
  useEffect(()=> {console.log("Authenticateddd")},[authCtx.authToken])
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/learnings" element={<ProtectedRoute><LearningApp /></ProtectedRoute>} />
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
        
          
        
        {/* <Home /> */}
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes> */}
      {/* { !authCtx.isAuthenticated && <Login />}
      { authCtx.isAuthenticated &&  <Home /> } */}
       </AuthContextProvider>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
