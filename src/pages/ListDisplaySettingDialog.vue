<template>
  <transition name="fade">
    <div class="dialog">
      <div class="dialog-inner">
        <div class="head">
          <span class="dialog-title">リスト表示項目</span>
          <button-s :close="true" @click-event="close"></button-s>
        </div>
        <div class="lds-root">
          <checkbox-s v-model="visibleName">授業名</checkbox-s>
          <checkbox-s v-model="visibleRoom">教室</checkbox-s>
          <checkbox-s v-model="visibleTeacher">教師名</checkbox-s>
          <checkbox-s v-model="visibleBelongings">持ち物</checkbox-s>
          <span class="horizon-margin"/>
          <div class="right-box">
            <button-s @click-event="save">保存</button-s>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import ButtonS from '../components/Button-S'
  import CheckboxS from '../components/Checkbox-S'

  export default {
    name: 'ListDisplaySettingDialog',
    components: {
      'button-s': ButtonS,
      'checkbox-s': CheckboxS
    },
    data () {
      return {
        visibleName: true,
        visibleRoom: true,
        visibleTeacher: true,
        visibleBelongings: false
      }
    },
    methods: {
      save () {
        this.$store.commit('setVisible', {
          name: this.visibleName,
          room: this.visibleRoom,
          teacher: this.visibleTeacher,
          belongings: this.visibleBelongings
        })
        this.$router.push({name: 'setting'})
      },
      close () {
        this.$router.push({name: 'setting'})
      }
    },
    created () {
      const vi = this.$store.state.visible
      this.visibleName = vi.name === undefined ? true : vi.name
      this.visibleRoom = vi.room === undefined ? true : vi.room
      this.visibleTeacher = vi.teacher === undefined ? true : vi.teacher
      this.visibleBelongings = vi.belongings === undefined ? false : vi.belongings
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";
  @import "../assets/sass/fade-transition";

  .lds-root{
    display: flex;
    flex-direction: column;
  }
</style>
