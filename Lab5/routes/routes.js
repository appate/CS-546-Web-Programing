//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

/*
import the router and create the follow routes using the GET http method

'/aboutme';
'/mystory';
'/educationhistory'
export the router */
import { Router } from "express";
const router =Router();

router.get('/aboutme',async (req,res)=>{

     
    const about=
     {
        "firstName": "Aishwarya",
        "lastName": "Patel",      
        "biography": "I am from India, I have done my graduation in Computer Engineering.I have done my all work and projects majorly in Java.\nI like to work with java based projects mostly",
        "favoriteMovies": ["conjuring","Phir hera pheri","Annabelle"],
        "hobbies": ["watching horror movies","listening songs","foodie"],
        "fondestMemory": "My first errorless code!!"
      }
      res.json(about);

})
router.get("/mystory",async (req,res)=>{
    
         
        const about={
            "storyTitle": "The Haunted Doll",
            "storyGenre": "Horror",
            "story": "A young girl received a doll as a gift from her grandmother. She loved the doll and took it everywhere with her.\n One night, she woke up to find the doll staring at her with its eyes glowing in the dark. She threw the doll away, but it always found its way back to her room. The girl realized too late that the doll was possessed by an evil spirit, and it was too late to get rid of it."
          }
          res.json(about);
    
})
router.get("/educationhistory",async (req,res)=>{
    
         
    const about=[
        {
            "schoolName": "Bright Day School",
            "degreeEarned": "H.S. Diploma",
            "numberOfYearsAttended": 10,
            "favoriteClasses": ["Sci", "Gujarati", "History"],
            "favoriteSchoolMemory": "Every moment that I had spent with my teachers and friends!!!"
        },
        {
            "schoolName": "Narayan Vidhyalaya",
            "degreeEarned": "H.S. Diploma",
            "numberOfYearsAttended": 2,
            "favoriteClasses": ["Chem", "Bio"],
            "favoriteSchoolMemory": "Chemistry labs!!!"
        },
        {
            "schoolName": "VIER",
            "degreeEarned": "Bachelors in Computer Engineering",
            "numberOfYearsAttended": 4,
            "favoriteClasses": ["Design Micro Processing Units", "Basic Electronics"],
            "favoriteSchoolMemory": "Lab sessions were interesting!!"
        },
        {
            "schoolName": "Stevens Institute of Technology",
            "degreeEarned": "Masters in Computer Science",
            "numberOfYearsAttended": 2,
            "favoriteClasses": ["Mobile Systems & Applications", "Engineering Python"],
            "favoriteSchoolMemory": "Learned New Concepts with fun!!"
        }
    ]
      res.json(about);

})
router.get("*",async(req,res)=>{
    res.status(404).json({error: 'Not found'});
})
export default router