
document.addEventListener('DOMContentLoaded', function(){

    let minus = document.querySelector('button.minus')
    let plus = document.querySelector('button.plus')
    let inputCounter = document.querySelector('input.numeric-stepper')

    minus.addEventListener('click', () => {
  
        inputCounter.value - 1
    })

    plus.addEventListener('click', () => {
     
        inputCounter.value + 1
    })
})