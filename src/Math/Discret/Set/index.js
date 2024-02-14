const powerSet=originalSet=>{
    const subSets = [];
    const numberOfCombinations = 2 ** originalSet.length;
    for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
        const subSet = [];
        for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
            if (combinationIndex & (1 << setElementIndex)) {
                subSet.push(originalSet[setElementIndex]);
            }
        }
        subSets.push(subSet);
    }
    return subSets;
}
const subSet = (...arr) => {
    let list = arange(0, 2 ** arr.length, 1);
    let bin = list.toBin.map((n) => n.padStart(arr.length, 0)).map((n) => n.split("").map((n) => +n));
    let sub = bin.map((n) => n.map((m, i) => (m = arr[i])));
    for (let i = 0; i < sub.length; i++) for (let j = 0; j < sub[i].length; j++) sub[i][j] = { n: sub[i][j], m: bin[i][j] };
    sub = sub.map((n) => n.filter((x) => x.m == 1));
    sub = sub.map((n) => n.map((m) => m.n));
    return sub;
}
export{
    powerSet,
    subSet
}