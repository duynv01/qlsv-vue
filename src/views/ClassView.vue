<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>
<template>
    <div class="body-view" :class="{ hidden : isAddclass}">
        <nav>
            <RouterLink to="/class/add-class">Thêm Lớp</RouterLink>
        </nav>
        <div class="ClassInfo">
            <h3>Danh sách lớp học</h3>
            <div v-for="(block, index) in blocks" :key="index">
            <h3>Khối: {{ block.name }}</h3>
            <ul>
                <li v-for="classroom in block.classes" :key="classroom.id">
                {{ classroom.name }}
                <button @click="editClassroom(classroom)" class="btn-edit">Sửa</button>
                <button @click="deleteClassroom(classroom.id)" class="btn-delete">Xóa</button>
                </li>
            </ul>
        </div>
        <div v-if="showEditForm">
            <h2>Sửa thông tin lớp học</h2>
            <form @submit.prevent="updateClassroom">
                <label for="editClassName">Tên lớp:</label>
                <input type="text" id="editClassName" v-model="editClassroomData.name" required>
                <label for="editBlockName">Tên khối:</label>
                <input type="text" id="editBlockName" v-model="editClassroomData.block" required>
                <button type="submit">Lưu</button>
            </form>
        </div>
        </div>
    </div>
    <RouterView />
</template>
<script>
export default {
  data() {
    return {
      blocks: [],
      showEditForm: false,
      editClassroomData: {
        id: '',
        name: '',
        block: '',
      },
    };
  },
  created() {
    this.loadClassesFromLocalStorage();
  },
  watch: {
    '$route'(to){
        if(to.params.repfreshData){
            this.loadClassesFromLocalStorage();
        }
    }
  },
  computed: {
        isAddclass(){
            return this.$route.matched.some(record => record.name === 'add.class');
        },
        classes(){
            return store.state.classes
        }
    },
  mounted() {
    this.loadClassesFromLocalStorage();
  },
  methods: {
    loadClassesFromLocalStorage() {
      const classData = JSON.parse(localStorage.getItem('classes')) || [];
      const groupedClasses = classData.reduce((acc, classroom) => {
        if (!acc[classroom.block]) {
          acc[classroom.block] = [];
        }
        acc[classroom.block].push(classroom);
        return acc;
      }, {});
      this.blocks = Object.keys(groupedClasses).map(block => ({
        name: block,
        classes: groupedClasses[block].sort((a, b) => a.name.localeCompare(b.name)),
      }));
      this.blocks.sort((a, b) => a.name.localeCompare(b.name));
    },
    editClassroom(classroom) {
        this.showEditForm = true;
        this.editClassroomData.id = classroom.id;
        this.editClassroomData.name = classroom.name;
        this.editClassroomData.block = classroom.block;
    },
    updateClassroom() {
        const classData = JSON.parse(localStorage.getItem('classes')) || [];
        const updatedClassData = classData.map(classroom => {
            if (classroom.id === this.editClassroomData.id) {
                classroom.name = this.editClassroomData.name;
                classroom.block = this.editClassroomData.block;
            }
            return classroom;
        });
        localStorage.setItem('classes', JSON.stringify(updatedClassData));
        this.loadClassesFromLocalStorage();
        this.showEditForm = false;
    },
    deleteClassroom(classId) {
        const classData = JSON.parse(localStorage.getItem('classes')) || [];
        const updatedClassData = classData.filter(classroom => classroom.id !== classId);
        localStorage.setItem('classes', JSON.stringify(updatedClassData));
        
        this.loadClassesFromLocalStorage();
    },
  },
};
</script>
<style scoped>
    .hidden {
        display: none;
    }
    .ClassInfo {
        font-size: 25px;
    }
    .btn-edit{
        background-color: #26ff26;
        font-size: 20px;
        border: #26ff26;
        border-radius: 5px;
    }
    .btn-delete{
        background-color: #ff2626;
        font-size: 20px;
        border: #ff2626;
        border-radius: 5px;
        margin-left: 10px;
    }
</style>
