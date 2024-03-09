const FILE_NAME = "/project-list.csv";

function read_csv() {
    let full_projects_list = new Array();

    return fetch(FILE_NAME).then((res) => {
        return res.text();
    }).then((text) => {
        text = text.trim();
        for (let i = 1; i < text.split("\n").length; i++) {
            full_projects_list.push(new Project(text.split("\n")[i]));
        }

        return full_projects_list;
    });
}

class Project {
    constructor (row) {
        let attributes = row.split(",");

        this.raw = row;
        this.id = attributes[0];
        this.vn_name = attributes[1];
        this.en_name = attributes[2];
        this.start_date = attributes[3];
        this.end_date = attributes[4];
        this.client = attributes[5];
        this.img_path = attributes[6];
        this.cover_img_path = attributes[7];
        this.service = attributes[8];
        this.site = attributes[9];
        this.type = attributes[10];
        this.size = parseInt(attributes[11]);
    }

    has_keyword(keyword) {
        if (keyword == null) {
            return true;
        } else {
            return this.raw.toLowerCase().includes(keyword.trim().toLowerCase());
        }
    }

    has_keywords(keywords_array) {
        for (let i = 0; i < keywords_array.length; i++) {
            if (!this.has_keyword(keywords_array[i])) {
                return false;
            }
        }

        return true;
    }

    has_type(types_array) {
        for (let i = 0; i < types_array.length; i++) {
            if (this.type.toLowerCase() == types_array[i].toLowerCase()) {
                return true;
            }
        }

        return false;
    }
}

export { read_csv };