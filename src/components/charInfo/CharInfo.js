import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
// import SearchChar from '../searchChar/SearchChar';
import './charInfo.scss';


const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {getCharacter, process, setProcess, clearError}= useMarvelService();

    useEffect(() => {
        updateChar()
        // eslint-disable-next-line 
    }, [props.charId])

    const onCharLoaded = (char) => {
        setChar(char)
        setProcess('confirmed')
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
    
    return(
        <div className='char__wrapper'>
            <div className="char__info">
                {setContent(process, View, char)}
            </div>
            {/* <div className="char__information"> //SearchChar component (with Formik)
                <SearchChar/>
            </div> */}
        </div>

    )
}


const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comicsList} = data;
    const addStyle = thumbnail.indexOf('image_not_available') === -1 ?  null : {objectFit:'contain'};
    return(
       <>
        <div className="char__basics">
            <img style={addStyle} src={thumbnail} alt={name}/>
            <div>
                <div className="char__information-name">{name}</div>
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
                        <Link to={`item/comics/${item.id}`}>
                            {item.name}
                        </Link>
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