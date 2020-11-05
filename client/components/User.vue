<template>

<div class="user-card" :id="id" v-bind:class="{current: isCurrent}">
  <div class="card-title">Enter a number <br> between 0 and 100</div>
  
  <div class="input-container"><input type="number" v-model="guessedNumber" min="0" max="100" :disabled="isDisabled"></div>
  <div class="button-container"><button v-on:click="sub" :disabled="disable">Submit</button></div>
  <div class="result">{{result}}</div>
  <img class="celebrate" v-if="hasWon && hasWinner"
   src="https://i.pinimg.com/originals/90/63/72/9063723db16c7b7a35b05ca712216844.gif" 
  >
</div>

</template>

<script>
import axios from 'axios';
const GUESS_URL = "http://localhost:5000/guess";
export default{
  name:'User',
  props: ['id','current','disableInput','hasWinner'],
  data(){
    return {
      guessedNumber: "",
      user_id: this.$props.id,
      result: "",
      win: false,
      hasWon: this.$props.hasWinner && this.winner == this.user_id
    }
  },
  computed:{
    validated:function(){
      const isNumber = typeof Number(this.guessedNumber) === 'number';
      const hasLength = this.guessedNumber.length >0;
      return (this.guessedNumber >=0 && this.guessedNumber <=100 && isNumber && hasLength);
    } ,
    isDisabled:function(){
      return this.$props.disableInput
    },
    isCurrent:function(){
      return this.user_id == this.$props.current
    },
    disable:function(){
        return !this.validated || !this.isCurrent
    },
    hasWon:function(){
      return  this.$props.hasWinner && this.winner == this.user_id;
    }
  },
  methods:{
    sub: async function(){
      const data = JSON.stringify({
        user_id: this.user_id,
        guessedNumber: this.guessedNumber
      });
      const headers = {
        'Content-Type': 'application/json'
      }
      const res = await axios.post(GUESS_URL,data,{headers});
      this.guessedNumber = "";
      this.result = res.data.guess;
      this.win = res.data.win;
      if(!this.win){
        this.$root.$emit('changeCurrent', 'current user changes');
      }else{
        this.hasWon = this.user_id;
        this.$root.$emit('changeWin', 'someone won');
      }
    }
  }
}
</script>

<style>
  .user-card{
    border-radius: 10px;
    border: 3px solid #999;
    padding: 8vw 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 30%;
    position: relative;
  }
  .card-title, input{
    text-align: center;
  }
  input{
    width: 90%;
    margin-bottom: 10px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
  button{
    width: 70px;
    height: 28px;
    background-color: forestgreen;
    color: white;
    border:1px solid black ;
    border-radius: 2px;
    text-align: center;
    font-weight: bold;
  }
  .input-container{
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .result{
    height: 10px;
  }
  .current{
    background: #999;
    color: white;
  }
  .celebrate{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  @media only screen and (max-width: 600px) {
  .user-card{
    width: 100%;
    margin-bottom: 4vw;
  }
}
</style>