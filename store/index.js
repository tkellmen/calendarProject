import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const strict = false;

export const state = () => ({
  eventss: []
});

export const mutations = {
  setEvents(state, data) {
    state.eventss = data
  },
  addEvents(state, data) {
    var copy = Object.assign({}, data);
    state.eventss.push(copy);
  },
  editEvents(state, data) {
    // state.eventss.map(t => {
    //   if (t.id == data.id) {
    //     t.title = data.title;
    //     t.end = data.end;
    //     t.description = data.description;
    //     t.backgroundColor = data.backgroundColor;
    //     t.start = data.start;
    //     if (data.resourceId !== '') {
    //       t.resourceId = data.resourceId
    //     }
    //     t.allDay = data.allDay;
    //   }
    // });

    state.eventss.map(t => {
      if (t.id == data.id) {
        Object.keys(t).map(function (key, index) {
          if (key !== "id") {
            t[key] = data[key]
            if (data.resourceId !== '') {
              t.resourceId = data.resourceId
            }
          }
        });
      }
    });


  },
  removeEvent(state, data) {
    if (state.eventss.length == 1) {
      let emptyarry = [];
      state.eventss = emptyarry;
    } else {
      let fff = state.eventss.filter(r => r.id !== data.id);
      state.eventss = fff;
    }
  },

};

export const actions = {
  editEvent(state, data) {
    state.commit("editEvents", data);
  },
  addEvents(state, data) {
    state.commit("addEvents", data);
  },
  async setEvents(state) {

    const asyncEventData = await new Promise(resolve => setTimeout(() => {
      resolve(
        [{
          "id": "ynaedf",
          "title": "Математика",
          "start": "2020-01-16T08:30:00+03:00",
          "end": "[native Date Fri Oct 25 2020 9:45:00 GMT+0300 (за східноєвропейським літнім часом)]",
          "allDay": false,
          "overlap": "",
          "resourceId": "Math",
          "backgroundColor": "#E6A23C",
          "className": "",
          "description": "Взяти підручники",
          "resources": [{
            "id": "Math",
            "title": "Математика"
          }, {
            "id": "fizActive",
            "title": "Фізкультура"
          }, {
            "id": "Algebra",
            "title": "Алгебра"
          }, {
            "id": "Writen",
            "title": "Письмо"
          }, {
            "id": "geomet",
            "title": "Геометрія"
          }],
          "status": "new"
        }, {
          "id": "ynaepzujo",
          "title": "Фізкультура",
          "start": "2019-10-25T09:45:00+03:00",
          "end": "[native Date Fri Oct 25 2019 10:30:00 GMT+0300 (за східноєвропейським літнім часом)]",
          "allDay": false,
          "overlap": "",
          "resourceId": "fizActive",
          "backgroundColor": "#E6A23C",
          "className": "",
          "description": "Взяти форму",
          "resources": [{
            "id": "Math",
            "title": "Математика"
          }, {
            "id": "fizActive",
            "title": "Фізкультура"
          }, {
            "id": "Algebra",
            "title": "Алгебра"
          }, {
            "id": "Writen",
            "title": "Письмо"
          }, {
            "id": "geomet",
            "title": "Геометрія"
          }],
          "status": "new"
        }, {
          "originalData": {
            "id": "le82tambw",
            "title": "",
            "start": "",
            "end": "",
            "allDay": false,
            "overlap": true,
            "resourceId": "",
            "backgroundColor": "#909399",
            "className": ["booked"],
            "description": "",
            "resources": []
          },
          "id": "v9474jy0k",
          "title": "Алгебра",
          "start": "2019-10-28T10:45:00+03:00",
          "end": "[native Date Fri Oct 28 2019 11:30:00 GMT+0300 (за східноєвропейським літнім часом)]",
          "allDay": false,
          "overlap": "",
          "resourceId": "Algebra",
          "backgroundColor": "#E6A23C",
          "className": "",
          "description": "",
          "resources": [{
            "id": "Math",
            "title": "Математика"
          }, {
            "id": "fizActive",
            "title": "Фізкультура"
          }, {
            "id": "Algebra",
            "title": "Алгебра"
          }, {
            "id": "Writen",
            "title": "Письмо"
          }, {
            "id": "geomet",
            "title": "Геометрія"
          }],
          "status": "new"
        }, {
          "originalData": {
            "id": "77zh9usmu",
            "title": "",
            "start": "",
            "end": "",
            "allDay": false,
            "overlap": true,
            "resourceId": "",
            "backgroundColor": "#909399",
            "className": ["booked"],
            "description": "",
            "resources": []
          },
          "id": "7m59f2f6k",
          "title": "випускний",
          "start": "2019-10-30T07:00:00+02:00",
          "end": "",
          "allDay": true,
          "overlap": "",
          "resourceId": "",
          "backgroundColor": "#F56C6C",
          "className": "",
          "description": "",
          "resources": [{
            "id": "Math",
            "title": "Математика"
          }, {
            "id": "fizActive",
            "title": "Фізкультура"
          }, {
            "id": "Algebra",
            "title": "Алгебра"
          }, {
            "id": "Writen",
            "title": "Письмо"
          }, {
            "id": "geomet",
            "title": "Геометрія"
          }],
          "status": "new"
        }, {
          "originalData": {
            "id": "77zh9usmu",
            "title": "",
            "start": "",
            "end": "",
            "allDay": false,
            "overlap": true,
            "resourceId": "",
            "backgroundColor": "#909399",
            "className": ["booked"],
            "description": "",
            "resources": []
          },
          "id": "3le5ns47j",
          "title": "письмо",
          "start": "2019-10-23T07:00:00+03:00",
          "end": "",
          "allDay": false,
          "overlap": "",
          "resourceId": "Writen",
          "backgroundColor": "#67C23A",
          "className": "",
          "description": "",
          "resources": [{
            "id": "Math",
            "title": "Математика"
          }, {
            "id": "fizActive",
            "title": "Фізкультура"
          }, {
            "id": "Algebra",
            "title": "Алгебра"
          }, {
            "id": "Writen",
            "title": "Письмо"
          }, {
            "id": "geomet",
            "title": "Геометрія"
          }],
          "status": "new"
        }, {
          "originalData": {
            "id": "77zh9usmu",
            "title": "",
            "start": "",
            "end": "",
            "allDay": false,
            "overlap": true,
            "resourceId": "",
            "backgroundColor": "#909399",
            "className": ["booked"],
            "description": "",
            "resources": []
          },
          "id": "3i1xn7wc5",
          "title": "Геометрія",
          "start": "2019-10-29T07:00:00+02:00",
          "end": "",
          "allDay": false,
          "overlap": "",
          "resourceId": "geomet",
          "backgroundColor": "#909399",
          "className": "",
          "description": "",
          "resources": [{
            "id": "Math",
            "title": "Математика"
          }, {
            "id": "fizActive",
            "title": "Фізкультура"
          }, {
            "id": "Algebra",
            "title": "Алгебра"
          }, {
            "id": "Writen",
            "title": "Письмо"
          }, {
            "id": "geomet",
            "title": "Геометрія"
          }],
          "status": "new"
        }, {
          "originalData": {
            "id": "77zh9usmu",
            "title": "",
            "start": "",
            "end": "",
            "allDay": false,
            "overlap": true,
            "resourceId": "",
            "backgroundColor": "#909399",
            "className": ["booked"],
            "description": "",
            "resources": []
          },
          "id": "wadawqev0",
          "title": "Письмо",
          "start": "2019-10-25T07:00:00+03:00",
          "end": "",
          "allDay": false,
          "overlap": "",
          "resourceId": "Writen",
          "backgroundColor": "#67C23A",
          "className": "",
          "description": "",
          "resources": [{
            "id": "Math",
            "title": "Математика"
          }, {
            "id": "fizActive",
            "title": "Фізкультура"
          }, {
            "id": "Algebra",
            "title": "Алгебра"
          }, {
            "id": "Writen",
            "title": "Письмо"
          }, {
            "id": "geomet",
            "title": "Геометрія"
          }],
          "status": "new"
        }, {
          "originalData": {
            "id": "77zh9usmu",
            "title": "",
            "start": "",
            "end": "",
            "allDay": false,
            "overlap": true,
            "resourceId": "",
            "backgroundColor": "#909399",
            "className": ["booked"],
            "description": "",
            "resources": []
          },
          "id": "ke6b0mz27",
          "title": "Виступ",
          "start": "2019-10-29T07:00:00+02:00",
          "end": "",
          "allDay": true,
          "overlap": "",
          "resourceId": "",
          "backgroundColor": "#F56C6C",
          "className": "",
          "description": "",
          "resources": [{
            "id": "Math",
            "title": "Математика"
          }, {
            "id": "fizActive",
            "title": "Фізкультура"
          }, {
            "id": "Algebra",
            "title": "Алгебра"
          }, {
            "id": "Writen",
            "title": "Письмо"
          }, {
            "id": "geomet",
            "title": "Геометрія"
          }],
          "status": "new"
        }]
      )

    }, 0))


    state.commit("setEvents", asyncEventData);

  },
  removeEvent(state, data) {
    state.commit("removeEvent", data);

  },





};
export const getters = {
  status: state => state.eventss,

};
