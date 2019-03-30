var app = new Vue({
    el: '#app',
    data: {
      passages: [],
    },
    created() {
      this.getPassages();
    },
    methods: {
      async getPassages() {
        try {
          let response = await axios.get("/api/passages");
          this.passages = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
    }
  });