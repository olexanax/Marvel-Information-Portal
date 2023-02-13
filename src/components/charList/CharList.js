import { Component } from 'react/cjs/react.development';
import PropTypes from 'prop-types'; // ES6
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMeassge.js';

class CharList extends Component {

    state = {
        charList:[],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        outOfList: false,
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.onRequest()
    }

    componentWillUnmount(){
    }

    onRequest = async () => {
        this.setState({newItemLoading:true})
        this.marvelService.getAllCharacters(this.state.offset)
            .then(this.onLoaded)
            .catch(this.onError)
    }

    onLoaded = (res) => {
        this.setState({charList: [...this.state.charList, ...res],
            newItemLoading:false,
            loading:false,
            outOfList:res.length<9?true:false,
            offset: this.state.offset + 9})
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
            newItemLoading:false
        })
    }

    refsArr = []

    setRefsOnArr = elem => {
        this.refsArr.push(elem)
    }

    focusOnItem = (id) => {
        this.refsArr.forEach(ref => ref.classList.remove('char__item_selected'))
        this.refsArr[id].classList.add('char__item_selected')
        this.refsArr[id].focus()
    }


    renderItems = (arr) => {
        const items = arr.map((item, i)=> {
            const addStyle = item.thumbnail.indexOf('image_not_available') === -1 ?  null : {objectFit:'contain'};
            return <li  onClick={() => {
                            this.props.onUpdateActiveChar(item.id);
                            this.focusOnItem(i)
                        }}
                        onKeyDown={(e) => {
                            if(e.key === ' ' || e.key === 'Enter'){
                                this.focusOnItem(i)
                                this.props.onUpdateActiveChar(item.id)
                            }
                        }}
                        tabIndex = '0'
                        className="char__item" 
                        key={item.id}
                        ref={this.setRefsOnArr}>
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
    const {charList, loading, error, outOfList} = this.state
    const items = this.renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;
    const andOfListMessage = outOfList ? <p className='char__endMessage'>That's all characters</p> : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button onClick = {this.onRequest}
                        className="button button__main button__long"
                        disabled = {this.state.newItemLoading}
                        style={{display: outOfList?'none':'block'}}>
                    <div className="inner">load more</div>
                </button>
                {andOfListMessage}
            </div>
        )
   }
}

CharList.propTypes ={
    onUpdateActiveChar: PropTypes.func.isRequired
}

export default CharList;