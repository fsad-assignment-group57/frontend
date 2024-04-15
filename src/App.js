import './App.css';
import Login from './features/Login/Login';
import Signup from './features/Login/Signup';
import { Routes,Route} from 'react-router-dom';
import AuthContextProvider from './store/context/Auth';

function App() {
  return (
    <div className="App">
       <AuthContextProvider>
        <Login />
       </AuthContextProvider>
      {/* <Routes>
        <Route path='login' element={<Login />}/>
        <Route path='register' element={<Signup />}/>
      </Routes> */}
    </div>
  );
}

export default App;
