document.addEventListener('DOMContentLoaded', function(){
  
    const toggleClass = (el, className) => {
        if(el.className.indexOf(className) != -1){
            el.className = el.className.replace(className, '')
        } else {
            el.className = el.className.replace(' ', ' ') + '' + className;
        }
    }

    const toggleMenuDisplay = (e) => {
        const dropdown = e.currentTarget.parentNode;
        const menu =  dropdown.querySelector('.dropdown');
        const icon = dropdown.querySelector('.fa-angle-up');

        toggleClass(menu, 'hide');
        toggleClass(icon, 'rotate-90');
        console.log(menu);
    }

    const dropdownMenu = document.querySelector('button.search-category');
    dropdownMenu.addEventListener('click', toggleMenuDisplay)

    const dropdownPrice = document.querySelector('button.search-price');
    dropdownPrice.addEventListener('click', toggleMenuDisplay)

 })