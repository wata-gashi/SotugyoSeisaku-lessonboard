<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div id="check-dialog-root">
        <span class="title"><slot name="title"></slot></span>
        <span class="message"><slot name="message"></slot></span>
        <div id="select-button-box">
          <button-s :click-event="clickYes">はい</button-s>
          <button-s :click-event="clickNo">いいえ</button-s>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ButtonS from '../components/Button-S'
  export default {
    name: 'CheckDialog',
    components: {
      'button-s': ButtonS
    },
    props: {
      clickYes: {
        type: Function
      },
      clickNo: {
        type: Function
      }
    }
  }
</script>

<style lang="scss">
  #check-dialog-root{
    display: flex;
    width: auto;
    height: auto;
    background-color: white;
    flex-direction: column;


    .title{
      text-align: center;
      font-size: 1.5em;
      border-bottom: 1px solid #143e00;
    }

    .message{

    }

    #select-button-box{
      display: flex;
      justify-content: space-around;
      margin-top: 15px;
    }
  }

  .dialog-inner{
    width: auto;
    height: auto;
  }
</style>
