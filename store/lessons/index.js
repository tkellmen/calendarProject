export const state = () => ({
  lessons: []
});


export const mutations = {
  fetchLessons(state, data) {

    state.lessons = data
  },

  addLesson(state, data) {
    state.lessons.push(data)
  },

  editLesson(state, data) {
    state.lessons.map(t => {
      if (t.id == data.id) {
        Object.keys(t).map(function (key, index) {
          if (key !== "id") {
            t[key] = data[key]
          }
        });
      }
    });

  },

  deleteLesson(state, data) {
    let withoutLesson = state.lessons.filter(r => r.id !== data.id);
    state.lessons = withoutLesson;
    console.log(withoutLesson)
  }

}


export const actions = {
  addLesson(state, data) {
    console.log("addLesson", data)
    state.commit("addLesson", data);

  },

  async fetchListLessons(state, data) {
    let asyncLessonsDEMO = [];
    asyncLessonsDEMO = await new Promise(resolve => setTimeout(() => {
      resolve(
        [{
            id: "Math",
            title: "Математика"
          },
          {
            id: "fizActive",
            title: "Фізкультура"
          },
          {
            id: "Algebra",
            title: "Алгебра"
          },
          {
            id: "Writen",
            title: "Письмо"
          },
          {
            id: "geomet",
            title: "Геометрія"
          }
        ]
      )
    }, 200))
    state.commit("fetchLessons", asyncLessonsDEMO);
  },

  editLesson(state, data) {
    console.log("catch  editLesson action", data);
    state.commit("editLesson", data);
  },

  deleteLesson(state, data) {
    state.commit("deleteLesson", data);
  }

}


export const getters = {
  lessons: state => state.lessons,

};
