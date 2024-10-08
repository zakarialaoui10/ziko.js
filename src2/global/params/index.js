function parseParams(queryString) {
    const params = {};
    queryString.replace(/[A-Z0-9]+?=([\w|:|\/\.]*)/gi, (match) => {
        const [key, value] = match.split('=');
        params[key] = value;
    });
    return params;
}

function defineParamsGetter(target = globalThis){
    Object.defineProperties(target, {
        'QueryParams': {
            get: function() {
                return parseParams(location.search.substring(1));
            },
            configurable: false,
            enumerable: true 
        },
        'HashParams': {
            get: function() {
                const hash = window.location.hash.substring(1);
                return parseParams(hash);
            },
            configurable: false,
            enumerable: true 
        }
    });
}


/*

  /users?name=ziko&age=26
  /users#name=ziko

*/

export{
    defineParamsGetter
}