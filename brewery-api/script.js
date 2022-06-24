// Add DOM elements
const searchData = document.querySelector('.search-bar')
const navbar = document.querySelector('.navbar')

const loadNav = () => {
    const navHtml = `
        <nav>
        <img class="logo" src="img/beer.png" alt="">
        <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
        </nav> 
    `
    navbar.innerHTML = navHtml
}
loadNav()

const loadSearch = () => {
    const searchHtml = `
        <h1 class="title">The Brewery Finder</h1>
        <h1 class="sub-title">Search for the best "🍺"</h1>
        <input type="search" class="data-search" placeholder="search by name, type, country or state">
    `
    searchData.innerHTML = searchHtml
}
loadSearch()

let brewList = [];

// Search / Filter Data
searchData.addEventListener('keyup', (e) => {
    const textValue = e.target.value.toLowerCase()
    const filteredData = brewList.filter((brew) => {
        return (
            brew.name.toLowerCase().includes(textValue) || brew.brewery_type.toLowerCase().includes(textValue) || brew.city.toLowerCase().includes(textValue) || brew.state.toLowerCase().includes(textValue)
        )
    })
    
    displayBrewery(filteredData)
})


//  GET / Load API
const loadBrewery = async () => {
    try {
        const res = await fetch("https://api.openbrewerydb.org/breweries")
        brewList = await res.json()
        displayBrewery(brewList)
        //console.log(brewList)
    } catch(err) {
        console.log(err)
    }
}

// Display fetched data in UI
const brewerydata = document.querySelector('.brewery-container')

const displayBrewery = (brews) => {
    const htmlString = brews
        .map((brew) => {
            if(brew.street === null) { brew.street = '(street unknown)' }
            if(brew.website_url === null) { brew.website_url = 'Not available' }
            if(brew.phone === null) { brew.phone ='Not available' }

            return `
            <div class="brewery-list">
                <h4 class="brew-name">${brew.name}</h4>
                <p class="brew-type"><span>Type: </span> ${brew.brewery_type}</p>
                <p class="brew-address"><span>Address: </span>${brew.street}, ${brew.city}, ${brew.state}.</p>
                <p class="brew-website"><span>Site: </span> ${brew.website_url}</p>
                <p class="brew-phone"><span>Phone: </span> ${brew.phone}</p>
            </div>    
            `
        })
        .join('');
    brewerydata.innerHTML = htmlString
}

loadBrewery()