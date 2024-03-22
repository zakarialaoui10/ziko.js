class Permutation {
    static withDiscount(arr, l = arr.length) {
        if (l === 1) return arr.map((n) => [n]);
        const permutations = [];
        let smallerPermutations;
        smallerPermutations = this.withDiscount(arr, l - 1);
        arr.forEach((currentOption) => {
            smallerPermutations.forEach((smallerPermutation) => {
                permutations.push([currentOption].concat(smallerPermutation));
            });
        });
        return permutations;
    }
    static withoutDiscount(arr) {
        const l = arr.length;
        if (l === 1) return arr.map((n) => [n]);
        const permutations = [];
        const smallerPermutations = this.withoutDiscount(arr.slice(1));
        const firstOption = arr[0];
        for (let i = 0; i < smallerPermutations.length; i++) {
            const smallerPermutation = smallerPermutations[i];
            for (let j = 0; j <= smallerPermutation.length; j++) {
                const permutationPrefix = smallerPermutation.slice(0, j);
                const permutationSuffix = smallerPermutation.slice(j);
                permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));
            }
        }
        return permutations;
    }
}
export { Permutation }