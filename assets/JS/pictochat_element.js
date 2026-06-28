const fieldset = document.querySelector('fieldset');
const legend = fieldset.querySelector('legend');
const span = legend.querySelector('span');
const input = legend.querySelector('input');
const textarea = fieldset.querySelector('textarea');
const canvas = fieldset.querySelector('canvas');

function responsiveIndent() {
    let indent = legend.getBoundingClientRect().width;
    textarea.style.textIndent = indent + 'px';
}

function syncInputWidth() {
    span.textContent = input.value || input.placeholder;
    let width = span.getBoundingClientRect().width + 5;
    input.style.width = width + 'px';

    responsiveIndent();
}

function forceMaxLength() {
    if (textarea.scrollHeight !== textarea.offsetHeight) {
        document.execCommand('delete');
    }
}

input.addEventListener('input', syncInputWidth);
textarea.addEventListener('input', forceMaxLength);

syncInputWidth();
forceMaxLength();