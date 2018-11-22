function editPage(product_id){
    localStorage.setItem("toEdit", product_id);
    window.location = "/templates/admin/edit-product.html";
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
                    <td><input type="button" onclick="getProduct(${product.product_id})" value="View"></td>
                    <td><input type="button" onclick="deleteProduct(${product.product_id})" value="Delete"></td>
                    <td><input type="button" onclick="editPage(${product.product_id})" value="Edit"></td>
                </tr>
                `;
            });
            document.getElementById('getProducts').innerHTML = output;
        })
        // .catch((error) => console.log(error));
    }
loaderFunction(getProducts);

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
            localStorage.setItem("product", output);
            window.location = '/templates/admin/viewpage.html';
    })
    // .catch((error) => console.log(error));
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
    // .catch((error) => console.log(error));
    // location.reload();
}

