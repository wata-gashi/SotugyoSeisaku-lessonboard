<template>
  <div class="setting-root">
    <div class="balloon-box balloon-box-center">
      <span>時間割表Webアプリ - 卒業制作</span>
      <span>
        <img :src="getIconUrl()" alt="アプリアイコン" width="64" height="64">
      </span>
      <span>&copy;watagashi 2020</span>
    </div>
    <div class="balloon-box">
      <span class="balloon-box-title">設定</span>
      <div class="balloon-box-element">
        <span class="balloon-box-element-message">
          リスト表示項目の設定
        </span>
        <button-s @click-event="ldsdShow">設定</button-s>
      </div>
      <div class="balloon-box-element">
        <span class="balloon-box-element-message">
          キャッシュの削除
        </span>
        <button-s @click-event="cacheDelete">削除</button-s>
      </div>
    </div>
    <div class="balloon-box">
      <span class="balloon-box-title">ライセンス</span>
      <button-s @click-event="goToLicense">ライセンスを表示</button-s>
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
    <router-view name="license" />
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
      },
      goToLicense () {
        this.$router.push({name: 'license'})
      },
      getIconUrl () {
        return (process.env.NODE_ENV === 'development'
          ? ''
          : '/SotugyoSeisaku-lessonboard') +
          '/static/img/icons/app-icon.png'
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/sass/baloon";

  .setting-root{
    max-width: 500px;
    margin: 0 auto;
  }
</style>
