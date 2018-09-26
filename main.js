var cl = console.log.bind(console);
var patt1 = /[0-9]/g;
var alertContainer = $('.alertContainer');
alertContainer.hide();

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
            alertContainer.text("'" + e.target.value + "'" + " is not a valid email")
            .show() :
            alertContainer.hide();
    });

formObj.self.submit(function(e) {
    e.preventDefault();
    cl('clicked!');
    var errMsgGroup = $('<ol>');
    formObj.self
        .find("input")
        .each(
            (index, element) => {
                var self = $(element);
                cl('value: ', self.val());
                errMsgGroup
                    .append(
                        $('<li>')
                        .text(!self.val() ? String(self.attr('name')) + " must not be empty" :
                            String(index)
                        )
                    );


                switch (self.attr('name')) {
                    case 'fullname':
                        cl('1', self.val())
                        break;
                    case 'email':
                        cl('2', self.val())
                        break;
                    case 'phone':
                        cl('3', self.val())
                        break;
                }

            }
        )
    errMsgGroup.appendTo(alertContainer);
    alertContainer.show();
});