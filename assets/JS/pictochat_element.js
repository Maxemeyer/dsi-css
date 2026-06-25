const fieldset = document.querySelector('fieldset');
const legend = fieldset.querySelector('legend');
const textarea = fieldset.querySelector('textarea');
const span = legend.querySelector('span');
const input = legend.querySelector('input');

function responsiveIndent() {
    indent = legend.getBoundingClientRect().width - 1;
    textarea.style.textIndent = indent + 'px';

    console.log(indent)
}

function syncInputWidth() {
    span.textContent = input.value || input.placeholder;
    let width = span.getBoundingClientRect().width;
    input.style.width = width + 'px';

    responsiveIndent();

    console.log(width);
    console.log(input.style.width);
}

input.addEventListener('input', syncInputWidth);
syncInputWidth();