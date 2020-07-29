<template>
  <div id="app">
    <header-s/>
    <router-view/>
    <footer-s/>
  </div>
</template>

<script>
  import HeaderS from './components/Header-S'
  import FooterS from './components/Footer-S'

  export default {
    components: {
      'header-s': HeaderS,
      'footer-s': FooterS
    },
    created () {
      this.$store.commit('loadStorage')
    }
  }
</script>

<style lang="scss">
  *{
    font-family: "Meiryo", fantasy;
    user-select: none;
    color: #195500;
  }
  body{
    margin: 0;
    background-color: #4c9336;
  }
  th{
    white-space: nowrap;
  }
  #app{
    padding-top: 3em;
    padding-bottom: 3em;
  }
  .balloon-box{
    display: flex;
    flex-direction: column;
    margin: 5px;
    padding: 10px;
    background-color: white;
    border-radius: 10px;

    &-title{
      font-size: 1.8em;
      margin: 0 auto;
    }

    &-element{
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      &-message{
        font-size: 1.3em;
        text-align: center;
        margin: auto 0;
      }
    }
  }
  .balloon-box-row{
    flex-direction: row;
  }
  .right-box{
    display: flex;
    margin-left: auto;
  }
  .balloon-tab{
    display: flex;
    margin: 5px 5px 0;

    .tab-button{
      background-color: #ccc;
      padding: 7px 10px 17px;
      transition: background-color .3s;

      &:first-child{
        border-radius: 10px 0 0 0 / 10px 0 0 0;
      }

      &:last-child{
        border-radius: 0 10px 0 0 / 0 10px 0 0;
      }

      &:not(.tab-button-active){
        &:hover{
          background-color: #eee;
        }
        &:active{
          background-color: white;
        }
      }

      input{
        display: none;
      }
    }

    .tab-button-active{
      background-color: white;
    }

    & + .balloon-box{
      position: relative;
      margin-top: 0;
      top: -10px;
    }
  }

  .center-box{
    display: flex;
    justify-content: space-around;
  }

  .horizon-margin{
    margin: 20px 0 10px;
    border-top: 1px solid #cdcdcd
  }

  .message{
    &-warning{
      color: darkred;

    }
  }
</style>
