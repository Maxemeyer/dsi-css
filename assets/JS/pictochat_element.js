const fieldset = document.querySelector('fieldset');
const legend = fieldset.querySelector('legend');
const textarea = fieldset.querySelector('textarea');
const span = legend.querySelector('span');
const input = legend.querySelector('input');

function responsiveIndent() {
    let indent = legend.getBoundingClientRect().width - 1;
    textarea.style.textIndent = indent + 'px';
}

function syncInputWidth() {
    span.textContent = input.value || input.placeholder;
    let width = span.getBoundingClientRect().width;
    input.style.width = width + 'px';

    responsiveIndent();
}

function forceMaxLength() {
    if (textarea.scrollHeight !== textarea.offsetHeight) {
        console.log("statement check");

        document.execCommand('undo');
    }
}

input.addEventListener('input', syncInputWidth);
textarea.addEventListener('input', forceMaxLength);

syncInputWidth();
forceMaxLength();