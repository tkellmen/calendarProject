<template>
  <el-card class="box-card">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Назва події">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="Опис події">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>

      <el-form-item label="Предмет">
        <el-select v-model="form.resourceId" placeholder="Виберіть предмет">
          <el-option
            v-for="resurs in form.resources"
            :key="resurs.id"
            :label="resurs.title"
            :value="resurs.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Початок події">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="Виберіть Дату"
            :picker-options="firstDayOfWeek"
            v-model="startDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="Виберіть час"
            :default-value="startDate"
            v-model="form.start"
            style="width: 100%;"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Кінець події">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="Виберіть Дату"
            :picker-options="firstDayOfWeek"
            v-model="form.end"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="Виберіть час"
            :default-value="form.end"
            v-model="form.end"
            style="width: 100%;"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Цілий день">
        <el-switch v-model="form.allDay"></el-switch>
      </el-form-item>
      <el-form-item label="Колір події">
        <el-radio-group v-model="form.backgroundColor">
          <el-radio class="color" style="
    background-color: #909399;
" label="#909399"></el-radio>
          <el-radio class="color" style="
    background-color: #F56C6C;
" label="#F56C6C"></el-radio>
          <el-radio class="color" style="
    background-color: #E6A23C;
" label="#E6A23C"></el-radio>
          <el-radio class="color" style="
    background-color: #67C23A;
" label="#67C23A"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="form.status == 'new'">
        <el-button type="primary" @click="onSubmit">Створити</el-button>
        <el-button @click="cancel">Відмінити</el-button>
      </el-form-item>
      <el-form-item v-if="form.status == 'old'">
        <el-button type="danger" @click="removeEvent">Видалити</el-button>
        <el-button type="warning" @click="eventClickEdit">Обновити</el-button>
        <el-button @click="cancel">Відмінити</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import moment from "moment";
export default {
  props: ["eventFormProp"],
  data() {
    return {
      firstDayOfWeek: {
        firstDayOfWeek: 1
      },

      endDate: "",
      startDate: "",

      form: this.eventFormProp
    };
  },
  mounted() {
    console.log(this.form);
    if (this.eventFormProp.title !== "") {
      this.form = this.eventFormProp;
      this.startDate = this.eventFormProp.start;
      this.endDate = this.eventFormProp.end;
    } else if (this.eventFormProp.title == "") {
      this.startDate = this.eventFormProp.start;
      // SET DAFAULT TIME OF DAY CLICK
      if (this.eventFormProp.start.length == 10) {
        this.form.start = moment(this.eventFormProp.start).format(
          "YYYY-MM-DDT[07:00:00]Z"
        );
      }
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel");
      this.form.refrechForm();
    },
    onSubmit() {
      if (!this.form.start) {
        this.form.start = this.startDate;
      }
      this.$emit("eventForm", this.form);
      this.form.refrechForm();
      this.endDate = "";
    },
    removeEvent(info) {
      this.$emit("removeEvent", this.form);
      this.form.refrechForm();
    },
    eventClickEdit(info) {
      this.$emit("eventEdit", this.form);
      this.form.refrechForm();
    }
  }
  // watch: {
  //   form: {
  //     immediate: true,
  //     deep: true,
  //     handler(val, oldVal) {
  //       setTimeout(() => {
  //         if (val.title !== "") {
  //           this.form = val;
  //           this.startDate = val.start;
  //           this.endDate = val.end;
  //         } else if (val.title == "") {
  //           this.startDate = val.start;
  //           this.form.start = val.start;
  //         }
  //       }, 100);
  //       // do your stuff
  //     }
  //   }
  // }
};
</script>
