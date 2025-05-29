// O(n/2) Two way reverse array function 
    function ReverseArray (arr) {
        if(!Array.isArray(arr)) {
            throw new Error ('Parameter needs to be an array!')
        }
        try{
        for (let l = 0, r = arr.length - 1; l < r; l++, r--) {
            let v1 = arr[l]
            let v2 = arr[r]
            arr[r] = v1
            arr[l] = v2
        }
        return arr } catch (e) {console.log(e)};
        // [5,4,3,2,1]
    }


// O(n/2) Two way reverse word function
function ReverseWord (word = 'test') {
    word = word.toString().trim('')
    let arr = word.split('');
    for (let l = 0, r = arr.length - 1; l < r; l++, r--) {
        let v1 = arr[l]
        let v2 = arr[r]
        arr[r] = v1
        arr[l] = v2
    }
    return arr.join('');
  }


