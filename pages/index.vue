<template>
  <div class="container">
    <h1>Календар</h1>

    <el-row>
      <el-col class="calendarOnMain" :xs="23" :sm="23" :md="19" :lg="19" :offset="1">
        <client-only>
          <full-calendar :config="config" page="gest" ref="calendar"></full-calendar>
        </client-only>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
import { mapState } from "vuex";
import eventForm from "./../components/calendar/eventForm";
export default {
  components: {
    eventForm
  },
  data() {
    return {
      events: "gest",
      config: {
        eventTextColor: "red",
        editable: false,
        header: {
          left: "today prev,next",
          center: "title",
          right:
            "dayGridMonth,timeGridWeek,timeGridDay, resourceTimelineDay,resourceTimelineWeek"
        },
        selectable: false
      }
    };
  },
  methods: {},
  computed: {
    ...mapState(["eventss"])
  },

  created() {}
};
</script>
<style>
.fc-unthemed .fc-content,
.fc-unthemed .fc-divider,
.fc-unthemed .fc-list-heading td,
.fc-unthemed .fc-list-view,
.fc-unthemed .fc-popover,
.fc-unthemed .fc-row,
.fc-unthemed tbody,
.fc-unthemed td,
.fc-unthemed th,
.fc-unthemed thead {
  border-color: #eff1f3;
}
.container {
  background-color: #f8f9fe;
}
.eventFormOnMain {
  margin-bottom: 20px;
}
.calendarOnMain {
  margin-bottom: 20px;
}
</style>
