//import mongo collections, bcrypt and implement the following data functions

import {users} from '../config/mongoCollections.js'
import {checkData,checkLoginData} from '../helpers.js';
import bcrypt from 'bcrypt';


export const createUser = async (firstName,lastName,emailAddress,password,role) => 
{
const saltRounds = 10;
let hashpass;

checkData(firstName,lastName,emailAddress,password,role);

firstName=firstName.trim()
lastName=lastName.trim()
emailAddress=emailAddress.trim().toLowerCase()
password=password.trim()
role=role.trim().toLowerCase()

try{
  hashpass= await bcrypt.hash(password,saltRounds);}
catch(e){}

const newdata={firstName:firstName,lastName:lastName,emailAddress:emailAddress,password:hashpass,role:role}
const getUsers=await users()
let found=await getUsers.findOne({emailAddress: emailAddress});
if(found)
{
  throw "Cannot add user , user already exist"
}

  let result=await getUsers.insertOne(newdata)
  if(!result.acknowledged || !result.insertedId){throw "Could not add info"}
  return {insertedUser:true}

};

export const checkUser = async (emailAddress, password) => {
  checkLoginData(emailAddress,password)
  emailAddress=emailAddress.trim().toLowerCase()
  password=password.trim()
  const getUsers=await users()
  let found=await getUsers.findOne({emailAddress: emailAddress});
  if(!found || found===null)
  {
    throw "Either the userid or password is invalid"
  }
  let compare;
  compare = await bcrypt.compare(password,found.password);
  
  console.log(compare)
  if (compare==false) throw "Either the userid or password is invalid";
  return {fistName:found.firstName,lastName:found.lastName,emailAddress:found.emailAddress,role:found.role}
};

const usersDataFunctions={createUser,checkUser}
export default usersDataFunctions;