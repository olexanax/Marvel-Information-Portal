import {useState, useEffect } from 'react/cjs/react.development';
import PropTypes from 'prop-types'; // ES6
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMeassge.js';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError}= useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        const {charId} = props
        if(!charId){
            return;
        }
        
        clearError()
        getCharacter(charId)
        .then(onCharLoaded)
    }

    const skeleton = !(loading || error || char) ? <Skeleton/> : null
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    
    return(
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>

    )
}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comicsList} = char
    const addStyle = thumbnail.indexOf('image_not_available') === -1 ?  null : {objectFit:'contain'};
    return(
       <>
        <div className="char__basics">
            <img style={addStyle} src={thumbnail} alt={name}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comicsList.length === 0? "Can't find emy comics with this character" : null}
            {comicsList.map((item, i) => {
                return(
                    <li className="char__comics-item" key={i}>
                        {item}
                    </li>
                )
            })}
        </ul>
       </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;