function HighScores() {

    var storage = localStorage,
        highScoreListEl = document.getElementById("lstHighScores"),
        isHighScore = false;

    var scores = this.fillList;

    this.fillList = function () {
        if (storage.length != 0) {
            scores = JSON.parse(storage.getItem('gameScores'));
            this.updateList(highScoreListEl, scores);
        } else {
            scores = [];
        }
    };

    this.checkScore = function (score) {
        isHighScore = false;
        if (scores.length == 0) {
            //scores.push(score);
            scores.push({name: this.getName(), score: score});
            isHighScore = true;
        } else {
            for (var i = 0; i < scores.length; i++) {
                if (scores[i].score < score) {

                    var remaining = [];

                    if (scores.length == 10) {
                        scores.pop();
                    }

                    remaining = scores.splice(i, scores.length);
                    remaining.unshift({name: this.getName(), score: score});

                    for (var j = 0; j < remaining.length; j++) {
                        scores.push(remaining[j]);
                    }
                    isHighScore = true;
                    break;

                } else if (scores[scores.length - 1].score > score && scores.length < 10) {
                    scores.push({name: this.getName(), score: score});
                    isHighScore = true;
                    break;

                } else if (scores[scores.length - 1].score > score && scores.length == 10) {
                    isHighScore = false;
                    break;
                }
            }
        }

        localStorage.setItem('gameScores', JSON.stringify(scores));
        this.updateList(highScoreListEl, scores);
        return isHighScore;
    };

    this.updateList = function (list, arr) {
        while (highScoreListEl.firstChild) {
            highScoreListEl.firstChild.remove();
        }
        for (var i = 0; i < arr.length; i++) {
            var newLi = document.createElement("li");

            var lblName = document.createElement("label");
            lblName.className = "scoreName";

            var lblScore = document.createElement("label");
            lblScore.className = "scoreValue";

            var scoreName = document.createTextNode(arr[i].name);
            var scoreValue = document.createTextNode(arr[i].score);

            lblName.appendChild(scoreName);
            lblScore.appendChild(scoreValue);

            newLi.appendChild(lblName);
            newLi.appendChild(lblScore);

            highScoreListEl.appendChild(newLi);
        }
    };

    this.getName = function () {
        var name = prompt("Enter your initials XXX.");
        if(name == "" || name == null){
            return "No name!";
        }
        return name.substr(0, 3);
    }
}


