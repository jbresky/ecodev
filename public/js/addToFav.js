document.addEventListener('DOMContentLoaded', function(){
    

    // async function postData(url){
    //     const product = await fetch('/product', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
                
    //         })
    //     });
    // }

 })
 
 function addProductToFav(idProduct){
    fetch(`/api/user/product/${idProduct}/fav`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
}