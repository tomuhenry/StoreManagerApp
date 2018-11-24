function getUsers(){
    fetch(user_url, {
        method:'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': "Bearer " + access_token
        }
    })
    .then((res) => res.json())
    .then((data) => {
        output = "";
        data.forEach(function(user){
            if(user.rights == true){
                rights = "Administrator"
            }
            else{
                rights = "Attendant"
            }
            output += `
            <tr>
                <td>${user.user_id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${rights}</td>
                <td><input type="button" onclick="getUser(${user.user_id})" value="View"></td>
                <td><input type="button" onclick="deleteUser('${user.email}')" value="Delete"></td>
                <td><input type="button" onclick="editUser(${user.user_id})" value="Edit"></td>
            </tr>
            `;
        });
        document.getElementById('getUsers').innerHTML = output;
    })
    .catch((err) => console.log(err));
}

loaderFunction(getUsers);

function getUser(user_id){
    
    url = user_url + '/' + user_id;
    console.log(url, {
        method:'GET',
        headers: access_headers
        });
    fetch(url, {
        headers: access_headers
    })
    .then((res) => res.json())
    .then((data) => {
        output = "";
        rights = data.rights;
        if(rights == true){
            rights = "Administrator";
        }
        else{
            rights = "Attendant";
        }
        output += `
        <h1>${data.name}</h1>
        <h3>User ID : <i>${data.user_id}</i></h3>
        <h3>Email : <i>${data.email}</i></h3>
        <h3>Admin Rights : <i>${rights}</i></h3>
        `;
        console.log(output);        
        sessionStorage.setItem("user", output);
        window.location = '/templates/viewusers.html';
    })
    .catch((err) => console.log(err));
}

function deleteUser(email){
    
    if (user_type == "admin"){
        url = user_url + '/' + email;
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
        alert("Only Admin can Perform Delete userss");
    }
}