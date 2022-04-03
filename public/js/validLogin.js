document.addEventListener('DOMContentLoaded', function(){
    
 
    //Validaciones Login
 
    let formLogin = document.querySelector('.login-form form');

    let divErrors = document.querySelector('div.register-error')
    let spans = Array.from(document.querySelectorAll('span.valid-register')); 
    let inputEmail = document.querySelector('#inputEmail');
    let inputPassowrd = document.querySelector('#inputPassword')
    let spanEmail = document.querySelector('#email-login');
    let spanPassword = document.querySelector('#password-login');
 
    formLogin.addEventListener('submit', function(e){

        let errors = [];
        if(inputEmail.value == ""){
            errors.push(1)
            spanEmail.innerText = "Ingresá tu email"
        }
        if(inputPassowrd.value == ""){
            errors.push(2);
            spanPassword.innerText = "Ingresá tu contraseña"
        }

        if(errors.length > 0){
        e.preventDefault()
        spans.forEach(span => {
            span.style.padding = "10px 0";
        })
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
 