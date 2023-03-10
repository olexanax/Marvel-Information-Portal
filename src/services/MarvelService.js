import useHttp from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, setLoading, request, error, process, setProcess, clearError} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'key=eafe08bdabe6fd5319ad6a2bf104349e'
    const _baseCharsOffset = 210;
    const _baseComicsOffset = 100;


    const getAllCharacters  = async (offset = _baseCharsOffset, limit = 9) => {
        const res = await request(`${_apiBase}/characters?limit=${limit}&offset=${offset}&api${_apiKey}`);
        return res.data.results.map(_tranformCharacter)
    }

    const getCharacter  = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?limit=9&offset=210&api${_apiKey}`);
        return _tranformCharacter(res.data.results[0])
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}/characters?name=${name}&api${_apiKey}`);
        if(res.data.results.length === 0){return {name:undefined, id: undefined}}
        return {name: res.data.results[0].name, id: res.data.results[0].id}
    }

    const getCharacterStartWith = async (name) => {
        const res = await request(`${_apiBase}/characters?nameStartsWith=${name}&api${_apiKey}`);
        return res.data.results.map(_tranformCharacter)
    }

    const _tranformCharacter = (char) => {
        return {
            name: (char.name.length > 20) ? `${char.name.slice(0, 22)}...` : char.name,
            description: char.description? `${char.description.slice(0,215)}...`:"There is no description for this character",
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            wiki: char.urls[0].url,
            homepage: char.urls[1].url,
            id: char.id,
            comicsList: char.comics.items.slice(0,10).map(item => ({name: item.name, id: findIComicsId(item.resourceURI)})),
        }
    }

    const getAllComics = async (offset = _baseComicsOffset, limit = 8) => {
        const res = await request(`${_apiBase}/comics?limit=${limit}&offset=${offset}&api${_apiKey}`)
        return res.data.results.map(_tranformComics)
    }

    const getComics  = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?limit=9&offset=210&api${_apiKey}`);
        return _tranformComics(res.data.results[0])
    }

    const _tranformComics = (comics) => {
        return {
            name: comics.title,
            price: comics.prices[0].price ? comics.prices[0].price + '$' :  'NOT AVALIBLE',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            description: comics.description || 'No description',
            pages: comics.pageCount,
            id: comics.id,
            language: comics.textObjects[0]?.language || 'No information about lang'
        }
    }

    const findIComicsId = (str) => {
        const regex = /comics\/(.*)/;
        const match = regex.exec(str);
        return match && match[1];
      }
      

    return{loading, 
            setLoading, 
            error, 
            process, 
            setProcess,
            getCharacter, 
            getAllCharacters, 
            clearError, 
            getAllComics, 
            getComics, 
            getCharacterByName, 
            getCharacterStartWith}
}
export default useMarvelService;

