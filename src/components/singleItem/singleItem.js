import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import './singleItem.scss';


const SingleItem = (props) => {
    const [itemData, setItemData] = useState()
    const {getComics, getCharacter, process, setProcess} = useMarvelService()
    const {item} = useParams();
    const {itemId} = useParams();
    let navigate = useNavigate()


    useEffect(()=> {
        if(item === 'comics'){
            getComics(itemId)
                .then(res => setItemData(res))
                .then(setProcess('confirmed'))
        }
        if(item === 'characters'){
            getCharacter(itemId)
                .then(res => setItemData(res))
                .then(setProcess('confirmed'))
        }
        // eslint-disable-next-line 
    },[itemId, item])

    const goBack = () => {
        navigate(-1)
    }



    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={itemData && itemData.name ? itemData.name : 'Goods description'}
                    />
                <title>{itemData?.name}</title>
            </Helmet>
            {setContent(process, View, itemData, {item, goBack})}
        </>
    )
}

const View = ({data, props:{item, goBack}}) => {
    return (
        <div className="single-comic">
            <img src={data?.thumbnail} alt={data?.name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">X{data?.name}</h2>
                <p className="single-comic__descr">{data?.description}</p>
                {
                item === 'comics' && 
                <>
                <p className="single-comic__descr">Pages: {data?.pages}</p>
                <p className="single-comic__descr">{data?.language}</p>
                <div className="single-comic__price">{data?.price}</div>
                </>
                }
            </div>
            <div onClick={goBack} className="single-comic__back">Back to all</div>
        </div>
    )
} 

export default SingleItem;
