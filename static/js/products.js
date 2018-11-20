var product_url = 'https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/admin/products'
var category_url = 'https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/category'

function loaderFunction(myFunc){
    if(window.addEventListener) {
        window.addEventListener('load',myFunc,false);
    } 
    else {
        window.attachEvent('onload',myFunc);
    }
}

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
                    <td><input type="button" id="${product.product_id}" value="View"></td>
                </tr>
                `;
                // onclick="loadPage()"
                // product_id=`${product.product_id}`
                // localStorage.setItem("product_id", product_id);
            });
            // console.log(output);
            document.getElementById('getProducts').innerHTML = output;
        })
    }
    // onclick="getProduct(${product.product_id})"
loaderFunction(getProducts);


document.getElementById("addProduct").addEventListener("submit", addProduct);

function addProduct(e){
    e.preventDefault();

    let product_name = document.getElementById('product_name').value;
    let product_specs = document.getElementById('product_specs').value;
    let product_stock = document.getElementById('product_stock').value;
    let product_price = document.getElementById('product_price').value;

    fetch(product_url, {
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

document.getElementById("addCategory").addEventListener("submit", addCategory);

function addCategory(e){
    e.preventDefault();

    let category_name = document.getElementById('category_name').value;

    fetch(category_url, {
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'Authorization': "Bearer " + access_token
        },
        body:JSON.stringify({category_name:category_name})
    })
    .then((res) => res.json())
    .then((data) => console.log(data))

}

function loadPage(){
    window.location = '/templates/admin/viewpage.html';
}

// document.getElementById("getProduct").addEventListener("button", addProduct);

// function getProduct(product_id){
//     console.log(product_id)
    
//     url = product_url + '/' + `'${product_id}'`;
//     console.log(url);
//     fetch(product_url)
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data)
//         output = "";
//         data.forEach(function(product){
//             output += `
//             <tr>
//                 <td>${product.product_id}</td>
//                 <td>${product.product_name}</td>
//                 <td>${product.category_type}</td>
//                 <td>${product.product_stock}</td>
//                 <td>${product.product_specs}</td>
//                 <td>${product.product_price}</td>
//                 <td><input type="button" value="View" id="${product.product_id}"></td>
//             </tr>
//             `;
//             // console.log(output)
//         });
//         document.getElementById('addProduct').innerHTML = output;
//     })
// }

// loaderFunction(getProduct);