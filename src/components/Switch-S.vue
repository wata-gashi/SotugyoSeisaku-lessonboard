<template>
  <label class="switch-s">
    <input type="checkbox" :checked="checked"
           @change="$emit('change', $event.target.checked)">
    <span class="check-box">
      <span class="switch"></span>
    </span>
    <span class="text"><slot></slot></span>
  </label>
</template>

<script>
  export default {
    name: 'Switch-S',
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: {
        type: Boolean
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/sass/color";

  .switch-s{
    display: flex;

    input{
      display: none;
    }

    .text{
      color: $disable-color;
      transition: color .3s;
      margin: auto 0 auto 0.3em;
    }

    .check-box{
      display: block;
      position: relative;
      width: 3em;
      height: 1.5em;
      border: solid 2px $disable-color;
      border-radius: 0.85em;
      overflow: hidden;
      transition: border-color .3s;

      .switch{
        display: block;
        position: absolute;
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        left: 0;
        background-color: $disable-color;
        transform: scale(0.9);
        transition: .3s;
      }
    }

    input:checked{
      & + .check-box{
        border-color: $sub1-color;

        .switch{
          background-color: $sub1-color;
          left: calc(100% - 1.5em);
        }
      }
      & ~ .text{
        color: $text-color;
      }
    }
  }
</style>
