import { useState} from 'react';
import useMarvelService from '../../services/MarvelService';

import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as ErrorMessageFormik, useFormikContext } from 'formik';
import { object, string } from 'yup';

import './SearchChar.scss';


const Errors = ({char, prevSearch, error, setChar}) => {
    const {values, errors} = useFormikContext();
    if(errors.name && char.name){setChar({name:undefined, id:undefined})}
    return(<>
        {error && <p className ='char__request__text error'>Sometging is wrong, please again try later</p>}

        {char.name === undefined && prevSearch === values.name &&  <p className ='char__request__text error'>The character  not found. Check the name and try again</p>}
        {char.name &&
            <>
            <p className ='char__request__text success'>There is! Visit {char.name} page?</p>
            <Link to={`item/characters/${char.id}`} className="char__button secondary__button">
                <div>to page</div>
            </Link>
            </>}
        </>)

}

const SearchChar = () => {
    const [char, setChar] = useState({name:undefined, id:undefined});
    const [prevSearch, setPrevSearch] = useState(null)
    const {getCharacterByName, error,  loading, clearError} = useMarvelService()

    const updateData = (values) => {
        getCharacterByName(values.name)
            .then(res=>{
                setPrevSearch(values.name)
                return res})
            .then(res => setChar(res))
        clearError()
    }
    return(
        <div className="char__search">
            <div className="char__comicss">Or find a character by name:</div>
            <Formik
                initialValues={{ name: '' }}
                validationSchema = {object({
                    name: string()
                            .required('This field is required')
                            .matches(/^[A-Za-z]+$/, 'Language must only contain english letters')})}
                onSubmit={(values) => updateData(values)
                }
                validateOnChange={false}
            >
                <Form className="char__search__container">
                    <div className="char__info__raw">
                        <Field className='char__search__input' type="text" name='name' placeholder='Search...'/>
                        <div className="">
                            <button type='submit' className= 'char__button main__button' disabled={loading}>
                                {loading ? 'loading...' : 'find'}
                            </button>
                    </div>
                    </div>
                    <div className="char__info__raw">
                        <ErrorMessageFormik className ='char__request__text error' name='name' component='p'/>
                        <Errors char={char} setChar={setChar} prevSearch={prevSearch} error={error}/>
                    </div>
                </Form>
            </Formik>
        </div> 
    )
}

export default SearchChar