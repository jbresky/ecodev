document.addEventListener('DOMContentLoaded', function(){
 
    let formLogin = document.querySelector('.login-form form');
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
 })
 