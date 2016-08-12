$(document).ready(function() {
    $(this).scrollTop(0);
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent) ? true : false;

    $(".header .links a").on("click", function() {
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top - 80 });
        return false;
    });

    $(window).bind("touchmove swipe scroll", function() {
        if( !isMobile ) {
            var yPos =  $(window).scrollTop() / 3;
            var coords = 'center bottom '+ yPos + 'px';
            $(".big").css({ backgroundPosition: coords });
        }

        if($(window).scrollTop() >= ($('.header').height()/2)) {
            $(".header").addClass("changed");
        } else {
            $(".header").removeClass("changed");
        }
    });

    $("#contact").on("submit", "form", function(e) {
        e.preventDefault();
        $form = $(this);
        $.post(
            "mail.php",
            $form.serialize(),
            function(data) {
                if(data == 'OK') {
                    swal("Good job!", "Message successfully sent!", "success");
                    $form[0].reset();
                } else {
                    swal("Oops...", data, "error");
                }
            }
        );
    });
});