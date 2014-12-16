$(document).ready(function(){
    var block;

    function setCursor(){
        var temp;
        temp=$('#textarea').val();
        $('#textarea').val('');
        $('#textarea').focus();
        $('#textarea').val(temp);;
    };

    function a () {
        block = this;
        var block_text = this.innerHTML;
        var height = block.offsetHeight+4;
        var width = block.offsetWidth ;
        var font = $(block).css('font-size');

        var new_block = "<textarea id = 'textarea' class='form-control' style = 'width:"+width+"px;height:"+height+"px;font-size:"+font+";'>"+block_text+"</textarea>";
        new_block
        $(block).replaceWith(new_block);
        $(block).focus();
        setCursor(document.getElementById('textarea'));
        $('#textarea').off();
        $('#textarea').blur(function(){
            block.innerHTML = $('#textarea')[0].value;
            console.log( block.innerHTML);
            var th = this;
            $(th).replaceWith(block);
            $(th).ready(function(){
                $(".editable").click(a)
            });
        });

    };

    $(".editable").click(a);

    $('#preview').click(function() {
        pdf = new jsPDF('p', 'pt', 'a4'),
            specialElementHandlers = {
                '#editor': function (element, renderer) {
                    return true;
                }
            };
        pdf.addHTML(document.getElementById('cv'), function () {
            var string = pdf.output('datauristring');
            var x = window.open();
            x.document.open();
            x.document.location = string;

        });
    });

        $('#save').click(function() {
            pdf = new jsPDF('p', 'pt', 'a4'),
                specialElementHandlers = {
                    '#editor': function (element, renderer) {
                        return true;
                    }
                };
            pdf.addHTML(document.getElementById('cv'), function () {
                pdf.save("pdf_name");

            });
        });
});
