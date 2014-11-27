$(document).ready(function(){
    var result = "";

    $('#img').change(function(){
        var preview = $('img');
        var file = $(this)[0].files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            preview[0].src = reader.result;
            result = reader.result
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview[0].src = "";
        }
    });

    $(document.forms['login-form']).on('submit', function(e) {
        var form = $(this);

        var data = form.serializeArray().reduce(function(previousValue, currentValue, index, array) {
            return previousValue + "&" + currentValue.name + "=" + currentValue.value
        },"");

        data = data.substring(1,data.length);

        var isCorrect = checkData(data);

        if(!isCorrect.bool){
            $('.error').html(isCorrect.message).addClass('alert-danger');
            e.preventDefault();
            return
        }

        var obj = {
            arr: data,
            img: result
        };

        $('.error', form).html('');
        $(":submit", form).button("loading");
        $('.error').removeClass('alert-danger').html("");

        $.ajax({
            url: "/sign-up",
            method: "POST",
            data:  obj,
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
