import { Component } from 'react/cjs/react.development';
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
        //// using localStorage
        userScrollIndex:0
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateList()

        //// using localStorage

        // const i = localStorage.getItem('userScrollIndex');
        // console.log(i)
        // console.log(typeof(i))
        // let j = 0
        // const test = async () => {
        //     await this.addNewChars()
        //     j++
        //     if(j<i){
        //         test()
        //     }
        // }
        // test()


        //update list by scroll

        // window.addEventListener('scroll', ()=>{
        //    if (document.body.offsetHeight < window.scrollY + document.documentElement.clientHeight ){
        //         this.addNewChars()
        //    }
        // })
    }

    componentWillUnmount(){
        //update list by scroll

        // window.removeEventListener('scroll', ()=>{
        //     if (document.body.offsetHeight === window.scrollY + document.documentElement.clientHeight ){
        //          this.addNewChars()
        //     }
        //  })
    }

    updateList = () => {
        this.marvelService.getAllCharacters()
            .then(res => this.setState({charList: res, loading: false}))
            .catch(() => this.setState({error: true, loading: false}))
    }

    addNewChars = async() => {                                                                    //// using localStorage
        await this.setState({newItemLoading:true, offset: this.state.offset + 9, userScrollIndex: this.state.userScrollIndex +1})
        await this.marvelService.getAllCharacters(this.state.offset)
            .then(res => {this.setState({charList: [...this.state.charList, ...res],
                                        newItemLoading:false,
                                        outOfList:res.length<9?true:false})})
            .then(()=> localStorage.setItem('userScrollIndex', this.state.userScrollIndex))
            .catch(() => this.setState({error: true, loading: false, newItemLoading:false}))
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
                <button onClick = {this.addNewChars}
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

export default CharList;