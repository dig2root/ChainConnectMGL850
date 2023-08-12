import { useEffect } from 'react';

export default function PageTitle(title) {
        
    useEffect(() => {
        document.title = title;
        return () => {
            document.title = "Accueil";
        }
    }, [title])

};