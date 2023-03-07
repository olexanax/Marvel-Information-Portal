import {useState, useEffect } from 'react/cjs/react.development';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
        // eslint-disable-next-line 
    }, [])

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //        updateChar()
    //       }, 5000);
    //       return () => clearInterval(interval);        
    // })
    
    const onCharLoaded = (char) => {
        setChar(char)
        setProcess('confirmed')
    }

    const updateChar = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div onClick={updateChar} className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {
    const {name, wiki, homepage, description, thumbnail} = data;
    const addStyle = thumbnail.indexOf('image_not_available') === -1 ?  null : {objectFit:'contain'};

    return(
        <div className="randomchar__block">
            <img style={addStyle} src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;