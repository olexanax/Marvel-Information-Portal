import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SingleItem from "../singleItem/singleItem";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = () => {
    return (
        <>
        <AppBanner/>
        <ErrorBoundary>
            <SingleItem/>
        </ErrorBoundary>
        </>
    )
}
export default SinglePage