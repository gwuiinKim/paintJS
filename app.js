const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700;
canvas.height = 700;
//  canvas에 css로 사이즈를 정해줄 뿐만 아니라, 
//  element 자체에 사이즈를 정해줘야 잘 작동함.

ctx.strokeStyle = "#2c2c2c";
ctx.linewidth = 2.5;

let painting = false;

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    // Canvas를 어느 정도 이해를 해야하는 부분
    //  마우스가 눌리지 않을 때에는 path를 계속 만들다가도,
    // 마우스가 눌릴 때에 그 path만을 이용하여
    // 그리는 개념.
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}


function startPainting(event){
    painting=true;
}

function onMouseUp(event){
    stopPainting();
}

function init {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color=> color.addEventListener("click", handleColorClick))

if(canvas) {
    init();
}
