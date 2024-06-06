const camel2hyphencase = text => text.replace(/[A-Z]/g, match => '-' + match.toLowerCase());
const camel2snakecase = text => text.replace(/[A-Z]/g, match => '_' + match.toLowerCase());
const camel2pascalcase = text => text.charAt(0).toUpperCase() + text.slice(1);
const camel2constantcase = text => text.replace(/[A-Z]/g, match => '_' + match).toUpperCase();

const pascal2snakecase = text => text.replace(/([A-Z])/g, (match, offset) => offset ? '_' + match.toLowerCase() : match.toLowerCase());
const pascal2hyphencase = text => text.replace(/([A-Z])/g, (match, offset) => offset ? '-' + match.toLowerCase() : match.toLowerCase());
const pascal2camelcase = text => text.charAt(0).toLowerCase() + text.slice(1);
const pascal2constantcase = text => text.replace(/([A-Z])/g, (match, offset) => offset ? '_' + match : match).toUpperCase();

const snake2camelcase = text => text.replace(/(_\w)/g, match => match[1].toUpperCase());
const snake2hyphencase = text =>text.replace(/_/g, "-");
const snake2pascalcase = text => text.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
const snake2constantcase = text => text.toUpperCase();

const hyphen2camelcase = text => text.replace(/-([a-z])/g, match => match[1].toUpperCase());
const hyphen2snakecase = text => text.replace(/-/g, '_');
const hyphen2pascalcase = text => text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
const hyphen2constantcase = text => text.replace(/-/g, '_').toUpperCase();

const constant2camelcase = text => text.toLowerCase().replace(/_([a-z])/g, match => match[1].toUpperCase());
const constant2snakecase = text => text.toLowerCase();
const constant2pascalcase = text => text.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
const constant2hyphencase = text => text.toLowerCase().replace(/_/g, '-');
export {
    camel2hyphencase,
    camel2snakecase,
    camel2pascalcase,
    camel2constantcase,
    pascal2snakecase,
    pascal2hyphencase,
    pascal2camelcase,
    pascal2constantcase,
    snake2camelcase,
    snake2hyphencase,
    snake2pascalcase,
    snake2constantcase,
    hyphen2camelcase,
    hyphen2snakecase,
    hyphen2pascalcase,
    hyphen2constantcase,
    constant2camelcase,
    constant2pascalcase,
    constant2hyphencase,
    constant2snakecase
}
