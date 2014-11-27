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

    $(document.forms['edit-form']).on('submit', function(e) {
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

        data = data + "&lastname=" + $('.navbar-link').html();

        result = result.length ? result : $('#img-pic')[0].src;

        var obj = {
            arr: data,
            img: result
        };

        $.ajax({
            url: "/cabinet",
            method: "POST",
            data: obj,
            complete: function() {
                $(":submit", form).button("reset");
            },
            statusCode: {
                200: function() {
                    $('.error').html("User data was updated!").addClass('alert-success');
                    window.location.href = "/cabinet";
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

    $(document.forms['password-form']).on('submit', function(e) {
        var form = $(this);
        var data = form.serialize();

        var isCorrect = correctPassword(data);

        if(!isCorrect){
            $('.error').html("Wrond Password").addClass('alert-danger');
            e.preventDefault();
            return
        }

        $('.error', form).html('');
        $(":submit", form).button("loading");
        $('.error').removeClass('alert-danger').html("");

        data = data + "&username=" + $('.navbar-link').html()

        $.ajax({
            url: "/cabinet-password",
            method: "POST",
            data: data,
            complete: function() {
                $(":submit", form).button("reset");
            },
            statusCode: {
                200: function() {
                    $('.error').html("User data was updated!").addClass('alert-success');
                    window.location.href = "/cabinet";
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
        //console.log(arr);

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

    function correctPassword(data){
        var arr = data.split("&")

        var value = arr.map(function(el){
                return el.split("=")[1]
            })

        var isSame = value[0] == value[1],
            ans = isSame && value[0].trim().length

        return ans
    }
});
