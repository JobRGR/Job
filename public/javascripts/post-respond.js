$(document).ready(function(){
    $('#send-user').click(function(e){
        e.preventDefault();

        var data = {
            id: location.search.split("id=")[1]
        }


        $.ajax({
            url: "/post-respond",
            method: "POST",
            data: data,
            statusCode: {
                200: function() {
                    window.location.href = "/feed";
                }
            }
        });
    })
})