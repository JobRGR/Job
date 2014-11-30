var Search = function(){
    function printUser(obj){
        var title = "<h4 class='list-group-item-heading'>"+obj.username+"</h4>",
            location = "<h6>City: "+obj.city+" University: "+obj.university+"</h6>",
            specialty = "<h5>"+obj.specialty+"</h5>",
            about = "<p class='list-group-item-text'>"+specialty+location+"</p>",
            img = "<img src='"+obj.img+"' class='search-img'>";

        var block = "<a href='/user-page?id="+obj._id+"' class='list-group-item'>"+img+title + about+"</a>"

        return block
    }

    function printCompany(obj){
        var title = "<h4 class='list-group-item-heading'>"+obj.companyName+"</h4>",
            about = "<p class='list-group-item-text'>"+obj.about+"</p>",
            img = "<img src='"+obj.img+"' class='search-img'>";

        var block = "<a href='/company-page?id="+obj._id+"' class='list-group-item'>"+img+title + about+"</a>"

        return block
    }

    function printObj(obj){
        var isUser = obj.username !=undefined;

        if(isUser) return printUser(obj)
        else return printCompany(obj)
    }

    function output(array){
        var el = $('.container');

       el.html('')

        for(var i = 0; i<array.length;i++){
            el.append(printObj(array[i]));
        }
    }

    return {
        output: output
    }

}