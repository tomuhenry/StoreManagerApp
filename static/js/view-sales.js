function getSales(){
    fetch(sale_url, {
        headers: access_headers
    })
    .then((res) => res.json())
    .then((data) => {
        output = "";
        data.forEach(function(sale){
            console.log(data);
            output += `
            <tr>
                <td>${sale.sale_id}</td>
                <td>${sale.product_name}</td>
                <td>${sale.sale_quantity}</td>
                <td>${sale.sale_price}/=</td>
                <td>${sale.date_sold}</td>
                <td><input type="button" onclick="getSale(${sale.sale_id})" value="View"></td>
            </tr>
            `;
            console.log(output);
        });        
        document.getElementById('getSales').innerHTML = output;
        
    })
    .catch((err) => console.log(err));
}
loaderFunction(getSales);

function getSale(sale_id){
    
    url = sale_url + '/' + sale_id;
    console.log(url);
    fetch(url, {
        headers: access_headers
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        output = "";
            output += `
            <h2>Product: <i>${data.product_name}</i></h2>
            <h3>Sale ID: <i>${data.sale_id}</i></h3> 
            <h3>Quantity: <i>${data.sale_quantity}</i></h3>
            <h3>Total Sale: <i>${data.sale_price}/=</i></h3>
            <h3>Date Sold:  <i>${data.date_sold}</i></h3>
            `;
            console.log(output);
            sessionStorage.setItem("sale", output);
            window.location = '/templates/viewsale.html';
    })
    .catch((err) => console.log(err));
}

