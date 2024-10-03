function showFullScreenshot(src) {
    $("#display-screenshot > img").attr("src", src);
    $("#display-screenshot").css("display", "flex");
    $("#display-screenshot > .background").css("display", "block");
    $("#display-screenshot > .background").css("pointer-events", "none");

    setTimeout(function() {
        $("#display-screenshot > img").css("transform", "scale(1)");
    }, 0);
}

function hideFullScreenshot() {
    $("#display-screenshot > .background").css("display", "none");
    $("#display-screenshot > .background").css("pointer-events", "auto");

    setTimeout(function() {
        $("#display-screenshot > img").css("transform", "scale(0)");
    }, 0);

    setTimeout(function() {
        $("#display-screenshot").css("display", "none");
    }, 500);
}

function init() {
    $(".screenshot").each(function(index) {
        $(this).on("click", function() {
            showFullScreenshot($(this).attr("src"));
        })
    });

    $("#display-screenshot").on("click", function() {
        hideFullScreenshot();
    });
}

init();