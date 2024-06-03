<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Họ và tên</th>
                    <th>Tuổi</th>
                    <th>Lớp</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, index) in students" :key="student.id">
                    <td>{{index +1}}</td>
                    <td>{{student.name}}</td>
                    <td>{{studentdate(student.date)}}</td>
                    <td>{{student.class}}</td>
                    <td>
                        <button @click="editStudent(student)">Sửa</button>
                        <button @click="deleteStudent(index)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="editingStudent">
            <h2>Sửa thông tin học sinh</h2>
            <form action="" @submit.prevent="saveEdit">
                <input type="text" v-model="editingStudent.name">
                <input type="date" v-model="editingStudent.date">
                <input type="text" v-model="editingStudent.class">
                <button type="submit">Lưu</button>
            </form>
    </div>
    </div>
</template>
<script>
export default {
    name: 'StudentsInfo',
    data() {
    return {
        students: [],
        editingStudent: null
    };
    },
    mounted() {
        this.students = JSON.parse(localStorage.getItem("students")) || [];
    },
    methods: {
    editStudent(student) {
      this.editingStudent = { ...student};
    },
    saveEdit() {
     const index = this.students.findIndex(student => student.id === this.editingStudent.id);
    if (index === -1) {
        return;
    }
    this.students.splice(index, 1, this.editingStudent);
    localStorage.setItem('students', JSON.stringify(this.students));
    this.editingStudent = null;
    },
    studentdate(date) {
      const today = new Date();
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    deleteStudent(index){
        this.students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(this.students));

    },
    },
  }
</script>
<style scoped>
    div,table {
        font-size: 20px;
        border-collapse: collapse;
        border: 1px solid #000000;
        width: 100%;
    }
    tr, th, td {
        border: 1px solid #000000;
    }
    button {
        width: 50%;
    }
</style>