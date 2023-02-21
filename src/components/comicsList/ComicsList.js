import { useEffect, useState, useRef} from 'react';
import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/errorMeassge';
import Spinner from '../spinner/Spinner';
import './comicsList.scss';


const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]),
    [newItemLoading, setNewItemLoading] = useState(false),
    [offset, setOffset] = useState(100),
    [outOfList, setOutOfList] = useState(false)
    
    const {getAllComics, loading, error} = useMarvelService();

    useEffect(()=> {
        onRequest(offset, true)
    },[])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onLoaded)

    }

    const onLoaded = (res) => {
        setComicsList(prev => [...prev, ...res])
        setNewItemLoading(false)
        setOutOfList(res.length<8?true:false)
        setOffset(prev => prev + 8)
    }

    const refsArr = useRef([])

    const focusOnItem = (id) => {
        refsArr.current.forEach(ref => ref.classList.remove('char__item_selected'))
        refsArr.current[id].classList.add('char__item_selected')
        refsArr.current[id].focus()
    }

    const renderComics = arr => {

        const comics = arr.map((comics, i) => {
            const addStyle = comics.thumbnail.indexOf('image_not_available') === -1 ?  null : {objectFit:'contain'};
            return(
                <li className="comics__item" 
                    key={comics.id}
                    onClick={() => {
                         focusOnItem(i)
                     }}
                     onKeyDown={(e) => {
                        if(e.key === ' ' || e.key === 'Enter'){
                            focusOnItem(i)
                        }
                    }}
                    tabIndex = '0'
                    ref={elem => refsArr.current[i] = elem}>
                    <a href="#">
                        <img src={comics.thumbnail} style={addStyle}alt={comics.name} className="comics__item-img"/>
                        <div className="comics__item-name">{comics.name}</div>
                        <div className="comics__item-price">{comics.price}$</div>
                    </a>
                </li>
            )
        })

        return(
            <ul className="comics__grid">
               {comics}
            </ul>
        )
    }

    const items = renderComics(comicsList);
    const spinner = loading || !comicsList ? <Spinner/> : null;
    const errorMeassge = error ? <ErrorMessage/> : null;
    const endOfListMessage = outOfList ? <p className='char__endMessage'>That's all comics</p> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMeassge}
            {items}
            <button className="button button__main button__long"
                    onClick = {() =>onRequest(offset)}
                    disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
            {endOfListMessage}
        </div>
    )
}

export default ComicsList;