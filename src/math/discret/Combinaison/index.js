class Combinaison {
    static withDiscount(comboOptions, comboLength) {
        if (comboLength === 1) {
            return comboOptions.map((comboOption) => [comboOption]);
        }
        const combos = [];
        comboOptions.forEach((currentOption, optionIndex) => {
            const smallerCombos = this.withDiscount(comboOptions.slice(optionIndex), comboLength - 1);
            smallerCombos.forEach((smallerCombo) => {
                combos.push([currentOption].concat(smallerCombo));
            });
        });
        return combos;
    }
    static withoutDiscount(comboOptions, comboLength) {
        if (comboLength === 1) {
            return comboOptions.map((comboOption) => [comboOption]);
        }
        const combos = [];
        comboOptions.forEach((currentOption, optionIndex) => {
            const smallerCombos = this.withoutDiscount(comboOptions.slice(optionIndex + 1), comboLength - 1);
            smallerCombos.forEach((smallerCombo) => {
                combos.push([currentOption].concat(smallerCombo));
            });
        });

        return combos;
    }
}
const combinaison=(comboOptions, comboLength, discount=false)=>Combinaison[discount?"withDiscount":"withoutDiscount"](comboOptions, comboLength)
export{ 
    Combinaison,
    combinaison
 }