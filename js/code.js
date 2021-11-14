function fetchApiPokemon(infoPage = 1, search = false){
    domContainer.innerHTML = ''
    modalContainer.innerHTML = ''
    let inputDom = document.getElementById("searchPokemon").value
    if(!search){
        if(infoPage == 1){
            var linkApi = 'https://pokeapi.co/api/v2/pokemon?limit=20';
        }else{
            var linkApi = infoPage
        }
        let dataApi = fetch(linkApi);
        dataApi.then(res => res.json())
            .then(function(pokemonObject){
                var infoPrevPage = pokemonObject.previous;
                var infoNextPage = pokemonObject.next;
                buttons(infoPrevPage, infoNextPage);
                pokemonObject.results.forEach(function(arrayInfo){
                    fetchDataPokemon(arrayInfo)
                })
        })
    }else{
        var linkApiTwo = 'https://pokeapi.co/api/v2/pokemon/' + inputDom
        let dataSinglePoke = fetch(linkApiTwo)
        dataSinglePoke.then(res2 => res2.json())
            .then(urlPoke =>{
                console.log(urlPoke)
                showPokemon(urlPoke)
                buttonContainer.innerHTML = ''
            })
    }
}

function fetchDataPokemon(arrayInfo){
    let pokeSingleUrl = arrayInfo.url;
    let dataPoke = fetch(pokeSingleUrl);
        dataPoke.then(res2 => res2.json())
            .then(function(pokeInfo){
                showPokemon(pokeInfo)
            });
}

let domContainer = document.querySelector("#pokemonCard")
let modalContainer= document.querySelector("#modalSection")
let buttonContainer = document.querySelector("#buttonSection")

function showPokemon(pokeInfo){
    let img = pokeInfo.sprites.other['official-artwork'];
    var type = '';

    for (const typePoke of pokeInfo.types) {
        //debugger
        let color = '';
        let icon = '';
        let typePokemons = typePoke.type.name;
        switch (typePokemons) {
            case 'bug':
                color = 'bugColor'
                icon = '<i class="fas fa-bug icons"></i>'
                break;
            case 'water':
                color = 'waterColor'
                icon = '<i class="fas fa-tint icons"></i>'
                break;
            case 'poison':
                color = 'poisonColor'
                icon = '<i class="fas fa-skull-crossbones icons"></i>'
                break;
            case 'fire':
                color = 'fireColor'
                icon = '<i class="fas fa-fire-alt icons"></i>'
                break;
            case 'dark':
                color = 'darkColor'
                icon = '<i class="fas fa-moon icons"></i>'
                break;
            case 'dragon':
                color = 'dragonColor'
                icon = '<i class="fas fa-dragon icons"></i>'
                break;
            case 'electric':
                color = 'electricColor'
                icon = '<i class="fas fa-bolt icons"></i>'
                break;
            case 'fairy':
                color = 'fairyColor'
                icon = '<i class="fas fa-hat-wizard icons"></i>'
                break;
            case 'fighting':
                color = 'fightingColor'
                icon = '<i class="fas fa-fist-raised icons"></i>'
                break;
            case 'flying':
                color = 'flyingColor'
                icon = '<i class="fas fa-feather-alt icons"></i>'
                break;
            case 'ghost':
                color = 'ghostColor'
                icon = '<i class="fas fa-ghost icons"></i>'
                break;
            case 'grass':
                color = 'grassColor'
                icon = '<i class="fab fa-pagelines icons"></i>'
                break;
            case 'ground':
                color = 'groundColor'
                icon = '<i class="fas fa-campground icons"></i>'
                break;
            case 'ice':
                color = 'iceColor'
                icon = '<i class="fas fa-icicles icons"></i>'
                break;
            case 'normal':
                color = 'normalColor'
                icon = '<i class="fab fa-magento icons"></i>'
                break;
            case 'psychic':
                color = 'psychicColor'
                icon = '<i class="fas fa-brain icons"></i>'
                break;
            case 'rock':
                color = 'rockColor'
                icon = '<i class="far fa-gem icons"></i>'
                break;
            case 'steel':
                color = 'steelColor'
                icon = '<i class="fas fa-dumbbell icons"></i>'
                break;
        }
        type += `<div class='item typeFormat ${color}'>${icon}`+typePoke.type.name+"</div>";
        var colorbutton = color
    }

    let statsInfo = '';
    for (const statsPoke of pokeInfo.stats) {
        let colorBar = ''
        let barStat = statsPoke.stat.name
        switch (barStat) {
            case 'hp':
                colorBar = 'red'
                break;
            case 'attack':
                colorBar = 'orange'
                break;
            case 'defense':
                colorBar = 'yellow' 
                break;
            case 'special-attack':
                colorBar = 'purple'
                break;
            case 'special-defense':
                colorBar = 'teal'
                break;
            case 'speed':
                colorBar = 'green'
                break;
        }
        statsInfo += `
        <div class="ui ${colorBar} progress active" data-percent="51">
            <div class="label fontColor font">${statsPoke.stat.name}</div>
            <div class="bar" style="transition-duration: 300ms; width: ${statsPoke.base_stat}%;">
                <div class="progress">${statsPoke.base_stat}%</div>
            </div>
        </div>
        `
    }
    
    domContainer.innerHTML += `
        <div class="card">
            <div class="image">
                <img class="imgHidden" src="${img.front_default}">
            </div>
            <div class="content">
                <div class="header huge text-header ui centered"><h1>${pokeInfo.name}</h1></div>
                <p class="ui centered font centerText">${pokeInfo.base_experience} exp</p>
            </div>
            <div class="ui horizontal list containerType">
                <div class='item'><i class="fas fa-weight icons font"></i>${pokeInfo.weight} lbs</div>
                <div class='item'><i class="fas fa-ruler-vertical icons font"></i>${pokeInfo.height} ft</div>
            </div>
            <h3 class="ui centered centerText">Pokemon Type</h3>
            <div class="ui horizontal list containerType">
                ${type}
            </div>
            <button class="ui ${colorbutton} inverted button" onclick="showModal(${pokeInfo.id})">
                More Info.
            </button>
        </div>
    `;
    type = '';
    
    modalContainer.innerHTML += `
        <div class="ui basic modal ${pokeInfo.id}">
            <div class="header centered ui">
                <h1>Pokemon Stats</h1>
                <h1>${pokeInfo.name}</h1>
            </div>
            <div class="image content">
                <img class="ui image centered" src="${pokeInfo.sprites.other.dream_world.front_default}">
                <div class="description">
                    <div class="ui container">
                        ${statsInfo}
                    </div>
                </div>
            </div>
            <div class="actions">
                <div class="ui green ok inverted button">
                    <i class="checkmark icon"></i>
                    Close pokemon stats
                </div>
            </div>
        </div>
    `
}

fetchApiPokemon(1)

buttons = (infoPrevButton, infoNextButton) =>{
    console.log(infoPrevButton)
    console.log(infoNextButton)

    let offPrev = ''
    let offNext = ''

    if (infoPrevButton == null) {
        offPrev = `disabled`
    } else if (infoNextButton == null) {
        offNext = `disabled`
    }

    buttonContainer.innerHTML = `
        <button class="ui right floated button ${offNext} bgColor" onclick="fetchApiPokemon('${infoNextButton}')">Next Pokemon page</button>
        <button class="ui left floated button ${offPrev} bgColor" onclick="fetchApiPokemon('${infoPrevButton}')">Previous Pokemon page</button>
    `
}

showModal = (idPoke) => {
    console.log(idPoke)
    $(`.ui.modal.${idPoke}`).modal('show');
}