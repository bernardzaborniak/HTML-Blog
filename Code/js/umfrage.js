"use strict";

var form = null;

var txtName = "Name";
var radioGroups = ["Loc", "Ess", "Bei"];

function getErrFld(input)
{
    return document.getElementById("out" + input);
}

function validateAll()
{
    var toValidate = radioGroups.slice();
    toValidate.splice(0, 0, txtName);
    var validated = true;

    for(var i = 0; i < toValidate.length; i++){
        var selected = form[toValidate[i]];
        var err = getErrFld(toValidate[i])

        if(selected.type == "text")
        {
            if(selected.value == ""){
                validated = false;
                err.innerHTML = "Bitte Namen eingeben";
                err.className = "error";
                selected.focus();
            }
        }
        else
        {
            var isChecked = false;
            for (var j = 0; j < selected.length; j++)
            {
                isChecked = selected[j].checked || isChecked;
            }

            if(!isChecked){
                validated = false;
                err.innerHTML = "Bitte Option auswählen.";
                err.className = "error";
            }

        }
    }

    if(validated == true){
        alert("ur good 2 go brah");
        fenster = window.open("memory game/memory.html", "fenster1", "width=2000px ,height=1000px ,status=yes,scrollbars=yes,resizable=yes");
   fenster.focus();
    }else{
        alert("sumtings wrong m8 :(");
    }

    //alert(validated ? "ur good 2 go brah" : "sumtings wrong m8 :(")

    return false;
}


function textBoxChange()
{
    getErrFld("Name").className = "hidden";
}

function focusLost()
{
    var txt = form["Name"];
    var err = getErrFld("Name");
    if(txt.value == ""){
        err.innerHTML = "Bitte Namen eingeben";
        err.className = "error";
    }
}

function selected(event)
{
    var target = (event.target || event.srcElement)["name"];
    getErrFld(target).className = "hidden";
}


window.onload = function(){
    //var submitBtn = document.getElementById("submit");
    //submitBtn.addEventListener("submit", validate);

    form = document.forms["umfrage"];

    form["Name"].addEventListener("keypress", textBoxChange);
    form["Name"].addEventListener("blur", focusLost);


    for(var i = 0; i < radioGroups.length; i++){
        var btns = form[radioGroups[i]];

        for(var j = 0; j < btns.length; j++){
            btns[j].addEventListener("change", selected);

            //btns[j].addEventListener("change", function(){
            //    selected(cur.valueOf()); //why the f does this copy the reference?!
            //});
        }
    }

}
