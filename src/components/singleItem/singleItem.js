import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMeassge';
import './singleItem.scss';


const SingleItem = (props) => {
    const [itemData, setItemData] = useState()
    const {loading, error, getComics, getCharacter} = useMarvelService()
    const {item} = useParams();
    const {itemId} = useParams();


    useEffect(()=> {
        if(item === 'comics'){
            getComics(itemId)
                .then(res => setItemData(res))
        }
        if(item === 'characters'){
            getCharacter(itemId)
                .then(res => setItemData(res))
        }

    },[itemId, item])

    const spinner = (!itemData && !error) || loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = itemData ?  
        <div className="single-comic">
            <img src={itemData.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">X{itemData.name}</h2>
                <p className="single-comic__descr">{itemData.description}</p>
                {
                item === 'comics' && 
                <>
                <p className="single-comic__descr">Pages: {itemData.pages}</p>
                <p className="single-comic__descr">{itemData.language}</p>
                <div className="single-comic__price">{itemData.price}</div>
                </>
                }
            </div>
            <Link to ='/comics' className="single-comic__back">Back to all</Link>
        </div> : null;

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

export default SingleItem;