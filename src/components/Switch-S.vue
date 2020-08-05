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
  .switch-s{
    display: flex;

    input{
      display: none;
    }

    .text{
      color: #646464;
      transition: color .3s;
      margin: auto 0 auto 0.3em;
    }

    .check-box{
      display: block;
      position: relative;
      width: 3em;
      height: 1.5em;
      border: solid 2px #646464;
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
        background-color: #646464;
        transform: scale(0.9);
        transition: .3s;
      }
    }

    input:checked{
      & + .check-box{
        border-color: #00b138;

        .switch{
          background-color: #00b138;
          left: calc(100% - 1.5em);
        }
      }
      & ~ .text{
        color: #1b6a36;
      }
    }
  }
</style>
