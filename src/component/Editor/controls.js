const getSelelectedText = (pre, post, noSelectCollapse) => {
    const input = document.querySelector('#editor_content > textarea');
    const start = input.selectionStart, end = input.selectionEnd;
    if (start === end && noSelectCollapse) {
        input.focus();
        return;
    }

    const selected = input.value.slice(start, end);
    input.setRangeText(`${pre}${selected}${post}`);

    autoGrow();
}

const inlineElement = (pre,suff)=>{
    const input = document.querySelector('#editor_content > textarea');
    input.selectionStart += pre;
    input.selectionEnd -= suff;
    input.focus();
}

const blockElement = (pre)=>{
    const input = document.querySelector('#editor_content > textarea');
    input.selectionStart += pre;
    input.selectionEnd = input.selectionStart;
    input.focus();
}

const autoGrow = () => {
    const input = document.querySelector('#editor_content > textarea');
    const prevHeight = input.scrollHeight;
    const editor = document.querySelector('#editor');
    const prevPos = editor.scrollTop;
    input.style.height = '5px';
    const scrollHeight = input.scrollHeight;
    input.style.height = (scrollHeight) + 'px';

    if (prevHeight === scrollHeight)
        editor.scrollTop = prevPos;
}

const bold = () =>{
    const pre = " **" , suff = "** ";
    getSelelectedText(pre,suff, true);
    inlineElement(pre.length,suff.length);
}

const italic = () => {
    const pre = " _", suff = "_ ";
    getSelelectedText(pre,suff, true);
    inlineElement(pre.length,suff.length);
}

const underline = () => {
    const pre = " <u>", suff = "</u> ";
    getSelelectedText(pre,suff, true);
    inlineElement(pre.length,suff.length);
}

const divider = () => {
    const pre = '\n\n --- \n\n';
    getSelelectedText(pre,"", false);
    blockElement(pre.length);
}

const blockquote = () => {

    getSelelectedText('>','',false);
    blockElement(1);
}

const link = () => {
    getSelelectedText('',`[alt text]{link here}`,false);
    blockElement(1);
}

const code = () => {
    let lang = prompt('Language : ', 'javascript');
    const suff = `\n</code>\n`;
    const pre = ` \n\n<code language={${lang}}>\n`
    getSelelectedText(pre, suff, false);
    blockElement(pre.length);
}

const tip = () => {
    const pre = `\n\n<Tip>\n`;
    const suff = `\n</Tip>\n`;
    getSelelectedText(pre, suff, false);
    blockElement(pre.length)
}

const note = () => {
    const suff = `\n</Note>  \n`
    const pre = `\n\n<Note>\n`;
    getSelelectedText(pre,suff,false);
    blockElement(pre.length);
}

const warning = () => {
    const suff = `\n</Warning>  \n`
    const pre = `\n\n<Warning>\n`;
    getSelelectedText(pre,suff,false);
    blockElement(pre.length);
}

const photo = (event) => {
    const suff = `\n\n ![alt text](Image Url) \n\n`;
    const pre = "";
    getSelelectedText(pre,suff,false);
}

const controls = {
    bold,
    italic,
    underline,
    divider,
    tip,
    note,
    warning,
    code,
    photo,
    link,
    blockquote,
    autoGrow
}

export default controls;