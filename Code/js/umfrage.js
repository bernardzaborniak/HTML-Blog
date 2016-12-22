window.onload = function(){

    "use strict";

    //der submit Button, löst die Funktion eim Klicken auf

    //gibt an ob die Eingaben un korrekt sind - für spätere benutzung
    var correctInput = false;

    var submit = document.getElementById("reset");
    submit.addEventListener("click", checkFormular);


    function checkFormular(){
        //falls ich emails checken wolte
        //if (document.Formular.Mail.value.indexOf("@") == -1)

        if(document.Formular.Name.value == ""){
            alert("Bitte den Namen angeben")
            document.Formular.Name.focus();
            correctInput = false;
        }else{
            correctInput = true;
        }

        if(document.Formular.loc.checked == "false"){
            alert("Bitte wähle eine Option aus")
            document.Formular.loc.focus();
            correctInput = false;
        }else{
            correctInput = true;
        }


    }

}
