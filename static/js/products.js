// document.getElementById("getProducts").addEventListener("", getProducts);
function getProducts(){
        fetch('https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/admin/products')
        .then((res) => res.json())
        .then((data) => {
            output = "";
            data.forEach(function(product){
                output += `
                <tr>
                    <td>${product.product_id}</td>
                    <td>${product.product_name}</td>
                    <td>${product.category_type}</td>
                    <td>${product.product_stock}</td>
                    <td>${product.product_specs}</td>
                    <td>${product.product_price}</td>
                </tr>
                `;
            });
            console.log(output);
            document.getElementById('getProducts').innerHTML = output;
        })
    }

if(window.addEventListener) {
    window.addEventListener('load',getProducts,false);
} else {
    window.attachEvent('onload',getProducts);
}


document.getElementById("addProduct").addEventListener("click", addProduct);

function addProduct(e){
    e.preventDefault();

    let product_name = document.getElementById('product_name').value;
    let product_specs = document.getElementById('product_specs').value;
    let product_stock = document.getElementById('product_stock').value;
    let product_price = document.getElementById('product_price').value;

    fetch('https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/admin/products', {
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'Authorization': "Bearer " + access_token
        },
        body:JSON.stringify({product_name:product_name, product_specs:product_specs, product_stock:product_stock, product_price:product_price})
    })
    .then((res) => res.json())
    .then((data) => console.log(data))

}