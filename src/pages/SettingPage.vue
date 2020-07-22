<template>
  <div class="setting-root">
    <div class="balloon-box">
      <span class="balloon-box-title">設定</span>
      <div class="balloon-box-element">
        <span class="balloon-box-element-message">
          リスト表示項目の設定
        </span>
        <button-s :click-event="ldsdShow">設定</button-s>
      </div>
      <div class="balloon-box-element">
        <span class="balloon-box-element-message">
          キャッシュの削除
        </span>
        <button-s :click-event="cacheDelete">削除</button-s>
      </div>
      <check-dialog :click-yes="checkYes" :click-no="checkNo"
                    v-if="checkFlag">
        <template v-slot:title>
          確認
        </template>
        <template v-slot:message>
          本当にキャッシュを削除しますか？
        </template>
      </check-dialog>
      <router-view name="ldsd" />
    </div>
  </div>
</template>

<script>
  import ButtonS from '../components/Button-S'
  import CheckDialog from '../components/CheckDialog'

  export default {
    name: 'SettingPage',
    components: {
      'button-s': ButtonS,
      'check-dialog': CheckDialog
    },
    data () {
      return {
        checkFlag: false
      }
    },
    methods: {
      ldsdShow () {
        this.$router.push({name: 'ldsd'})
      },
      cacheDelete () {
        this.checkFlag = true
      },
      checkYes () {
        localStorage.clear()
        this.$router.push({name: 'home'})
        document.location.reload()
      },
      checkNo () {
        this.checkFlag = false
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
