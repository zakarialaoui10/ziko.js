const parseInlineElements = text => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
        .replace(/\*(.*?)\*/g, '<em>$1</em>')              
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')  
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">'); 
};

const parseTable = line => {
    const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
    const tableRow = cells.map(cell => `<td>${parseInlineElements(cell)}</td>`).join('');
    return `<tr>${tableRow}</tr>\n`;
};

const parseCodeBlock = (lines, language) => {
    const codeContent = lines.slice(1, -1).join('\n'); // Exclude the triple backticks
    const highlightedCode = language ? `<code data-language="${language}">${codeContent}</code>` : `<code>${codeContent}</code>`;
    return `<pre>${highlightedCode}</pre>\n`;
};

const parseList = line => {
    const IS_STARTED_WIDT_A_DIGIT_FOLLOWED_BY_A_DOT = /^(\d+)\./; 
    const match = line.match(IS_STARTED_WIDT_A_DIGIT_FOLLOWED_BY_A_DOT);
    if (match) {
        let start=+match[1]
        return `<ol${start===1?"":` start=${start}`}>\n<li>${parseInlineElements(line.slice(match[0].length))}</li>\n</ol>\n`;
    }  
    return `<ul>\n<li>${parseInlineElements(line)}</li>\n</ul>\n`;
};
const markdown2html = markdownText => {
    const lines = markdownText.split('\n');
    let htmlOutput = '';
    let inTable = false;
    let inCodeBlock = false;
    let codeBlockLines = [];
    let codeBlockLanguage = '';
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        // Table
        if (line.startsWith('|')) {
            if (!inTable) {
                inTable = true;
                htmlOutput += '<table>\n';
            }
            htmlOutput += parseTable(line);
            continue;
        } else if (inTable) {
            inTable = false;
            htmlOutput += '</table>\n';
        }
        // Code block
        if (line.startsWith('```')) {
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeBlockLines = [];
                codeBlockLanguage = line.slice(3).trim();
            } else {
                inCodeBlock = false;
                htmlOutput += parseCodeBlock(codeBlockLines, codeBlockLanguage);
            }
            continue;
        } else if (inCodeBlock) {
            codeBlockLines.push(line);
            continue;
        }
        // Headings
        if (line.startsWith('#')&&line[1]===" ") {
            const headingLevel = line.indexOf(' ');
            const headingText = line.slice(headingLevel + 1);
            htmlOutput += `<h${headingLevel}>${parseInlineElements(headingText)}</h${headingLevel}>\n`;
            continue;
        }
        // Lists
        if (line.startsWith('- ') || line.startsWith('* ') || line.match(/^(\d+)\./)) {
            htmlOutput += parseList(line);
            continue;
        }
        // Other paragraphs
        htmlOutput += `<p>${parseInlineElements(line)}</p>\n`;
    }
    return htmlOutput;
};
export{markdown2html}