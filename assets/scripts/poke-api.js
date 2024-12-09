const PokeApi= {}

function PokeApiDetailToPokemonModel(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] /* dá a primeira posição da lista */ = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    return pokemon

}

PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())   
            .then(PokeApiDetailToPokemonModel)
}

PokeApi.getPokemons = (offset = 0, limit = 5) => {
   /* const offset = 0 /* primeira página */
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    /* fetch api é uma biblioteca do js para requisições do tipo get */
    return fetch(url)
        .then((response) => response.json()) /* o then dita que quando a requisiçaõ acontecer e der certo ativa a função  arrow com a response*/
        .then((jsonBody) => jsonBody.results)/* o then pode ser encadeado com outro, assim quando o 1º obter uma resposta ele poderá já receber e utilizar a sua resposta na sua função */
        .then((pokemons) => pokemons.map(PokeApi.getPokemonDetail))      /* a função map cria uma função conversora, teria como parâmetros um value atual, índice da lista e a array, nesse caso array e índice n precisa (pois já estamos iterando a lista) só o valor para criação da lista json para html */

        .then((detailRequests) => Promise.all(detailRequests)) /* Promise.all criará uma lista com todas as promesas que precisam vir, no caso todas as requisições em um só lugara */
        .then((pokemonsDetails) => pokemonsDetails)
    /* .catch((error) => console.error(error))  catch ativa quando estiver o status code de erro*/ 
    /* .finally(() => console.log("requisição concluída"))ativará essa função independentemente do retorno *, as funções arrows não precisam de {} nem return explícito quando possuem uma linha*/
    /*debugger é uma palavra chave que começará a debugar o código abaixo dele no brownser, olhar na devtools*/
} 