import {useState } from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from '../comicsList/ComicsList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [activeChar, setActiveChar] = useState(null)

    const onUpdateActiveChar = (id) => {
        setActiveChar(id)
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onUpdateActiveChar = {onUpdateActiveChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId = {activeChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
                <ComicsList/>
            </main>
        </div>
    )
}

export default App;