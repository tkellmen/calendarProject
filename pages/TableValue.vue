<template>
  <section>
    <h1>Оцінки учнів</h1>
    <el-row>
      <el-col class="calendarOnMain" :xs="23" :sm="23" :md="19" :lg="19" :offset="1">
        <client-only>
          <full-calendar :config="config" page="ratings" ref="calendar"></full-calendar>
        </client-only>
      </el-col>
    </el-row>
  </section>
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
        editable: true,
        selectable: true,
        defaultView: "resourceTimeline",
        header: {
          left: "today prev,next",
          center: "title",
          right: " resourceTimelineDay,resourceTimelineWeek"
        },
        mylessons: []
      }
    };
  },
  methods: {},
  computed: {
    ...mapState(["eventss"])
  },

  async created() {
    if (this.$store.getters.status.length == 0) {
      await this.$store.dispatch("setEvents");
    }
    if (this.$store.getters["students/students"].length == 0) {
      await this.$store.dispatch("students/fetchListStudents");
    }

    this.config.mylessons = this.$store.getters["students/students"];

    //this.form.resources = mylessons;

    //this.events = this.$store.getters.status;
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
</style>
