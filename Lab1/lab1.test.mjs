import * as lab1 from './lab1.mjs';

// first function
console.log(lab1.questionOne([5, 3, 10]));  // Returns and then outputs {'1152': false}
console.log(lab1.questionOne([2, 1, 2])); // Returns and then outputs {'17': true} 
console.log(lab1.questionOne([512, 1007, 17389])); //Returns and then outputs {'5259194599940': false}
console.log(lab1.questionOne([0, 14159, 785])); //Returns and then outputs {'2839041558304', false} 
console.log(lab1.questionOne([11, 4])); //Returns and then outputs {'1395': false}


// second function
console.log(lab1.questionTwo([2,10,4])); //Returns and then outputs [false, 1, 2]
console.log(lab1.questionTwo([1, 2, 3, 4, 5, 6, 7]));  // Returns and then outputs [true] 
console.log(lab1.questionTwo([1, 2, 4, 3])); // Returns and then outputs [false, 2, 3]
console.log(lab1.questionTwo([10, 7, 6, 11])); //Returns and then outputs [false, 0, 1]
console.log(lab1.questionTwo([28,45,1002, 10000])); //Returns and then outputs [true]


// third function
console.log(lab1.questionThree({a:1,b:2,c:3}, {c:10, a:20, b:30})); 
// Returns and then outputs {a:true, b:true, c:true}

console.log(lab1.questionThree({a:1,b:2,c:3, d:4}, {f:10, b:20, e:30, d: 40, c:50, a:60}));
// Returns and then outputs {a:true, b:true, c:true, d:true, e:false, f:false} 

console.log(lab1.questionThree({foo:"I'm foo", bar: "I'm bar", fizz: "I'm fizz" , buzz: "I'm buzz" }, {fizz: "I'm not buzz", foo:"I'm not bar", buzz: "I'm not fizz", bar: "I'm not foo", c:50, a:60})); 
// Returns and then outputs {foo:true, bar: true, fizz: true, buzz: true, c:false, a:false}
 
console.log(lab1.questionThree({a:10, b:20, c:30, d: 40, e:50, f:60}, {a:1,b:2,c:3} )); 
//Returns and then outputs {a: true, b: true, c:true, d: false, e: false, f: false}

console.log(lab1.questionThree({e:1, r:3, y:5,q:9}, {d:6,r:4,p:9,k:8,e:4} )); 
//Returns and then outputs { e: true, r: true, y: false, q: false, d: false, p: false, k: false }


// fourth function
console.log(lab1.questionFour(`Patrick,Hill,cs546
Jared,Bass,cs115
Shudong,Hao,cs570`));

//should return and then log [["Patrick", "Hill", "cs546"],["Jared", "Bass", "cs115"], ["Shudong", "Hao", "cs570"]]

