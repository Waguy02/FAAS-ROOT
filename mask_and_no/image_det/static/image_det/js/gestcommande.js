$(document).ready(function() {
    $(".btn-danger").on('click', function() {
        $(".btn-danger").html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> Oui').addClass('disabled');
        $.ajax({
            method: 'POST',
            url: "/ajaxsupp_commande/",
            data: {},
            success: function(data) {
                location.href = "/Cart/";
            },
            error: function(err) {

            }

        })
    })
    $("#modifier").on('click', function() {
        $.ajax({
            method: 'POST',
            url: "/ajaxsupp_commande/",
            data: { 'type': 'modif' },
            success: function(data) {
                location.href = "/Cart/";
            },
            error: function(err) {

            }

        })

    })
})