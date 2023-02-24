import { useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import useItemList from '../../hooks/itemList.hook';

import ErrorMessage from '../errorMessage/errorMeassge';
import Spinner from '../spinner/Spinner';
import './comicsList.scss';


const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(17),
        [outOfList, setOutOfList] = useState(false);

    const {getAllComics, loading, error} = useMarvelService();
    const {refsArr, focusOnItem} = useItemList()

    useEffect(()=> {
        const limit = getItemsCount() || 8
        onRequest(offset, limit ,true)
        return () => {
        }
    },[])

    const onRequest = (offset, limit, initial) => {
        initial ? setNewItemLoading(false)  : setNewItemLoading(true);
        getAllComics(offset, limit)
            .then(onLoaded)

    }

    const onLoaded = (res) => {
        setComicsList(prev => [...prev, ...res])
        setNewItemLoading(false)
        setOutOfList(res.length<8?true:false)
        setOffset(prev => prev + 8)
        setItemsCount(res)
    }

    const setItemsCount = (res) => {
        localStorage.setItem('totalComics', comicsList.length + res.length)
    }
    const getItemsCount = () => {
        return localStorage.getItem('totalComics') !== 0 ? +localStorage.getItem('totalComics') : 8
    }


    const renderItems = arr => {

        const comics = arr.map((comics, i) => {
            const addStyle = comics.thumbnail.indexOf('image_not_available') === -1 ?  null : {objectFit:'contain'};
            return(
                <li className="comics__item" 
                    key={i}
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
                    <Link to={`/comics/${comics.id}`}>
                        <img src={comics.thumbnail} style={addStyle}alt={comics.name} className="comics__item-img"/>
                        <div className="comics__item-name">{comics.name}</div>
                        <div className="comics__item-price">{comics.price}$</div>
                    </Link>
                </li>
            )
        })

        return(
            <ul className="comics__grid">
               {comics}
            </ul>
        )
    }

    const items = renderItems(comicsList);
    const spinner = loading || !comicsList ? <Spinner/> : null;
    const errorMeassge = error ? <ErrorMessage/> : null;
    const endOfListMessage = outOfList ? <p className='char__endMessage'>That's all comics</p> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMeassge}
            {items}
            <button className="button button__main button__long"
                    onClick = {() =>onRequest(offset, 8)}
                    disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
            {endOfListMessage}
        </div>
    )
}

export default ComicsList;