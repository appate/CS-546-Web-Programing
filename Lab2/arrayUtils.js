/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
function Compare([property1, firstorder], [property2, secondOrder]) { // took ref from https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  let sortorder = firstorder == "asc" ? 1 : -1;                       //
  let secondsortOrder = secondOrder == "asc" ? 1 : -1;
  return function Compareproperty(a, b) {
    let result = 0;
    result = GetComparisonValue(a, b, property1, sortorder);
    if (result == 0) {
      return GetComparisonValue(a, b, property2, secondsortOrder);
    }
    return result;
  };

  function GetComparisonValue(a, b, property1, sortorder) {
    if (typeof a[property1] === "string" && typeof b[property1] === "string") {
      return sortorder * a[property1].localeCompare(b[property1]);
    } else {
      return sortorder * a - b;
    }
  }
}
const filterByFunction = (filterByProperty, filterTerm) => {
  return function (a) {
    return a[filterByProperty] === filterTerm;
  };
};
export let sortAndFilter = (array, sortBy1, sortBy2, filterBy, filterByTerm) =>  {
  array.sort(Compare(sortBy1, sortBy2));
  if(!array) {throw "Enter array first"}
  if(!Array.isArray(array)) {throw "Please input array only"}
  if(array.lenght===0){throw "Enter something in array"}
  if(array.length<2)
  {
    throw  "Check input is not proper"
  }
  if(array.some(ele=>typeof ele!=="object")) {throw "Each element in the array parameter must be an object"}
  for(let i=0;i<array.length;i++)
  {if(Object.keys(array[i]).length===0)
    {throw "enter atleast one key"}
  }
  let obj1=array[0];
    for(let i=1;i<array.length;i++)
    {
      let o=(compareObj(obj1,array[i]))
      obj1=array[i];
      
    }
    function compareObj(obj1,obj2){
    let key1=Object.keys(obj1);
      let key2=Object.keys(obj2);
      if(key1.length!==key2.length)
      {
        throw "keys are not equal";
      }
      for(let i1=0;i1<key1.length;i1++)
      {
        if(!key1.includes(key2[i1]))
        {
          throw "Enter same keys"
        }
      }
    }
    if (array.some(element => Object.values(element).some(value => typeof value !== "string" || value.trim().length === 0))) throw "Not string value"
    if(!sortBy1 && !sortBy2) throw "error in sortby"
    if(!Array.isArray(sortBy1) || sortBy1.length===0 || sortBy1.length<2) throw "Error in sortby"
    if(!Array.isArray(sortBy2) || sortBy2.length===0 || sortBy2.length<2) throw "Error in sortby"
  
    if(sortBy1.length!==2)
    {
      throw "Cannot greater or less than 2"
    }
    if(typeof sortBy1[0] !== "string" || sortBy1[0].trim().length === 0){throw "check in sortby1"}
    if(array.some(ele => !ele.hasOwnProperty(sortBy1[0]))) throw "Key not in main obj"
    if (sortBy1[1] !== "asc" && sortBy1[1] !== "desc") throw "check in sortby1 again"
    if(sortBy2.length!==2)
    {
      throw "Cannot greater or less than 2"
    }
    if (typeof sortBy2[0] !== "string" || sortBy2[0].trim().length === 0) throw "check in  sortby2"
    if (array.some(element => !element.hasOwnProperty(sortBy2[0]))) throw "key not in main obj"
    if (sortBy2[1] !== "asc" && sortBy2[1] !== "desc") throw "check in sortby2"
    if(!filterBy)
    {
      throw "Please check input filterby"
    }
    if(typeof filterBy!='string' || Array.isArray(filterBy))
    {
      throw "you cannot enter this values"
    }
    if(filterBy.length<1)
    {
      throw "enter one parameter"
    }
    if (array.some(ele => !ele.hasOwnProperty(filterBy))) throw "key not in main obj"
    if(!filterByTerm)
    {
      throw "Enter this input first"
    }
    if(filterBy.trim().length===0)
    {
      throw "Not just spaces"
    }
    if(typeof filterByTerm!=='string'){
      throw "String value only"
    }
  

    return array.filter(filterByFunction(filterBy, filterByTerm));
};

export let merge = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies
  if(!args)
  {
      throw "Enter input"
  }
  if(args.length===0)
  {
      throw "Enter input"
  }
  args.forEach(arg => {
      if (!Array.isArray(arg)) {
        throw "All input must be array"
      }
      if (arg.length === 0) {
        throw "Array must not be empty"
      }
    });
  
  let s= args.flat(Infinity);
  s.sort();
  let num=[];
  let char=[];
  for(let i=0;i<s.length;i++)
  {
      if(typeof s[i]==='number')
      {
          num.push(s[i]);
      }
      if(typeof s[i]==='string')
      {
          char.push(s[i]);
      }
  }
  num = num.sort((a, b) => a - b);
  char=char.sort();
  let final=[...num,...char];
  
  return final
}

export let matrixMultiply = (...args) =>  {
  if(args.length===0)
  {
    throw "Enter some input"
  }
  if(args.length<2)
  {
    throw "enter more input"
  }
  for(let i=0; i<args.length;i++) 
  {
    let ui=args[i];
    if (!Array.isArray(ui)) {
      throw "Error in input"
    }
    if (ui.length===0) {
      throw "Array is empty"
    }
  }
  for(let i=0;i<args.length;i++)
  {
    let ui=args[i];
    for(let j=0;j<ui.length;j++) 
    {
      let r=ui[j];
      if (!Array.isArray(r)) 
      {
        throw "Not proper array"
      }
      if (r.length===0) 
      {
        throw "Array is empty"
      }
      for (let k=0; k<r.length;k++) 
      {
        let val=r[k];
        if (typeof val!=="number" || val===NaN || val===undefined) {
          throw "Not number elements"
        }
      }
    }
  }
  let temp=args[0];
  for(let i=1;i<args.length;i++) 
  {
    let y= args[i];
    if(temp!==false)
    {
      check(temp,y);
    }
    let x=args[i-1];
    temp=false;
    check(x,y);
    function check(x,y)
    {
    let col=x[0].length;
    let row=y.length;
    if (col!==row) 
    {
      throw "matrix not match for multiplication"
    }

  }
  }
  let ret;
  let final;
  final=args[0]
  let x;
  for(let i=1;i<args.length;i++)
  {
      
     // x=matrixMultiplication(final,args[i]);
     final=matrixMultiplication(final,args[i])
      //final=args[i];
      function matrixMultiplication(mat1,mat2) {
          var result=[];
          for (var i1=0;i1<mat1.length;i1++) {
            result[i1]=[];
            for (var j=0;j<mat2[0].length;j++) {
              var sum=0;
              for (var k= 0;k<mat1[0].length;k++) {
                sum +=mat1[i1][k]*mat2[k][j];
              }
              result[i1][j] = sum;
            }
          }
          ret=result;
          return result;
         
        }
        

  }
  return ret;
     
};


