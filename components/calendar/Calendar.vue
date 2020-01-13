<template>
  <div class="card">
    <FullCalendar
      :resources="config.mylessons"
      schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
      @eventDrop="eventDrop"
      :defaultView="config.defaultView"
      :plugins="calendarPlugins"
      color="red"
      height="auto"
      :config="config"
      :editable="config.editable"
      :selectable="config.selectable"
      :locale="locale"
      :events="events"
      :ignoreTimezone="false"
      :nowIndicator="true"
      :header="config.header"
      :eventLimit="false"
      :firstDay="1"
      :weekends="true"
      fixedWeekCount="true"
      :weekNumbers="false"
      :slotDuration="slotDuration"
      :snapDuration="snapDuration"
      :allDaySlot="true"
      allDayText="Весь день"
      :slotMinutes="15"
      ref="calendar"
      :snapMinutes="15"
      :slotLabelFormat="slotLabelFormat"
      :eventRender="eventRender"
      :defaultTimedEventDuration="defaultTimedEventDuration"
      :axisFormat="axisFormat"
      :timeFormat="timeFormat"
      :maxTime="maxTimes"
      :minTime="minTimes"
      @eventClick="eventClick"
      @dateClick="dateClick"
      @event-rendered="eventRender"
    />
    <el-dialog
      :before-close="cancelForm"
      title="Створити подію"
      :visible.sync="visible"
      width="90%"
    >
      <eventForm
        v-if="visible"
        v-on:cancel="cancelForm"
        v-on:eventForm="eventForm"
        v-on:removeEvent="removeEvent"
        v-on:eventEdit="eventClickEdit"
        :eventFormProp="this.form"
      ></eventForm>
    </el-dialog>
  </div>
</template>

<script>
import $ from "jquery";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from "@fullcalendar/moment/";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/uk";
import moment from "moment";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import Tooltip from "tooltip.js/dist/esm/tooltip.js";
import eventForm from "./eventForm";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { mapState } from "vuex";
var d = new Date();
var n = d.valueOf();

class EventKlass {
  constructor(data) {
    this.originalData = data;
    for (let [key, value] of Object.entries(data)) {
      this[key] = value;
    }
  }

  refrechForm() {
    for (let field in this.originalData) {
      if (field == "backgroundColor") {
        this[field] = "#909399";
      } else if (field == "id") {
        this[field] = Math.random()
          .toString(36)
          .substr(2, 9);
      } else if (field === "allDay") {
        this[field] = false;
      } else if (field === "resources") {
      } else {
        this[field] = "";
      }
    }
  }
}

export default {
  components: {
    FullCalendar,
    eventForm
  },
  computed: {},
  props: {
    page: String,
    config: Object
  },

  data() {
    const vm = this;
    return {
      events: [],
      visible: false,
      visibleEditEvent: false,
      radio: 1,
      form: new EventKlass({
        id: Math.random()
          .toString(36)
          .substr(2, 9),
        title: "",
        start: "",
        end: "",
        allDay: false,
        overlap: true,
        resourceId: "",
        backgroundColor: "#909399",
        className: ["booked"],
        description: "",
        resources: []
      }),

      bufferEvent: "",
      calendarPlugins: [
        dayGridPlugin,
        momentPlugin,
        timeGridPlugin,
        interactionPlugin,
        resourceTimelinePlugin
      ],
      themeSystem: "bootstrap",
      locale: jaLocale,

      slotDuration: "00:30:00",
      snapDuration: "00:15:00",
      slotLabelFormat: "H:mm",
      defaultTimedEventDuration: "00:45:00",
      axisFormat: "H:mm",
      timeFormat: "H:mm",
      minTimes: "06:00",
      maxTimes: "20:00"
    };
  },

  methods: {
    cancelForm() {
      this.visible = false;
      this.form.refrechForm();
    },
    eventForm(form) {
      this.form = form;
      this.$store.dispatch("addEvents", this.form);
      this.visible = false;
      this.form.refrechForm();
    },
    dayRender(date, cell) {
      cell.css("background-color", "red");
    },

    eventDrop(event) {
      if (this.page == "admin") {
        var self = this;
        this.form.id = event.event.id;
        this.form.title = event.event.title;
        this.form.allDay = event.event.allDay;
        this.form.description = event.event.extendedProps.description;
        this.form.start = moment(event.event.start).format();
        this.form.end = event.event.end;
        this.form.resourceId = event.event._def.resourceIds[0];
        this.form.backgroundColor = event.event.backgroundColor;
        setTimeout(() => {
          this.$store.dispatch("editEvent", this.form);
          this.form.refrechForm();
        }, 200);
      }
    },
    eventRender(event) {},
    eventClick(info) {
      if (this.page == "admin") {
        this.form.id = info.event.id;
        this.form.title = info.event.title;
        this.form.allDay = info.event.allDay;
        this.form.end = info.event.end;
        this.form.description = info.event.extendedProps.description;
        this.form.start = info.event.start;
        let myResourceId = Object.assign({}, info.event._def.resourceIds);
        this.form.resourceId = myResourceId[0];
        this.form.backgroundColor = info.event.backgroundColor;
        this.form.status = "old";
        this.visible = true;
      }
    },
    eventSetPropClick(info) {
      return info;
    },
    eventClickEdit(info) {
      if (this.page == "admin") {
        this.$store.dispatch("editEvent", this.form);
        this.visible = false;
        this.form.refrechForm();
      }
    },
    removeEvent(info) {
      if (this.page == "admin") {
        this.$store.dispatch("removeEvent", this.form);
        this.visible = false;
        this.form.refrechForm();
        this.events = this.$store.getters.status;
      }
    },

    dateClick(info) {
      if (this.page == "admin") {
        setTimeout(() => {
          this.form.refrechForm();
          this.form.id = Math.random()
            .toString(36)
            .substr(2, 9);
          this.form.start = info.dateStr;
          this.form.status = "new";
          if (info.resource !== undefined) {
            this.form.resourceId = info.resource.id;
          }
          this.visible = true;
        }, 10);
      }
    },

    dateClickSet() {
      this.$store.dispatch("addEvents", this.form);
      this.visible = false;
    }
  },
  async created() {
    if (this.$store.getters.status.length == 0) {
      await this.$store.dispatch("setEvents");
    }
    if (this.$store.getters["lessons/lessons"].length == 0) {
      await this.$store.dispatch("lessons/fetchListLessons");
    }

    //const mylessons = this.$store.getters["lessons/lessons"];

    //this.form.resources = mylessons;

    this.events = this.$store.getters.status;
  }
};
</script>
<style lang="scss" >
.fc-button-primary {
  color: #909399;
  background: #f4f4f5;
  border-color: #d3d4d6;
}
.fc-today {
  .fc-day-number {
    color: red;
  }
}
.fc-week {
}
.card {
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
  background-color: #fff;
  border-radius: calc(0.375rem - 1px) calc(0.375rem - 1px) 0 0;
}
.color {
  box-shadow: none;
  border-radius: 50% !important;
  width: 30px;
  height: 30px;
  padding: 0;
  margin-right: 0.5rem;
  margin-bottom: 0.25rem;
  position: relative;
  input {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }
}
.color.is-checked {
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.6);
}

.el-radio__input,
.el-radio__label {
  display: none;
}
.el-radio-group {
  font-size: 0;
  padding: 15px 0;
}

.popper,
.tooltip {
  position: absolute;
  z-index: 9999;
  background: #ffc107;
  color: black;
  width: 150px;
  border-radius: 3px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  padding: 10px;
  text-align: center;
}
.fc-view-container {
  overflow-x: scroll;
}
.fc-view.fc-agendaDay-view.fc-agenda-view {
  width: 500%;
}
.style5 .tooltip {
  background: #1e252b;
  color: #ffffff;
  max-width: 200px;
  width: auto;
  font-size: 0.8rem;
  padding: 0.5em 1em;
}
.popper .popper__arrow,
.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
}

.tooltip .tooltip-arrow,
.popper .popper__arrow {
  border-color: #ffc107;
}
.style5 .tooltip .tooltip-arrow {
  border-color: #1e252b;
}
.popper[x-placement^="top"],
.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}
.popper[x-placement^="top"] .popper__arrow,
.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.popper[x-placement^="bottom"],
.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}
.tooltip[x-placement^="bottom"] .tooltip-arrow,
.popper[x-placement^="bottom"] .popper__arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.tooltip[x-placement^="right"],
.popper[x-placement^="right"] {
  margin-left: 5px;
}
.popper[x-placement^="right"] .popper__arrow,
.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent;
  border-top-color: transparent;
  border-bottom-color: transparent;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
.popper[x-placement^="left"],
.tooltip[x-placement^="left"] {
  margin-right: 5px;
}
.popper[x-placement^="left"] .popper__arrow,
.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
.inputfield {
  margin-bottom: 15px;
}
.fc-event {
  border: 0;
}
.fc th {
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #8898aa;
  text-transform: uppercase;
}
.fc-day-header {
  text-align: left;
}
@media (min-width: 576px) {
  .fc-day-number {
    font-size: 0.875rem;
    font-weight: 600;
    color: #67779d;
    float: left !important;
    padding: 10px !important;
    width: 100%;
    box-sizing: border-box;
  }
}
.fc-day-number {
}
.fc-toolbar.fc-header-toolbar {
  padding: 10px;
}
.fc-sat {
  background-color: #0000ff0d;
}
.fc-sun {
  background-color: #ff000008;
}
.fc-day-grid-event {
  margin: 1px 9px;
}
.fc-event .fc-title {
  padding: 0.4rem 0.5rem;
  display: inline-flex;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
}
@import "@fullcalendar/core/main.css";
@import "@fullcalendar/timeline/main.css";
@import "@fullcalendar/resource-timeline/main.css";
</style>
