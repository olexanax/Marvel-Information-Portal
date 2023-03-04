import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import LiveSearch from "../liveSearch/LiveSearch";

import decoration from '../../resources/img/vision.png';


const MainPage = () => {
    
    const [activeChar, setActiveChar] = useState(null)

    const onUpdateActiveChar = (id) => {
        setActiveChar(id)
    }

    return(
        <>
         <ErrorBoundary>
            <RandomChar/>
        </ErrorBoundary>
        <ErrorBoundary>
            <LiveSearch/>
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
        </>
    )
}

export default MainPage