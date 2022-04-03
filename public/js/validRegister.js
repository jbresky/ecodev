document.addEventListener('DOMContentLoaded', function(){

    //validation Register
 
    let formRegister = document.querySelector('.register-container form');

    let spans = Array.from(document.querySelectorAll('span.valid-register')); 
    formRegister.addEventListener('submit', (e) => {

        let divErrors = document.querySelector('div.register-error')

       let errores = [];
 
       let inputName = document.querySelector('#first_name')
       let spanName = document.querySelector('#firstName-register');
 
       let inputLastName = document.querySelector('#last_name');
       let spanLastName = document.querySelector('#lastName-register');
 
       let selectCountry = document.querySelector('#country')
       let spanCountry = document.querySelector('#country-register');
 
       let inputEmail = document.querySelector('#email');
       let spanEmail = document.querySelector('#email-register');
 
       let inputPassowrd = document.querySelector('#password')
       let spanPassword = document.querySelector('#password-register');
 
       if(inputName.value == ""){
          errores.push(1)
          spanName.innerText = "Ingresá tu nombre"
       }
       if(inputName.value.length < 5){
        spanName.innerText = "Tu nombre debe superar los 5 caracteres"
       }
       if(inputLastName.value == ""){
          errores.push(2)
          spanLastName.innerText = "Ingresá tu apellido"
       }
 
       if(selectCountry.value.length < 3){
          errores.push(3)
          spanCountry.innerText = "Ingresá tu país de residencia"
       }
 
       if(inputEmail.value == ""){
          errores.push(4)
          spanEmail.innerText = "Ingresá tu email"
       }
 
       if(inputPassowrd.value == ""){
          errores.push(5)
          spanPassword.innerText = "Crea una contraseña"
       }

       if(inputPassowrd.value.length < 8){
        errores.push(5)
        spanPassword.innerText = "Tu contraseña debe tener al menos 8 caracteres"
     }

       if(errores.length > 0){
          e.preventDefault()
        divErrors.style.display = "block"
        spans.forEach(span => {
         span.style.padding = "10px 0";
     })
       }
    })

    let nameInputChange = document.querySelector('#first_name');
    let spanName = document.querySelector('#firstName-register');

    nameInputChange.addEventListener('input', () => {
      if(nameInputChange.value.length < 2){
        spanName.innerText = "Tu nombre debe superar los 2 caracteres"
      } else {
          spanName.innerText = ""
      }
    })

    let inputPassowrd = document.querySelector('#password')
       let spanPassword = document.querySelector('#password-register');

    inputPassowrd.addEventListener('input', () => {
      if(inputPassowrd.value.length < 8){
        spanPassword.innerText = "Tu contraseña debe superar los 8 caracteres"
      } else {
          spanPassword.innerText = ""
      }
    })

 })