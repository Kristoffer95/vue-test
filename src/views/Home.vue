<template>
  <div class="home">
    <div class="show-detail">
      <div class="show-detail-outer" v-for="(data, index) in names" :key="index">
        <div>
          <span class="edit" @click="edit(index, data)">edit</span>
          <span class="close" @click="remove(index)">x</span>
        </div>
        <div class="show-detail-inner">
          <span>first name: {{data.firstName}}</span>
          <span>last name: {{data.lastName}}</span>
        </div>
      </div>
    </div>
    <div class="parent-div">
      <input type="text" placeholder="First name" v-model="name.first">
      <input type="text" placeholder="Last name" v-model="name.last">
      <button @click="save">Save</button>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      name: {
        first: '',
        last: ''
      },
      editIndex: ''
    }
  },
  computed: {
    ...mapState(['names'])
  },
  methods: {
    edit(index, data) {
      this.editIndex = index
      this.name.first = data.firstName
      this.name.last = data.lastName
    },

    // Save new data/changes
    save() {
      if (this.name.first === '' || this.name.last === '') return

      const fullName = {
        firstName: this.name.first,
        lastName: this.name.last
      }
      if(this.editIndex !== '') {
        const data = {
          index: this.editIndex,
          fullName
        }
        this.$store.dispatch('updateFullName', data)
      } else {
        this.$store.dispatch('saveFullName', fullName)
      }
      
      // reset
      this.name.first = ''
      this.name.last = ''
      this.editIndex = ''
    },
    remove(index) {
      this.$store.dispatch('removeFullName', index)
    }
  }
}
</script>

<style lang="scss">
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .parent-div {
    width: 200px;
    display: flex;
    flex-direction: column;
  }
  .show-detail {
    margin-right: 50px;

    .show-detail-outer {
      font-weight: bold;
      display: flex;
      flex-direction: row-reverse;

      .edit {
        font-weight: 100;
        padding-right: 5px;
        text-decoration: underline;
        cursor: pointer;
      }
      .close {
        color: red;
        cursor: pointer;
      }
      .show-detail-inner{
        width: 200px;
        display: flex;
        flex-direction: column;
        padding: 10px 0 10px 0;
        
        span {
          font-weight: bold;
          line-height: 20px;
        }
      }
    }
  }
  
</style>
