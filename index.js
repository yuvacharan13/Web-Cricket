var count = 0;
var Box = /** @class */ (function () {
    function Box(ballScore) {
        this.score = ballScore;
        var scoreBoard1 = document.getElementById('scoreBoard1');
        var scoreBoard2 = document.getElementById('scoreBoard2');
        var scoreBox = document.createElement('div');
        if (this.score == "Team 2") {
            count++;
        }
        if (count == 0) {
            if (this.score == "") {
                scoreBox.setAttribute('class', 'cell1 cellData');
            }
            else {
                scoreBox.setAttribute('class', 'cellData');
            }
            scoreBoard1.appendChild(scoreBox);
        }
        else {
            if (this.score == "") {
                scoreBox.setAttribute('class', 'cell2 cellData');
            }
            else {
                scoreBox.setAttribute('class', 'cellData');
            }
            scoreBoard2.appendChild(scoreBox);
        }
        var para = document.createElement('p');
        scoreBox.appendChild(para);
        para.innerText = this.score;
    }
    return Box;
}());
createBoard(1);
createBoard(2);
function createBoard(teamNumber) {
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 8; j++) {
            if (i == 0) {
                if (j > 0 && j < 7) {
                    var scoreDisplay = new Box(" B" + j + " ");
                }
                else if (j == 0) {
                    var scoreDisplay = new Box("Team " + teamNumber);
                }
                else if (j == 7) {
                    var scoreDisplay = new Box("Total");
                }
            }
            else {
                if (j == 0) {
                    var scoreDisplay = new Box("Player " + i);
                }
                else {
                    emptyBox();
                }
            }
        }
    }
}
function emptyBox() {
    var scoreDisplay = new Box("");
}
var team1Total = 0;
var team2Total = 0;
var buttonDiv = document.getElementById('buttonDiv');
var paraScore1 = document.createElement('p');
buttonDiv.appendChild(paraScore1);
paraScore1.innerText = "TEAM 1 Score  :" + team1Total;
var button1 = document.createElement('button');
button1.innerText = "HIT1";
buttonDiv.appendChild(button1);
button1.setAttribute('id', 'buttonId');
button1.addEventListener('click', handleclickTeam1);
var paraTimer = document.createElement('p');
paraTimer.setAttribute('id', 'timer');
buttonDiv.appendChild(paraTimer);
var button2 = document.createElement('button');
button2.innerText = "HIT2";
buttonDiv.appendChild(button2);
button2.setAttribute('id', 'buttonId');
button2.addEventListener('click', handleclickTeam2);
button2.disabled = true;
var paraScore2 = document.createElement('p');
buttonDiv.appendChild(paraScore2);
paraScore2.textContent = "TEAM 2 Score  :" + team1Total;
var result = document.getElementById('result');
result.innerText = "";
var cellsTeam1 = document.getElementsByClassName("cell1");
var cellsTeam2 = document.getElementsByClassName("cell2");
var team1Count = 0;
var team2Count = 0;
function handleclickTeam1() {
    if (team1Count == 0) {
        team1Count++;
        startTime();
    }
    team2Count = 0;
    getScore();
    if (a >= 70) {
        button2.disabled = false;
        button1.disabled = true;
    }
}
var b = 0;
function handleclickTeam2() {
    if (b == 0) {
        a = 0;
        b++;
    }
    if (team2Count == 0) {
        team2Count++;
        startTime();
    }
    team1Count = 0;
    getScore();
    // startTime();
    if (a >= 70 || (button1.disabled == true && button2.disabled == true)) {
        button2.disabled = true;
        if (team1Total > team2Total) {
            result.innerText = "Team 1 has won";
        }
        else if (team1Total == team2Total) {
            result.innerText = "Draw Match";
        }
        else {
            result.innerText = "Team 2 has won";
        }
    }
}
var a = 0;
var sum = 0;
function getScore() {
    var randomScore = Math.round(Math.random() * 10);
    if (randomScore == 0 || randomScore == 1 || randomScore == 2 || randomScore == 3 || randomScore == 4 || randomScore == 6) {
        var score = randomScore;
        if ((a + 1) % 7 == 0) {
            sum = 0;
            for (var x = a - 1; x > a - 7; x--) {
                if (team1Count > 0) {
                    if (cellsTeam1[x].textContent !== "") {
                        sum += parseInt(cellsTeam1[x].textContent);
                    }
                }
                else {
                    if (team2Count > 0) {
                        if (cellsTeam2[x].textContent !== "") {
                            sum += parseInt(cellsTeam2[x].textContent);
                            paraScore2.textContent += sum;
                        }
                    }
                }
            }
            if (team1Count > 0) {
                team1Total += sum;
                paraScore1.innerText = "TEAM 1 Score  :" + team1Total;
            }
            else if (team2Count > 0) {
                team2Total += sum;
                paraScore2.innerText = "TEAM 2 Score  :" + team2Total;
            }
            if (team1Count > 0) {
                cellsTeam1[a].textContent = sum.toString();
            }
            else {
                if (team2Count > 0) {
                    cellsTeam2[a].textContent = sum.toString();
                }
            }
            a++;
        }
        else {
            if (team1Count > 0) {
                cellsTeam1[a].textContent = score;
            }
            else if (team2Count > 0) {
                cellsTeam2[a].textContent = score;
            }
            if (score == 0) {
                for (var i = 0; i < 20; i++) {
                    if (a > ((i * 7) - 1) && a < (((i + 1) * 7) - 1)) {
                        a = ((i + 1) * 7) - 1;
                    }
                }
                if ((a + 1) % 7 == 0) {
                    getScore();
                }
            }
            else {
                a++;
                if ((a + 1) % 7 == 0) {
                    getScore();
                }
            }
        }
    }
    else {
        getScore();
    }
}
document.getElementById('timer').innerHTML = 01 + ":" + 00;
var timeCount1 = 0;
var timeCount2 = 0;
function startTime() {
    if (team2Count > 0 && timeCount2 == 0) {
        console.log("yuva");
        timeCount2++;
        document.getElementById('timer').innerHTML = 01 + ":" + 00;
    }
    startTimer();
}
function startTimer() {
    console.log("hia yuva");
    var presentTime = document.getElementById('timer').innerHTML;
    var timeSet = presentTime.split(/[:]+/);
    var m = timeSet[0];
    var s = updateSeconds((timeSet[1] - 1));
    if (s == 59) {
        m = m - 1;
    }
    document.getElementById('timer').textContent = m + ":" + s;
    if ((m > 0) || (s > 0)) {
        setTimeout(startTimer, 1000);
    }
    else {
        if (team1Count > 0) {
            button1.disabled = true;
            button2.disabled = false;
            return document.getElementById('timer').textContent;
        }
        else if (team2Count > 0) {
            button2.disabled = true;
            button1.disabled = true;
            handleclickTeam2();
            return document.getElementById('timer').textContent;
        }
    }
}
function updateSeconds(sec) {
    if (sec < 10 && sec >= 0) {
        sec = "0" + sec;
    }
    ;
    if (sec < 0) {
        sec = "59";
    }
    ;
    return sec;
}
