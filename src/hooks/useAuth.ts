//import react, router
import { useContext } from 'react';

//imports objetos do projeto
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {

    const value = useContext(AuthContext);

    return value;
}