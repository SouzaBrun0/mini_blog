import { db } from "../firebase/config";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signOut 
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);  // Controle de desmontagem

    const auth = getAuth();

    // Função para verificar se o componente foi desmontado
    const checkIfIsCancelled = () => {
        if (cancelled) return true;
        return false;
    };

    // Função de criação de usuário
    const createUser = async (data) => {
        if (checkIfIsCancelled()) return; // Não faz nada se o componente for desmontado

        setLoading(true);
        setError(null); // Reseta qualquer erro anterior

        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

            await updateProfile(user, { displayName: data.displayName });

            setLoading(false);
            return user; // Retorna o usuário criado

        } catch (error) {
            console.log(error.message); // Para debugar o erro

            let systemErrorMessage;
            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
            }

            setLoading(false);
            setError(systemErrorMessage); // Define o erro para exibição
        }
    };

    // Função de logout
    const logout = () => {
        if (checkIfIsCancelled()) return; // Não faz nada se o componente for desmontado
        signOut(auth);
    };

    useEffect(() => {
        return () => setCancelled(true); // Define o estado de "cancelled" quando o componente for desmontado
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
    };
};
