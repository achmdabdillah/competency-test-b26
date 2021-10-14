const arr = [20, 12, 35, 11, 17, 9, 58, 23, 69, 21]

function sortArray(array) {
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length; j++){
            if (array[j] > array[j + 1]) {
            [array[j], array[j+1]] = [array[j+1], array[j]]
			}
        }
    }
    return array
}

console.log(sortArray(arr))