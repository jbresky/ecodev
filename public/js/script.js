document.addEventListener('DOMContentLoaded', function(){
   // let favWhite = document.querySelectorAll('span.fav-white');
   let fav = Array.from(document.querySelectorAll('i.fav-red'));
   // console.log(favRed);
   

   fav.forEach(e => e.addEventListener('click', () => {
      if(e.style.color !== "rgb(255, 80, 80)"){
      e.style.color = "rgb(255, 80, 80)"
      console.log(e.style.color);
      } else {
         e.style.color = "#e9b0b0"
         console.log(e.style.color);
      }
   }))

   let selectPaises = document.querySelector('#country')

   const dataPaises = async () => {
      const res = await fetch('https://restcountries.com/v2/all');
      const data = await res.json();

      data.forEach(country => {
         console.log(data);
         selectPaises.innerHTML += `
         <option>${country.name}</option>
         `
         // console.log(country.name)
      })
   }
   dataPaises();
   
   selectPaises.addEventListener('click', () => {
      selectPaises.style.color = "black"
   })

})



/*nav bah burguer*/

