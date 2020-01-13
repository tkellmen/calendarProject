export const state = () => ({
  students: []
});


export const mutations = {
  fetchStudents(state, data) {
    console.log("mutation fetchStudents", data)
    state.students = data
  },

  addStudent(state, data) {
    state.students.push(data)
  },

  editStudent(state, data) {
    state.students.map(t => {
      if (t.id == data.id) {
        Object.keys(t).map(function (key, index) {
          if (key !== "id") {
            t[key] = data[key]
          }
        })
        t.title = data.secondName + " " + data.name;
      }
    });
  },

  deleteStudent(state, data) {
    let withoutStudent = state.students.filter(r => r.id !== data.id);
    state.students = withoutStudent;
    console.log(withoutStudent)
  }

}


export const actions = {
  addStudent(state, data) {
    state.commit("addStudent", data);

  },

  async fetchListStudents(state, data) {
    let asyncStudentsDEMO = [];
    asyncStudentsDEMO = await new Promise(resolve => setTimeout(() => {
      resolve(
        [{
          "id": "v9jum4e4a",
          "secondName": "Бабин",
          "name": "Тарас",
          "fatherName": "Володимирович",
          "age": 27,
          "description": "",
          "title": "Бабин Тарас"
        }, {
          "id": "wob164szq",
          "secondName": "Жукова",
          "name": "Ірина",
          "fatherName": "Сергіївга",
          "age": 28,
          "description": "",
          "title": "Жукова Ірина"
        }, {
          "id": "3f63h5cq0",
          "secondName": "Струцький",
          "name": "Іван",
          "fatherName": "Вікторович",
          "age": 40,
          "description": "",
          "title": "Струцький Іван"
        }, {
          "id": "u9zkhwa89",
          "secondName": "Токарчук",
          "name": "Ярослав",
          "fatherName": "Вікторович",
          "age": 27,
          "description": "",
          "title": "Токарчук Ярослав"
        }]
      )
    }, 0))
    state.commit("fetchStudents", asyncStudentsDEMO);
  },

  editStudent(state, data) {
    console.log("catch  editStudent action");
    state.commit("editStudent", data);
  },

  deleteStudent(state, data) {
    state.commit("deleteStudent", data);
  }

}


export const getters = {
  students: state => state.students,

};
