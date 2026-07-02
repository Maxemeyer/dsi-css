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
    canvas.style.setProperty('pointer-events', 'none');
});

stateCanvas.addEventListener('change', () => {
    canvas.style.setProperty('pointer-events', 'auto');
});



const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const lineWidth = document.getElementById('lineWidth');
const clear = document.getElementById('clear');

clear.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    textarea.value = '';
});

// const canvasOffsetX = canvas.offsetLeft;

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

// new color and eraser function variables
const color = document.getElementById('color');
const eraser = document.getElementById('eraser');

canvas.addEventListener('pointerdown', (event) => {
    // added by AI for more reliable drawing - testing needed
    event.preventDefault();

    isPainting = true;

    const point = getCanvasPoint(event);
    context.beginPath();
    context.moveTo(point.x, point.y);
});

function cancelPainting(event) {
    // added by AI for more reliable drawing - testing needed
    event.preventDefault();

    isPainting = false;
    context.beginPath();

    // added by AI for more reliable drawing - testing needed
    // see chat 01.07.2026
    if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
    }
}

canvas.addEventListener('pointerup', cancelPainting);

canvas.addEventListener('pointermove', (event) => {
    // added by AI for more reliable drawing - testing needed
    event.preventDefault();

    if(!isPainting) {
        return;
    }

    const point = getCanvasPoint(event);

    const colors = [
        '#FB2C36',
        '#FF692A',
        '#FE9A37',
        '#FDC745',
        '#7CCF35',
        '#31C950',
        '#37BC7D',
        '#36BBA7',
        '#3BB8DB',
        '#34A6F4',
        '#2B7FFF',
        '#615FFF',
        '#8E51FF',
        '#AD46FF',
        '#E12AFB',
        '#F6339A',
        '#FF2056',
    ]

    //AI!!!
    const rainbow = context.createLinearGradient(0, 0, point.x, point.y);

    colors.forEach((color, index) => {
        rainbow.addColorStop(index / (colors.length - 1), color);
    });

    context.globalCompositeOperation = eraser.checked ? 'destination-out' : 'source-over';
    context.strokeStyle = color.checked ? rainbow : 'black';
    context.lineWidth = lineWidth.checked ? 5 : 10;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    context.lineTo(point.x, point.y);
    context.stroke();

});

// added by AI for more reliable drawing - testing needed
canvas.addEventListener('pointercancel', cancelPainting);

// AI created it and killed it after my questions
// canvas.addEventListener('pointerleave', cancelPainting);