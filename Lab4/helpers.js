// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
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

  if(!yearBandWasFormed){throw "Please Enter year when band was formed"}
  if(typeof yearBandWasFormed!=='number' || yearBandWasFormed<1900 || yearBandWasFormed>2023) //  yearBandWasFormed>new Date().getFullYear()
  {
    throw  "Must be number and between 1900-2023"
  }
}

