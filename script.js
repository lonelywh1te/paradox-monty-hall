var stat = { doorChanged: 0, doorNotChanged: 0, changedWon: 0, changedLost: 0, notChangedWon: 0, notChangedLost: 0 };
var doors = getDoors();
var chosenDoor = -1;
var openedDoor = -1;
var selectedDoor = -1;
var egg = 0;
var blocked = false;

function eggs(){
    egg++;
    if (egg >= 10) document.getElementById('headerText').innerHTML = "Хуй";
}

function updateStats(){
    if (chosenDoor != selectedDoor){
        stat.doorChanged++;
        (Win()) ? stat.changedWon++ : stat.changedLost++; 
    }
    else {
        stat.doorNotChanged++;
        (Win()) ? stat.notChangedWon++ : stat.notChangedLost++; 
    }
    document.getElementById('table_dChanged').innerHTML = stat.doorChanged;
    document.getElementById('table_dNotChanged').innerHTML = stat.doorNotChanged;
    document.getElementById('table_changedWon').innerHTML = stat.changedWon;
    document.getElementById('table_nChangedWon').innerHTML = stat.notChangedWon;
    document.getElementById('table_changedLost').innerHTML = stat.changedLost;
    document.getElementById('table_nChangedLost').innerHTML = stat.notChangedLost;
    document.getElementById('totalCount').innerHTML = stat.doorChanged + stat.doorNotChanged;
}

function newGame(){
    document.getElementById('headerText').innerHTML = "Парадокс Монти Холла";
    document.getElementById('headerText').style.color = "#ffffff";
    document.getElementById('0').style.backgroundColor = "#423F3E";
    document.getElementById('1').style.backgroundColor = "#423F3E";
    document.getElementById('2').style.backgroundColor = "#423F3E";
    document.getElementById(chosenDoor).style.border = "none";
    document.getElementById(selectedDoor).style.border = "none";
    document.getElementById('0').style.boxShadow = "none";
    document.getElementById('1').style.boxShadow = "none";
    document.getElementById('2').style.boxShadow = "none";

    doors = getDoors();
    chosenDoor = -1;
    openedDoor = -1;
    selectedDoor = -1;
    blocked = false;
}

function getDoors(){
    var doors = [0, 0, 0]
    doors[Math.floor(Math.random() * 3)] = 1;
    return doors;
}

function openDoor(){
    for(var i = 0; i < 3; i++){
        if (i == chosenDoor) continue;
        if (doors[i] == 0){
            openedDoor = i;
            document.getElementById(openedDoor).style.backgroundColor = "#F05454";
            document.getElementById(openedDoor).style.boxShadow = "0px 0px 100px #F05454";
            break;
        }
    }
}

function Win(){
    if (selectedDoor == doors.indexOf(1)) return 1;
    return 0;
}

function chooseDoor(door){
    if (blocked) return;

    if (openedDoor == -1) {
        chosenDoor = door.id;
        document.getElementById(door.id).style.border = "1px solid #FEC260";
        openDoor();
    } 
    else if (door.id != openedDoor){
        selectedDoor = door.id;
        
        if (Win()) {
            document.getElementById(selectedDoor).style.backgroundColor = "#82CD47";
            document.getElementById(selectedDoor).style.boxShadow = "0px 0px 100px #82CD47";
            document.getElementById('headerText').innerHTML = "Победа";
            document.getElementById('headerText').style.color = "#82CD47";
            
        }
        else {
            document.getElementById(selectedDoor).style.backgroundColor = "#F05454";
            document.getElementById(selectedDoor).style.boxShadow = "0px 0px 100px #F05454";
            document.getElementById('headerText').innerHTML = "Поражение";
            document.getElementById('headerText').style.color = "#F05454";
        }

        document.getElementById(selectedDoor).style.border = "none";
        blocked = true;
        updateStats();
        setTimeout(newGame, 2 * 1000);
    }
}
