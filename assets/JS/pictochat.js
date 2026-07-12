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
    let width = span.getBoundingClientRect().width + 1;
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

    //const point = getCanvasPoint(event);
    //context.beginPath();
    //context.moveTo(point.x, point.y);
});

function cancelPainting(event) {
    // added by AI for more reliable drawing - testing needed
    event.preventDefault();

    isPainting = false;

    // context.beginPath(); maybe not needed

    // added by AI for more reliable drawing - testing needed
    // see chat 01.07.2026
    if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
    }
}

canvas.addEventListener('pointerup', cancelPainting);

// for draw function point.x & y
function calcRectPos(point) {
    let calc = Math.round(point / 5) * 5;

    if (calc > point) {
        calc = calc - 5;
    }

    return calc;
}

let indexRainbow = 0;

canvas.addEventListener('pointermove', (event) => {
    // added by AI for more reliable drawing - testing needed
    event.preventDefault();

    if(!isPainting) {
        return;
    }

    const point = getCanvasPoint(event);

    const rainbow = [
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

    const size = lineWidth.checked ? 1 : 2;

    if (eraser.checked) {
        context.clearRect(Math.round(point.x), Math.round(point.y), size, size);
    } else {
        if (indexRainbow >= 17) {
            indexRainbow = 0;
        }

        context.fillStyle = color.checked ? rainbow[Math.round(indexRainbow)] : 'black';

        context.fillRect(Math.round(point.x), Math.round(point.y), size, size);

        // 0.1 to stretch the gradient
        indexRainbow = indexRainbow + 0.1;
    }
});

// added by AI for more reliable drawing - testing needed
canvas.addEventListener('pointercancel', cancelPainting);