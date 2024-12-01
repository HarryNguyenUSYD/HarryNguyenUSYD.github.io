export class TextBlock {
    constructor(value, ele) {
        this.value = value;
        this.ele = ele;
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
     * If the typed char is the cursor, move the cursor right by one. If the string finishes, return true. Else, return false.
     * @param {String} char a 1-length string that denotes a character
     */
    type(char) {
        if (this.getCursorChar().localeCompare(char) == 0) {
            ++this.cursor;
            this.injectUI();

            if (this.cursor == this.value.length - 1) {
                return true;
            }
        }

        return false;
    }

    injectUI() {
        let strings = this.getSubstrings();

        this.ele.find(".typed").text(strings[0]);
        this.ele.find(".cursor").text(strings[1]);
        this.ele.find(".next").text(strings[2]);
    }
}