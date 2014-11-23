$(document).ready(function(){
    $(document.forms['login-form']).on('submit', function(e) {
        var form = $(this);
        var data = form.serialize();

        var isCorrect = checkData(data);

        if(!isCorrect.bool){
            $('.error').html(isCorrect.message).addClass('alert-danger');
            e.preventDefault();
            return
        }

        $('.error', form).html('');
        $(":submit", form).button("loading");
        $('.error').removeClass('alert-danger').html("");

        $.ajax({
            url: "/sign-up",
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

    function checkData(data) {
        var ans = {
            bool: true,
            message: "OK"
        };

        var arr = data.split("&")
        console.log(arr);

        for(var i = 0; i<arr.length; i++){

            var tmp = arr[i].split("=");

            if(!tmp[1].trim().length && tmp.length==2){
                ans.message = "Wrong " + tmp[0] + "."
                ans.bool = false;
                break;
            }
        }

        return ans;
    }
});
