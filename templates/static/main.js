function adminLog(){
    var adminEmail = document.forms["admin-login"]["email"].value;
    var adminPassword = document.forms["admin-login"]["password"].value;

    if(adminEmail == "admin@admin.com" & adminPassword == "password"){
        return true;
    }
    else{
        alert("Sorry: Wrong Login Information");
        return false;
    }
    
}

function attendantLog(){
    var userEmail = document.forms["attendant-login"]["email"].value;
    var userPassword = document.forms["attendant-login"]["password"].value;

    if(userEmail == "user@user.com" & userPassword == "password"){
        return true;
    }
    else{
        alert("Sorry: Wrong Login Information");
        return false;
    }
    
}