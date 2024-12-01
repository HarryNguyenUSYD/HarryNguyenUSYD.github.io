import { TextBlock } from "./TextBlockClass.js";

let textBlocks = [];

function init() {
    createInitTextBlocks();
    initInputBox();
}

/**
 * Initiates the input box
 */
function initInputBox() {
    $("#input-box").focus();
    $("#input-box").on("focusout", function() {
        $("#input-box").focus();
    });
    $("#input-box").on("keyup", function() {
        processInput($("#input-box").val());

        $("#input-box").val("");
    });
}

function processInput(input) {
    textBlocks.forEach(function(textBlock) {
        textBlock.type(input);
    });
}

/**
 * Create text blocks from elements with class "text-block" when the screen loads
 */
function createInitTextBlocks() {
    $(".text-block").each(function() {
        if ($(this).attr("id") == "text-block-content-base") {
            return;
        }

        let textBlockEle = $("#text-block-content-base").clone(false);
        let textBlock = new TextBlock($(this).attr("value"), textBlockEle);

        textBlock.injectUI(textBlockEle);
        textBlockEle.css("display", "block");

        $(this).append(textBlockEle);
        textBlocks.push(textBlock);
    });
}

/**
 * Create text block from an element
 * 
 * @param {Element} ele the element to be created from
 */
function createTextBlock(ele) {
    let textBlockEle = $("#text-block-content-base").clone(false);
    let textBlock = new TextBlock($(this).attr("value"), textBlockEle);

    textBlock.injectUI(textBlockEle);
    textBlockEle.css("display", "block");

    ele.append(textBlockEle);
    textBlocks.push(textBlock);
}

init();