function addProductToCart(idProduct){
    fetch(`/api/product/cart/${idProduct}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
}