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
                beerEntry.innerHTML = beer.name
                beersList[0].appendChild(beerEntry)
            })
        }
    )
    .catch( err =>
        console.error(err)
    )
    
}


getBeers()