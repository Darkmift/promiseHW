var cl = console.log.bind(console);
var patt1 = /[0-9]/g;
$('.alertContainer').hide();

var formObj = {
    self: $('#ContactForm'),
    name: $("#ContactForm input[name=name]"),
    email: $("#ContactForm input[name=email]"),
    phone: $("#ContactForm input[name=phone]")
}

formObj.phone
    .keypress((e) => !isNaN(e.key))
    .keyup((e) => mask(e.target, e))

formObj.email
    .blur((e) => {
        cl(e.target.value);
        !isEmail(e.target.value) ?
            $('.alertContainer').text("'" + e.target.value + "'" + " is not a valid email").show() :
            $('.alertContainer').hide();
    });

formObj.self.submit(function(e) {
    e.preventDefault();
    cl('clicked!');
    var errMsgGroup;
    formObj.self
        .find("input")
        .each(
            (index, element) => {
                switch ($(element).attr('name')) {
                    case 'fullname':
                        cl('1')
                        break;
                    case 'email':
                        cl('2')
                        break;
                    case 'phone':
                        cl('3')
                        break;
                }
            }
        )
});