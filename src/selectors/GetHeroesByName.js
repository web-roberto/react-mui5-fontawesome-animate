import { useContext } from 'react';
import { heroes } from '../data/heroes';
import { SearchContext } from '../components/search/searchContext';



export const GetHeroesByName = ( name = '') => {
    
    const {setSuccess,setLoading} = useContext( SearchContext );

    console.log('GetHeroesByName called');

    if ( name.length === 0 ) {
        return [];
    }

    name = name.toLowerCase();
    //supuesta lectura del fichero
    setSuccess(true);
    setLoading(false);
    

    return heroes.filter(hero => hero.superhero.toLowerCase().includes(name));

}