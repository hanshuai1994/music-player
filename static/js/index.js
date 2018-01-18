(function() {
    $(".list-btn").click(function() {
        $(this).parent().toggleClass("active");
        return $(".lists").toggleClass("active");
    });

    // $(".action-button").find('a').click(function() {
    //     if ($(this).hasClass("random") || $(this).hasClass("play-pause") || $(this).hasClass("repeat")) {
    //         return $(this).toggleClass("active");
    //     }
    // });

}).call(this);
