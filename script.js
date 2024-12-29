const addWorkoutBtn = document.getElementById('open-create-form-btn') ;
const createFormDiv = document.getElementById('create-form-div');
const closeCreateFromBtn = document.getElementById('close-create-form-btn');
const editWorkoutDiv = document.getElementById('edit-workout-div');
const nameInput = document.getElementById('name-input') ;
const descriptionInput = document.getElementById('description-input');
const ftpInput = document.getElementById('ftp-input');
const AddWorkoutHeadBtn = document.getElementById('add-workout-head');
const navbar = document.getElementById('navbar');
const fence = document.getElementById('fence');
let lap = 0 ;
const minTotal = 0;
let dataString = ``;
let decMinsTotal = 0 ;
const blockLaps = [] ;
let blockLapsSorted = [...blockLaps].sort((a,b) => a.position - b.position) ;
let stopSel = false ;

//darkmode stuff
localStorage.removeItem('active') ;
let darkmode = localStorage.getItem('darkmode'); 
const themeSwitch = document.getElementById('themeswitch');

const enableDarkmode = () => {
    document.body.classList.add("dark-mode");
    localStorage.setItem('darkmode', 'active'); 
}

const disableDarkmode = () => {
    document.body.classList.remove('dark-mode'); 
    localStorage.setItem('darkmode', 'null');

}

darkmode === "active" ? enableDarkmode() : disableDarkmode() ;


themeSwitch.addEventListener("click", () => {
    console.log(darkmode);
    darkmode = localStorage.getItem('darkmode');
    darkmode === 'active' ? disableDarkmode() : enableDarkmode() ; 
    darkmode = localStorage.getItem('darkmode');
    updateBlockLapColor();
    console.log(darkmode);
})


function getPrimaryColor() {
    if (darkmode === "active") {
        return '#F4D03F' ;
    } else {
        return '#0071ff' ;
    }
}
function getBaseTert() {
    if (darkmode === "active") {
        return '#1C2833' ;
    } else {
        return '#eeeeee' ;
    }
}

function updateBlockLapColor() {
    blockLaps.forEach((lap) => {
        if (lap.dockStatus = "docked") {
            if (darkmode !== "active") {
                const div = document.querySelector(`.blockLapDiv-${lap.name}`);
                div.style.backgroundColor = '#eeeeee';
                div.style.border = '1px solid #1C2833' ;
            } else {
                const div = document.querySelector(`.blockLapDiv-${lap.name}`);
                div.style.backgroundColor = '#1C2833';
                div.style.border = '1px solid #F4D03F' ;
            }

        }
    })
}

const root = document.documentElement;

let primaryColor = getComputedStyle(root).getPropertyValue('--primary-color').trim();
let baseColor = getComputedStyle(root).getPropertyValue('--base-color').trim();
let baseVariantTert = getComputedStyle(root).getPropertyValue('--base-variant-tert').trim();

addWorkoutBtn.addEventListener("click", toggleCreateForm);
closeCreateFromBtn.addEventListener("click", toggleCreateForm);
AddWorkoutHeadBtn.addEventListener("click", addWorkoutHead) ;

function decideOnBlockBuilder() {
    const decider = document.createElement("div");
    decider.classList.add("noSelect");
    decider.id = 'decider';
    decider.innerHTML = `
    <div id="header">
    <p id="huh">Which Builder Tool do you prefer?</p>
    </div>
    <div class="tool-options">
    <span id="manual-tool">
    <p>Manual Builder</p>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"/></svg>
    </span>
    <span id="block-tool">
    <p>Block Builder</p>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z"/></svg>
    </span>
    </div>
    `;
    editWorkoutDiv.appendChild(decider);
    const optForMan = document.getElementById('manual-tool');
    optForMan.addEventListener('click', function() {
        addNewWorkout();
    })
    const optForBlock = document.getElementById('block-tool'); 
    optForBlock.addEventListener('click', function() {
        AddNewWorkoutBlock()
    })
}


function toggleCreateForm() {
    createFormDiv.classList.toggle("hidden");
    addWorkoutBtn.classList.toggle("hidden");
}
function  hideAddWorkoutBtn() {
    addWorkoutBtn.classList.add("hidden");
}
function toggleEditWorkoutDiv() {
    editWorkoutDiv.classList.toggle("hidden");
}

function getFileName(name) {
    const regex = /[\s\\\/:*?"<>|]/g;
    const fileName = name.toLowerCase().replace(regex, '-').trim();
    return fileName ;
}

function changeLapWidths() {
    for (let i = 0; i < blockLaps.length; i++) {
        let lapNum = blockLaps[i].name;
        let blockLap = document.querySelector(`.blockLapDiv-${lapNum}`);
        if (blockLaps[i].dockStatus = "docked") {
            const blockWidth = ((blockLaps[i].duration) / decMinsTotal) * 1000 ;
            blockLaps[i].width = blockWidth ;
            blockLap.style.width = `${blockWidth}px`;
        }
    }
}

function changeLapHeight(ind) {
    const lapNum = blockLaps[ind].name ;
    const blockLap = document.querySelector(`.blockLapDiv-${lapNum}`);
    const ogHeight = blockLaps[ind].height ;
    const ogMarginTop = blockLaps[ind].margintop ;
    if (blockLaps[ind].dockStatus = "docked") {
        const blockHeight = (blockLaps[ind].power) * 0.4 ;
        blockLaps[ind].height = blockHeight ;
        blockLap.style.height = `${blockHeight}px`;
        const marginTop = ogMarginTop - blockHeight + ogHeight ;
        blockLaps[ind].margintop = marginTop ; 
        blockLap.style.top = `${marginTop}px`;  
    } 
    
}

function changeLapArrangements() {
    const baseMargin = 0 ;
    let leftMargin = baseMargin ;
    for (let i = 0; i < blockLapsSorted.length; i++) {            
        let lap = blockLapsSorted[i];
        const blockLap = document.querySelector(`.blockLapDiv-${lap.name}`);
        blockLap.style.left = `${leftMargin}px`;
        let ogInd = blockLaps.findIndex((e) => e.position === lap.position) ;
        blockLaps[ogInd].marginleft = leftMargin ;
        leftMargin += lap.width ;  
        
    }
}

function AddNewWorkoutBlock() {
    editWorkoutDiv.innerHTML = "" ;
    editWorkoutDiv.style.position = 'absolute' ;
    editWorkoutDiv.style.width = '1000px' ;
    editWorkoutDiv.style.right = '0px' ;
    editWorkoutDiv.style.left = '-250px' ;
    editWorkoutDiv.style.height = '500px' ;
    if (nameInput.value.length === 0) {nameInput.value = "New Workout"}
    if (ftpInput.value.length === 0) {ftpInput.value = 250.0}
    const fileName = getFileName(nameInput.value);
    editWorkoutDiv.innerHTML += `
    <div class="editHead noSelect" >
    <h1>${nameInput.value}</h1>
    <p>FTP: ${ftpInput.value}</p>
    </div>
    <div class="addLapOrSaveBtns noSelect">
    <p id="addBlockLapBtn" class="addLapOrSaveBtn blockBtn">add lap</p>
    <p id="saveBlockLapBtn" class="addLapOrSaveBtn blockBtn">save</p>
    </div>
    <div class="lapBlocksBottom noSelect"></div>
    `;
    dataString += `
[COURSE HEADER]
VERSION = 2
UNITS = ENGLISH
DESCRIPTION = ${nameInput.value}
FILE NAME = ${fileName}.erg
FTP = ${ftpInput.value}
MINUTES WATTS
[END COURSE HEADER]
[COURSE DATA]`
} 


function addNewWorkout() {
    editWorkoutDiv.innerHTML = "";
    if (nameInput.value.length === 0) {nameInput.value = "New Workout"}
    if (ftpInput.value.length === 0) {ftpInput.value = 250.0}
    const fileName = getFileName(nameInput.value);
    editWorkoutDiv.innerHTML += `
    <div class="editHead noSelect" >
    <h1>${nameInput.value}</h1>
    <p>FTP: ${ftpInput.value}</p>
    </div>
    <div class="addLapOrSaveBtns noSelect">
    <p id="add-lap-btn" class="addLapOrSaveBtn">add lap</p>
    <p id="save-btn" class="addLapOrSaveBtn">save</p>
    </div>
    `;
    dataString += `
[COURSE HEADER]
VERSION = 2
UNITS = ENGLISH
DESCRIPTION = ${nameInput.value}
FILE NAME = ${fileName}.erg
FTP = ${ftpInput.value}
MINUTES WATTS
[END COURSE HEADER]
[COURSE DATA]`
}
const saveBtn = document.getElementById('save-btn');


function addWorkoutHead() {
    toggleCreateForm();
    decideOnBlockBuilder();
    hideAddWorkoutBtn();
    toggleEditWorkoutDiv();
}


function handleMinSecOverlap(mins, secs) {
    mins = Number(mins) || 0 ;
    secs = Number(secs) || 0 ;
    mins += Math.floor(secs / 60);
    secs %= 60 ;
    const secString = String(secs).padStart(2, '0');
    const minString = String(mins).padStart(2, '0');
    return `${minString}:${secString}`;
}

function toDecimalMinutes(mins, secs) {
    mins = Number(mins) || 0 ;
    secs = Number(secs) || 0 ;
    const decimalMins = (1.0 * (mins + secs / 60)).toFixed(2) ;
    secs -= secs/60 ;
    return Number(decimalMins) ;
}

function  minFromDecMin(decMin) {
    decMin = Number(decMin) || 0 ;
    const wholeMin = Math.floor(decMin);
    return wholeMin ;
}

function secFromDecMin(decMin) {
    decMin = Number(decMin) || 0 ;
    const wholeSecs = ((decMin - Math.floor(decMin)) * 60).toFixed(0); 
    let formattedWholeSecs = String(wholeSecs).padStart(2, '0');
    return formattedWholeSecs ;
}

function addToDataString(mins, power) {
    dataString += `\n${mins}     ${power}`;
}

editWorkoutDiv.addEventListener("click", function (e) {
    if (e.target.classList.contains("addLap")) {
        handleAdderClick(e.target);
    } else if (e.target.classList.contains("discardLap")) {
        handleDiscarderClick(e.target);
    } 
});

function addNewLap() {
    lap++;
    const lapEdit = document.createElement("div");
    lapEdit.id = `lap-${lap}`;
    lapEdit.classList.add("lap", "focused");
    editWorkoutDiv.classList.add("blurred", "noSelect");
    lapEdit.innerHTML += `
    <span id="desc-input">
    <label class="lap-input-label">Description: </label>
    <input id="lap-${lap}-text" class="lap-text lap-inputs" placeholder="warm up..."></input>
    </span>
    <label class="lap-input-label"></label>
    <span id="time-input">
    <label class="lap-input-label">mins:</label>
    <input id="lap-${lap}-mins" class="lap-mins lap-inputs" type="number"></input>
    <label class="lap-input-label">secs:</label>
    <input id="lap-${lap}-secs" class="lap-secs lap-inputs" type="number"></input>
    </span>
    <span id="lap-input-power">
    <label class="lap-input-label">Power:</label>
    <input id="lap-${lap}-power" class="lap-intensity lap-inputs" type="number" placeholder="185"></input>
    <p>W</p>
    </span>
    <span id="lap-input-btns">
    <button class="addLap">add</button>
    <button class="discardLap">discard</button>
    </span>
    `;

    editWorkoutDiv.appendChild(lapEdit);
    const lapEditChildren = lapEdit.querySelectorAll("*");
    lapEditChildren.forEach(element => {
        element.classList.add("focused");
    });
}

function handleAdderClick(target) {
    const lapEdit = target.closest(".lap");
    const descInput = lapEdit.querySelector(".lap-text");
    const minInput = lapEdit.querySelector(".lap-mins");
    const secInput = lapEdit.querySelector(".lap-secs");
    const powerInput = lapEdit.querySelector(".lap-intensity");

    if (!powerInput.value) {
        powerInput.value = 200;
    }
    if (!descInput.value) {
        descInput.value = `lap-${lap}`;
    }
    if (!minInput.value && !secInput.value) {
        minInput.value = 20 ;
    }

    const zonePercentage = Math.floor(
        (100.0 * Number(powerInput.value)) / Number(ftpInput.value)
    );
    const timeString = handleMinSecOverlap(
        Number(minInput.value),
        Number(secInput.value)
    );
    const decimalMinutes = toDecimalMinutes(minInput.value, secInput.value);

    addToDataString(decimalMinutes, powerInput.value);

    lapEdit.remove();
    editWorkoutDiv.classList.remove("blurred");
    const lapProps = document.createElement("div");
    lapEdit.id = `lap-${lap}`;
    lapEdit.classList.add("lap", "focused");
    lapProps.classList.add("lapDataNShi", "noSelect");
    lapProps.id = `lapData-${lap}`;
    lapProps.innerHTML += `
        <span id="lap-data-left">
        <p>${lap}</p>
        </span>
        <span id="lap-data-right">
        <p class="lap-text"><strong>${descInput.value}</strong></p>
        <p class="lap-data-all">${timeString} @${zonePercentage}% of FTP</p>
        <p class="lap-data-power">${powerInput.value}W</p>
        </span>
        <span id="lap-data-very-right">
        <svg id="pencil-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path id="pencil-svg-path" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
        <svg id="bin-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path id="bin-svg-path" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
        </span>
        <span class="this-lap-data">
        <p id="desc-data">${descInput.value}</p>
        <p id="min-data">${minInput.value}</p>
        <p id="sec-data">${secInput.value}</p>
        <p id="power-data">${powerInput.value}</p>
        </span>
    `;
    editWorkoutDiv.appendChild(lapProps);
    
}

function handleDiscarderClick(target) {
    const lapEdit = target.closest(".lap");
    lapEdit.remove();
    editWorkoutDiv.classList.remove("blurred");
    lap-- ;
}

function saveAsErg() {
    const fileName = getFileName(nameInput.value);
    dataString += `\n[END COURSE DATA]`;
    const blob = new Blob([dataString], {type: 'text/erg'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.erg`;
    link.click();
}

function saveBlockLap() {
    blockLapsSorted = [...blockLaps].sort((a,b) => a.position - b.position) ;
    blockLapsSorted.forEach((lap) => {
        if (lap.duration !== 0) {
            addToDataString(lap.duration, lap.power) ;
        }
    })

    dataString += `\n[END COURSE DATA]`;
    const fileName = getFileName(nameInput.value);
    const blob = new Blob([dataString], {type: 'text/erg'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.erg`;
    link.click();
}

editWorkoutDiv.addEventListener("click", function (e) {
    if (e.target.id === 'add-lap-btn') {
        addNewLap();
    } else if (e.target.id === "save-btn") {
        saveAsErg();
    }
}
);
editWorkoutDiv.addEventListener("click", function(e) {
    if (e.target.id === 'addBlockLapBtn') {
        addNewBlockLap();
    } else if (e.target.id === 'saveBlockLapBtn') {
        saveBlockLap();
    }
} )

editWorkoutDiv.addEventListener('mousedown', moveBlocksAround);
let mouseAintDown = true ;
document.addEventListener('mouseup', () => {
    mouseAintDown = true ;
})
document.addEventListener('mousedown', () => {
    mouseAintDown = false ;
})

function moveBlocksAround(e) {
    const targetElement = e.target ;
    const ipie = blockLaps.findIndex((i) => i.name === e.target.name);
    const containerRect = editWorkoutDiv.getBoundingClientRect();
    if (e.target.id === 'draggable' && blockLaps[ipie].dockStatus !== "docked") {
        targetElement.style.cursor = 'grabbing' ;
        const targetArrNum = e.target.name - 1 ;
        e.preventDefault();

        const rect = targetElement.getBoundingClientRect();
        
        const offsetX = e.clientX - rect.left ;
        const offsetY = e.clientY - rect.top ;

        const startX = e.clientX ;
        const startY = e.clientY ;

        const minX = 0 ;
        const minY = 0 ;
        const maxX = 1000 ;
        const maxY = 360 ;

        let lockIn = false ;
        let lastX = startX ;

        function onMouseMove(event) {
            let newX = event.clientX - containerRect.left - 250   ;
            let newY = event.clientY - containerRect.top - 40 ;

            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));
            targetElement.style.left = `${newX}px`;
            targetElement.style.top = `${newY}px`;
            
            lastX = event.clientX ;
            if (newY === maxY) {
                lockIn = true ;
            }
        }

        function onMouseUp() {
            window.removeEventListener('mousemove', onMouseMove) ;
            window.removeEventListener('mouseup', onMouseUp) ;

            if (targetElement.style.top === `${maxY}px`) {
                dockInLaps(targetElement);
            }
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        function dockInLaps(div) {
            blockLaps[targetArrNum].dockStatus = "docked";
            for (let i = 0; i < blockLapsSorted.length; i++) {
                if (lastX > blockLapsSorted[i].marginleft) {
                    blockLaps[targetArrNum].position = i + 1 ;
                    for (let j = 0; j < blockLapsSorted.length; j++) {
                        if (blockLaps[j].position > i ) {
                            blockLaps[j].position ;
                        }
                    }
                }
            }
            blockLapsSorted = [...blockLaps].sort((a, b) => a.position - b.position);
            changeLapWidths();
            changeLapArrangements();


            console.log(darkmode);
            div.style.cursor = 'default';
            div.style.boxShadow = "none" ;
            div.style.backgroundColor = getBaseTert();
            div.style.border = `1px solid ${getPrimaryColor()}` ;
            div.style.borderRadius = "10px" ;
            div.innerHTML += `
            <div class="selectionDiv selectable" aria-label="${blockLaps[targetArrNum].name}"></div>
            <div class="topInfo" id="topInfo-${blockLaps[targetArrNum].name}">${blockLaps[targetArrNum].power} W</div>
            <div class="bottomInfo" id="bottomInfo-${blockLaps[targetArrNum].name}" >${minFromDecMin(blockLaps[targetArrNum].duration)}:${secFromDecMin(blockLaps[targetArrNum].duration)}</div>
            <div class="verticalDrag noSelect" id="whirrDragger" aria-label="${blockLaps[targetArrNum].name}" ></div>
            <span class="block-svgs">
            <svg id="back-svg-block" class="noSelect" aria-label="${blockLaps[targetArrNum].name}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path id="back-svg-block" aria-label="${blockLaps[targetArrNum].name}" class="noSelect" d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-320c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3l0 41.7 0 41.7L459.5 440.6zM256 352l0-96 0-128 0-32c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-64z"/></svg>
            <svg id="pencil-svg-block" class="noSelect" aria-label="${blockLaps[targetArrNum].name}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path id="pencil-svg-block" class="noSelect" aria-label="${blockLaps[targetArrNum].name}" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
            <svg id="bin-svg-block" class="noSelect" aria-label="${blockLaps[targetArrNum].name}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path id="bin-svg-block" class="noSelect" aria-label="${blockLaps[targetArrNum].name}" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            <svg id="ahead-svg-block" class="noSelect" aria-label="${blockLaps[targetArrNum].name}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path id="ahead-svg-block" aria-label="${blockLaps[targetArrNum].name}" class="noSelect" d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416L0 96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3l0 41.7 0 41.7L52.5 440.6zM256 352l0-96 0-128 0-32c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29l0-64z"/></svg>
            </span>

            <div class="horizontalDrag" id="whoreDragger" aria-label="${blockLaps[targetArrNum].name}"></div>
            `;

        }
    }else if (targetElement.id === 'whirrDragger') {
        const nameAttr = targetElement.ariaLabel ;
        const ind = blockLaps.findIndex((e) => e.name == nameAttr) ;
        let divPower = 200 ;

        const startY = e.pageY - e.screenY  ;
        const topInfoTxt = document.getElementById(`topInfo-${nameAttr}`);

        targetElement.style.cursor = 'row-resize';


        function onMouseMove(event) {
            document.body.style.userSelect = 'none';
            targetElement.style.cursor = 'row-resize';
            
            const lapBlocksBottom = document.querySelector('.lapBlocksBottom');
            const lpbRect = lapBlocksBottom.getBoundingClientRect();
            const pageTop = lpbRect.bottom + window.scrollY ;
            let newY = pageTop - event.pageY ;
            newY = Math.max(0, Math.min(newY, 400));
            divPower = (newY * 2.5).toFixed(1); ; 
            blockLaps[ind].power = divPower ;
            changeLapHeight(ind);
            topInfoTxt.innerText = `${blockLaps[ind].power} W`;
        }
        function onMouseUp() {
            targetElement.style.cursor = ''; 
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

    } else if (targetElement.id === 'whoreDragger') {
        const divName = targetElement.ariaLabel ;
        const div = document.querySelector(`.blockLapDiv-${divName}`);
        const ind = blockLaps.findIndex((i) => i.name == divName) ;
        let ogDivWidth = blockLaps[ind].width ;
        let ogDivDuration = blockLaps[ind].duration ;
        const startX = e.pageX ;
        const bottomInfoTxt = document.getElementById(`bottomInfo-${divName}`);

        const rect = targetElement.getBoundingClientRect();
        
        const minX = 0 ;
        const maxX = 1440 ;

        const conatainerRect = div.getBoundingClientRect();
        const offsetX = startX - conatainerRect.right ;

        targetElement.style.cursor = 'row-resize';


        function onMouseMove(event) {
            document.body.style.userSelect = 'none';
            targetElement.style.cursor = 'col-resize';
            
            let preMins = blockLaps[ind].duration;
            let marLeft = blockLaps[ind].marginleft ;

            let cursorX = event.pageX ;
            let newDivWidth = cursorX - conatainerRect.left ;

            let x = event.pageX - containerRect.left ;

            newDivWidth = Math.max(0, Math.min(1440, newDivWidth));
            let divDuration = Math.pow((newDivWidth / ogDivWidth), 2) * ogDivDuration ;
            blockLaps[ind].duration = divDuration ;
            
            decMinsTotal -= preMins ;
            decMinsTotal += divDuration ;
            
            bottomInfoTxt.innerText = `${minFromDecMin(blockLaps[ind].duration)}:${secFromDecMin(blockLaps[ind].duration)}`;

            changeLapWidths();
            changeLapArrangements();
        }
        function onMouseUp() {
            targetElement.style.cursor = ''; 
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

    }
}


function updateBlockLap(ind, newTime, newPower) {
    blockLaps[ind].duration = newTime ;
    blockLaps[ind].power = newPower ;
}

function addNewBlockLap() {
    lap++ ;
    let pos = 0 ;
    const BlockLapDiv = document.createElement("div");
    BlockLapDiv.id = `draggable`;
    BlockLapDiv.style.width = '500px' ;
    BlockLapDiv.classList.add(`blockLapDiv-${lap}`, "blockLapDiv", "noSelect");
    BlockLapDiv.name = lap;
    blockLaps.push({name: lap, duration: 20.0, power: 200, width: 500, dockStatus: "free", height: 80, margintop: 360, marginleft: 220, position: pos});
    BlockLapDiv.innerHTML += `
    <span id="editBlockLap">
    <p class="hidden" id="blockLapDecMins">20.00</p>
    <p class="hidden" id="blockLapPower">200</p>
   </span>
    `;
    BlockLapDiv.style.top = '85px' ;
    editWorkoutDiv.appendChild(BlockLapDiv);
    const blockLapDecMins = 20.0 ;
    decMinsTotal += blockLapDecMins ;

}

function deleteBlockLap(target) {
    const lapName = `${target.ariaLabel}`;
    const ind = blockLaps.findIndex((p) => p.name == lapName);
    const lapProps = document.querySelector(`.blockLapDiv-${lapName}`) ;
    decMinsTotal -= blockLaps[ind].duration;
    blockLaps[ind].duration = 0;
    changeLapWidths();
    changeLapArrangements();
    lapProps.style.display = 'none';
}

function changePositionPos(target) {
    const lapName = `${target.ariaLabel}` ;
    const ind = blockLaps.findIndex((p) => p.name == lapName) ;
    let copy = blockLaps[ind].position ;
    blockLapsSorted = [...blockLaps].sort((a,b) => a.position - b.position) ;
    let index = blockLapsSorted.findIndex((e) => e.position === copy);
    let Kopie = blockLapsSorted[index + 1].position ;
    let neInd = blockLaps.findIndex((d) => d.position === Kopie);
    blockLaps[ind].position = blockLaps[neInd].position ;   
    blockLaps[neInd].position = copy ;
    
    blockLapsSorted = [...blockLaps].sort((a,b) => a.position - b.position) ;
    changeLapArrangements();
}
function changePositionNeg(target) {
    const lapName = `${target.ariaLabel}` ;
    const ind = blockLaps.findIndex((p) => p.name == lapName) ;
    let copy = blockLaps[ind].position ;
    blockLapsSorted = [...blockLaps].sort((a,b) => a.position - b.position) ;
    let index = blockLapsSorted.findIndex((e) => e.position == copy);
    let Kopie = blockLapsSorted[index - 1].position ;
    let neInd = blockLaps.findIndex((d) => d.position === Kopie);
    blockLaps[ind].position = blockLaps[neInd].position ;   
    blockLaps[neInd].position = copy ;
    
    blockLapsSorted = [...blockLaps].sort((a,b) => a.position - b.position) ;
    changeLapArrangements();
}

editWorkoutDiv.addEventListener("click" , function(e) {
    if (e.target.id === 'pencil-svg-path') {
        editLap(e.target);
    } else if (e.target.id === 'bin-svg-path') {
        deleteLap(e.target);
    } else if (e.target.id === 'pencil-svg-block') {
        editBlockLap(e.target);
    } else if (e.target.id === 'back-svg-block') {
        changePositionNeg(e.target);
    } else if (e.target.id === 'ahead-svg-block') {
        changePositionPos(e.target);
    } else if (e.target.id === 'bin-svg-block') {
        deleteBlockLap(e.target);
    }
});
function editBlockLap(target) {
    const lapName = target.ariaLabel ;
    const ind = blockLaps.findIndex((p) => p.name == lapName) ;
    const lapProps = document.querySelector(`.blockLapDiv-${lapName}`);
    const blockDecMinData = blockLaps[ind].duration;
    const blockMinData = minFromDecMin(blockDecMinData);
    const blockSecData = secFromDecMin(blockDecMinData);
    const blockPowerData = blockLaps[ind].power;
    editWorkoutDiv.classList.add("blurred");
    const blockEditor = document.createElement("div");
    blockEditor.id = `${ind}`;
    blockEditor.classList.add("lap", "focused", "blockLap", "noSelect");
    blockEditor.innerHTML = `
    <span id="time-input">
    <label class="lap-input-label">mins:</label>
    <input value="${blockMinData}" id="lap-${lap}-mins" class="lap-mins lap-inputs" type="number"></input>
    <label class="lap-input-label">secs:</label>
    <input value="${blockSecData}" id="lap-${lap}-secs" class="lap-secs lap-inputs" type="number"></input>
    </span>
    <span id="lap-input-power">
    <label class="lap-input-label">Power:</label>
    <input value="${blockPowerData}" id="${lap}" class="lap-intensity lap-inputs" type="number" ></input>
    <p>W</p>
    </span>
    <span id="lap-input-btns">
    <button id="addBlockLap">save</button>
    <button id="discardBlockLap">discard</button>
    </span>
    `;
    fence.appendChild(blockEditor);

    const blockEditorChildren = blockEditor.querySelectorAll("*");
    blockEditorChildren.forEach(element => {
        element.classList.add("focused");
    });
}
fence.addEventListener("click", function(e) {
    if (e.target.id === 'addBlockLap') {
        handleSaveBlockClick(e.target);
    } else if (e.target.id === 'discardBlockLap') {
        handleDiscardBlockClick(e.target);
    }
})
function handleSaveBlockClick(target) {

    const blockLapInputter = target.closest(".blockLap");
    const minInput = blockLapInputter.querySelector(".lap-mins").value;
    const secInput = blockLapInputter.querySelector(".lap-secs").value;
    const powerInput = blockLapInputter.querySelector(".lap-intensity");
    const ind = blockLapInputter.id ;
    const lapName = blockLaps[ind].name
    const preMins = blockLaps[ind].duration ;

    if (!powerInput.value) {
        powerInput.value = 200;
    }
    if (!minInput.value && !secInput.value) {
        minInput.value = 20 ;
    }
    let decimalMinutes = toDecimalMinutes(minInput, secInput);
    blockLaps[ind].duration = decimalMinutes ;
    blockLaps[ind].power = powerInput.value ;

    decMinsTotal -= preMins ;
    decMinsTotal += decimalMinutes ;

    const bottomInfoTxt = document.getElementById(`bottomInfo-${lapName}`);
    const topInfoTxt = document.getElementById(`topInfo-${lapName}`);
    bottomInfoTxt.innerText = `${minFromDecMin(blockLaps[ind].duration)}:${secFromDecMin(blockLaps[ind].duration)}`;
    topInfoTxt.innerText = `${blockLaps[ind].power} W`;

    addToDataString(decimalMinutes, powerInput.value);
    updateBlockLap((ind), decimalMinutes, Number(powerInput.value));
    changeLapWidths();
    changeLapHeight(ind);
    changeLapArrangements();

    editWorkoutDiv.classList.remove("blurred");
    blockLapInputter.remove();
}

function handleDiscardBlockClick(target) {
    const blockLapInputter = target.closest(".blockLap");
    blockLapInputter.remove();
    editWorkoutDiv.classList.remove("blurred");
}
 
function editLap(target) {
    const lapProps = target.closest(".lapDataNShi");
    const descInput = lapProps.querySelector('#desc-data').textContent;
    const minInput = lapProps.querySelector('#min-data').textContent;
    const secInput = lapProps.querySelector('#sec-data').textContent;
    const powerInput = lapProps.querySelector('#power-data').textContent;
    lapProps.style.display = 'none';
    editWorkoutDiv.classList.add("blurred");
    const lapEdit = document.createElement("div");
    lapEdit.id = `lap-${lap}`;
    lapEdit.classList.add("lap", "focused", "noSelect");
    lapEdit.innerHTML += `
    <span id="desc-input">
    <label class="lap-input-label">Description: </label>
    <input value="${descInput}" id="lap-${lap}-text" class="lap-text lap-inputs" placeholder="warm up..."></input>
    </span>
    <label class="lap-input-label"></label>
    <span id="time-input">
    <label class="lap-input-label">mins:</label>
    <input value="${minInput}" id="lap-${lap}-mins" class="lap-mins lap-inputs" type="number"></input>
    <label class="lap-input-label">secs:</label>
    <input value="${secInput}" id="lap-${lap}-secs" class="lap-secs lap-inputs" type="number"></input>
    </span>
    <span id="lap-input-power">
    <label class="lap-input-label">Power:</label>
    <input value="${powerInput}" id="lap-${lap}-power" class="lap-intensity lap-inputs" type="number" placeholder="185"></input>
    <p>W</p>
    </span>
    <span id="lap-input-btns">
    <button class="addLap">save</button>
    <button class="discardLap">discard</button>
    </span>
    `;

    editWorkoutDiv.appendChild(lapEdit);
    const lapEditChildren = lapEdit.querySelectorAll("*");
    lapEditChildren.forEach(element => {
        element.classList.add("focused");
    });
}
function deleteLap(target) {
    const lapProps = target.closest(".lapDataNShi");
    lapProps.remove();
    lap-- ;
}

//selection rectangle stuff

document.addEventListener('DOMContentLoaded', () => {
    let isSelecting = false;
    let selectingrn = false ;
    let startX = 0, startY = 0;
    const selectionRectangle = document.createElement('div');
    selectionRectangle.className = 'selection-rectangle';
    document.body.appendChild(selectionRectangle);
  
    let selectableElements = document.querySelectorAll(".selectable");
    let selectedElements = [];
    
    
    document.addEventListener('mousedown', (event) => {
      if (!event.target.closest('.selectable') && !(event.target.id === 'pencil-svg-blockGrp' || event.target.id === 'bin-svg-blockGrp' || event.target.id === 'copy-svg-blockGrp')) {
        selectableElements.forEach((element) => element.classList.remove('selected'));
        if (selectingrn) {closeGroupLapEditor();
            stopSel = true ;}
      }
  
      if (event.target.closest('.noSelect')) return; // Prevent rectangle creation in noSelect areas
      
      stopSel = false ;
      isSelecting = true;
      startX = event.pageX;
      startY = event.pageY;
  
      // Initialize rectangle
      selectionRectangle.style.left = `${startX}px`;
      selectionRectangle.style.top = `${startY}px`;
      selectionRectangle.style.width = '0px';
      selectionRectangle.style.height = '0px';
      selectionRectangle.style.display = 'block';
    });
  
    document.addEventListener('mousemove', (event) => {
        if (!isSelecting) return;
      
        const currentX = event.pageX;
        const currentY = event.pageY;
      
        const rectLeft = Math.min(startX, currentX);
        const rectTop = Math.min(startY, currentY);
        const rectWidth = Math.abs(startX - currentX);
        const rectHeight = Math.abs(startY - currentY);
      
        selectionRectangle.style.left = `${rectLeft}px`;
        selectionRectangle.style.top = `${rectTop}px`;
        selectionRectangle.style.width = `${rectWidth}px`;
        selectionRectangle.style.height = `${rectHeight}px`;
      
        selectableElements = document.querySelectorAll(".selectable");
      
        const rectBottom = rectTop + rectHeight;
        const rectRight = rectLeft + rectWidth;
      
        selectableElements.forEach((element) => {
          const elementRect = element.getBoundingClientRect();
      
          const elementTop = elementRect.top + window.scrollY;
          const elementBottom = elementRect.bottom + window.scrollY;
          const elementLeft = elementRect.left + window.scrollX;
          const elementRight = elementRect.right + window.scrollX;
      
          const overlap = !(
            rectLeft > elementRight ||
            rectRight < elementLeft ||
            rectTop > elementBottom ||
            rectBottom < elementTop
          );
      
          if (overlap && !element.classList.contains('noSelect')) {
            element.classList.add('selected');
            selectedElements.push({ name: element.ariaLabel });
            selectingrn = true;
            openGroupLapEditor();
          }
        });
      });
  
    document.addEventListener('mouseup', () => {
      if (isSelecting) {
        isSelecting = false ;
        selectionRectangle.style.display = 'none';
      } 
    });
    
    function openGroupLapEditor() {
        // blur out background
        editWorkoutDiv.classList.add("blurred");
        document.querySelectorAll(".focused").forEach((element) => {
            element.classList.remove("focused");
        });

        for (let i = 0; i < selectedElements.length; i++) {
            const lapProps = document.querySelector(`.blockLapDiv-${selectedElements[i].name}`);
            lapProps.classList.add("focused");
            const lapPropsChildren = lapProps.querySelectorAll("*");
            lapPropsChildren.forEach((element) => {
                element.classList.add("focused");
            })
        }

        const groupLapEditor = document.createElement("div");
        groupLapEditor.classList.add("grpEdit");
        groupLapEditor.innerHTML = `
        <div class="blockGrp-svgs">
            <svg id="bin-svg-blockGrp" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path id="bin-svg-blockGrp" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            <svg id="copy-svg-blockGrp" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path id="copy-svg-blockGrp" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>
        </div>
        `;
        fence.appendChild(groupLapEditor);
    }

    function closeGroupLapEditor() {
        editWorkoutDiv.classList.remove("blurred");
        for (let i = 0; i < selectedElements.length; i++) {
            const lapProps = document.querySelector(`.blockLapDiv-${selectedElements[i].name}`);
            lapProps.classList.remove("focused");
            const lapPropsChildren = lapProps.querySelectorAll("*");
            lapPropsChildren.forEach((element) => {
                element.classList.remove("focused");
            })
        }

    selectedElements.length = 0 ;
    const groupLapEditor = document.querySelectorAll(".grpEdit");
    groupLapEditor.forEach((element) => {
        element.remove();
    })
    selectingrn = false ;
}
    
let dupeCount = 0 ;   
document.addEventListener("click", function(e) {
    if (e.target.id === 'bin-svg-blockGrp') {
        deleteBlockLaps();
    } else if (e.target.id === 'copy-svg-blockGrp') {
        dupeCount++ ;
        if (stopSel) {
            dupeCount = 0;
        }
        dupeBlockLaps();
    }
})

function deleteBlockLaps() {
    let selectedLaps = [];
    document.querySelectorAll(".focused").forEach((element) => {
        selectedLaps.push({name: element.ariaLabel});
    })
    selectedLaps = selectedLaps.filter((lap) => lap.name !== null);

    selectedLaps.forEach((lap) => {
        const lapIndex = blockLaps.findIndex((p) => p.name == lap.name) ;
        const lapProps = document.querySelector(`.blockLapDiv-${lap.name}`);
        decMinsTotal -= blockLaps[lapIndex].duration ;
        blockLaps[lapIndex].duration = 0;
        changeLapWidths();
        changeLapArrangements();
        lapProps.style.display = "none" ;
    })
    closeGroupLapEditor();
}

function dupeBlockLaps() {
    let selectedLaps  = [] ;
    document.querySelectorAll('.selected').forEach((element) => {
        selectedLaps.push({name: element.ariaLabel});
    });
    const uniqueSelectedLaps = selectedLaps.filter((o, index, arr) =>
        arr.findIndex(item => JSON.stringify(item) === JSON.stringify(o)) === index
    );
    uniqueSelectedLaps.forEach((e) => {
        lap++ ;
        const lapInd = blockLaps.findIndex((p) => p.name == e.name);
        const thisLap = document.querySelector(`.blockLapDiv-${e.name}`);
        let thisLapClone = document.createElement("div");
        thisLapClone = thisLap.cloneNode(true);

        const newNamePostComma = (100 / (selectedLaps.length + dupeCount)).toFixed(0) ;
        const newPos = getNewPos(lapInd) ;
        const newNameString = `${e.name}-${newNamePostComma}` ;
        thisLapClone.classList.remove(`blockLapDiv-${e.name}`);
        thisLapClone.classList.add(`blockLapDiv-${newNameString}`);

        const lapSecDiv = thisLapClone.children[1];
        lapSecDiv.ariaLabel = '' ;
        lapSecDiv.ariaLabel = `${newNameString}`;
        lapSecDiv.classList.remove("selected");

        const lapWhirrDrag = thisLapClone.children[4];
        lapWhirrDrag.ariaLabel = `${newNameString}`;

        const lapWhirrInfo = thisLapClone.children[2];
        lapWhirrInfo.id = `topInfo-${newNameString}`;

        const lapWhoreInfo = thisLapClone.children[3];
        lapWhoreInfo.id = `bottomInfo-${newNameString}`;

        const lapWhoreDrag = thisLapClone.children[6];
        lapWhoreDrag.ariaLabel = `${newNameString}`;

        const svgSpan = thisLapClone.children[5] ;
        const backSvgBlock = svgSpan.querySelectorAll('#back-svg-block');
        const aheadSvgBlock = svgSpan.querySelectorAll('#ahead-svg-block');
        const binSvgBlock = svgSpan.querySelectorAll('#bin-svg-block');
        const pencilSvgBlock = svgSpan.querySelectorAll('#pencil-svg-block');
        backSvgBlock.forEach((e) => {
            e.ariaLabel = `${newNameString}`;
        }) ;
        aheadSvgBlock.forEach((e) => {
            e.ariaLabel = `${newNameString}`;
        });
        binSvgBlock.forEach((e) => {
            e.ariaLabel = `${newNameString}`;
        });
        pencilSvgBlock.forEach((e) => {
            e.ariaLabel = `${newNameString}`;
        });

        decMinsTotal += blockLaps[lapInd].duration ;
        editWorkoutDiv.appendChild(thisLapClone);
        blockLaps.push({name: newNameString, duration: blockLaps[lapInd].duration , power: blockLaps[lapInd].power , width: 0, dockStatus: "docked", height: 80, margintop: 360, marginleft: 0, position: newPos});
        blockLapsSorted = [...blockLaps].sort((a,b) => a.position - b.position) ;

        changeLapWidths() ;
        changeLapArrangements() ;
        changeLapHeight(blockLaps.length - 1);
        console.log(blockLaps);
    });

    function getNewPos(ind) {
        if (blockLaps[ind].name.length > 3) {
            return blockLaps[ind].position + (0.001 * dupeCount);
        } else {
            return blockLaps[ind].position + (0.01 * dupeCount);
        }
    }
}
});

//morphing stuff with KUTE.js (title screen animation)
const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2').getAttribute('d');
const a3 = document.getElementById('a3').getAttribute('d');
const a4 = document.getElementById('a4').getAttribute('d');
const a5 = document.getElementById('a5').getAttribute('d');
const a6 = document.getElementById('a6').getAttribute('d');
const a7 = document.getElementById('a7').getAttribute('d');

const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2').getAttribute('d');
const b3 = document.getElementById('b3').getAttribute('d');
const b4 = document.getElementById('b4').getAttribute('d');
const b5 = document.getElementById('b5').getAttribute('d');
const b6 = document.getElementById('b6').getAttribute('d');
const b7 = document.getElementById('b7').getAttribute('d');

const d1 = document.getElementById('d1');
const d2 = document.getElementById('d2').getAttribute('d');
const d3 = document.getElementById('d3').getAttribute('d');
const d4 = document.getElementById('d4').getAttribute('d');
const d5 = document.getElementById('d5').getAttribute('d');
const d6 = document.getElementById('d6').getAttribute('d');
const d7 = document.getElementById('d7').getAttribute('d');

const e1 = document.getElementById('e1');
const e2 = document.getElementById('e2').getAttribute('d');
const e3 = document.getElementById('e3').getAttribute('d');
const e4 = document.getElementById('e4').getAttribute('d');
const e5 = document.getElementById('e5').getAttribute('d');
const e6 = document.getElementById('e6').getAttribute('d');
const e7 = document.getElementById('e7').getAttribute('d');


const f1 = document.getElementById('f1');
const f2 = document.getElementById('f2').getAttribute('d');
const f3 = document.getElementById('f3').getAttribute('d');
const f4 = document.getElementById('f4').getAttribute('d');
const f5 = document.getElementById('f5').getAttribute('d');
const f6 = document.getElementById('f6').getAttribute('d');
const f7 = document.getElementById('f7').getAttribute('d');

let repeatCount = 0;
const maxRepeats = 999 ;


//function center
function morphSequenceA() {
    const morphToA2 = KUTE.fromTo( a1, { path: a1.getAttribute('d') }, { path: a2 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
        const morphToA3 = KUTE.fromTo( a1, { path: a2 }, { path: a3 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
            const morphToA4 = KUTE.fromTo( a1, { path: a3 }, { path: a4 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                const morphToA5 = KUTE.fromTo( a1, { path: a4 }, { path: a5 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                    const morphToA6 = KUTE.fromTo( a1, { path: a5 }, { path: a6 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                        const morphToA7 = KUTE.fromTo( a1, { path: a6 }, { path: a7 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                            const morphToA1 = KUTE.fromTo( a1, { path: a7 }, { path: a1.getAttribute('d') }, {duration: 10, easing: 'easingCubicInOut', onComplete: () => {
                                repeatCount++;
                                if (repeatCount < maxRepeats) {
                                    morphSequenceA();
                                }
                            },
                            });
                            morphToA1.start();
                         }, });
                         morphToA7.start();
                     }, });
                     morphToA6.start();
                 }, });
                 morphToA5.start();
             }, });
             morphToA4.start();
         }, });
         morphToA3.start();
    }, });
    morphToA2.start();
}
document.addEventListener('DOMContentLoaded', morphSequenceA);

function morphSequenceB() {
    const morphToB2 = KUTE.fromTo( b1, { path: b1.getAttribute('d') }, { path: b2 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
        const morphToB3 = KUTE.fromTo( b1, { path: b2 }, { path: b3 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
            const morphToB4 = KUTE.fromTo( b1, { path: b3 }, { path: b4 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                const morphToB5 = KUTE.fromTo( b1, { path: b4 }, { path: b5 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                    const morphToB6 = KUTE.fromTo( b1, { path: b5 }, { path: b6 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                        const morphToB7 = KUTE.fromTo( b1, { path: b6 }, { path: b7 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                            const morphToB1 = KUTE.fromTo( b1, { path: b7 }, { path: b1.getAttribute('d') }, {duration: 10, easing: 'easingCubicInOut', onComplete: () => {
                                repeatCount++;
                                if (repeatCount < maxRepeats) {
                                    morphSequenceB();
                                }
                            },
                            });
                            morphToB1.start();
                         }, });
                         morphToB7.start();
                     }, });
                     morphToB6.start();
                 }, });
                 morphToB5.start();
             }, });
             morphToB4.start();
         }, });
         morphToB3.start();
    }, });
    morphToB2.start();
}
document.addEventListener('DOMContentLoaded', morphSequenceB);

function morphSequenceD() {
    const morphToD2 = KUTE.fromTo( d1, { path: d1.getAttribute('d') }, { path: d2 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
        const morphToD3 = KUTE.fromTo( d1, { path: d2 }, { path: d3 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
            const morphToD4 = KUTE.fromTo( d1, { path: d3 }, { path: d4 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                const morphToD5 = KUTE.fromTo( d1, { path: d4 }, { path: d5 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                    const morphToD6 = KUTE.fromTo( d1, { path: d5 }, { path: d6 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                        const morphToD7 = KUTE.fromTo( d1, { path: d6 }, { path: d7 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                            const morphToD1 = KUTE.fromTo( d1, { path: d7 }, { path: d1.getAttribute('d') }, {duration: 10, easing: 'easingCubicInOut', onComplete: () => {
                                repeatCount++;
                                if (repeatCount < maxRepeats) {
                                    morphSequenceD();
                                }
                            },
                            });
                            morphToD1.start();
                         }, });
                         morphToD7.start();
                     }, });
                     morphToD6.start();
                 }, });
                 morphToD5.start();
             }, });
             morphToD4.start();
         }, });
         morphToD3.start();
    }, });
    morphToD2.start();
}
document.addEventListener('DOMContentLoaded', morphSequenceD);

function morphSequenceE() {
    const morphToE2 = KUTE.fromTo( e1, { path: e1.getAttribute('d') }, { path: e2 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
        const morphToE3 = KUTE.fromTo( e1, { path: e2 }, { path: e3 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
            const morphToE4 = KUTE.fromTo( e1, { path: e3 }, { path: e4 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                const morphToE5 = KUTE.fromTo( e1, { path: e4 }, { path: e5 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                    const morphToE6 = KUTE.fromTo( e1, { path: e5 }, { path: e6 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                        const morphToE7 = KUTE.fromTo( e1, { path: e6 }, { path: e7 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                            const morphToE1 = KUTE.fromTo( e1, { path: e7 }, { path: e1.getAttribute('d') }, {duration: 10, easing: 'easingCubicInOut', onComplete: () => {
                                repeatCount++;
                                if (repeatCount < maxRepeats) {
                                    morphSequenceE();
                                }
                            },
                            });
                            morphToE1.start();
                         }, });
                         morphToE7.start();
                     }, });
                     morphToE6.start();
                 }, });
                 morphToE5.start();
             }, });
             morphToE4.start();
         }, });
         morphToE3.start();
    }, });
    morphToE2.start();
}
document.addEventListener('DOMContentLoaded', morphSequenceE);

function morphSequenceF() {
    const morphToF2 = KUTE.fromTo( f1, { path: f1.getAttribute('d') }, { path: f2 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
        const morphToF3 = KUTE.fromTo( f1, { path: f2 }, { path: f3 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
            const morphToF4 = KUTE.fromTo( f1, { path: f3 }, { path: f4 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                const morphToF5 = KUTE.fromTo( f1, { path: f4 }, { path: f5 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                    const morphToF6 = KUTE.fromTo( f1, { path: f5 }, { path: f6 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                        const morphToF7 = KUTE.fromTo( f1, { path: f6 }, { path: f7 }, {duration: 1000, easing: 'easingCubicInOut', onComplete: () => {
                            const morphToF1 = KUTE.fromTo( f1, { path: f7 }, { path: f1.getAttribute('d') }, {duration: 10, easing: 'easingCubicInOut', onComplete: () => {
                                repeatCount++;
                                if (repeatCount < maxRepeats) {
                                    morphSequenceF();
                                }
                            },
                            });
                            morphToF1.start();
                         }, });
                         morphToF7.start();
                     }, });
                     morphToF6.start();
                 }, });
                 morphToF5.start();
             }, });
             morphToF4.start();
         }, });
         morphToF3.start();
    }, });
    morphToF2.start();
}
document.addEventListener('DOMContentLoaded', morphSequenceF);


