import useMarvelService from '../../services/MarvelService';
import { useState} from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as Error, useFormikContext } from 'formik';
import { object, string } from 'yup';

import ErrorMessage from '../errorMessage/errorMeassge';
import Spinner from '../spinner/Spinner';

import './SearchChar.scss';


const GetContext = ({char, prevSearch}) => {
    const {values} = useFormikContext();
    return(<>
        {char === undefined && prevSearch === values.name &&  <p className ='char__request__text error'>The character was not found. Check the name and try again</p>}
    </>)

}

const SearchChar = () => {
    const [char, setChar] = useState({name:undefined, id:undefined});
    const [prevSearch, setPrevSearch] = useState(null)
    

    const {getCharacterByName, error,  loading, clearError} = useMarvelService()

    return(
        <div className="char__search">
            <div className="char__comicss">Or find a character by name:</div>
            <Formik
                initialValues={{ name: '' }}
                validationSchema = {object({
                    name: string()
                            .required('This field is required')})}
                onSubmit={(values) => getCharacterByName(values.name)
                                        .then(res=>{
                                            setPrevSearch(values.name)
                                            return res})
                                        .then(res => setChar(res))
                }
                validateOnChange={false}
            >
                {({isSubmitting}) => (
                    <Form className="char__search__container">
                    <div className="char__info__raw">
                        <Field className='char__search__input' type="text" name='name' placeholder='Search...'/>
                        <div className="">
                            <a href='# 'className="char__button">
                                <button type='submit' className="char__button main__button" disabled={isSubmitting}>
                                    {loading ? 'loading...' : 'find'}
                                </button>
                            </a>
                    </div>
                    </div>
                    <div className="char__info__raw">
                        {char.name &&
                        <>
                        <p className ='char__request__text success'>There is! Visit {char.name} page?</p>
                        <Link to={`item/characters/${char.id}`} className="char__button secondary__button">
                            <div>to page</div>
                        </Link>
                        </>}
                        <Error className ='char__request__text error' name='name' component='p'/>
                        <GetContext char={char.name} prevSearch={prevSearch}/>
                    </div>
                </Form>
                )}
            </Formik>
        </div> 
    )
}

export default SearchChar