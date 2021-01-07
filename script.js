// variables
const beersList = document.getElementsByClassName('beers')
const urlBase = "https://api.punkapi.com/v2/beers";

const getBeers = async () => {
    await fetch(urlBase)
    .then(
        response => response.json()
    ).then(
        data => {
            let beerData = data
            
            beerData.map((beer)=> {
                let beerEntry = document.createElement("div")
                beerEntry.innerHTML = `
                <div class='beer-wrapper card'>
                    <div class='beer'>
                        <img class='beer__img' src="${beer.image_url}">
                        <h3>${beer.name}</h3>
                        <span class='beer__info'>
                            <span>ABV: ${beer.abv}%</span>
                            <span>IBU: ${beer.ibu}</span>
                        </span>
                    </div>
                    <div class='beer__content'>
                        <div class='beer__name'>${beer.name}</div>
                        <div class='beer__tagline'>${beer.tagline}</div>
                        <div class='beer__description'>${beer.description}</div>
                        <div class='beer__food-pairing'>
                            Pair with: ${beer.food_pairing.join(', ')}
                        </div>
                    </div>
                </div>
                `
                beersList[0].appendChild(beerEntry)
            })
        }
    )
    .catch( err =>
        console.error(err)
    )
    
}

getBeers()