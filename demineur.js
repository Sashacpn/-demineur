var nbLigne
var nbCol

var grille = $("#grille")
var difficult
var nbBombes = 0
var findepartie = false

var chrono = 0
var firstclick = true
var timer


$("#regles").show()
$("#grille").hide()
$("#nbbombes").hide()
$("#message").hide()
$("#chrono").hide()




$("#level1").click(function () {
    nbLigne = 5
    nbCol = 5
    difficult = 0.1
    startGame()
})

$("#level2").click(function () {
    nbLigne = 10
    nbCol = 10
    difficult = 0.12
    startGame()
})

$("#level3").click(function () {
    nbLigne = 15
    nbCol = 15
    difficult = 0.2
    startGame()
})







grille.on("click", "td", function () {
    if (firstclick == true) {
        $('#chrono').show()
        timer = setInterval(launchchrono, 1000)
        firstclick = false

    }
    if (findepartie == true) {
        return false
    }
    $(this).removeClass("peinture")
    if ($(this).hasClass("bombe")) {
        gameOver("perdu")
    }
    else {
        $(this).css("font-size", "20px")
        if ($(this).html() == "") {
            devoilezZero($(this))
        }



        if ($(".peinture").length == 0 && $(".bombe").length == $(".drapeau").length) {
            gameOver("gagné")
        }
    }
})











grille.on("contextmenu", "td", function (event) {
    event.preventDefault()
    if (findepartie == true) {
        return false
    }
    if (!$(this).hasClass("drapeau")) {
        $(this).addClass("drapeau")
        $(this).removeClass("peinture")
        nbBombes = nbBombes - 1
        $("#nbbombes span").html(nbBombes)
    }
    else {
        $(this).removeClass("drapeau")
        $(this).addClass("peinture")
        nbBombes = nbBombes + 1
        $("#nbbombes span").html(nbBombes)
    }
    if ($(".peinture").length == 0 && $(".bombe").length == $(".drapeau").length) {
        gameOver("gagné")
    }
})





function gameOver(resultat) {
    findepartie = true
    clearInterval(timer)
    firstclick = true
    $('#chrono span').html(chrono)
    if (resultat == "perdu") {
        var message = "Vous avez perdu ! En " + chrono + " secondes"
        $("#message").html(message)
        $("#grille td").removeClass("peinture")
        $("#grille td").css("font-size", "20px")
    }




    if (resultat == "gagné") {
        if (chrono < 10) {
            var message = "C'est exceptionnel !"
        }
        if (chrono >= 10 && chrono < 20) {
            var niveau = "C'est moyen, entraine toi !"
        }
        else {
            var niveau = "C'est nul, as tu bien compris les regles ??"

        }

        var message = "Felicitation vous avez gagne ! En " + chrono + " secondes"
        message = message + "<br>" + niveau
        $("#message").html(message)
    }
    $('#message').show()
    $('#chrono').hide()
    chrono = 0
}





function startGame() {
    clearInterval(timer)
    chrono = 0
    $("#chrono span").html(chrono)
    firstclick = true
    findepartie = false
    $("#chrono").hide()
    $("#regles").hide()
    $("#message").hide()
    grille.empty()
    nbBombes = 0
    dessinerGrille()
    calculBombes()
}




function dessinerGrille() {
    for (var ligne = 0; ligne < nbLigne; ligne = ligne + 1) {
        var maLigne = $("<tr></tr>")
        for (var col = 0; col < nbCol; col = col + 1) {
            var maCell = $("<td></td>")
            if (Math.random() < difficult) {
                maCell.addClass("bombe")
                nbBombes = nbBombes + 1

            }
            maCell.addClass("peinture")
            maCell.addClass("ligne" + ligne)
            maCell.addClass("col" + col)
            maLigne.append(maCell)
        }
        grille.append(maLigne)
    }
    if (nbBombes == 0) {
        startGame()
    }
    $("#nbbombes span").html(nbBombes)
    $("#nbbombes").show()
    grille.show()
}



function calculBombes() {
    for (var ligne = 0; ligne < nbLigne; ligne = ligne + 1) {
        for (var col = 0; col < nbCol; col = col + 1) {
            if (!$(".ligne" + ligne + ".col" + col).hasClass("bombe")) {
                var nbVoisins = 0

                if ($(".ligne" + (ligne - 1) + ".col" + (col - 1)).hasClass("bombe")) {
                    nbVoisins = nbVoisins + 1
                }
                if ($(".ligne" + (ligne - 1) + ".col" + (col)).hasClass("bombe")) {
                    nbVoisins = nbVoisins + 1
                }
                if ($(".ligne" + (ligne - 1) + ".col" + (col + 1)).hasClass("bombe")) {
                    nbVoisins = nbVoisins + 1
                }
                if ($(".ligne" + (ligne + 1) + ".col" + (col - 1)).hasClass("bombe")) {
                    nbVoisins = nbVoisins + 1
                }
                if ($(".ligne" + (ligne + 1) + ".col" + (col)).hasClass("bombe")) {
                    nbVoisins = nbVoisins + 1
                }
                if ($(".ligne" + (ligne + 1) + ".col" + (col + 1)).hasClass("bombe")) {
                    nbVoisins = nbVoisins + 1
                }
                if ($(".ligne" + (ligne) + ".col" + (col - 1)).hasClass("bombe")) {
                    nbVoisins = nbVoisins + 1
                }
                if ($(".ligne" + (ligne) + ".col" + (col + 1)).hasClass("bombe")) {
                    nbVoisins = nbVoisins + 1
                }

                if (nbVoisins != 0)
                    $(".ligne" + ligne + ".col" + col).html(nbVoisins)

                if (nbVoisins == 1) {
                    $(".ligne" + ligne + ".col" + col).css("color", "red")
                }
                if (nbVoisins == 2) {
                    $(".ligne" + ligne + ".col" + col).css("color", "blue")
                }
                if (nbVoisins == 3) {
                    $(".ligne" + ligne + ".col" + col).css("color", "green")
                }
                if (nbVoisins == 4) {
                    $(".ligne" + ligne + ".col" + col).css("color", "orange")
                }
                if (nbVoisins == 5) {
                    $(".ligne" + ligne + ".col" + col).css("color", "yellow")
                }
                if (nbVoisins == 6) {
                    $(".ligne" + ligne + ".col" + col).css("color", "white")
                }
                if (nbVoisins == 7) {
                    $(".ligne" + ligne + ".col" + col).css("color", "black")

                }
                if (nbVoisins == 8) {
                    $(".ligne" + ligne + ".col" + col).css("color", "gray")
                }
            }
        }
    }
}

function devoilezZero(cell) {
    var col = cell.index()
    var ligne = cell.parent().index()

    var tableau = new Array()

    tableau[1] = $(".ligne" + (ligne - 1) + ".col" + (col - 1))
    tableau[2] = $(".ligne" + (ligne - 1) + ".col" + (col))
    tableau[3] = $(".ligne" + (ligne - 1) + ".col" + (col + 1))
    tableau[4] = $(".ligne" + (ligne) + ".col" + (col - 1))
    tableau[5] = $(".ligne" + (ligne) + ".col" + (col + 1))
    tableau[6] = $(".ligne" + (ligne + 1) + ".col" + (col - 1))
    tableau[7] = $(".ligne" + (ligne + 1) + ".col" + (col))
    tableau[8] = $(".ligne" + (ligne + 1) + ".col" + (col + 1))

    for (var i = 1; i < 9; i = i + 1) {
        currentCell = tableau[i]
        if (currentCell.hasClass("peinture")) {
            currentCell.removeClass("peinture")
            currentCell.css("font-size", "20px")
            if (currentCell.html() == "") {
                devoilezZero(currentCell)
            }
        }
    }

}

function launchchrono() {
    chrono = chrono + 1
    $('#chrono span').html(chrono)
}