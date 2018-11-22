document.getElementById("editProduct").addEventListener("submit", editProduct);

function editProduct(e){
    e.preventDefault();
    
    url = product_url + '/' + editproduct;
    console.log(url);

    let product_name = document.getElementById('product_name').value;
    let product_stock = document.getElementById('product_stock').value;
    let product_price = document.getElementById('product_price').value;

    fetch(url, {
        method:'PUT',
        headers: access_headers,
        body:JSON.stringify({product_name:product_name, product_stock:product_stock, product_price:product_price})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
    .catch(error => console.log(error));
    // location.reload();

}