//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json
import axios from "axios";
async function getData1(){
    const {data} = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json');
    return data;
  }
 
export const findMoviesByDirector = async (directorName) => {
    if(directorName===undefined)
    {
        throw "Please Enter director"
    }
    if(typeof directorName!=='string')
    {
        throw "Not a string"
    }
    if(directorName.trim().length===0)
    {
        throw "Please Enter director"
    }
const data1= await getData1();
let result=data1.filter(({ director }) => director === directorName);
if(result.length===0)
{
    throw "No director found"
}
return result;
};

export const findMoviesByCastMember = async (castMemberName) => {
    if(castMemberName===undefined)
    {
        throw "Please Enter member"
    }
    if(typeof castMemberName!=='string')
    {
        throw "Not a string"
    }
    if(castMemberName.trim().length===0)
    {
        throw "Please Enter member"
    }
    const data1= await getData1();
    
    let result= data1.filter(ele=>ele.cast.includes(castMemberName))
    if(result.length===0)
    {
        throw "No Castmember with this name found"
    }
    
return result;

};

export const getOverallRating = async (title) => {
    if(title===undefined)
    {
        throw "Please Enter title"
    }
    if(typeof title!=='string')
    {
        throw "Not a string"
    }
    if(title.trim().length===0)
    {
        throw "Please Enter title"
    }
    const data1= await getData1();
    
    let temp=data1.find(ele=>ele.title===title) //.reviews.map(ele=>ele.rating).reduce((a,b)=>a+b)
    /*for(let i = 0; i < temp.reviews.length; i++) 
    {
        arr.push(temp.reviews[i].rating);
    }*/
    if(temp===undefined)
    {
        throw "No movie with that title"
    }
    let temp1=temp.reviews.map(ele=>ele.rating)
    if(temp1.length===0 || temp1===undefined)
    {
        throw "This movie has no rating"
    }
    let sum=0;
    temp1.forEach(function(ele) {sum+=ele});
    let ave= sum/temp1.length;
    let final=Math.floor(ave * 10)/10;
    return final;
};

export const getMovieById = async (id) => {
    if(id===undefined)
    {
        throw "Please Enter Id"
    }
    if(typeof id!=='string')
    {
        throw "Not a string Id"
    }
    if(id.trim().length===0)
    {
        throw "Please Enter Id"
    }
    const data1= await getData1();
    let temp=data1.find(ele=>ele.id===id);
    if(temp===undefined)
    {
        throw "Movie not found"
    }

    return temp

};




