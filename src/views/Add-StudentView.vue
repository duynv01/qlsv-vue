<template>
<div>
    <nav>
        <h3>Thêm học sinh</h3>
    </nav>
    <form action="" @submit.prevent="addStudent">
        <div class="form-input">
            <label for="">Họ và tên</label>
            <input v-model="newStudent.name" type="text">
        </div>
        <div class="form-input">
            <label for="">Ngày sinh</label>
            <input v-model="newStudent.date" type="date">
        </div>
        <div class="form-input">
            <label for="">Lớp</label>
            <input v-model="newStudent.class" type="text">
        </div>
        <button type="submit">Thêm</button>
    </form>        
</div>
</template>
<script>
export default {
    name: 'StudentForm',
    data() {
        return {
            newStudent: {
                name: '',
                date: '',
                class: ''
            }
        }
    },
    methods: {
        addStudent(){
           const id = Math.random().toString(36).substr(2, 9);
           if(this.newStudent.name && this.newStudent.date && this.newStudent.class){
               const student = {
                 id: id,
                 name: this.newStudent.name,
                 date: this.newStudent.date,
                 class: this.newStudent.class
               };
               let students = JSON.parse(localStorage.getItem('students')) || [];
               students.push(student);
               localStorage.setItem('students', JSON.stringify(students));
               // Reset form
               this.newStudent = {
                   name: '',
                   date: '',
                   class: ''
               };
           }
        }
    },

}
</script>
<style scoped>
    h3 {
        color: rgb(60, 89, 204);
    }
</style>