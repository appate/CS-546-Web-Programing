let register=document.getElementById("registration-form")
let loginuser=document.getElementById("login-form")
let errorDiv=document.getElementById("error");
if(register)
{
    register.addEventListener('submit', (event) => {
        event.preventDefault();
        let arr=[];
        errorDiv.hidden=true;
        errorDiv.innerHTML="";
        let firstName = document.getElementById("firstNameInput");
        let lastName = document.getElementById("lastNameInput");
        let email = document.getElementById("emailAddressInput");
        let password = document.getElementById("passwordInput");
        let confirmPassword = document.getElementById("confirmPasswordInput");
        let role = document.getElementById("roleInput");
        const regex = /^[a-zA-Z]{2,25}$/;
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const regexPass = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if(!regex.test(firstName.value)) arr.push("Enter Proper firstname please ,length b/w 2-25 , only string and no gap")
        if(!regex.test(lastName.value)) arr.push("Enter Proper lastname please ,length b/w 2-25 , only string and no gap")
        if(!regexEmail.test((email.value).trim().toLowerCase())) arr.push("Ivalid email id ")
        if (!password || !regexPass.test(password.value)) arr.push("Enter valid password");
        if(!confirmPassword || !regexPass.test(confirmPassword.value)) arr.push("Enter valid confirmpassword agian")
        if (password.value.trim() !== confirmPassword.value.trim()) arr.push("Both password not match");
        if(role.value==="")arr.push("Please select admin or user as role");
        if(arr.length>0)
        {
            errorDiv.hidden=false
            for(let i=0;i<arr.length;i++)
            {
                errorDiv.innerHTML+= arr[i] +`</br>`
            }
        }
        else
        {
            register.submit();
        }
    })
}
if(loginuser)
{
    loginuser.addEventListener('submit', (event) => {
        event.preventDefault();
        let arr=[];
        errorDiv.hidden=true;
        errorDiv.innerHTML="";
        let email = document.getElementById("emailAddressInput");
        let password = document.getElementById("passwordInput");
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!regexEmail.test((email.value).trim().toLowerCase())) arr.push("Ivalid email id ")
        const regexPass = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!password || !regexPass.test(password.value)) arr.push("Enter either password or email id properly!");
        if(arr.length>0)
        {
            errorDiv.hidden=false
            for(let i=0;i<arr.length;i++)
            {
                errorDiv.innerHTML+= arr[i] +`</br>`
            }
        }
        else
        {
            loginuser.submit();
        }
    })
}

