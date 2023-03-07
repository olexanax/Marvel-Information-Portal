import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/errorMeassge';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (process, Component, data, props) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <Component data={data} props={props}/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state')
    }
}

export default setContent