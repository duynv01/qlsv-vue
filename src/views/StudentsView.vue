<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
<template>
    <div class="body-view" :class="{ hidden : isAddstudent}">
        <StudentsInfo />
        <nav>
            <RouterLink to="/students/add-student">Thêm học sinh</RouterLink>
        </nav>
    </div>
    <RouterView />
</template>
<script>
import StudentsInfo from '../component/tabale-student.vue'
export default {
     computed: {
        isAddstudent(){
            return this.$route.matched.some(record => record.name === 'add.student');
        }
    },
    activated() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
    },
    mounted() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
    },
}
</script>
<style scoped>
    .body-view {
        width: 100%;
        display: flex;
        align-items: center;
    }
    nav a{
        white-space: nowrap;
    }
    
    .hidden {
        display: none;
    }
</style>