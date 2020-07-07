<template>
  <div class="button-s" :class="{'disabled': disabled}"
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
      }
    },
    methods: {
      click: function () {
        return this.clickEvent && !this.disabled ? this.clickEvent.call() : ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button-s{
    color: white;
    font-weight: bolder;
    padding: 7px 15px;
    margin: 5px;
    background-color: #1b6a36;
    border-top:   2px solid transparent;
    border-right: 2px solid transparent;

    &:hover{
      background-color: #2fd068;
    }

    &:active{
      background-color: #16a84a;
      border-top:   2px solid #035016;
      border-right: 2px solid #035016;
    }
  }
  .disabled{
    &, &:hover, &:active{
      color: #999;
      background-color: #3b3b3b;
      border-top:   2px solid transparent;
      border-right: 2px solid transparent;
    }
  }
</style>
