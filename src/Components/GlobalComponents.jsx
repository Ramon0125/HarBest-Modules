import React, { createContext, useContext, useState } from 'react';
import Swal from "sweetalert2";


export function IsntEmpty(...values)
{
    return values.every( value => value.trim().length > 0) 
}

export function Alert(result, icon, tim = false, tit = false, sc = false)
{
	return Swal.fire({
		confirmButtonColor: '#28a745',
		showConfirmButton: sc,
		icon: icon,
		title: tit,
		text: result,
		timer: tim
	});
}

export const Res = {
W: 'warning',
S: 'success',
E: 'error',
CTC: 'Complete todos los campos',
EELS: 'Error en la solicitud'
}

export function Responses(data,text)
{
let resp = (data.success === true ? "1" : "0");

switch (resp)
{
	case "0": Alert(text[data.message],text.W,2000); break;	
	case "1": Alert(text[data.message],text.S,2000); break;
};

return data.success == true;
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de login
  const login = () => setIsAuthenticated(true); // Función de login
  const logout = () => setIsAuthenticated(false); // Función de logout

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
  
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };