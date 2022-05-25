
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
var guessed = [false,false,false,false];
var opened = [false,false,false,false];
var focused_element;
var global_timer = 10;

window.onload = function (){  
    //window.localStorage.clear();
    if(window.location.href.includes("game.html")){ //GAME PAGE
        document.getElementById('timer').innerHTML = 04 + ":" + 00;
        combination = Math.floor(Math.random() * 5);

        startTimer();
        addPlayers();

        for(j = 0; j < 4; j++)
            for(i = 1; i < 5 ; i++){
                button_list[button_list.length] = document.getElementById("" + String.fromCharCode(id_char[j]) + i);
            }

        document.getElementById("Dalje").disabled = true;
        document.getElementById("Konacno").disabled = true;

        document.getElementById("A").disabled = true;
        document.getElementById("B").disabled = true;
        document.getElementById("V").disabled = true;
        document.getElementById("G").disabled = true;

        if(turn == 1) {
            turn = 2;
            document.getElementById("first_player_form").hidden = true;
            document.getElementById("second_player_form").hidden = false;
        }
        else {
            turn = 1;
            document.getElementById("first_player_form").hidden = false;
            document.getElementById("second_player_form").hidden = true;
        }

    }
    
    };

function start_turn(){

    disable_all();

}

function next_turn(){

    if(opened_tile == false && button_list.length != 0){
        var slovo = button_list[0].id.slice(0,1);
        var broj = button_list[0].id.slice(1,2);
        show(""+slovo.charCodeAt(0),broj);
    }

    global_timer = 10;
    if(turn == 1) {
        turn = 2;
        document.getElementById("first_player_form").hidden = true;
        document.getElementById("second_player_form").hidden = false;
    }
    else {
        turn = 1;
        document.getElementById("first_player_form").hidden = false;
        document.getElementById("second_player_form").hidden = true;
    }
    if(opened_tile == true){

        document.getElementById("Dalje").disabled = false;
        opened_tile = false;
        enable_all();
        for( i = 0; i < 4; i++){
            if(guessed[i] == false){
                var temp_val = document.getElementById(String.fromCharCode(id_char[i]));
                temp_val.value = String.fromCharCode(id_char[i]);
                temp_val.disabled = true;
            }
        }
        //focus_element(null);

    }
    document.getElementById("Dalje").disabled = true;


    if(button_list.length == 0){
        for(i = 0; i < 4; i++){
            if(guessed[i] != true) document.getElementById(String.fromCharCode(id_char[i])).disabled = false;
        }
    }

}

function check_final(){

    var pokusaj = document.getElementById("Konacno").value;
    var res = model.matrix[combination].resenje[0];
    var locase = res.toLocaleLowerCase();
    if ((res == pokusaj) 
    || (res.normalize("NFD").replace(/[\u0300-\u036f]/g, "") == pokusaj) 
    || (locase == pokusaj
    || ((locase.normalize("NFD").replace(/[\u0300-\u036f]/g, "") == pokusaj)))){
        kraj = true;
        document.getElementById("Konacno").value = model.matrix[combination].resenje[0];
        document.getElementById("Konacno").disabled = true;
        document.getElementById("Konacno").className = "btn btn-primary ";
        if(turn == 1){
            kraj = true;
            if(button_list.length != 0)
            while(button_list.length > 0){
                var j = 0;
                var slovo = button_list[j].id.slice(0,1);
                var broj = button_list[j].id.slice(1,2);
                button_list[j].className = "btn btn-primary ";
                show(""+slovo.charCodeAt(0),broj);
            }

            for(i = 0; i < 4; i++){//

                if(guessed[i] == false){
                    document.getElementById(String.fromCharCode(id_char[i])).value =  model.matrix[combination][id_char[i]][0];
                    document.getElementById(String.fromCharCode(id_char[i])).className = "btn btn-primary ";
                    document.getElementById(String.fromCharCode(id_char[i])).disabled = true;
                }
            }
            
            alert("Bobednik je: " + player1);
        }
        else {

            kraj = true;
            document.getElementById("Konacno").value = model.matrix[combination].resenje[0];
            document.getElementById("Konacno").disabled = true;
            document.getElementById("Konacno").className = "btn btn-danger ";
            if(button_list.length != 0)
            while(button_list.length > 0){
                var j = 0;
                var slovo = button_list[j].id.slice(0,1);
                var broj = button_list[j].id.slice(1,2);
                button_list[j].className = "btn btn-danger ";
                show(""+slovo.charCodeAt(0),broj);
            }

            for(i = 0; i < 4; i++){

            if(guessed[i] == false){
                    document.getElementById(String.fromCharCode(id_char[i])).value =  model.matrix[combination][id_char[i]][0];
                    document.getElementById(String.fromCharCode(id_char[i])).className = "btn btn-danger ";
                    document.getElementById(String.fromCharCode(id_char[i])).disabled = true;
                }
            }
            
            alert("Bobednik je: " + player2);
        }
    }
    else {
        document.getElementById("Konacno").value = "Konacno resenje";
        return;
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
            return temp;
        }

    }
    return null;

}

function show(slovo, broj){

    if(opened_tile == true && kraj!=true) {start_turn(); return;}
    switch (slovo){

        case "65": {document.getElementById("A").disabled = false; opened[0] = true; break;}
        case "66": {document.getElementById("B").disabled = false; opened[1] = true; break;}
        case "86": {document.getElementById("V").disabled = false; opened[2] = true; break;}
        case "71": {document.getElementById("G").disabled = false; opened[3] = true; break;}
    }

    for(i = 0; i < 4; i++)
        if(opened[i] == true && guessed[i] == false) {
            document.getElementById(String.fromCharCode(id_char[i])).value = String.fromCharCode(id_char[i]);
            document.getElementById(String.fromCharCode(id_char[i])).disabled = false;
        }

    document.getElementById("" + String.fromCharCode(slovo) + broj).innerHTML = model.matrix[combination][slovo][broj];
    document.getElementById("" + String.fromCharCode(slovo) + broj).disabled = true;


    find_and_remove(slovo,broj);

    opened_tile = true;
    start_turn();
    document.getElementById("Dalje").disabled = false;

}

function focus_element(element){

    if(element == document.getElementById("Konacno")) {focused_element = element;element.value=''; return;}

    if(focused_element != null || element == null){
        for( i = 0; i < 4; i++){
            if(guessed[i] == false)
            document.getElementById(String.fromCharCode(id_char[i])).value = String.fromCharCode(id_char[i]);
        }
        if(element == null) return;
    }

    element.value='';
    focused_element = element;
}

function check_answer(){

    if(focused_element != null)
    if(focused_element == document.getElementById("Konacno")) {check_final(); focused_element = null;  return;}

    var temp = false;
    for(j = 0; j < 4; j++){
        var res = model.matrix[combination][id_char[j]][0];
        var locase = res.toLocaleLowerCase();
        if(focused_element == null || focused_element.value=="") return;
        if ((res == focused_element.value) 
        || (res.normalize("NFD").replace(/[\u0300-\u036f]/g, "") == focused_element.value) 
        || (locase == focused_element.value
        || ((locase.normalize("NFD").replace(/[\u0300-\u036f]/g, "") == focused_element.value)))) {

            guessed[j] = true;
            document.getElementById(String.fromCharCode(id_char[j])).disabled = true;

            if(turn == 1) document.getElementById(String.fromCharCode(id_char[j])).className = "btn btn-primary " + String.fromCharCode(id_char[j]);
            else if(turn == 2) document.getElementById(String.fromCharCode(id_char[j])).className = "btn btn-danger " + String.fromCharCode(id_char[j]);

            document.getElementById("Konacno").disabled = false;
            temp = true;

            var arr = document.getElementsByClassName(String.fromCharCode(id_char[j]));

            var cnt = j;
            for(z = 0; z < 4; z++ ){
                if(turn == 1) arr[z].className = "btn btn-primary " + String.fromCharCode(id_char[cnt]);
                else if(turn == 2) arr[z].className = "btn btn-danger " + String.fromCharCode(id_char[cnt]);
    
                arr[z].disabled = true;
                arr[z].innerHTML = model.matrix[combination][id_char[cnt]][z+1];
                //sabrati poene ovde if find_and_remove != null +5
                find_and_remove(id_char[cnt],z+1);
            }
            arr[4].value = model.matrix[combination][id_char[cnt]][0];

            break;
        }
    }   
    if(temp == false){
        next_turn();
    }

    focused_element = null;

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

function player_timer(){

    if(global_timer <= 0){
        global_timer = 10;
        next_turn();
    }
    if(turn == 1)
    document.getElementById("progressBar").value = 10 - global_timer;
    else if(turn == 2)
    document.getElementById("progressBar2").value = 10 - global_timer;
    global_timer -= 1;
    

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

    player_timer();

    document.getElementById('timer').innerHTML = "" + m + ":" + s;
    if(kraj == true) return;
    setTimeout(startTimer, 1000);


    if(m == 0 && s == 0 || kraj == true){
        kraj = true;

            for(j = 0; j < 4; j++){
                for(i = 1; i < 5 ; i++){
                    var el = document.getElementById("" + String.fromCharCode(id_char[j]) + i);
                    el.innerHTML = model.matrix[combination][id_char[j]][i];
                    el.disabled = true;
                }

                document.getElementById(String.fromCharCode(id_char[j])).value = model.matrix[combination][id_char[j]][0];
                document.getElementById(String.fromCharCode(id_char[j])).disabled = true;

            }


        document.getElementById("Konacno").innerHTML = model.matrix[combination].resenje[0];
        document.getElementById("Konacno").disabled = true;

        document.getElementById("Dalje").disabled = true;

    }

}

function checkSecond(sec) {
if (sec < 10 && sec >= 0) {sec = "0" + sec};
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