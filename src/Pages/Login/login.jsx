import React, { useState, useEffect, useRef } from "react";
import { Res, IsntEmpty, Alert, Responses } from "../../Components/GlobalComponents";
import axios from 'axios';
import './LoginStyles.css';
import Logo from './Logo.png';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/AuthContext";


function Login() 
{
    const Navigate = useNavigate();
    const { Login } = useAuth();

    let [IsLoad,SetIsLoading] = useState(true);

    const handleStateLoad = () => { SetIsLoading(false); }

    useEffect(() => {
        window.addEventListener('load', handleStateLoad);
    
        return () => { window.removeEventListener('load', handleStateLoad); };
    }, []);
    

    const User = useRef(null);
    const [FocusUser, SetFocusUser] = useState(false);

    const pass = useRef(null);
    const [FocusPass, SetFocusPass] = useState(false);
    const [PassType, SetPassType] = useState('password')

    const HandlerBlur = (event) => {  event.target.id === 'User' ? SetFocusUser(IsntEmpty(User.current.value)) : SetFocusPass(IsntEmpty(pass.current.value)); }
    const HandlerFocus = (event) => { event.target.id === 'User' ? SetFocusUser(true) : SetFocusPass(true);}
    const HandleCheck = () => { SetPassType(PassType === 'password' ? 'text' : 'password')}

    const SignIn = async (event) => {  
        
        event.preventDefault();

        const UserValue = User.current.value;
        const PassValue = pass.current.value;

        if (IsntEmpty(UserValue, PassValue)) 
        {
            axios
              .get(`http://localhost:5158/api/Login/User/${UserValue}&${PassValue}`)
              .then(({ data }) => { 
                                    if(Responses(data,{...Res,ECI: 'Usuario o contrasena incorrecta', SIC: 'Sesion iniciada correctamente'}))
                                    { Login();  Navigate('/HomePortal'); }
                                  })
              .catch((err) => { console.log(err); });
        } 
        else { Alert(Res.CTC, Res.W, 2000); }
        
    }

    return (

        <main>
            <div id="carga" className={ IsLoad ? 'loading' : 'hide'}>
                <div className="spin" />
            </div>

            <div id="formWrapper" className="shadow-lg">
                <form id="form">
                    <div className="logo">
                        <img src={Logo} id="im" alt="HarBest Cloud" />
                    </div>

                    <div className="form-item a">
                        <label 
                            htmlFor="User" 
                            className={`formLabel ${FocusUser ? 'FormTop' : ''}`}>Usuario</label>
                        
                        <input 
                            id='User'
                            ref={User}
                            onFocus={HandlerFocus}
                            onBlur={HandlerBlur}
                            type="User" 
                            className="form-style" 
                            maxLength="50" 
                            autoComplete="User"
                        />
                    </div>
       
                    <div className="form-item">
                        <label 
                            htmlFor="password" 
                            className={`formLabel ${FocusPass ? 'FormTop' : ''}`}>Contraseña</label>

                        <input 
                            id="password" 
                            type={PassType} 
                            ref={pass}
                            onFocus={HandlerFocus}
                            onBlur={HandlerBlur}
                            maxLength="20" 
                            className="form-style" 
                            autoComplete="current-password"
                        />
                    </div>
 
                    <div className="form-check">                       
                        <input 
                            id="Visor" 
                            className="form-check-input" 
                            type="checkbox" 
                            onClick={HandleCheck} 
                        />

                        <label htmlFor="Visor" className="cp"> Mostrar contraseña </label>

                    </div>

                    <div className="form-item">
                        <input 
                            type="submit" 
                            className="login pull-right" 
                            value="Iniciar Sesión" 
                            onClick={SignIn}
                        />    
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Login