document.getElementById("addProduct").addEventListener("submit", addProduct);

function addProduct(e){
    e.preventDefault();

    let product_name = document.getElementById('product_name').value;
    let product_specs = document.getElementById('product_specs').value;
    let product_stock = document.getElementById('product_stock').value;
    let product_price = document.getElementById('product_price').value;

    fetch(product_url, {
        method:'POST',
        headers: access_headers,
        body:JSON.stringify({product_name:product_name, product_specs:product_specs, product_stock:product_stock, product_price:product_price})
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch(error => console.log(error));
    // location.reload();

}