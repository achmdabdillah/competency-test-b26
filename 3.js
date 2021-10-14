function drawImage(number) {
    if(number%2 === 0) {
        alert('please insert an odd number')
    }
    let result = '';
    for(let row = 0; row < number; row++){
        for(let col = 0; col < number; col++){
            if(col === 0 && row === 0 || 
                col === number-1 && row === number-1 || 
                col === number-1 && row === 0 ||
                col === 0 && row === number - 1 || 
                col === ((number-1)/2) && row !== ((number-1)/2) || 
                row === ((number-1)/2) && col !== ((number-1)/2) )
                {
                result += '* '
            }
            else {
                result += '# '
            }
        }
        result += '\n'
    }
    console.log(result)
}

// drawImage(5)