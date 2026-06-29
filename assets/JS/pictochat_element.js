const fieldset = document.querySelector('fieldset');
const legend = fieldset.querySelector('legend');
const span = legend.querySelector('span');
const input = legend.querySelector('input');
const textarea = fieldset.querySelector('textarea');

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



const stateTextarea = document.getElementById('stateTextarea');
const stateCanvas = document.getElementById('stateCanvas');

stateTextarea.addEventListener('change', () => {
    textarea.style.display = 'unset';
});

stateCanvas.addEventListener('change', () => {
    textarea.style.display = 'none';
});



const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const lineWidth = document.getElementById('lineWidth');
const clear = document.getElementById('clear');

const canvasOffsetX = canvas.offsetLeft;

let isPainting = false;

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;
}

resizeCanvas();

function getCanvasPoint(event) {
    const rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

const draw = (event) => {
    if(!isPainting) {
        return;
    }

    const point = getCanvasPoint(event);

    context.lineWidth = lineWidth.checked ? 5 : 10;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    context.lineTo(point.x, point.y);
    context.stroke();
}

canvas.addEventListener('mousedown', (event) => {
    isPainting = true;

    const point = getCanvasPoint(event);
    context.beginPath();
    context.moveTo(point.x, point.y);
});

canvas.addEventListener('mouseup', () => {
    isPainting = false;
    context.beginPath();
});

canvas.addEventListener('mousemove', draw);

clear.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    textarea.value = '';
})