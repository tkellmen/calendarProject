<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="students[0].name" label="Імя" width="180"></el-table-column>
    <el-table-column
      v-for="(data, index) in tableData"
      :key="index"
      prop="date"
      :label="data.date"
      width="180"
    ></el-table-column>
    <el-table-column prop="lesson[0].title" label="Предмет" width="180"></el-table-column>

    <el-table-column prop="resourceId" label="Address"></el-table-column>
  </el-table>
</template>

<script>
import moment from "moment";
import store from "vuex";
export default {
  components: {
    moment
  },
  data() {
    return {
      tableData: [],
      lessons: [],
      students: []
    };
  },
  async created() {
    // debugger;

    if (this.$store.getters["lessons/lessons"].length == 0) {
      await this.$store.dispatch("lessons/fetchListLessons");
    }
    if (this.$store.getters["students/students"].length == 0) {
      await this.$store.dispatch("students/fetchListStudents");
    }

    if (this.$store.getters.status.length == 0) {
      await this.$store.dispatch("setEvents");
    }

    this.students = await this.$store.getters["students/students"];
    this.lessons = await this.$store.getters["lessons/lessons"];

    let dsf = [];
    this.$store.getters.status
      .filter(event => event.resourceId)

      .map(x => {
        let date = moment(x.start).format("YYYY-MM-DD");
        if (dsf.map(x => x.date == date)) {
          console.log(date);
        }
        const chaingeData = {};
        chaingeData["id"] = Math.random()
          .toString(36)
          .substr(2, 9);
        chaingeData[date] = 12;
        chaingeData["date"] = date;
        chaingeData["lesson"] = x.resources.filter(
          resurs => resurs.id == x.resourceId
        );
        dsf.push(chaingeData);
      });

    this.tableData = [
      {
        students: this.$store.getters["students/students"]
      }
    ];

    // console.log("Getter", moment(this.tableData[0].start).format("YYYY-MM-DD"));
  }
};
</script>
