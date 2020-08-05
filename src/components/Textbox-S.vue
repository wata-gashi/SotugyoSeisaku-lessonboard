<template>
  <label class="tbs">
    <transition name="fade">
    <span class="tbs-error" v-if="error">
      <slot name="error-message"></slot>
    </span>
    </transition>
    <input class="tbs-input" type="text" :value="text"
           @change="$emit('change', $event.target.value)">
    <span class="tbs-message" :class="{'exist': text.length > 0}"><slot></slot></span>
  </label>
</template>

<script>
  export default {
    name: 'Textbox-S',
    model: {
      prop: 'text',
      event: 'change'
    },
    props: {
      text: {
        type: String,
        required: true
      },
      error: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/sass/fade-transition';

  .tbs{
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 65px;

    &-input{
      order: 2;
      position: relative;
      margin-top: 0.8em;
      font-size: 1.2em;
      width: 90%;
      height: 1.3em;
      outline: none;
      border: none;
      background-color: white;
      border-bottom: 1px solid #AAA;
      transition: border-bottom-color .3s, background-color .3s;

      &:focus {
        border-bottom-color: #16a84a;

        & + .tbs-message{
          font-size: 0.7em;
          transform: translateY(0);
          color: #143e00;
        }
      }
    }
    &-message,.exist{
      order: 1;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      margin-left: 0.3em;
      color: #646464;
      transition: font-size .3s, transform .3s, color .3s;

      &:not(.exist){
        font-size: 1.2em;
        transform: translateY(.8em);
      }
    }
    .exist{
      font-size: 0.7em;
      transform: translateY(0);
    }
    .tbs-error{
      order: 3;
      color: #ca0000;
      text-align: right;
      font-size: 0.9em;
      transition: .3s;

      & + .tbs-input{
        background-color: #ffeded;
        border-bottom-color: #ca2727;
      }
    }
  }
</style>
