document.getElementById("addUser").addEventListener("submit", addUser);

reg_url = 'https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/auth/signup';

function addUser(e){
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let rights = document.getElementById('rights').value;

    if (rights == "True"){
        rights = true;
    }
    else{
        rights = false;
    }
    fetch(reg_url, {
        method:'POST',
        headers: access_headers,
        body:JSON.stringify({name:name, email:email, password:password, rights:rights})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if(data.Message){
            output = `${data.Message}`;
        }
        else if(data.error){
            output = `${data.error}`;
        }
        document.getElementById('message').innerHTML = output;
        
    })
    .then(() =>location.reload())
    .catch((err) => console.log(err));

}
