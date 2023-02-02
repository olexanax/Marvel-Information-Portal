

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

    getCharacters  = () => {
        return this.getResources(`${this._apiBase}?limit=9&offset=210&api${this._apiKey}`)
    }
    getCharacter  = (id) => {
        return this.getResources(`${this._apiBase}/${id}?limit=9&offset=210&api${this._apiKey}`)
    }


}

export default MarvelService;