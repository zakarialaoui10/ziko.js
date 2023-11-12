const Ease={
    Linear:function(t){
        return t;
    },
    InSin(t){
        return 1 - Math.cos((t * Math.PI) / 2);
    },
    OutSin(t){
        return Math.sin((t * Math.PI) / 2);
    },
    InOutSin(t){
        return  -(Math.cos(Math.PI * t) - 1) / 2;
    },
    InQuad(t){
        return t**2;
    },
    OutQuad(t){
        return 1 - Math.pow((1 - t),2)
    },
    InOutQuad(t){
        return t < 0.5 ? 2 * Math.pow(t,2) : 1 - Math.pow(-2 * t + 2, 2) / 2;
    },
    InCubic(t){
        return t**3;    
    },
    OutCubic(t){
        return 1 - Math.pow((1 - t),3)
    },
    InOutCubic(t){
        return t < 0.5 ? 4 * Math.pow(t,3) : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },
    InQuart(t){
        return t**4;
    },
    OutQuart(t){
        return 1 - Math.pow((1 - t),4);
    },
    InOutQuart(t){
        return t < 0.5 ? 8 * Math.pow(t,4) : 1 - Math.pow(-2 * t + 2, 4) / 2;
    },
    InQuint(t){
        return t**5;
    },
    OutQuint(t){
        return 1 - Math.pow((1 - t),5);
    },
    InOutQuint(t){
        return t < 0.5 ? 16 * Math.pow(t,5) : 1 - Math.pow(-2 * t + 2, 5) / 2;
    },
    InExpo(t){
        return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
    },
    OutExpo(t){
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    },
    InOutExpo(t){
        return t === 0? 0: t === 1? 1: t < 0.5 ? Math.pow(2, 20 * t - 10) / 2: (2 - Math.pow(2, -20 * t + 10)) / 2;
    },
    InCirc(t){
        return 1 - Math.sqrt(1 - Math.pow(t, 2));
    },
    OutCirc(t){
        return Math.sqrt(1 - Math.pow(t - 1, 2));
    },
    InOutCic(t){
        return t < 0.5? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2: (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
    },
    Arc(t){
        return 1 - Math.sin(Math.acos(t));
    },
    Back(t){
        // To Be Changed
        let x=1
        return Math.pow(t, 2) * ((x + 1) * t - x);  
    },
    Elastic(t){
        return -2*Math.pow(2, 10 * (t - 1)) * Math.cos(20 * Math.PI * t / 3 * t);
    },
    InBack(t){
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return c3 *Math.pow(t,3)- c1 * (t**2);      
    },
    OutBack(t){
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);     
    },
    InOutBack(t){
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        return t < 0.5
        ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
        : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;        
    },
    InElastic(t){
        const c4 = (2 * Math.PI) / 3;return t === 0
        ? 0
        : t === 1
        ? 1
        : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
    },
    OutElastic(t){
        const c4 = (2 * Math.PI) / 3;
        return t === 0
        ? 0
        : t === 1
        ? 1
        : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    },
    InOutElastic(t){
        const c5 = (2 * Math.PI) / 4.5;
        return t === 0
        ? 0
        : t === 1
        ? 1
        : t < 0.5
        ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
        : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1;
    },
    InBounce(t){
        return 1 - Ease.OutBounce(1-t);
    },
    OutBounce(t){
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) {
            return n1 * t * t;
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }

    },
    InOutBounce(t){
        return t < 0.5
        ? (1 - Ease.OutBounce(1 - 2 * t)) / 2
        : (1 + Ease.OutBounce(2 * t - 1)) / 2;
    }
}
export default Ease