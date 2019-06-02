// Your code here.
function countBs(letters){
  let count = 0;
  for(let i = 0; i < letters.length; i++){
    if(letters[i] == 'B'){
     count++;
    }
  }
  return count;
}

function countChar(letters, letter){
  let count = 0;

  for(let i = 0; i < letters.length; i++){
    if(letters[i] == letter){
     count++;
    }
  }
  return count;
}

console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4