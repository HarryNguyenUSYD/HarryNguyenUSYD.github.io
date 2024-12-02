import { TextBlock, TYPE_OUTPUT } from "./TextBlockClass.js";
import { processTypeOutput } from "./typeOutputProcess.js";

let textBlocks = [];
let heldKeys = [];

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
    $("#input-box").on("keydown", function(e) {
        if (heldKeys.includes(e.which)) {
            return false;
        } else {
            heldKeys.push(e.which);
            return true;
        }
    })
    $("#input-box").on("keyup blur", function(e) {
        let input = $("#input-box").val();
        processInput(input[0]);

        var index = heldKeys.indexOf(e.which);
        if (index > -1) {
            heldKeys.splice(index, 1);
        }
        $("#input-box").val(input.slice(1, input.length));
    });
    $("#input-box").on("paste", function(e) {
        e.preventDefault();
    });
}

function processInput(input) {
    textBlocks.forEach(function(textBlock) {
        let output = textBlock.type(input);
        switch (output) {
            case TYPE_OUTPUT.REJECT:
                break;
            case TYPE_OUTPUT.ACCEPT:
                textBlock.acceptfids?.forEach(function(acceptfid) {
                    processTypeOutput(acceptfid);
                });
                break;
            case TYPE_OUTPUT.FINISH:
                textBlock.finishfids?.forEach(function(finishfid) {
                    processTypeOutput(finishfid);
                });
                break;
        }
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
        let textBlock = new TextBlock($(this), textBlockEle);

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
    let textBlock = new TextBlock($(this), textBlockEle);

    textBlock.injectUI(textBlockEle);
    textBlockEle.css("display", "block");

    ele.append(textBlockEle);
    textBlocks.push(textBlock);
}

function destroyTextBlock(textBlock) {
    textBlock.sourceEle.animate();
}

init();