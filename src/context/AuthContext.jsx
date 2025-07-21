import { useContext, useReducer, useEffect, createContext } from "react";

let parsedUser = null;
try {
  const userData = localStorage.getItem("user");
  if (userData) parsedUser = JSON.parse(userData);
} catch (err) {
  console.error("Invalid user JSON in localStorage:", err);
}

const initialState = {
    user: parsedUser,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null
}
const LOGIN_START = 'LOGIN_START';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
export const AuthContext = createContext(initialState);

const authReducer = (state, action) =>{
    switch (action.type) {
        case LOGIN_START:
            return {
                user: null,
                token: null
            };
            
        case LOGIN_SUCCESS:
            return {
                user: action.payload.user,
                token: action.payload.token
            }
        
        case LOGOUT:
            return {
                user: null,
                token: null
            }

        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('token', state.token);
    }, [state]);

    return (
        <AuthContext.Provider value={{ user:state.user, token:state.token, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}