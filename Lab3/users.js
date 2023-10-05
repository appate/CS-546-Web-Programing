//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//User data link: https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json
import axios from 'axios';

async function getData(){
    const {data} = await axios.get('https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json');
    return data;
  }
async function getData1(){
    let {data} = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json');
    return data
  }
function checkid(id)
{
    if((id===undefined))
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
}
export const getUserById = async (id) => {
   
    checkid(id);
    const data = await getData();
    let y=data.find(ele=>ele.id===id) // Because we want only match data 
    if(y===undefined)
    {
        throw "User not found Error"
    }
   
    return y;  
};

export const sameGenre = async (genre) => {
    if(genre===undefined)
    {
        throw "Please Enter genre"
    }
    if(typeof genre!=='string')
    {
        throw "Not a string"
    }
    if(genre.trim().length===0)
    {
        throw "Please Enter genre"
    }
    const data = await getData();
    let y=data.filter(ele=>ele.favorite_genre.toLowerCase()===genre.toLowerCase())
    if(y.length===0|| y===undefined)
    {
        throw "There are not two people with that genre"
    }
    let y1=y.map(ele=>ele.first_name + ' ' + ele.last_name)
    let temp1=[];
    if(y1.length>50)
    {
        for(let i=0;i<50;i++)
        {
            temp1[i]=y1[i];
        }
    }
    else
    {
        temp1=y1
    }
    let final=temp1.slice().sort(function(ele1,ele2) // ref link https://stackoverflow.com/questions/24173245/javascript-array-sort-by-last-name-first-name    and    https://codepen.io/myogeshchavan97/pen/XWJyRoZ?editors=0011
    { 
        const lastname1=ele1.split(" ")[1];
        const lastname2=ele2.split(" ")[1];
        if(lastname1<lastname2) return -1;
        if(lastname1>lastname2) return 1;
        return 0;
    });
    if(final.length<2)
    {
        throw "There are not two people with that genre"
    }
    return final;
    
};

export const moviesReviewed = async (id) => {
checkid(id);
const data = await getData();
let y=data.filter(ele=>ele.id===id).map(ele=>ele.username);
if(y.length===0 || y===undefined)
{
    throw "user not found Error"
}
const data1= await getData1();
let len1=Object.keys(data1);
let ch=[]
let result1=[]
for(let i1=0;i1<len1.length;i1++)
{
    if(data1[i1].hasOwnProperty('title'))
    {
        let tempobj={};
        tempobj=data1[i1].valueOf();
        let findin=tempobj['reviews'];
        for(let i=0;i<findin.length;i++)
        {
     
            let p=findin[i]["username"]
            if(p===y[0])
            {   
                ch.push('true');
                let result={}
                let r=data1[i1]['title']
                let d=findin.filter(ele=>ele.username==p)
                result[r]=d[0];
                result1.push(result);
            }
            if(p!==y[0])
            {
                ch.push('false');
            }
        }
    }
}
let count1=['not'];
for(let i=0;i<ch.length;i++)
{
    if(ch[i]=='true')
    {
        count1.push('got');
        break;
    }
}
if(!count1.includes('got'))
{
    throw "user not found"
}
return result1;
}

export const referMovies = async (id) => {
checkid(id);
const data = await getData();
let uname=data.filter(ele=>ele.id===id).map(ele=>ele.username)
if(uname.length===0 || uname===undefined)
{
    throw "User not found Error"
}
let type=data.filter(ele=>ele.id===id).map(ele=>ele.favorite_genre)
const data1= await getData1();
let temp1=data1.filter(ele=>ele.genre.split("|").includes(type[0]));
let arr=[];
for(let i1=0;i1<temp1.length;i1++)
{
    if(temp1[i1].hasOwnProperty('title'))
    {
        let tempobj={};
        tempobj=data1[i1].valueOf();
        let findin=tempobj['reviews'];
        for(let i=0;i<findin.length;i++)
        {
     
            let p=findin[i]["username"]
            if(p!==uname[0])
            {   
                
                let r=temp1[i1]['title']
                if(!(arr.includes(r)))
                {
                    arr.push(r);
                }
        
            }
        }
    }
}
if(arr.length===0)
{
    throw "User watched all movies"
}
return arr;
};