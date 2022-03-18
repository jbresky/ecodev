document.addEventListener('DOMContentLoaded', function(){
   // let favWhite = document.querySelectorAll('span.fav-white');
   let favRed = document.querySelectorAll('i.fav-red');
   console.log(favRed);
   

   favRed.forEach(e => e.addEventListener('click', () => {
      if(e.style.color !== "red"){
      e.style.color = "red"
      } else {
         e.style.color = "#e9b0b0"
      }
   }))
  
   // for(fr of favRed){
   //    fr.addEventListener('click', () => {
   //       this.style.color = "blue"
   //    })
   // }
   // }
})
