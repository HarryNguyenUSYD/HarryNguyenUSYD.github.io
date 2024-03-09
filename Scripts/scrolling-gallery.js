const SLIDE_ANIMATION_SPEED = 1.5;
const SCROLL_TIME = 5000;
const MILLISECONDS_PER_FRAME = 100;

let client_list = $("#our_clients .client");
let slideIndexClient = -1;

let project_list = $("#our_projects .project");
let slideIndexProject = -1;

let variety_list = $('#our_variety .project');
let slideIndexVariety = -1;

let timerProject = 0;
let timerVariety = 0;

function nextImgProject() {
    changeImgProject(1);
}

function toImgProject(id) {
    changeImgProject(id - slideIndexProject);
}

function loopSlideIndexProject(inc) {
    slideIndexProject += inc;

    if (slideIndexProject > project_list.length - 1) {
        slideIndexProject -= project_list.length;
    } else if (slideIndexProject < 0) {
        slideIndexProject += project_list.length;
    }
}

function changeImgProject(inc) {
    let icon_list = $("#our_projects .scroll_img");

    loopSlideIndexProject(inc);

    for (let i = 0; i < project_list.length; i++) {
        project_list.eq(i).css("opacity", "0");
        icon_list.eq(i).css("filter", "brightness(0.5)");
    }

    project_list.eq(slideIndexProject).css("opacity", "1");
    icon_list.eq(slideIndexProject).css("filter", "brightness(1)");
    $("#our_projects .text>.title").text(project_list.eq(slideIndexProject).attr("project_name"));
    $("#to_gallery").attr("href", "/page.html?project_id=" + project_list.eq(slideIndexProject).attr("project_id"));

    resetTimerProject();

    clearInterval(loop_id_project);
    loop_id_project = setInterval(nextImgProject, SCROLL_TIME);

}

function nextImgClient() {
    changeImgClient(1);
}

function loopSlideIndexClient(inc) {
    slideIndexClient += inc;

    if (slideIndexClient > client_list.length - 1) {
        slideIndexClient = 0;
    } else if (slideIndexClient < 0) {
        slideIndexClient = client_list.length - 1;
    }
}

function changeImgClient(inc) {
    let icon_list = $("#our_clients .scroll_icon");

    loopSlideIndexClient(inc);

    for (let i = 0; i < client_list.length; i++) {
        client_list.eq(i).css("opacity", "0");
        icon_list.eq(i).css("background", "#fff");
        icon_list.eq(i).css("width", "20px");
    }

    client_list.eq(slideIndexClient).css("opacity", "1");
    icon_list.eq(slideIndexClient).css("background", "#000");
    icon_list.eq(slideIndexClient).css("width", "100px");

    clearInterval(loop_id_client);
    loop_id_client = setInterval(nextImgClient, SCROLL_TIME);
}

function nextImgVariety() {
    changeImgVariety(1);
}

function toImgVariety(id) {
    changeImgVariety(id - slideIndexVariety);
}

function loopSlideIndexVariety(inc) {
    slideIndexVariety += inc;

    if (slideIndexVariety > variety_list.length - 1) {
        slideIndexVariety -= variety_list.length;
    } else if (slideIndexVariety < 0) {
        slideIndexVariety += variety_list.length;
    }
}

function changeImgVariety(inc) {
    let icon_list = $("#our_variety .switch");

    loopSlideIndexVariety(inc);

    for (let i = 0; i < variety_list.length; i++) {
        variety_list.eq(i).css("opacity", "0");
        icon_list.eq(i).css("filter", "brightness(0.5)");
    }

    variety_list.eq(slideIndexVariety).css("opacity", "1");
    icon_list.eq(slideIndexVariety).css("filter", "brightness(1)");
    $("#our_variety .text>.title").text(variety_list.eq(slideIndexVariety).attr("project_name"));
    $("#to_gallery").attr("href", "/page.html?project_id=" + variety_list.eq(slideIndexVariety).attr("project_id"));

    resetTimerVariety();

    clearInterval(loop_id_variety);
    loop_id_variety = setInterval(nextImgVariety, SCROLL_TIME);
}

function timerProjectAnimation() {
    setInterval(() => {
        timerProject += MILLISECONDS_PER_FRAME;
        $("#our_projects .timer>.fill").css("width", 100 * timerProject/SCROLL_TIME + "%");

        if (timerProject >= SCROLL_TIME) {
            resetTimerProject();
        }
    }, MILLISECONDS_PER_FRAME);
}

function resetTimerProject() {
    timerProject = 0;
}

function timerVarietyAnimation() {
    setInterval(() => {
        timerVariety += MILLISECONDS_PER_FRAME;
        $("#our_variety .timer>.fill").css("width", 100 * timerVariety/SCROLL_TIME + "%");

        if (timerVariety >= SCROLL_TIME) {
            resetTimerVariety();
        }
    }, MILLISECONDS_PER_FRAME);
}

function resetTimerVariety() {
    timerVariety = 0;
}

let loop_id_client = setInterval(nextImgClient, SCROLL_TIME);
nextImgClient();

let loop_id_project = setInterval(nextImgProject, SCROLL_TIME);
nextImgProject();

let loop_id_variety = setInterval(nextImgVariety, SCROLL_TIME);
nextImgVariety();

timerProjectAnimation();
timerVarietyAnimation();