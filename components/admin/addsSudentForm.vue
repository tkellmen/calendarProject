<template>
  <el-card class="box-card">
    <div slot="header">
      <h1>Добавити Учня</h1>
    </div>

    <el-form :rules="rules" :model="studentForm" ref="studentForm" label-width="120px">
      <el-form-item prop="secondName" label="Прізвище">
        <el-input v-model="studentForm.secondName"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="Ім'я">
        <el-input v-model="studentForm.name"></el-input>
      </el-form-item>
      <el-form-item prop="fatherName" label="По батькові">
        <el-input v-model="studentForm.fatherName"></el-input>
      </el-form-item>

      <el-form-item label="Вік" prop="age">
        <el-input type="age" v-model.number="studentForm.age"></el-input>
      </el-form-item>

      <el-form-item label="Примітка">
        <el-input type="textarea" v-model="studentForm.description"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          v-if="editMode"
          icon="el-icon-edit"
          type="warning"
          @click="editStudent(studentForm)"
        >Редагувати</el-button>
        <el-button v-if="!editMode" type="primary" @click="submitForm('studentForm')">Створити</el-button>

        <el-button icon="el-icon-close" @click="resetForm('studentForm')">Відмінити</el-button>
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
    propEditStudent: Object
  },
  data() {
    return {
      editMode: false,
      studentForm: {
        id: Math.random()
          .toString(36)
          .substr(2, 9),
        secondName: "",
        name: "",
        fatherName: "",
        age: "",
        description: ""
      },
      rules: {
        secondName: [
          {
            required: true,
            message: "Поле прізвище  обов'язкове",
            trigger: "blur"
          },
          {
            min: 3,
            max: 40,
            message: "Довжина поля повинна бути від 3 до 40 символів",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "Поле ім'я  обов'язкове",
            trigger: "blur"
          },
          {
            min: 3,
            max: 40,
            message: "Довжина поля повинна бути від 3 до 40 символів",
            trigger: "blur"
          }
        ],
        fatherName: [
          {
            required: true,
            message: "Поле по батькові  обов'язкове",
            trigger: "blur"
          },
          {
            min: 3,
            max: 40,
            message: "Довжина поля повинна бути від 3 до 40 символів",
            trigger: "blur"
          }
        ],
        age: [
          { required: true, message: "Обов'язково", trigger: "blur" },
          { type: "number", message: "Мусить бути числом" }
        ]
      }
    };
  },
  methods: {
    clearForm() {
      this.studentForm = {
        id: Math.random()
          .toString(36)
          .substr(2, 9),
        secondName: "",
        name: "",
        fatherName: "",
        age: null,
        description: ""
      };
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.studentForm.title =
            this.studentForm.secondName + " " + this.studentForm.name;
          await this.$store.dispatch("students/addStudent", this.studentForm);

          this.$message({
            message: `Учень ${this.studentForm.secondName} ${this.studentForm.name} добавлений до класу`,
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
    editStudent(row) {
      console.log("starting dispatch");

      this.$store.dispatch("students/editStudent", row);

      this.$emit("cancel");
    }
  },
  mounted() {
    console.log(this.propEditStudent);
    if (Object.keys(this.propEditStudent).length == 0) {
      this.editMode = false;
      console.log("propEditStudent false");
    } else {
      this.editMode = true;
      this.studentForm = Object.assign({}, this.propEditStudent);
    }
  }
};
</script>
