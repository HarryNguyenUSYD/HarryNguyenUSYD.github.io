function showFullScreenshot(src) {
    $("#display-screenshot > img").attr("src", src);
    $("#display-screenshot").css("display", "flex");

    setTimeout(function() {
        $("#display-screenshot > img").css("transform", "scale(1)");
    }, 0);
}

function hideFullScreenshot() {
    $("#display-screenshot > img").css("transform", "scale(0)");
    $("#display-screenshot").css("display", "none");
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