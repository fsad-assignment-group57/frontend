import React, { useContext} from 'react'
import {Navigate} from 'react-router-dom';
import { AuthContext } from '../store/context/Auth';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);
  
    return isAuthenticated === true ? children : <Navigate to="/login" replace />;
  }

export default ProtectedRoute