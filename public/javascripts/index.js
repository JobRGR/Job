$('document').ready(function(){
    (function(){
        var path = location.pathname,
            li = $('.nav li');

        if(path=="/") li.eq(0).addClass('active');
        else if(path=="/sign-in") li.eq(1).addClass('active');
    })()

    $('#log-off').click(function(){
        $('<form method=POST action=/logout>').submit();
        return false
    })
});
