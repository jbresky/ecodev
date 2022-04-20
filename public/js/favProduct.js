document.addEventListener('DOMContentLoaded', function(){
   let fav = Array.from(document.querySelectorAll('i.fav-red'));

   fav.forEach(e => e.addEventListener('click', () => {
       if(req.session.userLogged){
      if(e.style.color !== "rgb(255, 80, 80)"){
      e.style.color = "rgb(255, 80, 80)"
      } else {
         e.style.color = "#e9b0b0"
      }
   } 
   }))
})
