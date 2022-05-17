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