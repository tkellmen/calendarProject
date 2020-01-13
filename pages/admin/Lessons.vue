<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <h1>Предмети</h1>
      </div>

      <el-button
        icon="el-icon-s-management"
        class="addLessons"
        type="primary"
        @click="showAddLessonComponent"
        plain
      >{{showAddLessonCom}}</el-button>
      <transition name="fade">
        <div v-if="showAddLesson" class="addStudents">
          <addLesson :propEditLesson="propEditLesson" v-on:cancel="cancelForm" />
        </div>
      </transition>

      <section>
        <el-table :data="lessonsList.lessons" max-height="850">
          <el-table-column prop="title" label="Назва Предмету" width="150"></el-table-column>

          <el-table-column fixed="right">
            <template slot-scope="scope" class="buttons-position">
              <div class="buttons-position">
                <el-button
                  @click.native.prevent="editLesson(scope.$index, lessonsList.lessons)"
                  size="mini"
                  icon="el-icon-edit"
                  type="primary"
                  plain
                >Редагувати</el-button>
                <el-button
                  @click.native.prevent="deleteLesson(scope.$index, lessonsList.lessons)"
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                >Видалити</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-card>
  </div>
</template>

<script>
import addLesson from "@/components/admin/addLessonForm";
import { mapGetters } from "vuex";
export default {
  layout: "admin",
  components: { addLesson },
  data() {
    return {
      showAddLesson: false,
      propEditLesson: {},
      lessonsList: {
        lessons: []
      }
    };
  },
  async mounted() {
    if (this.$store.getters["lessons/lessons"].length == 0) {
      await this.$store.dispatch("lessons/fetchListLessons");
    }

    this.lessonsList.lessons = await this.$store.getters["lessons/lessons"];
  },
  methods: {
    showAddLessonComponent() {
      this.showAddLesson = !this.showAddLesson;
    },
    editLesson(index, rows) {
      // console.log(rows[index]);
      this.showAddLesson = true;
      this.propEditLesson = rows[index];
    },
    deleteLesson(index, rows) {
      this.$confirm("Ви точно бажаєте видалити предмет", "Увага", {
        confirmButtonText: "Так",
        cancelButtonText: "Відмінити",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "предмет успішно видалений"
          });

          this.$store.dispatch("lessons/deleteLesson", rows[index]);
          this.lessonsList.lessons = this.$store.getters["lessons/lessons"];
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Видалення відмінено"
          });
        });
    },

    cancelForm() {
      this.showAddLesson = false;
      this.propEditLesson = [];
      this.lessonsList.lessons = this.$store.getters["lessons/lessons"];
    }
  },
  computed: {
    showAddLessonCom: function() {
      if (this.showAddLesson) {
        return "Сховати форму";
      }
      return "Добавити предмет";
    }
  }
};
</script>

<style  >
.buttons-position {
  display: flex;
}
</style>
