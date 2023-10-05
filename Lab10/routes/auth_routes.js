//import express, express router as shown in lecture code
import {Router} from 'express';
const router = Router();
import usersDataFunctions from "../data/users.js"
import {checkData,checkLoginData,checkAvailable} from '../helpers.js';

router.route('/').get(async (req, res,next) => {
  if(!req.session.user)
  {
    return res.redirect("/login")
  }
  else if(req.session.user.role='admin')
  {
    return res.redirect("/admin");
  }
  else if(req.session.user.role='user')
  {
    return res.redirect("/protected");
  }
 next()
},
 async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    res.render("register", { title: "Register",header:"Register" });
  })
  .post(async (req, res) => {
    //code here for POST
    let Data=req.body;
    try
    {
       await checkAvailable(Data.emailAddress);
    }
    catch(e)
    {
      return res.status(400).render("error", {message: e});
    }
    try
    {
      checkData(Data.firstName,Data.lastName,Data.emailAddress,Data.password,Data.role);
    }
    catch(e)
    {
      return res.status(400).render("error", {message: e});
    }
    try
    {
      const inserted= await usersDataFunctions.createUser(Data.firstName,Data.lastName,Data.emailAddress,Data.password,Data.role);
      if(inserted.insertedUser==true)
      {
        return res.render("login", { title: "Login",header:"Login" });
      }
    }
    catch(e)
    {
      return res.status(500).render("error", {message: e});
    }

  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    res.render("login", { title: "Login",header:"Login" });
  })
  .post(async (req, res) => {
    //code here for POST
    let Data=req.body;
    try
    {
       checkLoginData(Data.emailAddress,Data.password);
    }
    catch(e)
    {
      return res.status(400).render("error", {message: e});
    }
    try
    {
      let uservalid=await usersDataFunctions.checkUser(Data.emailAddress,Data.password);
      if (uservalid) {
        req.session.user = uservalid;
        if (req.session.user.role === "user")
        {return  res.redirect("/protected")};
        if (req.session.user.role === "admin") 
        {return res.redirect("/admin")};}
    }
    catch(e)
    {
      return res.status(500).render("error", {message: e});
    }

  });

router.route('/protected').get(async (req, res) => {
  //code here for GET
  return res.render("protected", {title:"Protected",header:"Protected route",firstName:req.session.user.firstName,currentTime:new Date().toUTCString(),role: req.session.user.role,role: req.session.user.role});
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  return res.render("admin",{title:"admin",header:"Admin route",firstName:req.session.user.firstName,currentTime:new Date().toUTCString()});
});

router.route('/error').get(async (req, res) => {
  //code here for GET
  return res.render("error",{title:"Error",header:"Error Page!",message:"You don't have permission to see this page"})
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  return res.render("logout",{title:"Logout",header:"Logged Out!"})
});

export default router;