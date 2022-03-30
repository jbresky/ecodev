document.addEventListener('DOMContentLoaded', function(){

    let selectPaises = document.querySelector('#country')

    const dataPaises = async () => {
       const res = await fetch('https://restcountries.com/v2/all');
       const data = await res.json();
 
       data.forEach(country => {
          selectPaises.innerHTML += `
          <option>${country.name}</option>
          `
       })
    }
    dataPaises();
    
    selectPaises.addEventListener('click', () => {
       selectPaises.style.color = "black"
    })
})