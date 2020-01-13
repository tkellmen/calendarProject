<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <h1>Учні</h1>
      </div>

      <el-button
        icon="el-icon-user"
        class="addStudents"
        type="primary"
        @click="showAddStudentComponent"
        plain
      >{{showAddStudentCom}}</el-button>
      <transition name="fade">
        <div v-if="showAddStudent" class="addStudents">
          <addStudent :propEditStudent="propEditStudent" v-on:cancel="cancelForm" />
        </div>
      </transition>

      <section>
        <el-table :data="studentsList.students" max-height="850">
          <el-table-column prop="secondName" label="Прізвище" width="150"></el-table-column>
          <el-table-column prop="name" label="Ім'я"></el-table-column>
          <el-table-column prop="fatherName" label="По батькові"></el-table-column>
          <el-table-column prop="age" label="Вік"></el-table-column>
          <el-table-column fixed="right">
            <template slot-scope="scope" class="buttons-position">
              <div class="buttons-position">
                <el-button
                  @click.native.prevent="editStudent(scope.$index, studentsList.students)"
                  size="small"
                  icon="el-icon-edit"
                  type="primary"
                  plain
                >Редагувати</el-button>
                <el-button
                  @click.native.prevent="deleteStudent(scope.$index, studentsList.students)"
                  size="small"
                  icon="el-icon-delete"
                  type="danger"
                  plain
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
import addStudent from "@/components/admin/addsSudentForm";
import { mapGetters } from "vuex";
export default {
  layout: "admin",
  components: { addStudent },
  asyncData() {
    return {
      showAddStudent: false,
      propEditStudent: {},
      studentsList: {
        students: []
      }
    };
  },
  async created() {
    //проверка загружен ли список студентов
    if (this.$store.getters["students/students"].length == 0) {
      await this.$store.dispatch("students/fetchListStudents");
    }

    this.studentsList.students = await this.$store.getters["students/students"];
  },
  methods: {
    showAddStudentComponent() {
      this.showAddStudent = !this.showAddStudent;
    },
    editStudent(index, rows) {
      // console.log(rows[index]);
      this.showAddStudent = true;
      this.propEditStudent = rows[index];
    },
    deleteStudent(index, rows) {
      this.$confirm("Ви точно бажаєте видалити учня", "Увага", {
        confirmButtonText: "Так",
        cancelButtonText: "Відмінити",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "Учень успішно видалений"
          });

          this.$store.dispatch("students/deleteStudent", rows[index]);
          this.studentsList.students = this.$store.getters["students/students"];
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Видалення відмінено"
          });
        });
    },

    cancelForm() {
      this.showAddStudent = false;
      this.propEditStudent = [];
    }
  },
  computed: {
    showAddStudentCom: function() {
      if (this.showAddStudent) {
        return "Сховати форму";
      }
      return "Добавити учня";
    }
  }
};
</script>

<style  >
.buttons-position {
  display: flex;
}
</style>
