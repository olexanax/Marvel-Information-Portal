import { Component } from 'react/cjs/react.development';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMeassge.js';

class CharList extends Component {

    state = {
        charList:[],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateList()
    }

    updateList = () => {
        this.marvelService.getAllCharacters()
            .then(res => this.setState({charList: res, loading: false}))
            .catch(() => this.setState({error: true, loading: false}))
    }

    renderItems = (arr) => {
        const items = arr.map((item)=> {
            const addStyle = item.thumbnail.indexOf('image_not_available') === -1 ?  null : {objectFit:'contain'};
            return <li onClick = {() => this.props.onUpdateActiveChar(item.id)} 
                        className="char__item" 
                        key={item.id}>
                    <img src={item.thumbnail} style = {addStyle} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                </li>
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
   render(){
    const {charList, loading, error} = this.state
    const items = this.renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
   }
}

export default CharList;