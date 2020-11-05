<template>
  <div class="container">
    <div class="logo-container">
      <Logo />
    </div>
    <div class="list">
      <button class= "btn-restart" v-on:click="restart">Restart</button>
      <ul class="winners">
         <h4>winners</h4>
          <li v-for="(winner,index) in winners" :key="index">
            {{ winner.user_id }}
          </li>
      </ul>
    </div>
    <div class="users-container">
      <User id='user1' v-bind:current="current" v-bind="disableInput" v-bind:hasWinner="hasWinner"/>
      <User id='user2' v-bind:current="current" v-bind="disableInput" v-bind:hasWinner="hasWinner"/>
      <User id='user3' v-bind:current="current" v-bind="disableInput" v-bind:hasWinner="hasWinner"/>
    </div>
  </div>
</template>

<script>
import User from '../components/User';
import axios from 'axios';
const RESTART_URL = "http://localhost:5000/restart";
export default {
  components:{
    User
  },
  data(){
    return {
      current: 'user1',
      disableInput: false,
      winners: [], 
      count: 0,
      hasWinner: false
    }
  },
  methods:{
    restart: async function(){
      const res =await  axios.get(RESTART_URL);
      this.current = 'user1';
      this.disableInput = false;
      this.winners = res.data.data;
      this.hasWinner= false;
    }
  },
    mounted:function(){
    this.$root.$on('changeCurrent', (text) => { 
         switch(this.current){
          case 'user1':
            this.current = 'user2';
            break;
          case 'user2':
            this.current = 'user3';
            break;
          case 'user3':
            this.current = 'user1';
            break;
        }
    }),
    this.$root.$on('changeWin', (text)=>{
      this.current = '';
      this.disableInput = true;
      this.hasWinner = true;
    })
  }
};
</script>

<style>
body {
  padding: 5%;
}

.container {
  border: 4px solid gray;
  padding: 3vw;
  border-radius: 15px;
}
.logo-container{
	display: flex;
	justify-content: center;
	height: 8vw;
	overflow: hidden;
}
.users-container{
  margin-top: 4vw;
  display: flex;
  justify-content: space-between;
}
button:disabled{
  background-color: darkgray;
}
.list{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1vw;
}
.btn-restart{
  width: 30%;
  height: 4vw;
}
ul{
  list-style: none;
  text-align: center;
  font-style: italic;
  height: 70px;
  flex:1;
  overflow-y: auto;
}
li:nth-child(2n+1){
  background-color: #777;
  color: white;
}
@media screen and (max-width: 600px) {
  .users-container{
    flex-direction: column;
  }
  .btn-restart{
    height: 8vw;
  }
}
</style>
