import { read_csv } from "./project_loader.js";

const URL_PARAMS = new URLSearchParams(window.location.search);
const MAX_MORE_PROJECTS_LENGTH = 4;

let project = null;
let similar_projects = new Array();
let more_projects = new Array();
let folder = null;
let column_counter = [0, 0, 0];

function main() {
    read_csv().then((list) => {
        list.forEach((item) => {
            if (item.id == URL_PARAMS.get('project_id')) {
                project = item;
            }
        })

        if (project == null) {
            alert("PROJECT NOT FOUND ERROR");
        }

        list.forEach((item) => {
            if (item.type == project.type && item != project) {
                similar_projects.push(item);
            }
        })

        load_more_projects();

        folder = project.img_path;

        set_project_info();

        $.ajax({
            url : folder,
            success: function (data) {
                $(data).find("a").attr("href", function (i, val) {
                    if( val.match(/\.(jpe?g|png|gif)$/) ) {
                        get_lowest_item_column().append(`
                            <div class="image_item">
                                <div class="shadow"></div>
                                <img class="image" src='` + val + `'>
                            </div>
                        `);
                    }
                });
            },
            complete: function (data) {
                $("#media_popup").on("click", function() {
                    load_image($(this));
                });

                $(".image_item").each(function() {
                    $(this).on("click", function() {
                        load_image($(this));
                    })
                });
            }
        });
    });
}

function set_project_info() {
    $(".project_title .name").text(project.en_name);
    $(".info .type .content").text(project.type);
    $(".info .site .content").text(project.site);
    $(".info .start_date .content").text(project.start_date);
    $(".info .end_date .content").text(project.end_date);
    $(".info .client .content").text(project.client);
    $(".info .scale .content").text(project.scale);
    $(".info .service .content").text(project.service);
}

function get_lowest_item_column() {
    let index = column_counter.indexOf(Math.min(column_counter[0], column_counter[1], column_counter[2]));

    ++column_counter[index];

    switch (index) {
        case 0:
            return $("#col_1");
        case 1:
            return $("#col_2");
        case 2:
            return $("#col_3");
    }
}

function load_image(item) {
    image_showing = !image_showing;

    if (image_showing) { 
        $("#media_popup").find(".image").attr("src", item.find(".image").attr("src"));
        $("#media_popup").css("display", "block");
    } else {
        $("#media_popup").css("display", "none");
    }
}

function load_more_projects() {
    let used_number = new Array();
    for (let i = 0; i < Math.min(MAX_MORE_PROJECTS_LENGTH, similar_projects.length); i++) {
        let chosen = Math.floor(Math.random() * similar_projects.length);
        while (used_number.includes(chosen)) {
            chosen = Math.floor(Math.random() * similar_projects.length);
        }

        used_number.push(chosen);
        more_projects.push(similar_projects[chosen]);
    }

    $("#base").css("display", "inline-block");

    for (let i = 0; i < more_projects.length; i++) {
        let project = more_projects[i];
        let $clone = $("#base").clone().appendTo(".project_ul");
        $clone.find(".name").text(project.en_name);
        $clone.find(".project_img").attr("src", project.cover_img_path);
        $clone.attr("project_id", project.id);
        $clone.on("click", function() {
            load_gallery($clone);
        })
    }

    $("#base").css("display", "none");
}

function load_gallery(item) {
    window.location.href = "./page.html?project_id=" + item.attr("project_id");
}

main();