import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {MainPage, ComicsPage, SinglePage, Page404, Layout} from '../pages';

const App = () => {

    return (
        <Router>
                <Routes>
                    <Route path ='/' element={<Layout/>}>
                        <Route index element={<MainPage/>}/>
                        <Route path='comics' element={<ComicsPage/>}/>
                        <Route path='comics/:comicId' element={<SinglePage/>}/>
                        <Route path='*' element={<Page404/>}/>
                    </Route>
                </Routes>
        </Router>
    )
}

export default App;