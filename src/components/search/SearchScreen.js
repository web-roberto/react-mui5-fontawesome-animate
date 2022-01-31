import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string'

import { useForm } from '../../hooks/useForm';
import { GetHeroesByName } from '../../selectors/GetHeroesByName';
import { HeroCard } from '../hero/HeroCard';
import SearchButton from './SearchButton';
import { SearchContext } from './searchContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faBank } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';


import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used

//import { faTwitter, faFontAwesome } from '@fortawesome/free-brand-svg-icons';


export const SearchScreen = () => {
    const { setSuccess,setLoading} = useContext( SearchContext );

    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);
    
    const [ formValues, handleInputChange ] = useForm({
        searchText: q,
    });

    const { searchText } = formValues;

    const heroesFileted = useMemo( () => GetHeroesByName(q), [q] );


    const handleSearch = (e) => {
        e.preventDefault();
        // empieza a buscar
        setLoading(true);
        setSuccess(false);

        navigate(`?q=${ searchText }`)
    }


    return (
        <>
            <h1>Búsquedas</h1>
            <hr />

            <div className="row">

                <div className="col-5">
                    <h4>Buscar</h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="Buscar un héroe"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />
                        
                        
                        
                        <button 
                           // className="btn btn-outline-primary mt-1"
                            type="submit">
                            <SearchButton/>
                        </button> 



                    </form>


                </div>

                <div className="col-7">
                    <h4>Resultados</h4>
                    <h1 class="animate__animated animate__bounce">An animated element</h1>
                    <i class="fa-duotone fa-apartment"></i>
                    <span style={{fontSize: 13 ,color: "Tomato",margin_Top: 20,textAlign: "center" }}>                          
                        <FontAwesomeIcon icon= {faBank} />
                    </span>
                    animate__slideInUp
                    <FontAwesomeIcon icon={faCoffee} fa-solid fa-10x spin/>
                    <FontAwesomeIcon icon= {faBank}  size="6x" border/>
                    <FontAwesomeIcon icon= {faBank}  rotation={90} pull="left" className="highlight"/>
                    <ol class="fa-ul">
    <li><span class="fa-li"><i class="fa-solid fa-check-square"></i></span>List icons can</li>
    <li><span className="fa-li"><i className="fa-solid fa-check-square"></i></span>be used to</li>
    <li><span className="fa-li"><i className="fa-solid fa-spinner fa-pulse"></i></span>replace bullets</li>
    <li><span className="fa-li"><i className="fa-regular fa-square"></i></span>in lists</li>
  </ol>
                    {/* <FontAwesomeIcon icon={faTwitter} /> 
                    <FontAwesomeIcon icon={faFontAwesome}/> */}
                    <hr />

                    {
                        (q === '')
                            ? <div className="alert alert-info"> Buscar un héroe </div>
                            : ( heroesFileted.length === 0 ) 
                                && <div className="alert alert-danger"> No hay resultados: { q } </div>
                    }


                    {
                        heroesFileted.map(hero => (
                            <h1 class="animate__animated animate__bounce">
                                <HeroCard key={ hero.id } { ...hero } />
                            </h1>
                        ))
                    }


                </div>

            </div>

        </>
    )
}
