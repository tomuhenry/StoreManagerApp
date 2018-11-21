var product_url = 'https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/admin/products'
var category_url = 'https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/category'

const access_headers = {
    'Accept': 'application/json, text/plain, */*',
    'content-type': 'application/json',
    'Authorization': "Bearer " + access_token
}

function loaderFunction(myFunc){
    if(window.addEventListener) {
        window.addEventListener('load',myFunc,false);
    } 
    else {
        window.attachEvent('onload',myFunc);
    }
}
var myproduct = sessionStorage.getItem("product");

function editPage(product_id){
    sessionStorage.setItem("toEdit", product_id);
    window.location = "/templates/admin/edit-product.html";
}
var editproduct = sessionStorage.getItem("toEdit");

function displayProduct(){

    // document.getElementById('display-item').innerHTML = myproduct;
}
loaderFunction(displayProduct);

function getProducts(){
        fetch(product_url)
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
                    <td><input type="button" onclick="getProduct(${product.product_id})" value="View"></td>
                    <td><input type="button" onclick="deleteProduct(${product.product_id})" value="Delete"></td>
                    <td><input type="button" onclick="editPage(${product.product_id})" value="Edit"></td>
                </tr>
                `;
            });
            document.getElementById('getProducts').innerHTML = output;
        })
        .catch(error => console.log(error));
    }
loaderFunction(getProducts);


// document.getElementById("addProduct").addEventListener("submit", addProduct);

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

}

// document.getElementById("addCategory").addEventListener("submit", addCategory);

function addCategory(e){
    e.preventDefault();

    let category_name = document.getElementById('category_name').value;

    fetch(category_url, {
        method:'POST',
        headers: access_headers,
        body:JSON.stringify({category_name:category_name})
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch(error => console.log(error));

}


function getProduct(product_id){
    
    url = product_url + '/' + product_id;
    console.log(url);
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        output = "";
            output += `
                <h2>${data.product_name}</h2>
                <h3>Product Id: ${data.product_id}</h3>
                <h3>Category: ${data.category_type}</h3>
                <h3>Stock: ${data.product_stock}</h3>
                <h3>Specifications: ${data.product_specs}</h3>
                <h3>Price: ${data.product_price} /=</h3>
            `;
            console.log(output);
            sessionStorage.setItem("product", output);
            window.location = '/templates/admin/viewpage.html';
    })
    .catch(error => console.log(error));
}

function deleteProduct(product_id){
    
    url = product_url + '/' + product_id;
    console.log(url);
    fetch(url, {
        method:'DELETE',
        headers: access_headers
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch(error => console.log(error));
    // window.location = '/templates/admin';
}

document.getElementById("editProduct").addEventListener("submit", editProduct);

function editProduct(e){
    e.preventDefault();
    
    url = product_url + '/' + editproduct;
    console.log(url);

    let product_name = document.getElementById('product_name').value;
    let product_stock = document.getElementById('product_stock').value;
    let product_price = document.getElementById('product_price').value;

    fetch(url, {
        method:'Put',
        headers: access_headers,
        body:JSON.stringify({product_name:product_name, product_stock:product_stock, product_price:product_price})
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch(error => console.log(error));

}