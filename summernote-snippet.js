ATALHOS = {}
$(document).ready(function(){
    $.ajax({
            url: '../../api/atalhos_textuais',
            success: function(data){
                ATALHOS = data.atalhos
            },
            error: function(data){
                console.log("Não foi possível carregar atalhos")
            }
    });
});

$('.summernote').unbind().on('summernote.keydown', function(we, e) {
    if(e.keyCode == 9){
        $('.summernote').summernote('saveRange');
        e.preventDefault()
        inner_text = $(this).val()
        lw = getLastWord(inner_text)
        text = atalhoToText(lw)
        $(this).summernote("code", $(this).summernote("code").replace(lw, text))
        $('.summernote').summernote('restoreRange');
        $('.summernote').summernote('focus');
    }
});


function strip(html){
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function getLastWord(str){
    var s = "";
    str = strip(str)
    var i = str.length - 1;
    while(i >=0 && str[i].charCodeAt() > 96 && str[i].charCodeAt() < 123){
        s += str[i];
        i -= 1
    }
    s = s.split("")
    s = s.reverse()
    s = s.join("")
    return s
}

function atalhoToText(str){
    text = str
    if(str in ATALHOS){
        text = ATALHOS[str]
    }
    return text
}
