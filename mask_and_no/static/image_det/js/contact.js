function validateForm() {
    $('#status-name').html("");
    $('#status-email').html("");
    $('#status-subject').html("");
    $('#status-message').html("");

    var name = $("#contact-name").val();
    if (name == "") {
        $('#status-name').html(`<strong style="color:rgb(200,0,0); font-size:12px"> Name cannot be empty</strong>`);
        return false;
    }
    var email = $("#contact-email").val();
    if (email == "") {
        $("#status-email").html(`<strong style="color:rgb(200,0,0); font-size:12px">Email cannot be empty</strong>`);
        return false;
    } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            $("#status-email").html(`<strong style="color:rgb(200,0,0); font-size:12px">Email format invalid</strong>`);
            return false;
        }
    }
    var subject = $("#contact-Subject").val();
    if (subject == "") {
        $("#status-subject").html(`<strong style="color:rgb(200,0,0); font-size:12px">Subject cannot be empty</strong>`);
        return false;
    }
    var message = $("#contact-message").val()
    if (message == "") {
        $("#status-message").html(`<strong style="color:rgb(200,0,0); font-size:12px">Message cannot be empty</strong>`);
        return false;
    }

    postMail();

}

function postMail() {
    var example_form = '#formMail';
    $("#sender").html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Sending...').addClass('disabled');
    $.ajax({
        url: "/ajax_sendmail/",
        type: "POST",
        data: $(example_form).serialize(),
        success: function(data) {
            if ((data['success']) === false) {

            } else {
                $("#sender").html('Send').removeClass('disabled');
                $(example_form).find('.success-message').show();
                alert("Votre mail a bien été envoyé")

            }
        },
        error: function() {
            $(example_form).find('.error-message').show();
            $("#sender").html('Send').removeClass('disabled');
            alert("L'envoi de votre mail a échoué");

        }
    });
}
$('#sender').on('click', validateForm());