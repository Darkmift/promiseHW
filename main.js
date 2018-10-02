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
    //clear previous errors;
    alertContainer.empty();
    cl('clicked!');
    var errMsgGroup = $('<ol>');
    formObj.self
        .find("input")
        .each(
            (index, element) => {
                var self = $(element)[0];
                cl('value: ', self);
                if (!self.value) {
                    errMsgGroup
                        .append(
                            $('<li>')
                            .text(String(self.name) + " must not be empty")
                        );
                }
                if (!isEmail(self.value) &&
                    self.name === 'email'
                ) {
                    cl('el: ', self.name, 'val: ', self.value)
                    errMsgGroup
                        .append($('<li>')
                            .text(String(self.name) + " is not a valid email address"));
                }
            }
        )
    errMsgGroup.appendTo(alertContainer);
    alertContainer.show();
});