import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SingleItem from "../singleItem/singleItem";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = () => {
    return (
        <ErrorBoundary>
            <AppBanner/>
            <SingleItem/>
        </ErrorBoundary>
    )
}
export default SinglePage