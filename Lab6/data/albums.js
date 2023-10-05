// This data file should export all functions using the ES6 standard as shown in the lecture code
import {bands} from '../config/mongoCollections.js'
import { ObjectId } from 'mongodb';
import { checkID,checkAlbum, checkIDAl } from '../helpers.js';

const create = async (bandId,title,releaseDate,tracks,rating) => {
checkID(bandId);
await checkIDAl(bandId);
checkAlbum(title,releaseDate,tracks,rating);

bandId=bandId.trim();
title=title.trim();
releaseDate=releaseDate.trim();
tracks=tracks.map(ele=>ele.trim())

const getbands= await bands();
let newAlbum = {
    _id: new ObjectId(),
    title: title,
    releaseDate: releaseDate,
    tracks,
    rating
};

const updatedata = await getbands.findOneAndUpdate({_id: new ObjectId(bandId),albums: {$not:{$elemMatch:{title}}}}, { $addToSet: { albums: newAlbum } });
if(updatedata.lastErrorObject.n===0) {
  throw 'could not add data,please check if album title already exit';
}
const updateOverallRating = await getbands.findOneAndUpdate({ _id: new ObjectId(bandId) }, [{ $set: { overallRating: {$round:[{ $avg: '$albums.rating' },1] }} }]);
if(updateOverallRating.lastErrorObject.n===0) {
    throw 'could not update data';
  }
let found=await getbands.findOne({_id: new ObjectId(bandId)});
if(found===null){throw "This id is not present in database"}
found._id=found._id.toString();
found.albums.forEach(element => {
  element._id=element._id.toString()
  return element
});
return found

};

const getAll = async (bandId) => {
checkID(bandId);
await checkIDAl(bandId);

const getbands=await bands();
bandId=bandId.trim()
let list=await getbands.findOne({_id: new ObjectId(bandId)},{projection: {_id: 0,albums: 1}});
list.albums=list.albums.map((ele) => {
  ele._id = ele._id.toString();
  return ele;
});
return list.albums;
};

const get = async (albumId) => {
checkID(albumId)
albumId=albumId.trim();
const getbands = await bands();
const album = await getbands.findOne({ "albums._id": new ObjectId(albumId)},{projection: { _id: 0, albums: { $elemMatch: { _id: new ObjectId(albumId)}}}});
if(!album){ throw "There is no album with given ID" }
album.albums[0]._id=album.albums[0]._id.toString();
return album.albums[0]
};

const remove = async (albumId) => {
checkID(albumId)
albumId=albumId.trim()
const getbands=await bands();
const data=await getbands.findOne({"albums._id": new ObjectId(albumId)},{projection: {_id: 1}})
if(!data){throw "Could not find given ID "}
let tempID=data._id.toString()
const delalbum= await getbands.findOneAndUpdate({ 'albums._id': new ObjectId(albumId) }, { $pull: { albums: { _id: new ObjectId(albumId) } } });
if(delalbum.lastErrorObject.n===0) {
  throw 'could not remove data';
}

const orate = await getbands.findOneAndUpdate({ _id: new ObjectId(tempID) }, [{ $set: { overallRating: {$round:[{$ifNull:[{ $avg: '$albums.rating' },0]},1] }} }]);
if(orate.lastErrorObject.n===0) {
  throw 'could not update data';
}
return {albumId: albumId, deleted: true};
};


const AlbumDataFunctions={create,getAll,get,remove} 
export default AlbumDataFunctions;