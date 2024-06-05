class ZikoUseMediaQuery{
    constructor(){
        this.mediaQueryRules=[
            {
                query: '(min-width: 600px)',
                callback:()=>console.log(1)
            },
            {
                query: '(max-width: 599px)',
                callback:()=>console.log(2)
            }
        ];
        this.init();
    }
    init(){
        this.mediaQueryRules.forEach(({ query, callback})=>{
            const mediaQueryList = globalThis.matchMedia(query);
            if (mediaQueryList.matches) callback();
            mediaQueryList.addListener(() => {
                if (mediaQueryList.matches) callback();
            }); 
        });
    }
}

const useMediaQuery=()=>new ZikoUseMediaQuery()
export{
    useMediaQuery
}