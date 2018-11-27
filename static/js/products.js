function editPage(product_id){
    sessionStorage.setItem("toEdit", product_id);
    redirectAdmin('/templates/edit-product.html');
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
                    <td onclick="getProduct(${product.product_id})">${product.product_name}</td>
                    <td>${product.category_type}</td>
                    <td>${product.product_stock}</td>
                    <td>${product.product_specs}</td>
                    <td>${product.product_price}/=</td>
                    <td><input type="button" onclick="deleteProduct(${product.product_id})" value="Delete"></td>
                    <td><input type="button" onclick="editPage(${product.product_id})" value="Edit"></td>
                    <td><input type="button" onclick="addCategory(${product.product_id})" value="Category"></td>

                </tr>
                `;
            });
            document.getElementById('getProducts').innerHTML = output;
        })
        .catch((err) => console.log(err));
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
                <h3>Product Id: <i>${data.product_id}</i></h3>
                <h3>Category: <i>${data.category_type}</i></h3>
                <h3>Stock: <i>${data.product_stock}</i></h3>
                <h3>Specifications: <i>${data.product_specs}</i></h3>
                <h3>Price: <i>${data.product_price}/=</i></h3>
            `;
            console.log(output);
            sessionStorage.setItem("product", output);
            window.location = '/templates/viewproduct.html';
    })
    .catch((err) => console.log(err));
}

function deleteProduct(product_id){
    
    if (user_type == "admin"){
        url = product_url + '/' + product_id;
        console.log(url);
        const confirmation = window.confirm("Are you sure about this action?");
        if(confirmation){
            fetch(url, {
                method:'DELETE',
                headers: access_headers
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                output = `${data.Deleted}`;
                document.getElementById("message").innerHTML = output;
            })
            .then(() =>location.reload())
            .catch((err) => console.log(err));
        }
        else{
            alert("Delete has been cancled!");
        }
        
    }
    else{
        alert("Only Admin can Perform Delete products");
    }
}

function addCategory(product_id){
    
    url = 'https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/products/category/' + product_id;
    console.log(url);

    var category_id;
    category_id = prompt("Enter category ID: ");
    let category_type = Number(category_id);
    
    fetch(url, {
        method:'PUT',
        headers: access_headers,
        body:JSON.stringify({category_type:category_type})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if(data.Added){
            document.getElementById("message").innerHTML=`${data.Added}`;
        }
        else if(data.error){
            document.getElementById("message").innerHTML=`${data.error}`;
        }
        else{
            document.getElementById("message").innerHTML="Could not add product to category";
        }
    })
    .then(() =>location.reload())
    .catch((err) => console.log(err));
}

