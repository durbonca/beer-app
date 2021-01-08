// variables
const beersList = document.getElementsByClassName('beers')
const urlBase = "https://api.punkapi.com/v2/beers?page=";
const filterABV = document.getElementById("filterABV")
const filterIBU = document.getElementById("filterIBU")
const pageText = document.getElementById("pageNumber")
const prevPage = document.getElementById("prevPage")
const nextPage = document.getElementById("nextPage")

let optionsABV = "", optionsIBU = "", page = 1

// filters
filterABV.addEventListener("change", e => {
    const value = e.target.value
    switch (value){
        case "all":
            optionsABV = ""
        break
        case "Weak":
            optionsABV = "&abv_lt=4.6"
        break
        case "Median":
            optionsABV = "&abv_gt=4.6&abv_lt=7.6"
        break
        case "Strong":
            optionsABV = "&abv_gt=7.5"
        break
    }
    page = 1
    getBeers();
})

filterIBU.addEventListener("change", e => {
    const value = e.target.value
    switch (value){
        case "all":
            optionsIBU = ""
        break
        case "Weak":
            optionsIBU = "&ibu_lt=35"
        break
        case "Median":
            optionsIBU = "&ibu_gt=34&ibu_lt=75"
        break
        case "Strong":
            optionsIBU = "&ibu_gt=74"
        break
    }
    page = 1
    getBeers();
})

// get the beers
const getBeers = async () => {
    const url = urlBase + page + optionsABV + optionsIBU;
    const genericBottle = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png'
    await fetch(url)
    .then(
        response => response.json()
    ).then(
        data => {
            let beerData = data
            while (beersList[0].firstChild) {
                    beersList[0].removeChild(beersList[0].firstChild);
            }
            pageText.innerText = page
            if(page === 1) {
                prevPage.disabled = true;
            } else {
                prevPage.disabled = false;
            }
            console.log(beerData)
            if (beerData.length < 25) {
                nextPage.disabled = true;
            } else {
                nextPage.disabled = false;
            }

            beerData.map((beer)=> {
                let beerEntry = document.createElement("div")
                beerEntry.innerHTML = `
                <div class='beer-wrapper card'>
                    <div class='beer'>
                        <img class='beer__img' src="${beer.image_url ? beer.image_url : genericBottle}">
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
//pagination 
prevPage.addEventListener('click', () => {
    page--
    getBeers()
})
nextPage.addEventListener('click', () => {
    page++
    getBeers()
})
getBeers()