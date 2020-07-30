export function getAvg(array: Array<number>){
    return (array.reduce((a, b) => a + b, 0) / array.length).toFixed(1)
}

export function getRoundedValue(n: number) {
    const integerPart = Math.floor(n);
    if (integerPart === n){
        //n is an integer
        return n;
    } else {
        return integerPart + 0.5
    }
}