import {useState, useEffect, useRef} from 'react/cjs/react.development';
import useMarvelService from '../../services/MarvelService';
import useItemList from '../../hooks/itemList.hook';

import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMeassge.js';
import './charList.scss';


const CharList = (props) => {

    const [ charList, setCharList] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(210),
        [outOfList, setOutOfList] = useState(false)

    const {loading, error, getAllCharacters}= useMarvelService();
    const {refsArr, focusOnItem} = useItemList()

    useEffect(()=> {
        const limit = getItemsCount() || 9
        onRequest(offset, limit ,true)
        return () => {
        }
    },[])

    const onRequest = (offset, limit, initial) => {
        initial ? setNewItemLoading(false)  : setNewItemLoading(true);
        getAllCharacters(offset, limit)
            .then(onLoaded)

    }

    const onLoaded = (res) => {
        setCharList(prev => [...prev, ...res])
        setNewItemLoading(false)
        setOutOfList(res.length<8?true:false)
        setOffset(prev => prev + 8)
        setItemsCount(res)
    }

    const setItemsCount = (res) => {
        localStorage.setItem('totalChars', charList.length + res.length)
    }
    const getItemsCount = () => {
        return localStorage.getItem('totalChars') !== 0 ? +localStorage.getItem('totalChars') : 9
    }


    const renderItems = (arr) => {
        const items = arr.map((item, i)=> {
            const addStyle = item.thumbnail.indexOf('image_not_available') === -1 ?  null : {objectFit:'contain'};
            return <CSSTransition timeout={500} classNames='char__item'>
                <li onClick={() => {
                           props.onUpdateActiveChar(item.id);
                            focusOnItem(i)
                        }}
                        onKeyDown={(e) => {
                            if(e.key === ' ' || e.key === 'Enter'){
                                focusOnItem(i)
                                props.onUpdateActiveChar(item.id)
                            }
                        }}
                        tabIndex = '0'
                        className="char__item" 
                        key={i}
                        ref={elem => refsArr.current[i] = elem}>
                    <img src={item.thumbnail} style = {addStyle} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                </li>
            </CSSTransition>
        })

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }


    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const endOfListMessage = outOfList ? <p className='char__endMessage'>That's all characters</p> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button onClick = {() => onRequest(offset)}
                    className="button button__main button__long"
                    disabled = {newItemLoading}
                    style={{display: outOfList?'none':'block'}}>
                <div className="inner">load more</div>
            </button>
            {endOfListMessage}
        </div>
    )
}

CharList.propTypes ={
    onUpdateActiveChar: PropTypes.func.isRequired
}

export default CharList;