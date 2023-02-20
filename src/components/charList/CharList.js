import {useState, useEffect, useRef} from 'react/cjs/react.development';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMeassge.js';
import './charList.scss';


const CharList = (props) => {

    const [ charList, setCharList] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(210),
        [outOfList, setOutOfList] = useState(false)

    const {loading, error, getAllCharacters}= useMarvelService();


    useEffect(() => {
        onRequest(offset, true);
    }, [])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onLoaded)

    }

    const onLoaded = (res) => {
        setCharList(prev => [...prev, ...res])
        setNewItemLoading(false)
        setOutOfList(res.length<9?true:false)
        setOffset(prev => prev + 9)
    }


    const refsArr = useRef([])

    const focusOnItem = (id) => {
        refsArr.current.forEach(ref => ref.classList.remove('char__item_selected'))
        refsArr.current[id].classList.add('char__item_selected')
        refsArr.current[id].focus()
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i)=> {
            const addStyle = item.thumbnail.indexOf('image_not_available') === -1 ?  null : {objectFit:'contain'};
            return <li onClick={() => {
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
                        key={item.id}
                        ref={elem => refsArr.current[i] = elem}>
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