import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMeassge';
import './singleComic.scss';


const SingleComic = (props) => {
    const [comics, setComics] = useState()
    const {loading, error, getComics} = useMarvelService()
    const {comicId} = useParams();

    useEffect(()=> {
        getComics(comicId)
            .then(res => setComics(res))
    },[comicId])

    const spinner = (!comics && !error) || loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = comics ?  
        <div className="single-comic">
            <img src={comics.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">X{comics.name}</h2>
                <p className="single-comic__descr">{comics.description}</p>
                <p className="single-comic__descr">Pages: {comics.pages}</p>
                <p className="single-comic__descr">{comics.language}</p>
                <div className="single-comic__price">{comics.price}$</div>
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

export default SingleComic;