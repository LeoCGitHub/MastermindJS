// ##### VARIABLES GLOBALES #####
var tabProposition = [];
var tabSolution = [];  // aleatoire
var tabRestest = [];
var username = $('#text1').val();

// ##### GESTION DES CLICKS #####
$("#btnwar").click(newGame);
$("#caseselec1").click(function () {
    color($("#caseselec1"))
});
$("#caseselec2").click(function () {
    color($("#caseselec2"))
});
$("#caseselec3").click(function () {
    color($("#caseselec3"))
});
$("#caseselec4").click(function () {
    color($("#caseselec4"))
});
$("#caseselec5").click(function () {
    color($("#caseselec5"))
});
$("#caseselec6").click(function () {
    color($("#caseselec6"))
});
$("#btnCheck").click(function () {
    check(tabSolution, tabProposition)
});
$('#btntest').click(showPropal);
$('#cheat').mouseenter(function () {
    $("#cache").css("background-image", "none");
    $(".caseSol").css("visibility", "visible");
});
$('#cheat').mouseout(function () {
    $("#cache").css("background-image", "url(https://cdn.radiofrance.fr/s3/cruiser-production/2017/12/5e276b6c-044a-448a-b67d-af148edd0cbb/738_gettyimages-864672546.jpg)");
    $(".caseSol").css("visibility", "hidden");
});
$('#btnClear').click(clearProp);


// ##### Lancer une nouvelle PARTIE #####
function newGame() {
    // Reinitialiser essais pour enchainer
    essais = 0;

    // Gestion username
    if ($('#text1').val() === "") alert("Veuillez entrer un username !");

    // Lancement NewGame
    else {
        for (var l = 0; l < 4; l++) {
            tabSolution[l] = 1 + (Math.floor(Math.random() * 6));
        }
        console.log(tabSolution);
        showGame(tabSolution);

        // reinitialisation paramètres
        $(".caseSol").css("visibility", "hidden");
        $("#propal0").css("background-image", "none");
        $("#propal").css("background-image", "none");
        $("main").css("visibility", "visible");
        $(".btn-danger").css("display", "none");
        $('header').children().remove('p');
        $('#propal').children().remove();
    }
}

// ##### REMPLI les CASES de couleurs #####
let index = 1;
function color(obj) {
    var tabCouleur = ["red", "green", "white", "black", "yellow", "blue"];
    var reg = new RegExp("[0-9]+", "g");
    var idtext = obj.attr("id");
    var nbrid = reg.exec(idtext);

    if ($("#casePropal" + index).css("background-color") == "rgba(0, 0, 0, 0)") {
        $("#casePropal" + index).css("background-color", tabCouleur[nbrid[0] - 1]);
        index++
        tabProposition.push(Number.parseInt(nbrid[0]));
    }
    if (index > 4) $("#selec").css("visibility", "hidden");
    // INSERER UN BOUTON pour recommencer en cas d'erreurs ?
}

// ##### REMPLI TABLEAU SOLUTION #####
function showGame(tabSolution) {
    for (var j = 0; j < tabSolution.length; j++) {
        if (tabSolution[j] == 1) {
            $("#caseSol" + (j + 1)).css("background-color", "red");
        }
        else if (tabSolution[j] == 2) {
            $("#caseSol" + (j + 1)).css("background-color", "green");
        }
        else if (tabSolution[j] == 3) {
            $("#caseSol" + (j + 1)).css("background-color", "white");
        }
        else if (tabSolution[j] == 4) {
            $("#caseSol" + (j + 1)).css("background-color", "black");
        }
        else if (tabSolution[j] == 5) {
            $("#caseSol" + (j + 1)).css("background-color", "yellow");
        }
        else if (tabSolution[j] == 6) {
            $("#caseSol" + (j + 1)).css("background-color", "blue");
        }
    }
}

// ##### AFFICHE LES PROPO et le TEST DANS LA DIV #PROPAL #####
function showPropal(tabResultats) {
    // INJECTE DIV
    $('#propal').prepend('<div class="row"><div class= "col-8 proposition"><div class="pion" id="pion1"></div><div class="pion" id="pion2"></div><div class="pion" id="pion3"></div><div class="pion" id="pion4"></div></div><div class="col-4 resultat"><div class="petitPion" id="petitPion1"></div><div class="petitPion" id="petitPion2"></div><div class="petitPion" id="petitPion3"></div><div class="petitPion" id="petitPion4"></div></div></div >');

    // Ici tabRestest
    for (let l = 0; l < tabResultats.length; l++) {
        if (tabResultats[l] === "noir") {
            $("#petitPion" + (l + 1)).css("background-color", "black");
        }
        else {
            $("#petitPion" + (l + 1)).css("background-color", "white");
        }
    }

    //  copie du tabProposition   
    for (let z = 1; z < 5; z++) {
        var color = $('#casePropal' + z).css("background-color");
        $('#pion' + z).css("background-color", color);
    }

    // reset
    $('.pion').removeAttr("id");
    $('.petitPion').removeAttr("id");
    $(".casePropal").css("background-color", "rgba(0, 0, 0, 0)");
    $("#selec").css("visibility", "visible");
    index = 1;
    tabProposition = [];
}


// ##### CHECK SOLUTION CAROLE #####
var essais = 0;

function check(tabSolution, tabProposition) {
    var tabResultats = [];
    var tabSolution2 = tabSolution.slice(0);
    var comptBlack = 0;
    console.log("solution = " + tabSolution);
    console.log("solution2 = " + tabSolution2);
    console.log("prop = " + tabProposition);
    essais++;
    console.log(essais);
    console.log(comptBlack);

    for (let i = 0; i < 4; i++) {
        if (tabProposition[i] == tabSolution2[i]) {
            tabResultats.push("noir");
            tabProposition[i] = 0;
            tabSolution2[i] = 0;
            comptBlack++;
            console.log(comptBlack);
        }
    }
    for (let w = 0; w < 4; w++) {
        if (tabSolution2.includes(tabProposition[w]) && tabProposition[w] > 0) {
            tabResultats.push("blanc");
            tabSolution2[tabSolution2.indexOf(tabProposition[w])] = 0;
            tabProposition[w] = 0;
        }
    }
    console.log(tabResultats);
    showPropal(tabResultats);

    //TESTS WIN OR LOSE ; faire des fonctions distinctes pour alléger cette fonction ?
    console.log(username);
    var username = $('#text1').val();
    if (comptBlack === 4) {
        $('#left').append('<p>' + username + ' : victoire en ' + essais + ' coups.</p>');
        $(".caseSol").css("visibility", "visible");
        $('#propal').children().remove();
        $('header').children().remove('p');
        $("#propal0").css("background-image", "url(https://media.giphy.com/media/3o7TKJhBfNCiispgDm/giphy.gif)");
        $("#propal").css("background-image", "url(https://melbournechapter.net/images/winner-transparent-4.png)");
    }

    else if (essais === 11) $('header').append('<p id="cheatText">Il ne te reste qu\'un essai, si tu veux de l\'aide pense à Konami. <a href="#" id="launchKonami">Clique ici</a> si tu veux essayer !</p>');

    else if
    (essais === 12) {
        $('#left').append('<p>' + username + ' : défaite !</p>');
        $(".caseSol").css("visibility", "visible");
        $('#propal').children().remove();
        $('header').children().remove('p');
        $("#propal0").css("background-image", "url(https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif)");
        $("#propal").css("background-image", "url(https://i.pinimg.com/originals/d9/33/bf/d933bfbc26aad761b6f59b320fc3a08b.png)");
    }
    $('#launchKonami').click(konami);
}

function clearProp() {
    $("#casePropal1").css("background-color", "rgba(0, 0, 0, 0)");
    $("#casePropal2").css("background-color", "rgba(0, 0, 0, 0)");
    $("#casePropal3").css("background-color", "rgba(0, 0, 0, 0)");
    $("#casePropal4").css("background-color", "rgba(0, 0, 0, 0)");
    tabProposition = [];
    $("#selec").css("visibility", "visible");
    index = 1
}

// #### KONAMICODE FOR CHEAT ####
var decompt = 9;
function konami() {
    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
    var compt = 0;

    // Appuyer sur Entrée pour reinitialiser la séquence
    $(document).keydown(function (e) {
        if (e.keyCode === 13) {
            //dosomething
            kkeys = [];
            decompt = 10;
            $("#cheatText").text("Trouve le code !?");
        }
    })
    $("#cheatText").text("Trouve le code !?");

    // Test du code
    $(document).keydown(function (e) {
        kkeys.push(e.keyCode);
        console.log(kkeys);
        console.log(decompt);
        $("#cheatText").text("Il reste " + decompt + " touches à presser. Appuie sur Entrée pour recommencer la séquence.");
        decompt--;
        if (kkeys.toString().indexOf(konami) >= 0) {
            $(document).unbind('keydown', arguments.callee);
            // do something awesome
            $(".btn-danger").css("display", "flex");
            $("#cheatText").text("Code trouvé!");
            kkeys = [];
        }
        else if (kkeys.length === 10 && kkeys != konami) {
            compt++;
            $("#cheatText").text("Code raté " + compt + " fois! Réessaie ou joue!");
            kkeys = [];
            decompt = 10;
        }
    });
}

// #### Valider input en appuyant sur entrée ####
$('.form-control').keydown(function (e) {
    if (e.keyCode === 13) {
        //dosomething
        newGame();
    }
})


// PLUGIN SIDEBAR
$(document).ready(function () {
    $("#propal").niceScroll({
        cursorborder: 'none',
        cursorwidth: 15,
        cursorcolor: "rgba(0, 0, 0, 0)"
    });
});
































// Tests

// check(["red", "green", "white", "black"], ["red", "green", "white", "black"]);
// console.log("#############");
// check(["green", "blue", "yellow", "black"], ["red", "green", "white", "black"]);
// console.log("#############");
// check(["green", "green", "yellow", "black"], ["red", "green", "white", "black"]);
// console.log("#############");
// check(["black", "green", "green", "green"], ["red", "green", "white", "black"]);
// console.log("#############");
// check(["4", "2", "2", "2"], ["1", "4", "3", "2"]);
// console.log("#############");
// check(["4", "2", "2", "2"], ["1", "4", "2", "2"]);
// console.log("#############");
// check(["2", "2", "2", "2"], ["1", "4", "2", "2"]);
// console.log("#############");


// ############ CIMETIERE A FONCTION ###############

// NE GERE  PAS TOUS LES CAS (pris celle de Carole)
// function check2(tabProposition, tabSolution) {
//     var compt = 0;
//     var boolProp = [];
//     var comptProp = new Map();
//     var comptSol = new Map();

//     for (let j = 0; j < tabProposition.length; j++) {
//         var compteur;
//         if (comptProp.has(tabProposition[j]) === true) {
//             compteur++;
//             comptProp.set(tabProposition[j], compteur);
//         }
//         else {
//             compteur = 1;
//             comptProp.set(tabProposition[j], compteur);
//         }
//     }
//     // console.log(comptProp);

//     for (let l = 0; l < tabSolution.length; l++) {
//         var compteur2;
//         if (comptSol.has(tabSolution[l]) === true) {
//             compteur2++;
//             comptSol.set(tabSolution[l], compteur2);
//         }
//         else {
//             compteur2 = 1;
//             comptSol.set(tabSolution[l], compteur2);
//         }
//     }
//     // console.log(comptSol);

//         // forcèment deux boucles pour les noirs puis les blancs;
//     for (let i = 0; i < tabProposition.length; i++) {
//         if (tabSolution.includes(tabProposition[i]) === true) {
//             if (tabSolution.indexOf(tabProposition[i]) == i) {
//                 boolProp.push(tabProposition[i]);
//                 console.log(tabProposition[i] + ": pion noir");
//                 // console.log(boolProp);
//                 compt++;
//                 comptProp.set(tabProposition[i], compteur--);
//                 // console.log(compt);
//             } else {
//                 if ((boolProp.includes(tabProposition[i]) === false) && (comptProp.get(tabProposition[i]) - comptSol.get(tabProposition[i])) && (comptSol.get(tabProposition[i])) == 1) {
//                     console.log(tabProposition[i] + " : pion blanc");
//                     compt++;
//                     comptProp.set(tabProposition[i], compteur--);
//                     // console.log(compt);
//                 } else {
//                     console.log(tabProposition[i] + " : déjà présent");
//                 }
//             }
//         }
//         else {
//             console.log(tabProposition[i] + " : non présent");
//             compt++;
//             // console.log(compt);
//         }
//         if (compt == 4) {
//             console.log("Test terminé");
//         }
//     }
// }
