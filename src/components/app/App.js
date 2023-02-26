import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Layout} from '../pages';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(()=>import('../pages/404'));
const MainPage = lazy(()=>import('../pages/MainPage'));
const ComicsPage = lazy(()=>import('../pages/ComicsPage'));
const SinglePage = lazy(()=>import('../pages/SinglePage'));


const App = () => {
    //1 011 345

    return (
        <Router>
            <Suspense fallback={<Spinner/>}>
                <Routes>
                    <Route path ='/' element={<Layout/>}>
                        <Route index element={<MainPage/>}/>
                        <Route path='comics' element={<ComicsPage/>}/>
                        <Route path='comics/:comicId' element={<SinglePage/>}/>
                        <Route path='*' element={<Page404/>}/>
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App;