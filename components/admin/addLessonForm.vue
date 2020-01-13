<template>
  <el-card class="box-card">
    <div slot="header">
      <h1>Добавити предмет</h1>
    </div>

    <el-form :rules="rules" :model="lessonForm.lesson" ref="lessonForm" label-width="120px">
      <el-form-item prop="title" label="Предмет">
        <el-input v-model="lessonForm.lesson.title"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          v-if="editMode"
          icon="el-icon-edit"
          type="warning"
          @click="editLesson(lessonForm.lesson)"
        >Редагувати</el-button>
        <el-button v-if="!editMode" type="primary" @click="submitForm('lessonForm')">Створити</el-button>

        <el-button icon="el-icon-close" @click="resetForm('lessonForm')">Відмінити</el-button>
      </el-form-item>

      <!-- <el-form-item v-if="form.status == 'old'">
        <el-button type="danger" @click="removeEvent">Видалити</el-button>
        <el-button type="warning" @click="eventClickEdit">Обновити</el-button>
        <el-button @click="cancel">Відмінити</el-button>
      </el-form-item>-->
    </el-form>
  </el-card>
</template>





<script>
export default {
  props: {
    propEditLesson: Object
  },
  data() {
    return {
      editMode: false,
      lessonForm: {
        lesson: {
          id: Math.random()
            .toString(36)
            .substr(2, 9),
          title: ""
        }
      },
      rules: {
        lesson: [
          {
            required: true,
            message: "Поле предмет  обов'язкове",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    clearForm() {
      this.lessonForm = {
        lesson: {
          id: Math.random()
            .toString(36)
            .substr(2, 9),
          title: ""
        }
      };
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.$store.dispatch(
            "lessons/addLesson",
            this.lessonForm.lesson
          );

          this.$message({
            message: `Предмет ${this.lessonForm.lesson.title} добавлений `,
            type: "success"
          });
          this.clearForm();
          this.$emit("cancel");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("cancel");
    },
    editLesson(row) {
      console.log("starting dispatch", row);
      this.$store.dispatch("lessons/editLesson", row);
      this.$emit("cancel");
    }
  },
  mounted() {
    console.log(this.propEditLesson);
    if (Object.keys(this.propEditLesson).length == 0) {
      this.editMode = false;
      console.log("propeditLesson false");
    } else {
      this.editMode = true;

      let buferVariable = Object.assign({}, this.propEditLesson);
      this.lessonForm.lesson = buferVariable;
    }
  }
};
</script>
