

class MarvelService{

    _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
    _apiKey = 'key=eafe08bdabe6fd5319ad6a2bf104349e'

    getResources = async (url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters  = async () => {
        const res = await this.getResources(`${this._apiBase}?limit=9&offset=210&api${this._apiKey}`);
        return res.data.results.map(this._tranformCharacter)
    }

    getCharacter  = async (id) => {
        const res = await this.getResources(`${this._apiBase}/${id}?limit=9&offset=210&api${this._apiKey}`);
        return this._tranformCharacter(res.data.results[0])
    }

    _tranformCharacter = (char) => {
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
}
export default MarvelService;

