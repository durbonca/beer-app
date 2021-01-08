// variables
const beersList = document.getElementsByClassName('beers')
const urlBase = "https://api.punkapi.com/v2/beers";
const filterABV = document.getElementById("filterABV")
const filterIBU = document.getElementById("filterIBU")
let optionsABV = ""
let optionsIBU = ""

// filters
filterABV.addEventListener("change", e => {
    const value = e.target.value
    switch (value){
        case "all":
            optionsABV = ""
        break
        case "Weak":
            optionsABV = "abv_lt=4.6"
        break
        case "Median":
            optionsABV = "abv_gt=4.6&abv_lt=7.6"
        break
        case "Strong":
            optionsABV = "abv_gt=7.5"
        break
    }
    getBeers();
})

filterIBU.addEventListener("change", e => {
    const value = e.target.value
    switch (value){
        case "all":
            optionsIBU = ""
        break
        case "Weak":
            optionsIBU = "ibu_lt=35"
        break
        case "Median":
            optionsIBU = "ibu_gt=34&ibu_lt=75"
        break
        case "Strong":
            optionsIBU = "ibu_gt=74"
        break
    }
    getBeers();
})

// get the beers
const getBeers = async () => {
    const url = urlBase + "?" + optionsABV + "&" + optionsIBU;
    await fetch(url)
    .then(
        response => response.json()
    ).then(
        data => {
            let beerData = data
            while (beersList[0].firstChild) {
                    beersList[0].removeChild(beersList[0].firstChild);
            }
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