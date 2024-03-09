import { read_csv } from "./project_loader.js";

const COLUMN_COUNT_PER_PAGE = 3;
const ROW_COUNT_PER_PAGE = 4;
const PROJECT_COUNT_PER_PAGE = COLUMN_COUNT_PER_PAGE * ROW_COUNT_PER_PAGE;
const PROJECT_TYPES = ["house", "school", "office", "showroom", "others"];
const URL_PARAMS = new URLSearchParams(window.location.search);

let full_projects_list = new Array();
let searched_projects_list = new Array();
let current_page_index = 0;
let max_page_index = 0;
let advanced_mode = false;

function main() {
    read_csv().then((list) => {
        full_projects_list = list;

        restore_fields();
        if (!advanced_mode) {
            searched_projects_list = get_projects_by_keywords();
        } else {
            searched_projects_list = get_projects_by_advanced();
        }

        max_page_index =  Math.ceil(searched_projects_list.length / PROJECT_COUNT_PER_PAGE);
        create_project_frames();
        load_search_bar();
    });
}

function advanced_trigger() {
    advanced_mode = !advanced_mode;

    load_search_bar();
}

function load_search_bar() {
    if (advanced_mode) {
        $(".search_form").css("display", "none");
        $(".advanced_search_form").css("display", "block");
        $("#search_bar").css("height", "400px");
        $(".on").css('display', 'flex');
        $('.off').css('display', 'none');
    } else {
        $(".search_form").css("display", "block");
        $(".advanced_search_form").css("display", "none");
        $("#search_bar").css("height", "300px");
        $(".on").css('display', 'none');
        $('.off').css('display', 'flex');
    }
}

function restore_fields() {
    if (URL_PARAMS.get('advanced_on') == "on") {
        advanced_mode = true;
    }

    if (advanced_mode) {
        $("#name").val(URL_PARAMS.get('name'));
        $("#client").val(URL_PARAMS.get('client'));
        $("#from_date").val(URL_PARAMS.get('from_date'));
        $("#to_date").val(URL_PARAMS.get('to_date'));

        PROJECT_TYPES.forEach(type => {
            if (URL_PARAMS.get(type) == 'on') {
                $("#" + type).prop("checked", true);
            } else {
                $("#" + type).prop("checked", false);
            }
        });
    
        $("#min_size").val(URL_PARAMS.get('min_size'));
        $("#max_size").val(URL_PARAMS.get('max_size'));
    } else {
        $("#keywords").val(URL_PARAMS.get('keywords'));
    }
}

function get_keywords() {
    return URL_PARAMS.get('keywords');
}

function get_advanced_keywords() {
    let keywords_array = new Array();

    keywords_array.push(URL_PARAMS.get('name'));
    keywords_array.push(URL_PARAMS.get('client'));

    return keywords_array;
}

function get_advanced_dates() {
    let dates_array = new Array();

    dates_array.push(URL_PARAMS.get('from_date'));
    dates_array.push(URL_PARAMS.get('to_date'));

    return dates_array;
}

function get_advanced_types() {
    let types_array = new Array();

    PROJECT_TYPES.forEach(element => {
        if (URL_PARAMS.get(element) == "on") {
            types_array.push(element);
        }
    });

    return types_array;
}

function get_advanced_sizes() {
    let sizes_array = new Array();

    sizes_array.push((URL_PARAMS.get('min_size') == '') ? 0 : URL_PARAMS.get('min_size'));
    sizes_array.push((URL_PARAMS.get('max_size') == '') ? 9999999 : URL_PARAMS.get('max_size'));

    return sizes_array;
}

function get_projects_by_keywords() {
    let keywords = get_keywords();

    if (keywords == null) {
        return full_projects_list;
    }

    let keywords_list = keywords.split("+");
    let output = new Array();
    for (let i = 0; i < keywords_list.length; i++) {
        let keyword = keywords_list[i].trim();

        for (let j = 0; j < full_projects_list.length; j++) {
            let project = full_projects_list[j];
            if (project.has_keyword(keyword) && !output.includes(project)) {
                output.push(project);
            }
        }
    }

    return output;
}

function get_projects_by_advanced() {
    let output = new Array();
    let keywords_array = get_advanced_keywords();
    let dates_array = get_advanced_dates();
    let types_array = get_advanced_types();
    let sizes_array = get_advanced_sizes();

    if (keywords_array != null) {
        for (let i = 0; i < full_projects_list.length; i++) {
            if (full_projects_list[i].has_keywords(keywords_array)) {
                output.push(full_projects_list[i]);
            }
        }

    } else {
        full_projects_list.forEach(project => {
            output.push(project);
        });
    }

    if (dates_array[0] != "" || dates_array[1] != "") {
        let start_date = date_format_change(dates_array[0], "yyyy/mm/dd", '-');
        let end_date = date_format_change(dates_array[1], "yyyy/mm/dd", '-');

        for (let i = 0; i < output.length; i++) {
            project_date = date_format_change(output[i].end_date, 'dd/mm/yyyy', '/');
            if ((dates_array[0] != "" && project_date < start_date) || (dates_array[1] != "" && project_date > end_date)) {
                output.splice(i, 1);
                --i;
            }
        }
    }

    if (sizes_array != null) {
        let min_size = parseInt(sizes_array[0]);
        let max_size = parseInt(sizes_array[1]);

        for (let i = 0; i < output.length; i++) {
            if (output[i].size < min_size || output[i].size > max_size) {
                output.splice(i, 1);
                --i;
            }
        }
    }

    if (types_array != null) {
        for (let i = 0; i < output.length; i++) {
            if (!output[i].has_type(types_array)) {
                output.splice(i, 1);
                --i;
            }
        }
    }

    return output;
}

function date_format_change(date, old_format, sep) {
    let dateParts = date.split(sep);

    if (old_format == 'dd/mm/yyyy') {
        return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    } else if (old_format == 'yyyy/mm/dd') {
        return new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]);
    } else return null;
}

function create_project_frames() {
    if (searched_projects_list.length == 0) {
        $("#no_result").css("display", "block");
        $("#show_more_results").css("display", "none");
    }

    $("#base").css("display", "inline-block");

    for (let i = current_page_index * PROJECT_COUNT_PER_PAGE; i < Math.min((current_page_index + 1) * PROJECT_COUNT_PER_PAGE, searched_projects_list.length); i++) {
        let project = searched_projects_list[i];
        let $clone = $("#base").clone().appendTo("#project_ul");
        $clone.find(".name").text(project.en_name);
        $clone.find(".project_img").attr("src", project.cover_img_path);
        $clone.find(".type .content").text(project.type);
        $clone.find(".finished .content").text(project.end_date);
        $clone.find(".client .content").text(project.client);
        $clone.find(".size .content").text(project.size);
        $clone.attr("project_id", project.id);
        $clone.on("click", function() {
            load_gallery($clone);
        })
    }

    $("#base").css("display", "none");

    if (current_page_index == max_page_index - 1) {
        $("#show_more_results").css("display", "none");
    }
}

function load_more() {
    ++current_page_index;
    create_project_frames();
}

function load_all() {
    while (current_page_index < max_page_index - 1) {
        load_more();
    }
}

function load_gallery(item) {
    window.location.href = "/page/page.html?project_id=" + item.attr("project_id");
}

main();
export { main, advanced_trigger, load_more, load_all }