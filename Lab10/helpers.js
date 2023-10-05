//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import { users } from "./config/mongoCollections.js";

export function checkData(firstName,lastName,emailAddress,password,role)
{   const regex = /^[a-zA-Z]+$/;
    if(!firstName){ throw "Please Enter name"} 
    if(typeof firstName!== 'string') throw 'Name must be a string'
    if(firstName.trim().length === 0) throw 'Name cannot be an empty string';
    if (!regex.test(firstName)) 
    {
        throw "The name is invalid.";
    }
    if(firstName.trim().length<2 || firstName.trim().length>25)
    {
        throw 'Name must be between 2 to 25 characters long'
    }

    if(!lastName){ throw "Please Enter name"} 
    if(typeof lastName!== 'string') throw 'Name must be a string'
    if(lastName.trim().length === 0) throw 'Name cannot be an empty string';
    if (!regex.test(lastName)) 
    {
        throw "The name is invalid.";
    }
    if(lastName.trim().length<2 || lastName.trim().length>25)
    {
        throw 'Name must be between 2 to 25 characters long'
    }
    if(!emailAddress){throw "Provide email Id"}
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if(!regexEmail.test(emailAddress))
	{
		throw "This is not a valid email address";
    }
    if(!password){throw 'Please Provide password' }
    if(typeof password!== 'string') throw 'password must be a string'
    if(password.trim().length === 0) throw 'password cannot be an empty string';    

    const regexPass =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
    if (!regexPass.test(password)) {throw 'Password is invalid'}
    
    if(!role){throw "Please Provide role"}
    if(typeof role!=='string') throw 'Role must be string'
    if(role.trim().length===0){throw "Please provide role , role cannot be empty string"}
    let temp =role.trim().toLowerCase();
    if( temp!=='admin' && temp!=='user'){ throw 'Invalid user role'}
}

export async function checkAvailable(emailAddress){
emailAddress=emailAddress.trim().toLowerCase();
const getUsers=await users()
let found=await getUsers.findOne({emailAddress: emailAddress});
if(found)
{
  throw "Cannot add user , user already exist"
}
}


export function checkLoginData(emailAddress,password)
{
    if(!emailAddress){throw "Provide email Id"}
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if(!regexEmail.test(emailAddress))
	{
		throw "This is not a valid email address";
    }
    if(!password){throw 'Please Provide password' }
    if(typeof password!== 'string') throw 'password must be a string'
    if(password.trim().length === 0) throw 'password cannot be an empty string';    

    const regexPass = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!regexPass.test(password)) {throw 'Password is invalid'}
}