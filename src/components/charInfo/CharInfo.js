import { Component } from 'react/cjs/react.development';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMeassge.js';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';


class CharInfo extends Component {

    state = {
        char:null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar()
    }

    componentDidUpdate(prevProps){
        if(this.props.charId !== prevProps.charId){
            this.updateChar()
        }
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false, error: false})
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const {charId} = this.props
        if(!charId){
            return;
        }

        this.onCharLoading()

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render(){
        const {char, loading, error} = this.state;
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

export default CharInfo;