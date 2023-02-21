import useHttp from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'key=eafe08bdabe6fd5319ad6a2bf104349e'
    const _baseCharsOffset = 210;
    const _baseComicsOffset = 100;


    const getAllCharacters  = async (offset = _baseCharsOffset) => {
        const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&api${_apiKey}`);
        return res.data.results.map(_tranformCharacter)
    }

    const getCharacter  = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?limit=9&offset=210&api${_apiKey}`);
        return _tranformCharacter(res.data.results[0])
    }

    const _tranformCharacter = (char) => {
        return {
            name: (char.name.length > 20) ? `${char.name.slice(0, 22)}...` : char.name,
            description: char.description? `${char.description.slice(0,215)}...`:"There is no description for this character",
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            wiki: char.urls[0].url,
            homepage: char.urls[1].url,
            id: char.id,
            comicsList: char.comics.items.slice(0,10).map(item => item.name),
        }
    }

    const getAllComics = async (offset = _baseComicsOffset) => {
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&api${_apiKey}`)
        
        return res.data.results.map(_tranformComics)
    }
    const _tranformComics = (comics) => {
        return {
            name: comics.title,
            price: comics.prices.price || '---',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            description: comics.description || 'No description',
            pages: comics.pageCount,
            id: comics.id,
            language: comics.textObjects[0]?.language || 'No information'
        }
    }

    return{loading, error, getCharacter, getAllCharacters, clearError, getAllComics}
}
export default useMarvelService;

