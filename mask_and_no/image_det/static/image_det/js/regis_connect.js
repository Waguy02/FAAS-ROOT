function post() {
    var example_form = '#form2';
    $('#btn-oneC').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Connexion...').addClass('disabled');
    $.ajax({
        url: "/ajax_login/",
        type: "POST",
        data: $(example_form).serialize(),
        success: function(data) {
            if ((data['success']) === false) {
                $('#btn-oneC').html('Connexion').removeClass('disabled');
                $(example_form).html(data['form_html']);
            } else {
                $(example_form).find('.success-message').show();
                location.href = "/";
            }
        },
        error: function() {
            $(example_form).find('.error-message').show()
        }
    });
}

function postRegis() {
    $('#btn_regis').html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Enregistrement...').addClass('disabled');
    var example_form = '#form';
    $.ajax({
        url: "/ajaxRegis/",
        type: "POST",
        data: $(example_form).serialize(),
        success: function(data) {
            if ((data['success']) === false) {
                $('#btn_regis').html('Enregistrement').removeClass('disabled');
                $(example_form).html(data['form_html']);
            } else {
                $(example_form).find('.success-message').show();
                location.href = "/";
            }
        },
        error: function() {
            $(example_form).find('.error-message').show();
        }
    });
}


$(document).ready(function() {
    $('#btn-oneC').click(function() {

    });
    $(function() {
        $("#warner").click(function() {
            $('#ModalWarning').modal('hide');
        });
        $("#regis").click(function() {
            $("#modalLoginForm").modal('hide');
        })


    });
});