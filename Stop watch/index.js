
var breakLength, sessionLength, clockActive;

const init = function () {
    breakLength = 5;
    sessionLength = 25;
    clockActive = false;
    $('#break-length').html(breakLength);
    $('#minutes').html(sessionLength);
    $('#seconds').html(00);
    $('#session-length').html(sessionLength);
    $('#start_stop').html('play <i class="fa fa-play" ></i>');
    $('#start_stop').removeClass('btn-danger');
    $('#start_stop').addClass('btn-outline-success');
    $('#timer-label').html('Session');
    $('#reset').html('reset <i class="fa fa-refresh" aria-hidden="true"></i>');

};

init();


let timer = function () {
    let min = $('#minutes').html();
    let sec = $('#seconds').html();
    if (min >= 0 && sec > 0) {
        sec--;
    }
    else if (sec == 0 && min > 0) {
        min--; sec = 60;
    }
    else if (sec == 0 && min == 0) {
        document.getElementById('beep').play();
        setTimeout(function(){
        },2000);
        min = $('#break-length').html();
        sec = 0;
        $('#timer-label').html('Break');


    }
    $('#minutes').html(min);
    $('#seconds').html(sec);
};










//jQuery selecting and events

$('document').ready(function () {
    console.log('all working');
    $('#break-decrement').on('click', function () {
        if (breakLength > 1) {
            breakLength--;
        }
        $('#break-length').html(breakLength)
    });
    $('#session-decrement').on('click', function () {
        if (sessionLength > 1) {
            sessionLength--;
        }
        $('#session-length').html(sessionLength);
        $('#minutes').html(sessionLength);
    });
    $('#break-increment').on('click', function () {
        if (breakLength < 60) {
            breakLength++;
        }
        $('#break-length').html(breakLength);
    });
    $('#session-increment').on('click', function () {
        if (sessionLength < 60) {
            sessionLength++;
        }
        $('#session-length').html(sessionLength);
        $('#minutes').html(sessionLength);
    });




    $('#start_stop').on('click', function () {
        if (!clockActive) {
            $('#start_stop').html('stop <i class="fa fa-pause"></i>');
            $('#start_stop').toggleClass('btn-outline-success btn-danger');
            var runTimer = true;
            clockActive = true;

        } else {
            $('#start_stop').html('play <i class="fa fa-play" ></i>');
            $('#start_stop').toggleClass('btn-outline-success btn-danger');
            var runTimer = false;
            clockActive = false;

        }

    });

    $('#start_stop').on('click', function () {
        var timee;
        if (clockActive) {
            timee = setInterval(timer, 1000);
            $('#start_stop').on('click', function () {
                clearInterval(timee);
            });
            $('#reset').on('click', function () {
                clearInterval(timee);
            })
        }
    })

    $('#reset').on('click', function () {
        init();
    });
})

//classes and DOM

$('button').addClass('btn btn-outline-success btn-sm');

