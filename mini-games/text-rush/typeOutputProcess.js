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
            for (let i = 0; i <= 5; i++) {
                $("#paragraph-mode").delay(100).animate({"opacity": "0"}, 100);
                $("#paragraph-mode").delay(100).animate({"opacity": "1"}, 100);
            }
            break;
        case ("[entry]mode-countdown-select"):
            $("#guiding-text").text("Countdown: Type as many words as possible before time runs out");
            break;
        case ("[entry]mode-survival-select"):
            $("#guiding-text").text("Survival: Type the words before they get to the other side of the screen");
            break;
    }
}