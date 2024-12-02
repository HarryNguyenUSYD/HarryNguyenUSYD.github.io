export function darkMode(state) {
    if (state) {
        $(":root").css({
            "--text-color": "white",
            "--background-color": "black",
            "--cursor-color": "cyan"
        });
    } else {
        $(":root").css({
            "--text-color": "black",
            "--background-color": "white",
            "--cursor-color": "blue"
        });
    }
}