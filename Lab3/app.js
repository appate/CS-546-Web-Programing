/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as movies from "./movies.js");

async function main(){
    try{
        const moviedata = await movies.getMovies();
        console.log (movieata);
    }catch(e){
        console.log (e);
    }
}

call main
main();
*/
import {getUserById,sameGenre,moviesReviewed,referMovies} from "./users.js";
import {findMoviesByDirector,findMoviesByCastMember,getOverallRating,getMovieById} from "./movies.js";
async function main() {
    //try removing the await keyword and run the application
    try
    {
      console.log(await getUserById("48fded55-37cd-4e6b-8f19-e78b481a14a4"));
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
      console.log(await getUserById(-1));
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
      console.log(await sameGenre("Action"));
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
      console.log(await sameGenre("IMAX"));
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
      console.log(await moviesReviewed('64035fad-a5b7-48c9-9317-3e31e22fe26c'));
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
      console.log(await moviesReviewed(1001));
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
      console.log(await referMovies('5060fc9e-10c7-4f38-9f3d-47b7f477568b'));
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
      console.log(await referMovies());
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
      console.log(await findMoviesByDirector());
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
      console.log(await findMoviesByDirector("Fernando Dollimore"));
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
      console.log(await findMoviesByCastMember("Huberto Snoddon"));
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
      console.log(await findMoviesByCastMember(""));
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
    console.log(await getOverallRating('Asterix and the Vikings (Astérix et les Vikings)'));
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
    console.log(await getOverallRating('Mamma Mia'));
    } 
    catch (e) 
    {
      console.log(e);
    }
    try
    {
      console.log(await getMovieById("38fd6885-0271-4650-8afd-6d09f3a890a2"))
    }
    catch(e)
    {
      console.log(e);
    }
    try
    {
      console.log( await getMovieById(1001))
    }
    catch(e)
    {
      console.log(e);
    }

}
  main();
 