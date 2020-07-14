$(document).ready(function() {
    $.ajax({
        method: "get",
        url: "/ajax_forpanier/",
        success: function(data) {
            var typeLivr = data['typeLiv'];
            var modebuy = data['modeBuy'];
            $("input[name='typeLiv']:checked").removeAttr('checked')
            $("input[name='modePay']:checked").removeAttr('checked')
            $("#" + typeLivr).attr('checked', 'checked')
            $("#" + modebuy).attr('checked', 'checked')
        },
        error: function(err) {
            console.log("err");
        },
    })

    function postQte(id, qte) {

        $.ajax({
            method: "post",
            url: "/ajax_postQTE/",
            data: {
                "id": id,
                "qte": qte
            },
            success: function(data) {
                $(".header-icons-noti").text(data['nbArticles'])
            },
            error: function(err) {
                console.log("err");
            },
        })
    }

    $("input[name='typeLiv']").on('change', function(e) {
        var idTypeliv = $("input[name='typeLiv']:checked").attr('id');
        $.ajax({
            method: "POST",
            url: "/ajax_choicesradio/",
            data: { "typeL": idTypeliv },
            success: function(data) {
                console.log(data['success'])
            },
            error: function(err) {
                console.log(err)
            }

        })
    })
    $("input[name='modePay']").on('change', function(e) {
        var idModeBuy = $("input[name='modePay']:checked").attr('id');
        $.ajax({
            method: "POST",
            url: "/ajax_choicesradio/",
            data: { "modeB": idModeBuy },
            success: function(data) {
                console.log(data['success'])
            },
            error: function(err) {
                console.log(err)
            }

        })
    })
    $(".Terminer").on('click', function(e) {
        $(this).html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Terminer').addClass('disabled');
        var typeLiv = $("input[name='typeLiv']:checked").next().text();
        var modeBuy = $("input[name='modePay']:checked").next().text();
        $.ajax({
            method: "post",
            url: "/ajax_PAP/",
            data: {},
            success: function(data) {
                console.log(data);
                idPan = data['idpan'];
                location.href = "/FinCart/" + idPan + "?modeAchat=" + modeBuy + "&typeLivr=" + typeLiv;
            },
            error: function(err) {
                console.log(err);
                location.href = "";
            },
        })
    })
    var idtoDel;
    $(".btn-danger").on('click', function(e) {
        console.log(idtoDel)
        $.ajax({
            method: "post",
            url: "/ajax_post_supp/",
            data: {
                "id": idtoDel
            },
            success: function(data) {

                console.log(data);
                location.href = "/Cart/";
            },
            error: function(err) {
                console.log("err");
            },
        })
    });
    $('.btnsup').on('click', function(event) {
        idtoDel = event.target.id;
        console.log(event.target.id)
    });

    $(".column-5").each(function(index) {
        if (index > 0) {
            var prix = parseInt($(this).prev().prev().text());
            var qte = parseInt($(this).prev().children("div").children("input").val());
            $(this).text(prix * qte);
        }
    });

    var att = $('tr.table-row');
    var S = 0;
    for (var i = 0; i < att.length; i++) {
        for (var j = 0; j < 5; j++) {
            if (att[i].children[j].attributes.class.value == 'column-5') {
                S = S + Number(att[i].children[j].innerText);
            }
        }
    }
    $('#total1').text(S + " FCFA");
    $('#total2').text(S + " FCFA");

    $('.my').change(function() {
        console.log('ghgfgyjfgfjgyjh')
        var id_qte = String($(this).attr('id'));
        var j = 0;
        var qmaxc = "";
        var idc = "";
        while (id_qte[j] != '_') {
            idc += id_qte[j];
            j++;

        }
        for (i = j + 1; i < id_qte.length; i++) {
            qmaxc += id_qte[i];
        }
        var id = parseInt(idc);
        var qmax = parseInt(qmaxc);
        var numProduct = Number($(this).val());
        if (numProduct <= 0) {
            $(this).val(1);
            var atrPrixU = $(this).parent().parent().prev().text();
            $(this).parent().parent().next().text(atrPrixU);
            var att = $('tr.table-row');
            var S = 0;
            for (var i = 0; i < att.length; i++) {
                for (var j = 0; j < 5; j++) {
                    if (att[i].children[j].attributes.class.value == 'column-5') {
                        S = S + Number(att[i].children[j].innerText);
                    }
                }
            }
            $('#total1').text(S + " FCFA");
            $('#total2').text(S + " FCFA");
            postQte(id, Number($(this).val()));
        } else {
            if (isNaN(numProduct) || parseInt(numProduct) != numProduct || numProduct > qmax) {
                $(this).val(1);
                var atrPrixU = $(this).parent().parent().prev().text();
                $(this).parent().parent().next().text(atrPrixU);
                var att = $('tr.table-row');
                var S = 0;
                for (var i = 0; i < att.length; i++) {
                    for (var j = 0; j < 5; j++) {
                        if (att[i].children[j].attributes.class.value == 'column-5') {
                            S = S + Number(att[i].children[j].innerText);
                        }
                    }
                }
                $('#total1').text(S + " FCFA");
                $('#total2').text(S + " FCFA");
                postQte(id, Number($(this).val()));
            } else {
                var atrPrixU = $(this).parent().parent().prev().text();
                $(this).parent().parent().next().text((numProduct) * Number(atrPrixU));
                var att = $('tr.table-row');
                var S = 0;
                for (var i = 0; i < att.length; i++) {
                    for (var j = 0; j < 5; j++) {
                        if (att[i].children[j].attributes.class.value == 'column-5') {
                            S = S + Number(att[i].children[j].innerText);
                        }
                    }
                }
                $('#total1').text(S + " FCFA");
                $('#total2').text(S + " FCFA");
                postQte(id, Number($(this).val()));
            }
        }
    });

    $('.btn-num-product-down').on('click', function(e) {
        e.preventDefault();
        var id_qte = String($(this).next().attr('id'));
        var j = 0;
        var idc = "";
        while (id_qte[j] != '_') {
            idc += id_qte[j];
            j++;

        }
        var id = parseInt(idc);
        var numProduct = Number($(this).next().val());
        if (numProduct > 1) {
            $(this).next().val(numProduct - 1);
            var atrPrixU = $(this).parent().parent().prev().text();
            $(this).parent().parent().next().text((numProduct - 1) * Number(atrPrixU));
            var att = $('tr.table-row');
            var S = 0;
            for (var i = 0; i < att.length; i++) {
                for (var j = 0; j < 5; j++) {
                    if (att[i].children[j].attributes.class.value == 'column-5') {
                        S = S + Number(att[i].children[j].innerText);
                    }
                }
            }
            $('#total1').text(S + " FCFA");
            $('#total2').text(S + " FCFA");
            postQte(id, numProduct - 1)

        }
    });

    $('.btn-num-product-up').on('click', function(e) {
        e.preventDefault();
        var id_qte = String($(this).prev().attr('id'));
        var j = 0;
        var qmaxc = "";
        var idc = "";
        while (id_qte[j] != '_') {
            idc += id_qte[j];
            j++;
        }
        for (i = j + 1; i < id_qte.length; i++) {
            qmaxc += id_qte[i];
        }
        var qmax = parseInt(qmaxc);
        var id = parseInt(idc);
        var numProduct = Number($(this).prev().val());
        if (numProduct < qmax) {
            $(this).prev().val(numProduct + 1);
            var atrPrixU = $(this).parent().parent().prev().text();
            $(this).parent().parent().next().text((numProduct + 1) * Number(atrPrixU));
            var att = $('tr.table-row');
            var S = 0;
            for (var i = 0; i < att.length; i++) {
                for (var j = 0; j < 5; j++) {
                    if (att[i].children[j].attributes.class.value == 'column-5') {
                        S = S + Number(att[i].children[j].innerText);
                    }
                }
            }
            $('#total1').text(S + " FCFA");
            $('#total2').text(S + " FCFA");
            postQte(id, numProduct + 1)
        }
    });


});