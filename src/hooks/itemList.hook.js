import { useState, useEffect, useRef} from "react";
import useMarvelService from "../services/MarvelService";

const useItemList = () => {

    const refsArr = useRef([])

    const focusOnItem = (id) => {
        refsArr.current.forEach(ref => ref.classList.remove('char__item_selected'))
        refsArr.current[id].classList.add('char__item_selected')
        refsArr.current[id].focus()
    }

    return {refsArr, focusOnItem}
}

export default useItemList