/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let palindromes = (string) => {
      if(!Array.isArray(string) || string.length===0)
      {
          throw "Please Enter proper input"
      }
      for(let t=0;t<string.length;t++)
      {
          if(typeof string[t]!=='string')
          {
              throw "Give proper type of input"
          }
          if(string[t].trim()==="")
          {
              throw "Please Enter proper input"
          }
              
              if (!/[a-zA-Z]+/.test(string[t].trim())) 
              {
                  throw "Error"
              }
              if(/^\d+$/.test(string[t].trim()))
              {
                  throw "Error"
              }
              
      }
      let obj={}
      let keyname;
      
      let arr=[];
      var patt = /[^A-Za-z0-9]/g;
      string.forEach(element => {
      
          let r=element.replace(patt,"");
          r=r.replace(/[0-9]/g,"");
          arr.push(r.toLowerCase());
          
          
      });
      for(let i=0;i<arr.length;i++)
      {
          let x=arr[i];
          checkpali(x);
          function checkpali(x)
          {
              let val1=arr[i].split('');
              let val2=val1.reverse();
              let val3=val2.join('');
              if(x==val3)
              {
                  keyname=x;
                  obj[keyname]=true;
              }
              else
              {
                  keyname=x;
                  obj[keyname]=false;
              }
          }
      }
      return obj;
};

export let censorWords = (string, badWordsList) => {
      if(!string|| typeof string!=='string'|| string.trim().length===0 || !badWordsList)
      {
          throw "Error: input string cannot be an empty string"
      }
      if(!Array.isArray(badWordsList) || badWordsList.length===0)
      {
          throw "Enter proper input"
      }
      for(let i=0;i<badWordsList.length;i++)
      { 
          if(typeof badWordsList[i]!=='string' || badWordsList[i].trim()==='')
          {
              throw "Error:each element in the bad words list must be a string"
          }
      }
      string=string.toLowerCase();
      const p=['!','@','#','$'];
      let count=0
      for(let i=0;i<badWordsList.length;i++)
      {
          badWordsList[i]=badWordsList[i].toLowerCase();
          if(string.includes(badWordsList[i]))
          {
              let k=badWordsList[i].length
              let temp=badWordsList[i];
              for(let j=0;j<k;j++)
              {
                  
                  temp =temp.replace(temp.charAt(j),p[count%4]);
                  count++;
                  
              }
      
              string=string.replace(badWordsList[i],temp)
                  
          }
          else
          {
              throw "Please enter words that are in string"
          }
      }
      return string;
};

export let distance = (string, word1, word2) => {
      if(!string || (!word1) || (!word2))
      {
          throw "Please check inputs need to be entered"
      }
      if(!(typeof string==="string") || !(typeof word1==="string") || !(typeof word2==="string"))
      {
          throw "Please enter string type values"
      }
      
      if(string.trim()==='' || word1.trim()==='' || word2.trim()==='')
      {
          throw "Check any of your input is empty"
      }
      // only special characters
      var regex = /[a-zA-Z]+/;
      if(!regex.test(string) || !regex.test(word1) || !regex.test(word2))
      {
        throw "Exception"
      }
      if(string.trim().split(" ").length<2)
      {
        throw "Length must be >2"
      }
      
        string = string
          .toLowerCase()
          .replace(/[.,\/#!@$%\^&\*;:{}=\-_`~()]/g, "")
          .replace(/\s{2,}/g, " ");
        word1 = word1.toLowerCase();
        word2 = word2.toLowerCase();
        if(!(string.includes(word1)) || !(string.includes(word2)))
        {
            throw "Enter words that are in string";
        }
        string = string.replaceAll(GetRegexPattern(word1), "uniwdne");
        string = string.replaceAll(GetRegexPattern(word2), "uniwdwo");
       
        let array = string.split(" ");
        let word1indexs = [];
        let word2indexs = [];
        for (let i = 0; i < array.length; i++) {
          if (array[i] === "uniwdne") word1indexs.push(i);
          else if (array[i] == "uniwdwo") word2indexs.push(i);
        }
      
        let i = 0,
          j = 0;
        let minDistance = string.length;
        while (i < word1indexs.length && j < word2indexs.length) {
          if (word2indexs[j] - word1indexs[i] > 0) {
            minDistance = Math.min(minDistance, word2indexs[j] - word1indexs[i]);
            i += 1;
          } else j += 1;
        }
      if(minDistance===string.length)
      {
        throw "word1 not appear before word2";
      }
      
        return minDistance;
};
function GetRegexPattern(word) {
    return new RegExp("\\b" + word + "\\b", "g");
  }
