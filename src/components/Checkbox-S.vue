<template>
  <label class="cbs">
    <input class="cbs-cb" type="checkbox" :checked="checked"
           @change="$emit('change', $event.target.checked)">
    <span class="cbs-box"></span>
    <span class="cbs-message"><slot></slot></span>
  </label>
</template>

<script>
  export default {
    name: 'Checkbox-S',
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: ['checked']
  }
</script>

<style lang="scss" scoped>
  .cbs{
    position: relative;
    height: 1.5em;
    margin: 4px 0;

    &-message{
      position: absolute;
      left: 1.7em;
      top: 0;
    }
    &-box{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      border: 2px solid #006400;
      border-radius: 2px;
      background-color: white;
      width: 1.2em;
      height: 1.2em;
      overflow: hidden;
      transition: background-color .3s;

      &:after{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        border-left: 4px solid white;
        border-bottom: 4px solid white;
        width: 1.2em;
        height: 1.2em;
        transition: border .3s, height .3s, transform .3s;
      }
    }
    &-cb{
      display: none;

      &:checked ~ .cbs-box{
        background-color: #006400;

        &:after{
          height: .6em;
          transform: scale(.6) rotate(-45deg);
        }
      }
    }
  }
</style>
