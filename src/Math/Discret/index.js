import { powerSet , subSet } from "./Set";
import { Base } from "./Conversion";
import { Logic } from "./Logic";
class Permutation {
    static withDiscount(arr, l = arr.length) {
        if (l === 1) {
            return arr.map((n) => [n]);
        }
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
        if (l === 1) {
            return arr.map((n) => [n]);
        }
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
class Combinaison {
    static withDiscount(comboOptions, comboLength) {
        if (comboLength === 1) {
            return comboOptions.map((comboOption) => [comboOption]);
        }
        // Init combinations array.
        const combos = [];
        // Remember characters one by one and concatenate them to combinations of smaller lengths.
        // We don't extract elements here because the repetitions are allowed.
        comboOptions.forEach((currentOption, optionIndex) => {
            // Generate combinations of smaller size.
            const smallerCombos = this.withDiscount(comboOptions.slice(optionIndex), comboLength - 1);
            // Concatenate currentOption with all combinations of smaller size.
            smallerCombos.forEach((smallerCombo) => {
                combos.push([currentOption].concat(smallerCombo));
            });
        });
        return combos;
    }
    static withoutDiscount(comboOptions, comboLength) {
        // If the length of the combination is 1 then each element of the original array
        // is a combination itself.
        if (comboLength === 1) {
            return comboOptions.map((comboOption) => [comboOption]);
        }
        // Init combinations array.
        const combos = [];
        // Extract characters one by one and concatenate them to combinations of smaller lengths.
        // We need to extract them because we don't want to have repetitions after concatenation.
        comboOptions.forEach((currentOption, optionIndex) => {
            // Generate combinations of smaller size.
            const smallerCombos = this.withoutDiscount(comboOptions.slice(optionIndex + 1), comboLength - 1);
            // Concatenate currentOption with all combinations of smaller size.
            smallerCombos.forEach((smallerCombo) => {
                combos.push([currentOption].concat(smallerCombo));
            });
        });

        return combos;
    }
}


const Discret={
    Logic,
    Base,
    Permutation,
    Combinaison,
    powerSet,
    subSet
}
export default Discret;
export{Logic,Base,Permutation,Combinaison,powerSet,subSet}