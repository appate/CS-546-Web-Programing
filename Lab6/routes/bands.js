// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
import {bandData} from '../data/index.js';
import { checkData,checkID } from '../helpers.js';
const router = Router();
router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      const bandList = await bandData.getAll();
      let arr=[]
      for (let i = 0; i < bandList.length; i++)
       {
        arr.push({ _id: bandList[i]._id, name: bandList[i].name });
       }
      res.status(200).json(arr);
    } catch (e) {
      res.status(500).json({error: e});
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
        checkData(Data.name,Data.genre,Data.website,Data.recordCompany,Data.groupMembers,Data.yearBandWasFormed);
    }
    catch(e)
    {
      return res.status(400).json({error: e});
    }
    try
    {
      Data.name=Data.name.trim()
      Data.website=Data.website.trim()
      Data.recordCompany=Data.recordCompany.trim()
      Data.genre=Data.genre.map(ele=>ele.trim())
      Data.groupMembers=Data.groupMembers.map(ele=>ele.trim()) 
      const newband=await bandData.create(Data.name,Data.genre,Data.website,Data.recordCompany,Data.groupMembers,Data.yearBandWasFormed)
      res.status(200).json(newband);
    }
    catch(e)
    {
      return res.status(500).json({error: e});
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    //code here for GET
    try
    {
      checkID(req.params.id);
    }
    catch(e)
    { return res.status(400).json({error: e})}
    
    try
    {    
      let id=req.params.id.trim()
      const data=await bandData.get(id);
      res.status(200).json(data);
    }
    catch(e)
    {
      return res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try
    {
      checkID(req.params.id);
    }
    catch(e)
    { return res.status(400).json({error: e})}
    try 
    {
      await bandData.get(req.params.id);
    }
    catch (e) 
    {
      return res.status(404).json({ error: e });
    }
    try
    {    
      let id=req.params.id.trim()
      const data=await bandData.remove(id);
      res.status(200).json(data);
    }
    catch(e)
    {
      return res.status(500).json({error: e});
    }
  
  })
  .put(async (req, res) => {
    //code here for PUT
    let bandInfo = req.body;
    if (!bandInfo || Object.keys(bandInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    try
    {
      checkID(req.params.id);
    }
    catch(e)
    { return res.status(400).json({error: e})}
    try 
    {
      await bandData.get(req.params.id);
    }
    catch (e) 
    {
      return res.status(404).json({ error: e });
    }
    try
    {
        checkData(bandInfo.name,bandInfo.genre,bandInfo.website,bandInfo.recordCompany,bandInfo.groupMembers,bandInfo.yearBandWasFormed);
    }
    catch(e)
    {
      return res.status(400).json({error: e});
    }
    try 
    {
      const updatedBand = await bandData.update(
          req.params.id.trim(),
          bandInfo.name.trim(),
          bandInfo.genre.map(ele=>ele.trim()) ,
          bandInfo.website.trim(),
          bandInfo.recordCompany.trim(),
          bandInfo.groupMembers.map(ele=>ele.trim()),
          bandInfo.yearBandWasFormed
      );
      res.status(200).json(updatedBand);
  } catch (e) {
      res.status(500).json({ error: e });
  }
  });
export default router;