function mask(input, e) {
    // cl(input.value);
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

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}