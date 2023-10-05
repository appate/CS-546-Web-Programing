/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
//import {sortAndFilter,merge,matrixMultiply} from "./arrayUtils.js"
import {sortAndFilter,merge,matrixMultiply} from "./arrayUtils.js";
import {areObjectsEqual,calculateObject,combineObjects} from "./objectUtils.js";
import {palindromes,censorWords,distance} from "./stringUtils.js";

let people = [ 
    {name: 'Ryan', age: '22', location: 'Hoboken', role: 'Student'}, 
    {name: 'Matt', age: '21', location: 'New York', role: 'Student'},
    {name: 'Matt', age: '25', location: 'New Jersey', role: 'Student'}, 
    {name: 'Greg', age: '22', location: 'New York', role: 'Student'}, 
    {name: 'Mike', age: '21', location: 'Chicago', role: 'Teacher'} ]; 
try
{
    console.log(sortAndFilter(people, ['name', 'asc'], ['location', 'desc'], 'role', 'Student')); 
}
catch(e)
{
console.log(e);
}
try
{
    console.log(sortAndFilter(people, ['location', 'none'], ['name', 'asc'], 'age', '22'));

}
catch(e)
{
console.log(e);
}
try
{
   console.log(merge([3,0,"Lab2",2,"Aiden"], ["CS-546" ,"Computer Science",8,15], [6,3,"Patrick",25,29]))

}
catch(e)
{
console.log(e);
}
try
{
   console.log(merge([], ["CS-546" ,"Computer Science",8,15], [6,3,"Patrick",25,29]))

}
catch(e)
{
console.log(e);
}
try
{
   console.log(matrixMultiply([ [2,3], [3,4], [4,5] ], [ [1,1,1], [2,2,2] ], [ [3], [2], [1] ]));

}
catch(e)
{
console.log(e);
}
try
{
   console.log(matrixMultiply([ [1,2] ], [ ['foobar'], [6] ]));

}
catch(e)
{
console.log(e);
}
try
{
   console.log(palindromes(["Madam", "Loot", "Was it a cat I saw?", "Poor Dan is in a droop", "Anna", "Nope" ]));

}
catch(e)
{
console.log(e);
}
try
{
   console.log(palindromes(1));

}
catch(e)
{
console.log(e);
}
let badWords = ["bread","chocolate","pop"];
try
{
    console.log(censorWords("I like bread that has chocolate chips in it but I do not like lollipops", badWords))

}
catch(e)
{
console.log(e);
}
try
{
    console.log(censorWords("I like bread that has chocolate chips in it", [2, "wow"]))

}
catch(e)
{
console.log(e);
}
try
{
    console.log(distance(123, "CS", "Patrick"))

}
catch(e)
{
console.log(e);
}
try 
{
    console.log(distance("I was going to buy workout powder yesterday", "going to", "workout powder"));
}
catch(e)
{
console.log(e);
}
const first = {a: 2, b: 3};
const second = {a: 2, b: 4};
const third = {a: 2, b: 3};
const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
const sixth = {name: {firstName: "Patrick", lastName: "Hill"}, age: 47, dob: '9/25/1975', hobbies: ["Playing music", "Movies", "Spending time with family"]} 
const seventh = {age: 47, name: {firstName: "Patrick", lastName: "Hill"}, hobbies: ["Playing music", "Movies", "Spending time with family"], dob: '9/25/1975'}
const eighth = {b:3, a:2}
try 
{
    console.log(areObjectsEqual(sixth, seventh)); 

}
catch(e)
{
console.log(e);
}
try 
{
    console.log(areObjectsEqual([1,2,3], [1,2,3]));
}
catch(e)
{
console.log(e);
}
try 
{
    console.log(calculateObject({ a: 3, b: 7, c: 5 }, [(n => n * 2), (n => Math.sqrt(n))]));
}
catch(e)
{
console.log(e);
}
try 
{
    console.log(calculateObject({ a: 1, b: 2, c: 3}, [NaN]));
}
catch(e)
{
console.log(e);
}
try 
{
    console.log(combineObjects({ a: 3, b: 7, c: 5 },{ d: 4, e: 9 },{ a: 8, d: 2 }));
}
catch(e)
{
console.log(e);
}
try 
{
    console.log(combineObjects({ wow: 'crazy', super: 'duper' },false));
}
catch(e)
{
console.log(e);
}

