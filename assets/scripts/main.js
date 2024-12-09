const pokemonListOL= document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')
const limit = 10
let offset = 0
const maxRecords = 151


function PokemonToHtml(pokemon){
    return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                </div>                
            </li>`
}




   
function loadPokemonItens(offset,limit){
    PokeApi.getPokemons(offset,limit).then((pokemons = []) => { 
        /* a função map cria uma função conversora, teria como parâmetros um value atual, índice da lista e a array, nesse caso array e índice n precisa (pois já estamos iterando a lista) só o valor para criação da lista json para html */
        const newHtml = pokemons.map(PokemonToHtml).join('')
        pokemonListOL.innerHTML += newHtml
   })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qntNextPage = offset + limit
    if(qntNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton) /* forma de remover o botão para quando chegar no máx pokemon não carregar novos, pegamos o botão e chamamos o parentElement(pai) e pelo pai que é a div tiramos um elemento filho que é o próprio botão */
    }else{
        loadPokemonItens(offset,limit)
    }

    
})