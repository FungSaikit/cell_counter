var editMode = false;
var autoCount = false;

var rowsInput = document.getElementById('row_input');
var columnsInput = document.getElementById('column_input');
var cellsTable = document.getElementById('cells_table');
var style = document.getElementById('current_style');
var selectedCellElement = document.getElementById('selected_cells');
var selectedCellsNumber = document.getElementById('selected_number');
var allCells;

function useAutoCount(object) {
    if (object.value == 1) {
        autoCount = true;
        countCells();
    } else {
        autoCount = false;
    }
}

function enterListener() {
    if(event.keyCode == 13) {
        createCells();
    }
}

function countListener() {
    if(event.keyCode == 13) {
        countCells();
    }
}

function turnOnEditMode(object) {
    editMode = true;
    selectCell(object);
}

function turnOffEditMode() {
    editMode = false;
    if (autoCount) {
        countCells();
    }


}

function mouseHoverCells(object) {
    if (editMode) {
        selectCell(object)
    }
}

function clearInput() {
    rowsInput.value = '';
    columnsInput.value = '';
}

function createCells() {
    var columns = columnsInput.value;
    var rows = rowsInput.value;
    cellsTable.innerHTML = "";
    var tableContent = ''
    tableContent += '<tr>';
    for (var i = 0; i <= columns; i++) {
        tableContent += '<td>' + i + '</td>'
    }
    tableContent += '</tr>';

    for (var i = 0; i < rows; i++) {
        tableContent += '<tr><td>' + (i + 1) + '</td>';
        for (var j = 0; j < columns; j++) {
            tableContent += '<td class="cell" row="' + (i+1) + '" column="' + (j+1) + '" onmouseenter="mouseHoverCells(this)" onmousedown="turnOnEditMode(this)" ></td>'
        }
        tableContent += '</tr>';
    }

    cellsTable.innerHTML += tableContent;
    allCells = document.getElementsByClassName('cell');
}

function selectCell(object) {
    object.className = object.className == 'cell selected_cell' ? 'cell' : 'cell selected_cell';
}

function countCells() {
    var count = 0;
    selectedCellElement.innerHTML = 'Selected Cells: <br>';
    for (var i = 0; i < allCells.length; i++) {
        if (allCells[i].className.indexOf('selected_cell') >= 0) {
            selectedCellElement.innerHTML += ' ( ' + allCells[i].getAttribute('column') + ' , ' + allCells[i].getAttribute('row') + ' ) ';
            count++;
        }
    }
    selectedCellsNumber.innerText = 'Sum: ' + count;
}

function changeSelectedColor(object) {
    style.innerHTML = '.selected_cell {background-color: ' + object.value + ';}'
}