// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

import { ObjectId } from "mongodb";
import {bands} from './config/mongoCollections.js'
import  moment  from "moment"

export function checkData(name,genre,website,recordCompany,groupMembers,yearBandWasFormed)
{
  if(!name){ throw "Please Enter name"} 
  if(typeof name!== 'string') throw 'Name must be a string'
  if(name.trim().length === 0) throw 'Name cannot be an empty string';

  if(!genre){ throw "Please Enter genre" }
  if (!Array.isArray(genre) || genre.length === 0) throw 'You must give atleast one genre and enter it in array';
  for (let i in genre)
  {
  if (typeof genre[i]!== 'string' || genre[i].trim().length===0) {
      throw 'Check one or more genre either empty or not string';
    }
  }
  if(!website){ throw "Please Enter website" }
  if(typeof website!== 'string') throw 'website must be a string'
  if(website.trim().length === 0) throw 'website cannot be an empty string';
  if(!website.trim().startsWith("http://www.") || !website.trim().endsWith(".com") || website.trim().length<20) 
    {throw "Invalid website URL. The URL should start with 'http://www.' and end with '.com', and have at least 5 characters in-between."}
    

  if(!recordCompany){ throw "Please Enter recordCompany" }
  if(typeof recordCompany!== 'string') throw 'recordcompany must be a string'
  if(recordCompany.trim().length === 0) throw 'recordcompany cannot be an empty string';


  if(!groupMembers){ throw "Please Enter groupmembers" }
  if (!Array.isArray(groupMembers) || groupMembers.length === 0) throw 'You must give atleast one member and enter it in array';
  for (let i in groupMembers)
  {
  if (typeof groupMembers[i]!== 'string' || groupMembers[i].trim().length===0) {
      throw 'Check one or more member either empty or not string';
    }
  }

  if(!yearBandWasFormed){ throw "Please Enter year when band was formed" }
  if(typeof yearBandWasFormed!=='number' || yearBandWasFormed<1900 || yearBandWasFormed>2023) //  yearBandWasFormed>new Date().getFullYear()
  {
    throw  "Must be number and between 1900-2023"
  }
  
  if (!Number.isInteger(yearBandWasFormed)){ throw "Year must be whole number"};
}

export function checkID(id)
{
  if(!id){throw "Please provide id"}
  if(typeof id!=='string'){throw "Enter valid string id only"}
  if(id.trim().length===0){throw "Please Enter valid string id, not just Empty String"}
  if(!ObjectId.isValid(id.trim())){throw "This id is not valid id"} 
}

export function checkAlbum(title,releaseDate,tracks,rating)
{
  if(!title){throw "please enter title"}
  if(typeof title!== 'string') throw 'Title must be a string'
  if(title.trim().length === 0) throw 'Title cannot be an empty string';

  if(!releaseDate){throw "please enter release date"}
  if(typeof releaseDate!== 'string') throw 'Enter Date in string form'
  if(releaseDate.trim().length === 0) throw 'Date cannot be an empty string';
  releaseDate=releaseDate.trim()
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(releaseDate)) {throw "Invalid Date formate"}
  const date = moment(releaseDate, 'MM/DD/YYYY');
  if (!date.isValid()) {
    throw ('Invalid date. Please enter a valid date in the format MM/DD/YYYY');
  }

  let dateyear = releaseDate.split("/");
  let year = parseInt(dateyear[2]);
  let currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear+1) throw `The album release date must be in range between 1900 - ${currentYear+1}`;
  
  
  if(!tracks){throw "please enter tracks"}
  if (!Array.isArray(tracks) || tracks.length < 3) throw 'You must give atleast 3 tracks and enter it in array form';
  for (let i in tracks)
  {
    if (typeof tracks[i]!== 'string' || tracks[i].trim().length===0) 
    {
      throw 'Check one or more tracks either empty or not string';
    }
  }
  
  
  if(!rating){throw "please enter rating"}
  if (typeof rating != 'number') {throw "The album rating must be a number"};
  if (rating < 1 || rating > 5) {throw "The album rating must be in b/w 1-5"};
  if (!Number.isInteger(rating) && !Number.isInteger(rating * 10) && !Number.isInteger(rating * 100)) {
      {throw "Number must be an integer or have one decimal place"};
  }
}
export async function  checkIDAl(id)
{
  const getbands=await bands();
  let found=await getbands.findOne({_id: new ObjectId(id.trim())});
  if(found===null){throw "Given Id is not present in database"}
}
export async function  checkIDB(albumId)
{
  const getbands=await bands();
  const data=await getbands.findOne({"albums._id": new ObjectId(albumId)},{projection: {_id: 1}})
  if(!data){throw "Could not find given ID "}
}