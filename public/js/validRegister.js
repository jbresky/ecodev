document.addEventListener('DOMContentLoaded', function(){
 
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
       if(inputName.value.length > 0 && inputName.value.length < 3){
          errores.push(1)
        spanName.innerText = "Tu nombre debe superar los 2 caracteres"
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

       if(inputPassowrd.value.length > 0 && inputPassowrd.value.length < 9){
        errores.push(5)
        spanPassword.innerText = "Tu contraseña debe superar los 8 caracteres"
     }

       if(errores.length > 0){
          e.preventDefault()
        divErrors.style.display = "block"
        spans.forEach(span => {
         span.style.padding = "10px 0";
     })
       }
    })

    // validaciones cambiando para mejor UX 

    let nameInputChange = document.querySelector('#first_name');
    let spanName = document.querySelector('#firstName-register');

    nameInputChange.addEventListener('input', () => {
      if(nameInputChange.value.length < 3){
        spanName.innerText = "Tu nombre debe superar los 2 caracteres"
      } else {
          spanName.innerText = ""
      }
    })

    let lastNameInputChange = document.querySelector('#last_name');
    let spanLastName = document.querySelector('#lastName-register');

    lastNameInputChange.addEventListener('input', () => {
      if(lastNameInputChange.value.length > 0){
        spanLastName.innerText = ""
      }
    })

    let selectCountryChange = document.querySelector('#country')
      let spanCountry = document.querySelector('#country-register');

      selectCountryChange.addEventListener('input', () => {
         if(selectCountryChange.value.length != ""){
            spanCountry.innerText = ""
         }
      })
 
      let inputEmail = document.querySelector('#email');
      let spanEmail = document.querySelector('#email-register');
      
      inputEmail.addEventListener('input', () => {
         if(inputEmail.value.includes('@')){
            spanEmail.innerText = ""
         }
      })


    let inputPassword = document.querySelector('#password')
      let spanPassword = document.querySelector('#password-register');

    inputPassword.addEventListener('input', () => {
      if(inputPassword.value.length < 9){
        spanPassword.innerText = "Tu contraseña debe superar los 8 caracteres"
      } else {
          spanPassword.innerText = ""
      }
    })

 })