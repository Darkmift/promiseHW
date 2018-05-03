console.log('js online.');
myUrl = 'modal.htm';

function get(url) {
    var promise = new Promise(function(resolve) {
        $.get(url, function(data) {
            //console.log(data);
            resolve(data);
        });
    })
    return promise;
}

function wait(func, time) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            //console.log('waiting');
            resolve(func);
        }, time)
    });
}

function showForm(form) {
    return new Promise(function(resolve) {
        $('#modalContainer').html(form);
        $('#myBtn').click();
        resolve(form);
    });
}

function makePost() {
    return new Promise(function(resolve) {
        $('form').submit(function(e) {
            e.preventDefault();
            //console.log('Submited with all requiremnts');
            emailInput = $('#email').val();
            subjectInput = $('#subject').val();
            textareaInput = $('#textarea').val();
            let postEmail = {
                'email': emailInput,
                'subject': subjectInput,
                'content': textareaInput
            };
            //console.log(postEmail);
            resolve(postEmail);
        });
    });
}

function post(url, postDataObj) {
    var promise = new Promise(function(resolve, reject) {
        $.ajax({
            type: 'POST',
            url: url,
            data: postDataObj,
            error: function(e) {
                //console.log(e, status);
                reject(e);
            },
            success: function(data, status) {
                //console.log('post reply:', data, status);
                resolve(status);
            },
        });
    })
    return promise;
}

wait(get(myUrl), 1500)
    .then(
        function(data) {
            showForm(data)
        }
    ).then(function(resolve) {
        makePost()
            .then(function(data) {
                // post('controller.php', data)
                console.log('posted: ', data);
                return post('controller.php', data);
            })
            .then(function(response) {
                console.log('post result: ', response);
                return response;
            })
            .then(function(response) {
                showStatus(response, 2000)
            });
    });

function showStatus(status, time) {
    var promise = new Promise(function(resolve) {
        resolve(setTimeout($('.modal-content').html(status + '!'), time));
    })
    return promise;
}