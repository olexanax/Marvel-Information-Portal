import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { Helmet } from "react-helmet";


const ComicsPage = () => {
    return(
        <>
         <Helmet>
            <meta
                name="description"
                content="Error"
                />
            <title>Comics Page</title>
        </Helmet>
        <ErrorBoundary>
            <AppBanner/>
            <ComicsList/>                    
        </ErrorBoundary>
        </>
    )
}

export default ComicsPage