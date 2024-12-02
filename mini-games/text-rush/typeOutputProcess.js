export function processTypeOutput(fid) {
    if (fid.startsWith("[entry]")) {
        return entryMode(fid);
    }
}

function entryMode(fid) {
    switch (fid) {
        case ("[entry]mode-paragraph-desc"):
            $("#guiding-text").text("Paragraph: Type a paragraph as fast as you can");
            break;
        case ("[entry]mode-countdown-desc"):
            $("#guiding-text").text("Countdown: Type as many words as possible before time runs out");
            break;
        case ("[entry]mode-survival-desc"):
            $("#guiding-text").text("Survival: Type the words before they get to the other side of the screen");
            break;
        case ("[entry]mode-paragraph-select"):
            gameplayTransition("#paragraph-mode");
            break;
        case ("[entry]mode-countdown-select"):
            gameplayTransition("#countdown-mode");
            break;
        case ("[entry]mode-survival-select"):
            gameplayTransition("#survival-mode");
            break;
    }
}

function gameplayTransition(id) {
    for (let i = 0; i < 3; i++) {
        $(id).delay(50).animate({"opacity": "0"}, 50);
        $(id).delay(50).animate({"opacity": "1"}, 50);
    }

    $("#cover").delay(500).animate({"opacity": "1"}, 500);
    $("#entry").delay(1000).fadeOut(0);
    $("#cover").delay(500).animate({"opacity": "0"}, 500);
}