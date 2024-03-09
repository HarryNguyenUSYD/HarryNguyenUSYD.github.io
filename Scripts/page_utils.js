let info_showing = false;
let image_showing = false;

function show_info() {
    info_showing = !info_showing;

    if (info_showing) {
        $("#info_popup").css("display", "block");
    } else {
        $("#info_popup").css("display", "none");
    }
}