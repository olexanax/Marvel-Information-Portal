import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SingleComic from "../singleComic/SingleComic";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = () => {
    return (
        <ErrorBoundary>
            <AppBanner/>
            <SingleComic/>
        </ErrorBoundary>
    )
}
export default SinglePage