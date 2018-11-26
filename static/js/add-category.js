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
    .then((data) => console.log(data))
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
                <td><input type="button" onclick="getCategory(${category.category_id})" value="Products"></td>

            </tr>
            `;
        });
        document.getElementById('getCategories').innerHTML = output;
    })
    .catch((err) => console.log(err));
}
loaderFunction(getCategories);

function getCategory(category_id){
    url = "https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/category/" + category_id;
    fetch(url, {
        headers: access_headers
    })
    .then((res) => res.json())
    .then((data) => {
        // console.log(data)
        cat_name = `${data.category_name}`;
        // data.forEach(function(category){
        //     output += `
        //     <tr>
        //         <td>${category.category_id}</td>
        //         <td>${category.category_name}</td>
        //         <td><input type="button" onclick="categoryProducts(${category.category_id})" value="Products"></td>

        //     </tr>
        //     `;
        // });
        // document.getElementById('getCategories').innerHTML = output;
    })
    .catch((err) => console.log(err));
}

function categoryProducts(category_id){
    url = "https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/category/" + category_id;
    fetch(url, {
        headers: access_headers
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        // output = "";
        // data.forEach(function(category){
        //     output += `
        //     <tr>
        //         <td>${category.category_id}</td>
        //         <td>${category.category_name}</td>
        //         <td><input type="button" onclick="categoryProducts(${category.category_id})" value="Products"></td>

        //     </tr>
        //     `;
        // });
        // document.getElementById('getCategories').innerHTML = output;
    })
    .catch((err) => console.log(err));
}