document.addEventListener('DOMContentLoaded', function(){
   let fav = Array.from(document.querySelectorAll('i.fav-red'));

   fav.forEach(e => e.addEventListener('click', () => {
      if(e.style.color !== "rgb(255, 80, 80)"){
      e.style.color = "rgb(255, 80, 80)"
      } else {
         e.style.color = "#e9b0b0"
      }
   }))

   //Validaciones Login

   let divErrors = document.querySelector('div.register-error')

   let formLogin = document.querySelector('.login-form form');

   let inputEmail = document.querySelector('#loginInputEmail');
   let span = document.querySelector('span.valid-register');

   formLogin.addEventListener('submit', function(e){

      if(inputEmail.value = ""){
         e.preventDefault()
      
      divErrors.style.display = 'block'
      }
   })

 /*  formLogin.addEventListener('change', function(){
      // if(formLogin.value != '@'){
         
      //    span.innerHTML = 'Ingresá un email válido'
      // }
      span.style.display = 'none' 
   })
   */

   // let nameInputChange = document.querySelector('#first_name');
   // let spanName = document.querySelector('#firstName-register');

   // nameInputChange.addEventListener('change', () => {
   //     if(nameInputChange.value < 5)
   //     spanName.innerText = "Tu nombre debe superar los 5 caracteres"
   // })
})
