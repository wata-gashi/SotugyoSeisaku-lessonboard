<template>
  <div class="button-s" :class="{'disabled': disabled, 'red': red | close, 'close': close}"
       @click="click" @keypress.enter.space="click">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Button-S',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      clickEvent: {
        type: Function
      },
      close: {
        type: Boolean,
        default: false
      },
      red: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      click: function () {
        if (!this.disabled) this.$emit('click-event')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button-s{
    color: white;
    font-size: 1em;
    font-weight: bolder;
    padding: 7px 15px;
    margin: 5px;
    background-color: #1b6a36;
    border-radius: 30px;
    transition: background-color .2s;

    &:hover{
      background-color: #2fd068;
    }

    &:active{
      background-color: #16a84a;
    }
  }
  .red{
    background-color: #a80000;

    &:hover{
      background-color: #db1a1a;
    }

    &:active{
      background-color: #f32d2d;
    }
  }
  .close{
    display: block;
    content: '';
    position: relative;
    padding: 0;
    width: 2em;
    height: 2em;
    border-radius: 50%;

    &:before, &:after{
      position: absolute;
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      background-color: white;
    }
    &:before{
      transform: rotate(45deg) scale(0.1, 0.7);
    }
    &:after{
      transform: rotate(-45deg) scale(0.1, 0.7);
    }
  }
  .disabled{
    &, &:hover, &:active{
      color: #999;
      background-color: #3b3b3b;
    }
  }
</style>
