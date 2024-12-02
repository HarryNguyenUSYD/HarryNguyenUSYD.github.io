export const TYPE_OUTPUT = Object.freeze({
    REJECT: 0,
    ACCEPT: 1,
    FINISH: 2
});

export class TextBlock {
    constructor(sourceEle, ele) {
        this.sourceEle = sourceEle;
        this.ele = ele;
        this.value = sourceEle.attr("value");
        this.acceptfids = sourceEle.attr("acceptfid")?.split(' ');
        this.finishfids = sourceEle.attr("finishfid")?.split(' ');
        this.cursor = 0;
    }

    getSubstrings() {
        return [this.value.slice(0, this.cursor),
            this.cursor >= this.value.length ? "" : this.value[this.cursor],
            this.cursor >= this.value.length ? "" : this.value.slice(this.cursor + 1, this.value.length)];
    }

    getCursorChar() {
        return (this.cursor < this.value.length) ? this.value[this.cursor] : "";
    }

    /**
     * If the typed char is the cursor, move the cursor right by one. \
     * Returns TYPE_OUTPUT.REJECT if the char is not the cursor. \
     * Returns TYPE_OUTPUT.ACCEPT if the char is the cursor. \
     * Returns TYPE_OUTPUT.FINISH if the string finishes.
     * 
     * @param {String} char a 1-length string that denotes a character
     */
    type(char) {
        if (this.getCursorChar().localeCompare(char) == 0) {
            ++this.cursor;
            this.injectUI();

            if (this.cursor == this.value.length) {
                return TYPE_OUTPUT.FINISH;
            } else {
                return TYPE_OUTPUT.ACCEPT;
            }
        }

        return TYPE_OUTPUT.REJECT;
    }

    injectUI() {
        let strings = this.getSubstrings();

        this.ele.find(".typed").text(strings[0]);
        this.ele.find(".cursor").text(strings[1]);
        this.ele.find(".next").text(strings[2]);
    }

    destroy() {
        this.ele.find(".border").css({"transform": "scale(2)"});
    }
}