var curent_id;
var minP;
var maxP;
var choitr;
$.ajax({
    url: "/ajax_get_elt_filter/",
    method: "GET",
    success: function(data) {
        var filters = data['filters'];
        curent_id = filters['idsc']
        choitr = filters['choitr']
        minP = filters['minP']
        maxP = filters['maxP']



        $(document).ready(function() {

            $("#warner").click(function() {
                $('#ModalWarning').modal('hide');
            });
            $(".s-text13").on('click', function() {
                $(".s-text13").removeClass('activelink');
                $(this).addClass('activelink');
            })
            $("label").parent().children('ul').hide();

            $("label").click(function() {
                $(this).parent().children('ul').toggle();
            })

            if (curent_id) {
                get_articless(curent_id);
            }

            var toSelect = choitr;
            $("#triChoices option:selected").removeAttr('selected');
            $("#triChoices option[value='" + toSelect + "']").attr('selected', 'selected');

            var filterBar = document.getElementById('filter-bar');
            if (minP && maxP) {
                noUiSlider.create(filterBar, {
                    start: [minP, maxP],
                    connect: true,
                    range: {
                        'min': 0,
                        'max': 200000
                    }
                });
            } else {
                noUiSlider.create(filterBar, {
                    start: [0, 200000],
                    connect: true,
                    range: {
                        'min': 0,
                        'max': 200000
                    }
                });
            }
            var skipValues = [
                document.getElementById('value-lower'),
                document.getElementById('value-upper')
            ];

            filterBar.noUiSlider.on('update', function(values, handle) {
                skipValues[handle].innerHTML = Math.round(values[handle]);
            });
        });
    },
    error: function(err) {
        console.log(err);
    }

})
var result;
var stockvide = `<div class="container m-auto"><div class="col-md-6 m-auto"><div class="row">
        <div class="view m-auto">
                                    <img src="/static/Shop/img/stockepuise.jpg" class="img-responsive cover m-t-100" alt="IMG-PRODUCT">
                                </div>
<h2 class="title text-center p-b-30 p-l-30">Notre stock d'articles de cette catégorie satisfaisant votre recherche est vide. <br>Articles indisponibles!!</h2>

</div>
</div>
</div>`;

function get_articles_pagination(event, page_number) {
    var choixTri = $("#triChoices option:selected").text();
    var min = $("#value-lower").text();
    var max = $("#value-upper").text();
    var arechercher = $("#search").val();
    if (curent_id) {
        $.ajax({
            url: "/ajax_article/" + curent_id + "?page=" + page_number + "&ChoixTri=" + choixTri + "&maxP=" + max + "&minP=" + min + "&search=" + "",
            method: "GET",
            success: function(data) {
                console.log(data)
                if (createAllElements(data) == "") {
                    $("#Contain").html(stockvide);
                    $("#paginationList").html("");
                } else {
                    $("#Contain").html(createAllElements(data));
                    $("#paginationList").html(updateComponent(data));
                }

            },
            error: function(err) {
                console.log(err)
            }
        })
    }

}

function get_articles(event) {
    var id = event.target.id
    var choixTri = $("#triChoices option:selected").text();
    var min = $("#value-lower").text();
    var max = $("#value-upper").text();
    var arechercher = "";

    $.ajax({
        url: "/ajax_article/" + id + "?ChoixTri=" + choixTri + "&maxP=" + max + "&minP=" + min + "&search=" + "",
        method: "GET",
        success: function(data) {
            if (createAllElements(data) == "") {
                $("#Contain").html(stockvide);
                $("#paginationList").html("");
            } else {
                curent_id = id;
                $("#Contain").html(createAllElements(data));
                $("#paginationList").html(updateComponent(data));
            }
        },

        error: function(err) {
            console.log(err);
        }

    })

}

function get_articless(id) {
    $.ajax({
        url: "/ajax_article_reload/" + id,
        method: "GET",
        success: function(data) {
            curent_id = id
            $("#" + String(id)).parent().parent().show();
            $(".s-text13").removeClass('activelink');
            $("#" + String(id)).addClass('activelink');
            if (createAllElements(data) == "") {
                $("#Contain").html(stockvide);
                $("#paginationList").html("");
            } else {
                $("#Contain").html(createAllElements(data));
                $("#paginationList").html(updateComponent(data));
            }
        },
        error: function(err) {
            console.log(err);
        }

    })

}

function updateComponent(data) {
    result = data.page_count;

    var html = ""
    for (let i = 0; i < result; i++) {
        if (i + 1 == data.active) {
            html += `<li class="page-item active"><a class="page-link">${i+1}</a></li>`;
        } else {
            html += `<li class="page-item"><a class="page-link" onclick = "get_articles_pagination(event ,${i+1})">${i+1}</a></li>`;
        }
    }

    return html;

}

function createAllElements(data) {
    var result = "";
    for (var key in data.articles) {
        result += createElement(data.articles[key]);
    }
    return result;

}

function createElement(data) {
    var result = `<div class="col-sm-6 col-6 col-md-6 col-lg-4 p-b-50">
			<div class="card align-items-center"><div class="view overlay imgHolder">
				<img src="/media/${data.image_present}" data-echo="/media/${data.image_present}" class="card-img-top img-responsive cover" alt="">
								<a>
									<div class="mask rgba-white-slight"></div>
								</a>
							</div>
							<div class="card-body text-center">
								
									<strong class="dark-grey-text small-device1">
										${data.nom}
									</strong>
								`;

    if (data.prev_prix_present != 0) {
        result += `<h5 class="font-weight black-text small-device1">
									<strike><strong>${data.prev_prix_present} FCFA</strong></strike>
									</h5>`
    }

    result += `<h4 class="font-weight-bold blue-text small-device2">
									<strong>${data.prix_present} FCFA</strong>
								</h4>
								<a class="btn btn-primary small-device2" href="/SingleArticle/${data.id}">Acheter</a>
							</div>
						</div>
					</div>`

    return result;

}

function search() {
    var arechercher = $("#search").val();
    $.ajax({
        url: "/ajax_article_search/" + "?search=" + arechercher,
        method: "GET",
        success: function(data) {
            var id = data['idsc']
            $("#" + String(id)).parent().parent().show();
            $(".s-text13").removeClass('activelink');
            $("#" + String(id)).addClass('activelink');
            if (createAllElements(data) == "") {
                $("#Contain").html(stockvide);
                $("#paginationList").html("");
            } else {
                $("#Contain").html(createAllElements(data));
                $("#paginationList").html(updateComponent(data));
            }
        },
        error: function(err) {
            console.log(err);
        }

    })

}

function postFilters() {
    var choixTri = $("#triChoices option:selected").text();
    var min = $("#value-lower").text();
    var max = $("#value-upper").text();
    var arechercher = $("#search").val();
    $.ajax({
        url: "/ajax_post_tri/",
        method: "POST",
        data: {
            'ChoixTri': choixTri,
            'minP': min,
            'maxP': max,
            'search': ""
        },
        success: function(data) {
            console.log(data);

        },
        error: function(err) {
            console.log(err);
        },
    });
    if (curent_id) {
        $.ajax({
            url: "/ajax_article/" + curent_id + "?ChoixTri=" + choixTri + "&maxP=" + max + "&minP=" + min + "&search=" + "",
            method: "GET",
            success: function(data) {
                if (createAllElements(data) == "") {
                    $("#Contain").html(stockvide);
                    $("#paginationList").html("");
                } else {
                    $("#Contain").html(createAllElements(data));
                    $("#paginationList").html(updateComponent(data));
                }
            },
            error: function(err) {
                console.log(err);
            }

        })
    }
}