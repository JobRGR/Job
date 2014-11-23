$(document).ready(function(){
    $(document.forms['login-form']).on('submit', function() {
        var form = $(this);

        $('.error', form).html('');
        $(":submit", form).button("loading");

        var data = form.serialize();
       // console.log(data);

        $('.error').removeClass('alert-danger');

        $.ajax({
            url: "/sign-in",
            method: "POST",
            data: data,
            complete: function() {
                $(":submit", form).button("reset");
            },
            statusCode: {
                200: function() {
                    $('.error').html("Welcome!").addClass('alert-success');
                    window.location.href = "/";
                },
                403: function(jqXHR) {
                    //var error = JSON.parse(jqXHR.responseText);
                    //$('.error', form).html(error.message);

                    var error = $.parseXML(jqXHR.responseText)
                    $xml = $( error );
                    $title = $xml.find( "h1" ).html();
                    $('.error').html($title).addClass('alert-danger');
                }
            }
        });
        return false;
    });
});