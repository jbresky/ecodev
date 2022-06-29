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

function deleteProductInCart(idProduct){
    fetch(`/api/product/cartDelete/${idProduct}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
}