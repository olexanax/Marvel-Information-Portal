import { Component, useState } from 'react';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

function App () {

    const [activeChar, setActiveChar] = useState(null)

    function onUpdateActiveChar (id) {
        setActiveChar(id)
    }

    // state = {
    //     activeChar: null
    // }

    // onUpdateActiveChar = (id) => {
    //     this.setState({activeChar:id})
    // }
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
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
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
}

export default App;