// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
import { albumData} from '../data/index.js';
import { checkAlbum,checkID, checkIDAl,checkIDB } from '../helpers.js';
const router = Router();

router
  .route('/:bandId')
  .get(async (req, res) => {
    //code here for GET
    try
    {
        checkID(req.params.bandId);
    }
    catch(e)
    {
      return res.status(400).json({error: e});
    }
    try
    {
        await checkIDAl(req.params.bandId.trim());
    }
    catch(e)
    {
      return res.status(404).json({error: e});
    }
    try
    {
      const result=await albumData.getAll(req.params.bandId);
      res.status(200).json(result);
    }
    catch(e)
    {
      return res.status(500).json({error: e});
    }



  })
  .post(async (req, res) => {
    //code here for POST
    let Data = req.body;
    if (!Data || Object.keys(Data).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    try
    {
        checkID(req.params.bandId);
    }
    catch(e)
    {
      return res.status(400).json({error: e});
    }
    try
    {
        await checkIDAl(req.params.bandId.trim());
    }
    catch(e)
    {
      return res.status(404).json({error: e});
    }
    try
    {
        checkAlbum(Data.title,Data.releaseDate,Data.tracks,Data.rating);
    }
    catch(e)
    {
      return res.status(400).json({error: e});
    }
    try
    { 
       let id=req.params.bandId.trim();
       Data.title=Data.title.trim();
       Data.releaseDate=Data.releaseDate.trim()
       Data.tracks=Data.tracks.map(ele=>ele.trim())
       const display=await albumData.create(id,Data.title,Data.releaseDate,Data.tracks,Data.rating)
       res.status(200).json(display)
    }
    catch(e)
    {
      return res.status(500).json({error: e});
    }

  });

router
  .route('/album/:albumId')
  .get(async (req, res) => {
    //code here for GET
    try
    {
      checkID(req.params.albumId)
    }
    catch(e)
    {
      return res.status(400).json({error: e});
    }
    try
    {
      await checkIDB(req.params.albumId.trim())
    }
    catch(e)
    {
      return res.status(404).json({error: e});
    }
    try
    {
      const album= await albumData.get(req.params.albumId);
      res.status(200).json(album);
    }
    catch (e) 
    {
      return res.status(500).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try
    {
      checkID(req.params.albumId)
    }
    catch(e)
    {
      return res.status(400).json({error: e});
    }
    try
    {
      await checkIDB(req.params.albumId.trim())
    }
    catch(e)
    {
      return res.status(404).json({error: e});
    }
    try
    {
     const result=await albumData.remove(req.params.albumId)
     res.status(200).json(result);
    }
    catch(e)
    {
      return res.status(500).json({ error: e });
    }
  });
export default router