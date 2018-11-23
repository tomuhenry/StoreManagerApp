document.getElementById("addSale").addEventListener("submit", addSale);

function addSale(e){
    e.preventDefault();

    let sale_quantity = document.getElementById('sale-quantity').value;
    let product_sold = document.getElementById('product-sold').value;

    fetch(sale_url, {
        method:'POST',
        headers: access_headers,
        body:JSON.stringify({sale_quantity:sale_quantity, product_sold:product_sold})
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .then(() =>location.reload())
    .catch((err) => console.log(err));

}