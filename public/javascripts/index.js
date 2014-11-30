$('document').ready(function(){
    (function(){
        var path = location.pathname,
            li = $('.nav li');

        if(path=="/") li.eq(0).addClass('active');
        else if(path=="/sign-up") li.eq(2).addClass('active');
        else if(path=="/sign-in") li.eq(4).addClass('active');
        else if(path=="/feed") li.eq(1).addClass('active');
        else if(path=="/post") li.eq(3).addClass('active');
        else if(path=="/register-company") li.eq(3).addClass('active');
    })()

    $('#log-off').click(function(){
        $('<form method=POST action=/logout>').submit();
        return false
    })

    $('#search').click(function(e){
        e.preventDefault();

        var form = $(this);

        var data = $('#query').val()

        var url = "/search-user?query=" + data;
        //console.log(url);

        if(location.pathname != "/search-page"){
            $('.jumbotron').remove();
            $('.container').remove();
            
            var container = '<div class="container"></div>'
            $("body").append(container)
        }

        $.get(url,function(res){
            console.log(res);

            var search = new Search()
            search.output(res);
        });
    });
});
