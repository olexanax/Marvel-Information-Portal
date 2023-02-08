import { Component } from 'react/cjs/react.development';
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        activeChar: null
    }

    onUpdateActiveChar = (id) => {
        this.setState({activeChar:id})
    }

    render(){
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                           <CharList onUpdateActiveChar = {this.onUpdateActiveChar} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId = {this.state.activeChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;