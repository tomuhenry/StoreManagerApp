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
            output += `
            <tr>
                <td>${user.user_id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.rights}</td>
            </tr>
            `;
        });
        document.getElementById('getUsers').innerHTML = output;
    })
    // .catch((error) => console.log(error));
}

if(window.addEventListener) {
window.addEventListener('load',getUsers,false);
} else {
window.attachEvent('onload',getUsers);
}

document.getElementById("addUser").addEventListener("submit", addUser);

function addUser(e){
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let rights = document.getElementById('rights').value;

    fetch('https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/auth/signup', {
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'Authorization': "Bearer " + access_token
        },
        body:JSON.stringify({name:name, email:email, password:password, rights:rights})
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
    location.reload();

}
