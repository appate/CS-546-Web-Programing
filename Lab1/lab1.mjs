export const questionOne = (arr) =>
{
  // Implement question 1 here
  let cube = arr.map((x) => {         // calculating cube using map function
    return x*x*x;
  });
  
  let sum =0
  sum = cube.reduce((num1,num2) => {     // sum of elements using reduce
  return num1+num2
  });

  var flag = isPrime(sum);
  function isPrime(sum)       // check for prime normal function
  {
    if(sum==1 || sum==0)
    {
      return false;
    }
    for (var i=2; i<sum;i++) 
    {
      
      if(sum%i===0 )
      {
        return false;
      }
      
    }
    return true;
      
  }
  let retOBJ= {}        // creating empty object then adding key and value
  let keyname=sum;
  retOBJ[keyname] = flag;
  return retOBJ;      //return result
};

export const questionTwo = (numArray) =>
{
let arr1=numArray;
// Implement question 2 here
let b=["test"];
let y=checkFunction(arr1);

function checkFunction(arr1){               // creating function to check array elemets and pushing it to final array if not sorted.
    
  for(var i = 0; i < arr1.length-1; i++){
   
      if(arr1[i] > arr1[i+1])
      {
        b.pop();
        b.push(false);
        b.push(i);
        b.push(i+1);
        break;
      }
      else
      {
        b.pop();
        b.push(true);
      }
  }
 }

return b ;  // return result
};

export const questionThree = (obj1, obj2) =>
{
// Implement question 3 here
const arr1=Object.keys(obj1);     // getting keys in arrays
const arr2=Object.keys(obj2);
let arr3=arr1.concat(arr2);
let myobj={}
let key;
arr3=[...new Set([...arr1,...arr2])]
    for (let i=0;i<arr3.length;i++)     // create new obj and add keys
    {
       let u= arr3[i];
       myobj[u]=false;
               
    }
    for(key in obj2)      // compare keys in obj1 and obj2
    {
      for(let key1 in obj1)
      {
        if(key1==key)     // set for only that values are true
        {
          myobj[key]=true
        }
        
      }
    }
    return myobj;
};
export const questionFour = (string) => 
{
  const arr1=[];
  // Implement question 4 here
  const str = string.split('\n');   // split by new line
  str.forEach(v=>{                  // spilt by comma
  arr1.push(v.split(','));
  })
 return arr1;
};

export const studentInfo = {
  firstName: 'AISHWARYA',
  lastName:  'PATEL',
  studentId: '20009009'
};
