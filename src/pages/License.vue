<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="head">
        <span class="dialog-title">Open Source Software</span>
        <button-s :close="true" @click-event="goToBack"></button-s>
      </div>
      <pre class="license-text" v-text="licenseText"></pre>
    </div>
  </div>
</template>

<script>
  import ButtonS from '../components/Button-S'

  export default {
    name: 'License',
    components: {
      'button-s': ButtonS
    },
    data () {
      return {
        licenseText: ''
      }
    },
    methods: {
      goToBack () {
        this.$router.push({name: 'setting'})
      }
    },
    mounted () {
      this.$nextTick(() => {
        let rawFile = new XMLHttpRequest()
        rawFile.onreadystatechange = () => {
          if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
              this.licenseText = rawFile.responseText
            }
          }
        }
        rawFile.open('GET',
          (process.env.NODE_ENV === 'development'
            ? ''
            : '/SotugyoSeisaku-lessonboard') +
            '/static/LICENSE.txt')
        rawFile.send()
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/sass/global';

  .license-text{
    overflow: hidden;
    white-space: pre-wrap;
    font-family: monospace;
    user-select: text;
  }
</style>
