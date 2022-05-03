document.addEventListener('DOMContentLoaded', function(){
 
    let formEdit = document.querySelector('form#edit-password');

    let spans = Array.from(document.querySelectorAll('span.valid-edit')); 
    formEdit.addEventListener('submit', (e) => {

       let errores = [];
 
       let inputPassword = document.querySelector('#oldPassword')
       let spanPass = document.querySelector('#password-edit');
 
       let inputNewPassword = document.querySelector('#newPassword');
       let spanNewPass = document.querySelector('#newPassword-edit');
 
       if(inputPassword.value == ""){
          errores.push(1)
          spanPass.innerText = "Ingresá tu contraseña actual"
       }
       
       if(inputNewPassword.value == ""){
          errores.push(2)
          spanNewPass.innerText = "Ingresá tu nueva contraseña"
       }
       if(inputNewPassword.value.length > 0 && inputNewPassword.value.length < 9){
           errores.push(3)
           spanNewPass.innerText = "Tu contraseña debe superar los 8 caracteres"
       }

       if(errores.length > 0){
          e.preventDefault()
        spans.forEach(span => {
         span.style.display = 'block'
     })
       }
    })

   
    let inputNewPassword = document.querySelector('#newPassword');
    let spanNewPass = document.querySelector('#newPassword-edit');

    inputNewPassword.addEventListener('input', () => {
      if(inputNewPassword.value.length > 8){
          spanNewPass.innerText = ""
      }
    })


  
 })
 