var cl = console.log.bind(console);
var patt1 = /[0-9]/g;

$('#phone')
    .keypress((e) => !isNaN(e.key))
    .keyup((e) => mask(e.target, e))

function mask(input, e) {
    cl(input.value);
    var tel = '',
        val = input.value.replace(/[^\d]*/g, '').split(''),
        len = val.length;

    for (var i = 0; i < len; i++) {
        switch (i) {
            case 2:
            case 5:
                val[i] = val[i] + '-'
                break;
        }
        tel = tel + val[i]
    }
    input.value = tel;
}