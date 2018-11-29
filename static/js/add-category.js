document.getElementById("addCategory").addEventListener("submit", addCategory);


function addCategory(e){
    e.preventDefault();

    let category_name = document.getElementById('category_name').value;

    fetch(category_url, {
        method:'POST',
        headers: access_headers,
        body:JSON.stringify({category_name:category_name})
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.Great){
            document.getElementById("message").innerHTML = `${data.Great}`;
        }
        else if(data.error){
            document.getElementById("message").innerHTML = `${data.error}`;
        }
        else{
            document.getElementById("message").innerHTML = "Could not add Cetegory";
        }
        
    })
    .then(() =>location.reload())
    .catch((err) => console.log(err));
}

function getCategories(){
    fetch(category_url, {
        headers: access_headers
    })
    .then((res) => res.json())
    .then((data) => {
        output = "";
        data.forEach(function(category){
            output += `
            <tr>
                <td>${category.category_id}</td>
                <td>${category.category_name}</td>
                <td><input type="button" onclick="categoryProducts(${category.category_id})" value="Products"></td>

            </tr>
            `;
        });
        document.getElementById('getCategories').innerHTML = output;
    })
    .catch((err) => console.log(err));
}
loaderFunction(getCategories);

function categoryProducts(category_id){
    url = "https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/products/category/" + category_id;
    fetch(url, {
        headers: access_headers
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        output = "";
        data.forEach(function(product){
            output += `
            <div>
            <h3>Product id: ${product.product_id}</h3>
            <h3>Product name: ${product.product_name}</h3>
            <h3>Product price: ${product.product_price}</h3>
            <h3>Product specifications: ${product.product_specs}</h3>
            <h3>Product stock: ${product.product_stock}</h3>
            </div>
            `;
        });
        sessionStorage.setItem("cat_products", output);
        redirectAdmin('/templates/viewcategory.html');   
    })
    .catch((err) => console.log(err));
}