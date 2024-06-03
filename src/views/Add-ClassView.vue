<template>
  <div class="add-class">
    <h3>Thêm Lớp</h3>
    <form @submit.prevent="createClassroom">
      <label for="className">Tên lớp: </label>
      <input type="text" id="className" v-model="className" required>

      <label for="blockName">Tên khối:  </label>
      <input type="text" id="blockName" v-model="blockName" required>
      <button type="submit">Tạo mới</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      className: '',
      blockName: '',
    };
  },
  methods: {
    createClassroom() {
      const newClassroom = {
        id: Math.random().toString(36).substring(7),
        name: this.className,
        block: this.blockName,
      };
      let classData = JSON.parse(localStorage.getItem('classes')) || [];
      classData.push(newClassroom);
      localStorage.setItem('classes', JSON.stringify(classData));
      this.className = '';
      this.blockName = '';
      this.$router.push({ name: 'ClassList', params: { refreshData: true } });
    },
  },
};
</script>
<style scoped>
    h3 {
        color: rgb(60, 89, 204);
        font-size: 25px;
    }
    .add-class{
        font-size: 25px;
    }
    input {
        border-radius: 5px;
        font-size: 20px;
    }
    form {
        display: grid;
        justify-items: stretch;
        justify-content: space-evenly;
    }
    button {
        font-size: 20px;
        margin-top: 10px;
        border-radius: 5px;
        background-color: rgb(19, 245, 19);
        border-color: rgb(19, 245, 19);
    }
</style>
