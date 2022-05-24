
var player1;
var player2;
var p1Flag = false;
var p2Flag = false;
var combination = 0;
var kraj = false;
const id_char = [65,66,86,71];
var button_list = [];
var turn = 1;
var opened_tile = false;
var flags = [false,false,false,false,false];

window.onload = function (){  
    //window.localStorage.clear();
    if(window.location.href.includes("game.html")){ //GAME PAGE
        document.getElementById('timer').innerHTML = 2 + ":" + 00;
        combination = Math.floor(Math.random() * 5);
        startTimer();
        addPlayers();

        for(j = 0; j < 4; j++)
            for(i = 1; i < 5 ; i++){
                button_list[button_list.length] = document.getElementById("" + String.fromCharCode(id_char[j]) + i);
            }

        document.getElementById("Dalje").disabled = true;

        document.getElementById("A").disabled = true;
        document.getElementById("B").disabled = true;
        document.getElementById("V").disabled = true;
        document.getElementById("G").disabled = true;
    }
    
    };

function start_turn(){

    disable_all();

}

function next_turn(){

    if(opened_tile = true){

        document.getElementById("Dalje").disabled = false;
        opened_tile = false;
        enable_all();
    }
    else {
        console.log("How did i get here????")
    }

}

function disable_all(){
    for(j = 0; j < button_list.length; j++)
        button_list[j].disabled = true;
}
function enable_all(){

    for(j = 0; j < button_list.length; j++)
        button_list[j].disabled = false;

}

function find_and_remove(slovo,broj){
var temp;

    for(j = 0; j < button_list.length; j++){

        if(button_list[j] == document.getElementById("" + String.fromCharCode(slovo) + broj)){

            temp = button_list[j];
            button_list[j] = button_list[button_list.length-1];
            button_list[button_list.length-1] = null;
            button_list.length--;
            console.log(button_list.length);
            return temp;
        }

    }
    return temp;

}

function show(slovo, broj){

    switch (slovo){

        case "65": {document.getElementById("A").disabled = false; break;}
        case "66": {document.getElementById("B").disabled = false; break;}
        case "86": {document.getElementById("V").disabled = false; break;}
        case "71": {document.getElementById("G").disabled = false; break;}
    }

    document.getElementById("" + String.fromCharCode(slovo) + broj).innerHTML = model.matrix[combination][slovo][broj];
    document.getElementById("" + String.fromCharCode(slovo) + broj).disabled = true;

    find_and_remove(slovo,broj);

    opened_tile = true;
    start_turn();
    document.getElementById("Dalje").disabled = false;

}

var model = {
    
    matrix : [

        {resenje : ["PUT"], 65:["SVILA","POSTELjINA","KONAC","MARAMA","BUBA"],66:["TROŠAK","NEPLANIRANA","DODATNI","RASHOD","PAJA"],86:["NOGE","ČARDAŠ","TLO","IKS","LAVOR"],71:["DRUM","UM","RAZBOJNIK","BICIKLIZAM","SAOBRAĆAJ"]},
        {resenje : ["VILIJAMS"], 65:["SESTRE","BRONTE","POLGAR","KOVAČ","TRI"],66:["TENESI","TITANI","SAVEZNA DRŽ.","NEŠVIL","MEMFIS"],86:["ROBIN","VAN PERSI","SODERLING","RAJT","HUD"],71:["FORMULA 1","STAZA","TRKA","TRENING","BOKS"]},
        {resenje : ["KINA"], 65:["ČETVRT","SAT","TRI","KVART","FINALE"],66:["AZIJA","IRAK","IRAN","SREDNJA","MALA"],86:["KUPUS","KISEO","SLADAK","SVADBA","VO"],71:["ZMAJ","ŠMAUG","NOĆAJ","OGNJENI VUK","ČIKA JOVA"]},
        {resenje : ["SVINJA"], 65:["PRASE","BODLJA","MORE","13","3"],66:["ZALIV","FINSKA","TAJLAND","KORINT","HADSON"],86:["BUT","DŽON VILKS","HANS-JERG","KOST","NOGA"],71:["VRAT","ŽIRAFA","GIGANT","PRŠLJEN","ŽILA"]},
        {resenje : ["NOS"], 65:["DUŠA","ZDRAVLJE","MIR","SITNA","DOBRA"],66:["OPERACIJA","MOZAK","RAČUN","SALA","RAT"],86:["BRISANJE","NALOG","PRAŠINA","KRPA","GLUMICA"],71:["KAPI","ZNOJ","KIŠA","KRV","OČI"]},
    
    ]
}

function addPlayers(){
    player1 = JSON.parse(localStorage.getItem("player1"));
    document.getElementById("p1label").innerHTML = "<h4>" + player1 + "</h4>";
    player2 = JSON.parse(localStorage.getItem("player2"));
    document.getElementById("p2label").innerHTML = "<h4>" + player2 + "</h4>";
}

function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
        if(s==59){m=m-1}
        if(m<0){
        return;
    }

    document.getElementById('timer').innerHTML = "" + m + ":" + s;
    setTimeout(startTimer, 1000);

    if(kraj == true) return;
    if(m == 0 && s == 0 || kraj == true){
        kraj = true;

            for(j = 0; j < 4; j++){
                for(i = 1; i < 5 ; i++){
                    var el = document.getElementById("" + String.fromCharCode(id_char[j]) + i);
                    el.innerHTML = model.matrix[combination][id_char[j]][i];
                    el.disabled = true;
                }

                document.getElementById(String.fromCharCode(id_char[j])).innerHTML = model.matrix[combination][id_char[j]][0];
                document.getElementById(String.fromCharCode(id_char[j])).disabled = true;

            }


        document.getElementById("Konacno").innerHTML = model.matrix[combination].resenje[0];
        document.getElementById("Konacno").disabled = true;

        document.getElementById("Dalje").disabled = true;

    }

}

function checkSecond(sec) {
if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
if (sec < 0) {sec = "59"};
return sec;
}

function saveP1(){
    localStorage.setItem("player1",JSON.stringify(document.getElementById("player1name").value));

    p1Flag = true;
    document.getElementById("player1name").disabled = true;
    document.getElementById("check1").disabled = true;

    if((p1Flag == true) && (p2Flag == true))
    window.location.href = "../html/game.html";
}

function saveP2(){
    localStorage.setItem("player2",JSON.stringify(document.getElementById("player2name").value));

    p2Flag = true;
    document.getElementById("player2name").disabled = true;
    document.getElementById("check2").disabled =true;

    if((p1Flag == true) && (p2Flag == true))
    window.location.href = "../html/game.html";
}