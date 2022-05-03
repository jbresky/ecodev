document.addEventListener('DOMContentLoaded', function(){
 
    let formEdit = document.querySelector('form#edit-user');

    let spans = Array.from(document.querySelectorAll('span.valid-edit')); 
    formEdit.addEventListener('submit', (e) => {

       let errores = [];
 
       let inputName = document.querySelector('#name')
       let spanName = document.querySelector('#firstName-edit');
 
       let inputLastName = document.querySelector('#last_Name');
       let spanLastName = document.querySelector('#lastName-edit');
 
       if(inputName.value == ""){
          errores.push(1)
          spanName.innerText = "Ingresá tu nombre"
       }
       if(inputName.value.length > 0 && inputName.value.length < 3){
          errores.push(2)
        spanName.innerText = "Tu nombre debe superar los 2 caracteres"
       }
       if(inputLastName.value == ""){
          errores.push(3)
          spanLastName.innerText = "Ingresá tu apellido"
       }

       if(errores.length > 0){
          e.preventDefault()
        spans.forEach(span => {
         span.style.display = 'block'
     })
       }
    })

    let nameInputChange = document.querySelector('#name');
    let spanName = document.querySelector('#firstName-edit');

    nameInputChange.addEventListener('input', () => {
      if(nameInputChange.value.length < 3){
        spanName.innerText = "Tu nombre debe superar los 2 caracteres"
      } else {
          spanName.innerText = ""
      }
    })


    let lastNameInputChange = document.querySelector('#last_Name');
    let spanLastName = document.querySelector('#lastName-edit');

    lastNameInputChange.addEventListener('input', () => {
      if(lastNameInputChange.value.length > 0){
        spanLastName.innerText = ""
      } else {
          spanLastName.innerText = ""
      }
    })

 })