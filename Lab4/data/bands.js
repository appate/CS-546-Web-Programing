// TODO: Export and implement the following functions in ES6 format
import {bands} from '../config/mongoCollections.js'
import { ObjectId } from 'mongodb';
import { checkData } from '../helpers.js';

export const create = async (name,genre,website,recordCompany,groupMembers,yearBandWasFormed) => {
checkData( name,genre,website,recordCompany,groupMembers,yearBandWasFormed);
name=name.trim()
website=website.trim()
recordCompany=recordCompany.trim()
genre=genre.map(ele=>ele.trim())
groupMembers=groupMembers.map(ele=>ele.trim()) 
let newdata={
name: name,
genre: genre,
website: website,
recordCompany: recordCompany,
groupMembers: groupMembers,
yearBandWasFormed: yearBandWasFormed

};
const getbands=await bands();
const Info= await getbands.insertOne(newdata);
if(!Info.acknowledged || !Info.insertedId){throw "Could not add info"}

const newId = Info.insertedId.toString();
const returndata=await get(newId);
return returndata
};

export const getAll = async () => {
  const getbands=await bands();
  let alldata=await getbands.find({}).toArray();
  if(!alldata || !alldata.length===0)
   {
    throw "Can not get data"
   }
   alldata=alldata.map((ele) => {
    ele._id = ele._id.toString();
    return ele;
  });
  return alldata;
};

export const get = async (id) => {
if(!id){throw "Please provide id"}
if(typeof id!=='string'){throw "Enter valid string id only"}
if(id.trim().length===0){throw "Please Enter valid string id, not just Empty String"}
if(!ObjectId.isValid(id.trim())){throw "This id is not valid id"}

id=id.trim();
const getbands=await bands();
let found=await getbands.findOne({_id: new ObjectId(id)});
if(found===null){throw "This id is not present in database"}
found._id=found._id.toString();
return found
};

export const remove = async (id) => {
if(!id){throw "Please provide id"}
if(typeof id!=='string'){throw "Enter valid string id only"}
if(id.trim().length===0){throw "Please Enter valid string id, not just Empty String"}
if(!ObjectId.isValid(id.trim())){throw "This id is not valid id"} 

id=id.trim();
const getbands=await bands();
let deldata=await getbands.findOneAndDelete({ _id: new ObjectId(id) });
if(deldata.lastErrorObject.n===0) 
{
  throw `"Could not delete data with id of ${id}"`;
}
return `"${deldata.value.name} has been successfully deleted!"`;

};

export const rename = async (id, newName) => {
if(!id){throw "Please provide id"}
if(typeof id!=='string'){throw "Enter valid string id only"}
if(id.trim().length===0){throw "Please Enter valid string id, not just Empty String"}
if(!ObjectId.isValid(id.trim())){throw "This id is not valid id"} 
if(!newName){ throw "Please Enter name"} 
if(typeof newName!== 'string') throw 'newName must be a string'
if(newName.trim().length === 0) throw 'newName cannot be an empty string';
id=id.trim();
newName=newName.trim();

const getbands=await bands();
let found=await getbands.findOne({_id: new ObjectId(id)});
if(found===null){throw "This id is not present in database"}
if(found.name.trim()===newName){throw "This name is already available"} 
const upd=
{
  name: newName
};
const updatedata = await getbands.findOneAndUpdate({_id: new ObjectId(id)},{$set: upd},{returnDocument: 'after'});
if(updatedata.lastErrorObject.n===0) {
  throw 'could not update data';
}
updatedata.value._id = updatedata.value._id.toString();
return updatedata.value;
};

