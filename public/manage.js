var app = new Vue({
    el: '#management',
    data: {
        title: "",
        passage: "",
        author: "",
        work: "",
        speaker: "",
        contributer: "anonymous",
        addPassage: null,
        passages: [],
        findTitle: "",
        findPassage: null,
        addView: false,
        delView: false,
        editView: false,
        modified: false,
    },
    created() {
        this.getPassages();
    },
    computed: {
        suggestions() {
            if (this.findTitle === "")
                return [];
            return this.passages.filter(passage => passage.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
        }
    },
    methods: {
        toggleAdd() {
            this.addView = true;
            this.delView = false;
            this.editView = false;
            this.modified = false;
        },
        toggleDelete() {
            this.addView = false;
            this.delView = true;
            this.editView = false;
            this.modified = false;
        },
        toggleEdit() {
            this.addView = false;
            this.delView = false;
            this.editView = true;
            this.modified = false;
        },
        async upload() {
            try {
                let res = await axios.post('/api/passages/add', {
                    title: this.title,
                    passage: this.passage,
                    author: this.author,
                    work: this.work,
                    speaker: this.speaker,
                    contributer: this.contributer,
                });
                this.addPassage = res.data;
                this.modified = true;
            } catch (error) {
                console.log(error);
            }
        },
        async getPassages() {
            try {
                let response = await axios.get("/api/passages");
                this.passages = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        selectPassage(passage) {
            this.findTitle = "";
            this.findPassage = passage;
        },
        async deletePassage(passage) {
            try {
                let response = axios.delete("/api/passages/" + passage._id);
                this.findPassage = null;
                this.getPassages();
                this.modified = true;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async editPassage(passage) {
            try {
                let response = await axios.put("/api/passages/" + passage._id, {
                    title: this.findPassage.title,
                    passage: this.findPassage.passage,
                    author: this.findPassage.author,
                    work: this.findPassage.work,
                    speaker: this.findPassage.speaker,
                });
                this.findPassage = null;
                this.getPassages();
                this.modified = true;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
    }
});