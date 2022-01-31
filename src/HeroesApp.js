import { useEffect, useReducer,useState } from 'react';
import { AuthContext } from './auth/authContext';
import { authReducer } from './auth/authReducer';
import { SearchContext } from './components/search/searchContext';
import { AppRouter } from './routers/AppRouter';
//Sweet Alert 2
import SweetAlert from 'sweetalert2-react';
//import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used;
//import { solid, fafileplus} from '@fortawesome/free-solid-svg-icons';






const init = () => {
    return JSON.parse( localStorage.getItem('user') ) || { logged: false };
}

export const HeroesApp = () => {

    const [ user, dispatch ] = useReducer( authReducer, {}, init );
  //  const [searching, dispatchSearch ] = useReducer( searchReducer, {}, init );
 
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if ( !user ) return;

        localStorage.setItem('user', JSON.stringify(user) );
    }, [ user ])

   

    return (
        <>
        <SweetAlert
        show="true"
        title="Demo"
        text="SweetAlert in React"
        />
        <AuthContext.Provider value={{user,dispatch}}>
        <SearchContext.Provider value={{loading,success,setSuccess,setLoading}}>       
                           <AppRouter />
        </SearchContext.Provider>
        </AuthContext.Provider>
        </>
    )
}
