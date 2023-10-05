/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let areObjectsEqual = (...args) => {
      //this function takes in a variable number of objects that's what the ...args signifies
     if(args.length===0)
     {
      throw "Please Enter Input";
     }
      for(let i=0;i<args.length;i++)
      {
        if(typeof args[i]!=='object' || Array.isArray(args[i]) || args.length<2 || args[i]===null)
        {
          throw "Please check type of input or check number of input";
        }
      }
      let obj1=args[0];
      for(let i=1;i<args.length;i++)
      {
        let o=(compareObj(obj1,args[i]))
      if(!o)
      {
          return false;
      }
      obj1=args[i];
      }
      return true;
  }
  function compareObj(obj1, obj2) {
    if (obj1 === null && obj2 === null) // because given that null values can be pass
    {return true;}
    if (obj1 === undefined && obj2 === undefined) // [{a:undefined,b:1},{a:undefined,b:1} also same.
    {return true;}
    if (obj1 === null || obj2 === null) // if one is null and other one is not then return false;
    {return false;}
    if (obj1 === undefined || obj2 === undefined) // same if one is undefined and other one is defined then return false;
    {return false;}
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') // checking for values.
    {
      if(typeof obj1==='string' && typeof obj2==='string') // if value is string then trim it and compare it
      {
        obj1=obj1.trim();
        obj2=obj2.trim();
      }
      return obj1 === obj2;
    }
    
    let key1 = Object.keys(obj1);
    let key2 = Object.keys(obj2);
    
    if (key1.length !== key2.length)
    {return false;}
    
    for (let i = 0; i < key1.length; i++) 
    {
        let key = key1[i];
        if (!obj2.hasOwnProperty(key) || (!compareObj(obj1[key], obj2[key])))
        {return false;}
      
    }
    
    return true;
  }

export let calculateObject = (object, funcs) => {
      //console.log(typeof object,typeof funcs);
      if(!object || !funcs)
      {
          throw "Please enter both input properly"
      }
      if(typeof object!=='object' || Array.isArray(object))
      {
          throw "please enter proper type of input"
      }
      if(!Array.isArray(funcs) || funcs.length===0)
      {
          throw "Please enter any function in array"
      }
      for(var val in object)
      {
          if(isNaN(object[val]))
          {
              throw "Please Enter proper value"
          }
          if(typeof object[val]!=='number')
          {
              throw "Please Enter value type of number only"
          }
      }
      let funlength=Object.values(funcs).length;
      if(funlength<1)
      {
          throw "Please Enter atleast one function"
      }
      for(let i=0;i<funlength;i++)
      {
          
          if(typeof funcs[i]!=='function')
          {
              throw "Not a function"
          }
      }
      let key=Object.keys(object);
      let keyvalue=Object.values(object);
      if(key.length<1)
      {
          throw "Please Enter proper input"
      }
      let obj={}
      for (let i=0;i<key.length;i++)    
      {
         let u= key[i];
         obj[u]=" ";
                 
      }
      for(let i=0;i<key.length;i++)
      {
          let f=keyvalue[i];
          for(let j=0;j<funlength;j++)
          {
              f=funcs[j](f);
          }
          obj[key[i]]=f.toFixed(2)
      }
      return obj;
      };

export let combineObjects = (...args) => {
      let myobj={}
      if(args.length<2)
      {
          throw "Please Enter proper input"
      }
      for(let i=0;i<args.length;i++)
      {
          if(typeof args[i]!=='object' || Array.isArray(args[i]))
          {
              throw "Please Enter Object type input"
          }
          let tempkeylen=Object.keys(args[i]).length
          if(tempkeylen<1)
          {
              throw "Enter atleast 1 element in every object"
          }
      }
      
          let key=[];
          for(let i=0;i<args.length;i++)
          {
             key.push(Object.keys(args[i]));  
             key=key.flat();
          }
          let arr1 = key.filter(function(ele, ind) {
          return key.indexOf(ele) != ind; });
          arr1=[...new Set(arr1)]
          //console.log(arr1);
          arr1.forEach(function(ele) {
              myobj[ele]=false;
          });
          
          for(let i=0;i<args.length;i++)
          {
              let obj=args[i];
              for(let key1 in obj)
              {
                  if(myobj.hasOwnProperty(key1))
                  {
                      if(myobj[key1]===false)
                      {
                      myobj[key1]=obj[key1];
                      }
                  }
              }
          
             
          }
        
      
      return myobj;
      };
