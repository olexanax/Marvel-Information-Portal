import { useState, useEffect} from 'react'
import useMarvelService from '../../services/MarvelService'
import useDebounce from '../../hooks/useDebounce'
import { Link } from 'react-router-dom'

import './LiveSearch.scss'

const LiveSearch = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [focus, setFocus] = useState(false)
    const debounce = useDebounce(search, 500)

    const {error, loading, setLoading, clearError, getCharacterStartWith} = useMarvelService()

    useEffect(() => {
        setLoading(false)
        if(debounce){
            if(search){
                getCharacterStartWith(search)
                    .then(res => setData(res))
            }
        }
          clearError()
    },[debounce]);

    const onChange = e => {
        setLoading(true)
        setSearch(e.target.value)
    }

    const renderItems = data => {
        const list =  data.map((char, i) => <li key ={i}>
                                                <Link to={`item/characters/${char.id}`} className='livesearch__char__container'>
                                                    <img src={char.thumbnail} alt="" />
                                                    <span>{char.name}</span>
                                                </Link>
                                            </li>)
        return (
            <ul className="livesearch__chars__container">
               {list}
            </ul> 
        )
    }

    const serverErrorMessage = error ? <p className='error'>something went wrong try again later</p> : null;
    const notFindErrorMessage = search && !data.length && !loading && focus ?  <p className='error'>Can't find anything by your search</p> : null;
    const content = !( error) ? renderItems(data) : null;
    const loadingMessage = loading ? <p>loading...</p> : null;
    
    return (
        <div className='livesearch__container'>
            <form>
                <input 
                    type="text" 
                    value={search} 
                    placeholder='Find a character by name:'
                    onFocus={()=>setFocus(true)} 
                    onBlur={()=>setFocus(false)} 
                    onChange={e => onChange(e)}/>
            </form>
            {loadingMessage}
            {content}
            {serverErrorMessage}
            {notFindErrorMessage}
        </div>
    )
}

export default LiveSearch