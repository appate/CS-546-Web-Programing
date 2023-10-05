//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes
import axios from "axios";
import {Router} from 'express';
const router = Router();
router.route('/').get(async (req, res) => {
  //code here for GET
  try 
  {
    res.render('homepage',{title: "Venue Finder"});

  } 
  catch (e) 
  {
    res.status(500).json({ error: e });
  }
});

router.route('/searchvenues').post(async (req, res) => {
  //code here for POST
  const word=req.body.searchVenueTerm
  if (word.trim().length == 0) 
  {
    res.status(400).render('error', { class: "error", message: "must be non-empty string." });
    return;
  }
try
{
  const {data}= await axios.get("https://app.ticketmaster.com/discovery/v2/venues?keyword="+`${word}`+"&apikey={$API_KEY}&countryCode=US")
  if (!data || !data._embedded || !data._embedded.venues || data._embedded.venues.length === 0) {
    res.status(404).render('venueNotFound',{class:"not-found", message: "We're sorry, but no results were found for "+ word});
    return;
  }
  
  let data1=data._embedded.venues;
  let result=[]
  if(data1.length>10)
  {
    for(let i=0;i<10;i++)
    {
      result.push(data1[i]);
    }
  }
  else
  {
    for(let i1=0;i1<data1.length;i1++)
    {
      result.push(data1[i1]);
    }
  }
  res.render('venueSearchResults', {title: "Venues Found",searchVenueTerm: word, searchResults: result })
}
catch(e)
{
  res.status(500).json({ error: e });
}
});

router.route('/venuedetails/:id').get(async (req, res) => {
  //code here for GET
  const id = req.params.id;
  try
  {
    const {data}=await axios.get("https://app.ticketmaster.com/discovery/v2/venues/"+`${id}`+"?&apikey={$API_KEY}&countryCode=US");
    if(!data)
    {
      res.status(404).render('error', { class: "error", message: "No data found" });
      return
    }
    let title,imgurl="",url1,add,city,scode,pcode,pdetail;
    if(!data.name){title="N/A"}
    else{title=data.name}

    if(!(data.images)){imgurl="\\public\\images\\No_Image_Available.jpg"}
    else{imgurl=(data.images.find(ele=>ele.url)).url}

    if(!data.url){url1=false}
    else{url1=data.url}

    if(!data.address.line1){add="N/A"}
    else{add=data.address.line1}

    if(!data.city){city="N/A"}
    else{city=data.city.name}

    if(!data.state.stateCode ){scode="N/A"}
    else{scode=data.state.stateCode}

    if(!data.postalCode){pcode="N/A"}
    else{pcode=data.postalCode}

    if(!data.boxOfficeInfo){pdetail="N/A"}
    else{pdetail=data.boxOfficeInfo.phoneNumberDetail}
    res.render('venueByID',{title:title , imag:imgurl  ,url:url1 , addline1:add ,cname:city  ,stateCode:scode  ,postalCode:pcode  ,phoneNumberDetail:pdetail  })

  }
  catch(e)
  {
    res.status(404).render('error', { class: "error", message: "No data found" });
  }
});
export default router;