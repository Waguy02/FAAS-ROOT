var modeBuy;
var typeLiv;
$.ajax({
    method: "get",
    url: "/ajax_forpanier/",
    success: function(data) {
        typeLiv = data['typeLiv'];
        modeBuy = data['modeBuy'];
        console.log(typeLiv)
        console.log(modeBuy)
    },
    error: function(err) {
        console.log("err");
    },
})

function send_to_confirm() {
    $('#confirmcom').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Confirmer commande').addClass('disabled');
    var frais = $("#FraisLiv").text();
    var j = 0;
    var fraisStr = "";
    while (frais[j] != ' ') {
        fraisStr += frais[j];
        j++;
    }
    var fraisliv = parseInt(fraisStr);
    var lieuliv = "";
    var domicile = "";
    if (typeLiv == "Rparclient") {
        lieuliv = $("#lieuxLiv option:selected").text();
    } else {
        domicile = $("#domicile").val();
    }
    var villeliv = $("#ville option:selected").text();
    var quartier = $("#quartier").val();

    $.ajax({
        method: "post",
        url: "/ajax_postfincom/",
        data: {
            "modeBuy": modeBuy,
            "typeLiv": typeLiv,
            "lieuliv": lieuliv,
            "fraisliv": fraisliv,
            "villeliv": villeliv,
            "quartier": quartier,
            "domicile": domicile,

        },
        success: function(data) {
            var data_success = data['success']
            var data_why = data['why']
            $.ajax({
                method: "post",
                url: "/sendconfirmcommand/",
                data: {
                    "typeLiv": typeLiv
                },
                success: function(data) {
                    console.log(typeLiv)
                    alert("Envoyé avec succès")
                    if (data_success == 'True') {
                        location.href = "/Cart/";
                    } else if (data_success == 'False' && data_why == 'qte') {
                        alert("Un ou plusieurs articles faisant partie de votre commande n'est plus disponible( commandé(s) par un autre client).");
                        location.href = "/Cart/";
                    } else if (data_success == 'False' && data_why == 'none') {
                        alert('yyhcjddjdgcj');
                    }


                },
                error: function(err) {

                }
            })



        },
        error: function(err) {
            console.log(err);
            location.href = "";
        },
    })
}

function setpointLiv() {
    var idVille = parseInt($("#ville option:selected").val());
    $.ajax({
        url: "/ajax_getLieuLiv/" + idVille,
        method: "GET",
        success: function(data) {
            console.log(data)
            $("#lieuxLiv").html(doOptions(data));
        },
        error: function(err) {
            console.log(err)
        }
    })
}

function afficheselect() {
    console.log($("#lieuxLiv option:selected").text());
}

function doOptions(data) {
    result = "";
    var i = 0;
    for (var key in data.pointsLiv) {
        if (i == 0) {
            result += `<option id="${data.pointsLiv[key].id} selected">${data.pointsLiv[key].nom_pointLivraison}</option>`;
        } else {
            result += `<option id="${data.pointsLiv[key].id}">${data.pointsLiv[key].nom_pointLivraison}</option>`;
        }
        i++;

    }
    return result;
}
$(document).ready(function() {
    afficheselect();
    var frais = $("#FraisLiv").text();
    var j = 0;
    var fraisStr = "";
    while (frais[j] != ' ') {
        fraisStr += frais[j];
        j++;
    }
    var fraisliv = parseInt(fraisStr);
    var totalpan = $("#totalpan").text();
    j = 0;
    var totpanStr = "";
    while (totalpan[j] != ' ') {
        totpanStr += totalpan[j];
        j++;
    }
    var totpan = parseInt(totpanStr);

    $("#total").text(totpan + fraisliv + "  FCFA");
    console.log(totpan + fraisliv)
});