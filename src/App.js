import './App.css';
import Login from './features/Login/Login';
import Signup from './features/Login/Signup';
import Home from './features/Home/Home';
import { Routes,Route, BrowserRouter, Navigate} from 'react-router-dom';
import AuthContextProvider, { AuthContext } from './store/context/Auth';
import { useContext } from 'react';
import LearningApp from './features/Learnings/LearningApp';

export function Root(){
  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="*" element={<Navigate to="/login" />} />
    {/* Protected Routes */}
    {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
      <Route path="/home" element={<Home />} />
    </Route> */}

  </Routes>
}

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/learnings" element={<LearningApp />} />
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
