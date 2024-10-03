const OPTIONS = {
    threshold: 0.5,
}
const OBSERVER = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            sectionScroll($(entry.target).attr("id"));
        }
    });
}, OPTIONS);

function init() {
    const MAIN = $(".section").get();
    MAIN.forEach((ele) => OBSERVER.observe(ele));
    $("#title").get().forEach((ele) => OBSERVER.observe(ele));

    sectionInit();
}

function sectionInit() {
    const TRANSLATE_DIS = "5vmin";
    $(".section").css({"opacity": "0", "transform": "translateX(-" + TRANSLATE_DIS + ")"});
    $(".section .desc").css({"opacity": "0", "transform": "translateX(-" + TRANSLATE_DIS + ")"});
    $(".section").css({"transition": "all 0.5s ease"});
    $(".section .desc").css({"transition": "all 0.5s ease"});

    $("#title").css({"opacity": "0", "transform": "translateX(-" + TRANSLATE_DIS + ")"});
    $("#title > p").css({"opacity": "0", "transform": "translateX(-" + TRANSLATE_DIS + ")"});
    $("#title").css({"transition": "all 0.5s ease"});
    $("#title > p").css({"transition": "all 0.5s ease"});
}

function sectionScroll(id) {
    $("#" + id).css({"opacity": "1", "transform": "translateX(0)"});

    let delay = 0;

    if (id != 'title') {
        $("#" + id + " .desc").each(function(i) {
            let _this = $(this);
            setTimeout(function() {
                _this.css({"opacity": "1", "transform": "translateX(0)"});
            }, delay + i * 200);
        });
    } else {
        $("#title > p").each(function(i) {
            let _this = $(this);
            setTimeout(function() {
                _this.css({"opacity": "1", "transform": "translateX(0)"});
            }, delay + i * 200);
        });
    }
}

init();