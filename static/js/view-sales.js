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
                <td>${sale.product_sold}</td>
                <td>${sale.sale_quantity}</td>
                <td>${sale.sale_price}</td>
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
