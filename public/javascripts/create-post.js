$(document).ready(function(){
    $(document.forms['login-form']).on('submit', function() {
        var form = $(this);

        $('.error', form).html('');
        //$(":submit", form).button("loading");

        //var data = form.serialize();
        $('.error').removeClass('alert-danger');

        var openEl = $('.open-form'),
            open = []

        for(var i=0; i<openEl.length;i++)
            open.push({
                question: openEl.eq(i).find('#open-q').val(),
                answer: openEl.eq(i).find('#open-a').val()
            })

        var testEl = $('.test-form'),
            test = [];

        for(var i=0; i<testEl.length;i++){
            var tmp = {
                question: testEl.eq(i).find('#test-q').val(),
                answer: testEl.eq(i).find('#test-a').val(),
                variant: []
            }

            var variant = testEl.eq(i).find('.test-v')
            for(var j = 0; j<variant.length;j++)
                tmp.variant.push(variant.eq(j).val())

            test.push(tmp)
        }

        var data = form.serializeArray().reduce(function(previousValue, currentValue, index, array){
            previousValue[currentValue.name] = currentValue.value
            return previousValue
        },{})

        data.test = test
        data.open = open

        $.ajax({
            url: "/post",
            method: "POST",
            data: data,
            complete: function() {
                $(":submit", form).button("reset");
            },
            statusCode: {
                200: function() {
                    $('.error').html("Welcome!").addClass('alert-success');
                    window.location.href = "/feed";
                },
                403: function(jqXHR) {
                    var $title = jqXHR.responseText.split("h1")[1].split("<")[0].split(">")[1];
                    $('.error').html($title).addClass('alert-danger');
                }
            }
        });
        return false;
    });

    $('#open').click(function(){
        var label = '<label for="input-text" class="col-lg-2 control-label open-l">Open Question '+($('.open-l').length+1)+'</label>'
        var question = '<div class="col-lg-5"><input name="text" type="textarea" value="" class="form-control" id="open-q" placeholder="Add Question"><br>'
        var answer = '<input name="text" type="textarea" value="" class="form-control" id="open-a" placeholder="Add Answer"></div>'
        var div = '<div class="form-group open-form">'+label+question+answer+'</div>'

        $('.question').append(div)
    })
    $('#test').click(function(){
        var label = '<label for="input-text" class="col-lg-2 control-label test-l">Test Question '+($('.test-l').length+1)+'</label>'
        var question = '<div class="col-lg-4"><input name="text" type="textarea" value="" class="form-control" id="test-q" placeholder="Add Question"><br>'
        var answer = '<input name="text" type="textarea" value="" class="form-control" id="test-a" placeholder="Add Answer"><br>'
        var add = '<div class="test-add '+$('.test-add').length+'"><a style="cursor: pointer">Add answer</a></div></div>';

        var type = '<input name="text" type="textarea" value="" class="form-control test-v" placeholder="Add Variant">'
        var typeDiv = ''

        for(var i=0;i<3;i++)
            typeDiv = typeDiv + type + "<br>"

        typeDiv = '<div class="col-lg-4 test-type">'+typeDiv+'</div>';

        var div = '<div class="form-group test-form">'+label+question+answer+add+typeDiv+'</div>'

        $('.question').append(div)

        $('.test-add').on('click', function() {
            var index = $(this).attr('class').split(' ')[1];
            $('.test-type').eq(index).append(type+"<br>");
        })
    })

});
