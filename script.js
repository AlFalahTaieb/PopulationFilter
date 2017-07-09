const endpoint = 'https://gist.githubusercontent.com/AlFalahTaieb/290c0033afe94c73abdcdce87b1be5b8/raw/89cae44b91a9816904cfea802e1e84f193dbfe49/pop.json';
const cities= [];

fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data))

function findM(wordToMatch,cities){
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}



function displayM(){
const matchArray=findM(this.value, cities);
 const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const searchInput=document.querySelector('.search');
const suggestions=document.querySelector('.suggestions')

searchInput.addEventListener('keyup',displayM);