const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
//  canvas에 css로 사이즈를 정해줄 뿐만 아니라,
//  element 자체에 사이즈를 정해줘야 잘 작동함.

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  // Canvas를 어느 정도 이해를 해야하는 부분
  //  마우스가 눌리지 않을 때에는 path를 계속 만들다가도,
  // 마우스가 눌릴 때에 그 path만을 이용하여
  // 그리는 개념.
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function startPainting(event) {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

function handleRangeClick(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

function handleCanvasClick() {
  if (filling === true) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function init() {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (canvas) {
  init();
}

if (range) {
  range.addEventListener("input", handleRangeClick);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
