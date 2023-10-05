// This data file should export all functions using the ES6 standard as shown in the lecture code
import {bands} from '../config/mongoCollections.js'
import { ObjectId } from 'mongodb';
import { checkData,checkID } from '../helpers.js';
const create = async (name,genre,website,recordCompany,groupMembers,yearBandWasFormed) => {
checkData(name,genre,website,recordCompany,groupMembers,yearBandWasFormed);
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
yearBandWasFormed: yearBandWasFormed,
albums: [],
overallRating: 0
};
const getbands=await bands();
const Info= await getbands.insertOne(newdata);
if(!Info.acknowledged || !Info.insertedId){throw "Could not add info"}

const newId = Info.insertedId.toString();
const returndata=await get(newId);
return returndata
};

const getAll = async () => {
  const getbands=await bands();
  let alldata=await getbands.find({}).toArray();
   alldata=alldata.map((ele) => {
    ele._id = ele._id.toString();
    return ele;
  });
  return alldata;
};

const get = async (id) => {
  checkID(id);
  id=id.trim();
  const getbands=await bands();
  let found=await getbands.findOne({_id: new ObjectId(id)});
  if(found===null){throw "This id is not present in database"}
  found._id=found._id.toString();
  return found
};

const remove = async (id) => {
  checkID(id)
  id=id.trim();
  const getbands=await bands();
  let deldata=await getbands.findOneAndDelete({ _id: new ObjectId(id) });
  if(deldata.lastErrorObject.n===0) 
  {
    throw `"No data with id : ${id}"`;
  }
  return {"bandId": deldata.value._id.toString(),"deleted": true}
};

const update = async (id,name,genre,website,recordCompany,groupMembers,yearBandWasFormed) => {
  checkID(id);
  checkData(name,genre,website,recordCompany,groupMembers,yearBandWasFormed);
  id=id.trim();
  name=name.trim()
  website=website.trim()
  recordCompany=recordCompany.trim()
  genre=genre.map(ele=>ele.trim())
  groupMembers=groupMembers.map(ele=>ele.trim()) 
  const getbands=await bands();
  const alb = await get(id);
  let upd={
    name: name,
    genre: genre,
    website: website,
    recordCompany: recordCompany,
    groupMembers: groupMembers,
    yearBandWasFormed: yearBandWasFormed,
    albums: alb.albums,
    overallRating: alb.overallRating
    };
    const updatedata = await getbands.findOneAndUpdate({_id: new ObjectId(id)},{$set: upd},{returnDocument: 'after'});
    if(updatedata.lastErrorObject.n===0) {
      throw 'could not update data';
    }
    updatedata.value._id = updatedata.value._id.toString();
    return updatedata.value;
};
const bandsDataFunctions={create,getAll,get,remove,update}
export default bandsDataFunctions;