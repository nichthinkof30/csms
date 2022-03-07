<template>
  <div class="createPost-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>Parking Sensor</h3>
      </div>
      <el-form
        ref="postForm"
        :model="postForm"
        :rules="rules"
        class="form-container"
      >
        <!-- create section starts here -->
        <div class="createPost-main-container">
          <el-row>
            <el-col :span="24">
              <el-form-item
                style="margin-bottom: 40px;"
                prop="serialNumber"
              >
                <material-input
                  v-model="postForm.title"
                  :maxlength="30"
                  name="serialNumber"
                  required
                >
                  Wireless Detector Collector ID
                </material-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
              <el-col :span="24">
                <el-form-item
                  style="margin-bottom: 40px;"
                  prop="serialNumber"
                >
                  <material-input
                    v-model="postForm.title"
                    :maxlength="30"
                    name="serialNumber"
                    required
                  >
                    Parking Sensor ID
                  </material-input>
                </el-form-item>
              </el-col>
            </el-row>

        </div>

        <sticky
          :z-index="10"
          :class-name="'sub-navbar '+postForm.status"
        >
          <el-button
            v-loading="loading"
            style="margin-left: 10px;"
            type="success"
            @click="submitForm"
          >
            Save
          </el-button>
          <el-button
            v-loading="loading"
            type="warning"
            @click="draftForm"
          >
            Cancel
          </el-button>
        </sticky>
      </el-form>
    </el-card>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isValidURL } from '@/utils/validate'
import { getArticle, defaultArticleData } from '@/api/articles'
import { getChargeStation, defaultChargeStationData } from '@/api/chargestations'
import { getUsers } from '@/api/users'
import { AppModule } from '@/store/modules/app'
import { TagsViewModule, ITagView } from '@/store/modules/tags-view'
import MaterialInput from '@/components/MaterialInput/index.vue'
import Sticky from '@/components/Sticky/index.vue'
import Tinymce from '@/components/Tinymce/index.vue'
import UploadImage from '@/components/UploadImage/index.vue'
import Warning from './Warning.vue'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from '../../../example/components/Dropdown'
import { Form } from 'element-ui'

@Component({
  name: 'ParkingSensorDetail',
  components: {
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown,
    MaterialInput,
    Sticky,
    Tinymce,
    UploadImage,
    Warning
  }
})
export default class extends Vue {
  @Prop({ default: false }) private isEdit!: boolean

  private platformsOptions = [
    { key: 'isPrivate', name: 'IsPrivate' }
  ]

  private solarPowerOptions = [
    { key: 'solarPower', name: 'solarPower' }
  ]

  private autoChargeOptions = [
    { key: 'autoCharge', name: 'autoCharge' }
  ]

  private currencyOptions = [
    { key: 'MYR Malaysian Ringgit', name: 'MYR' },
    { key: 'USD US Dollar', name: 'USD' },
    { key: 'SGD Singapore Dollar', name: 'SGD' }
  ]

  private operatorOptions = [
    { key: 'Operator 1', name: 'Operator 1' },
    { key: 'Operator 2', name: 'Operator 2' },
    { key: 'Operator 3', name: 'Operator 3' }
  ]

  private validateRequire = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      if (rule.field === 'imageURL') {
        this.$message({
          message: 'Upload cover image is required',
          type: 'error'
        })
      } else {
        this.$message({
          message: rule.field + ' is required',
          type: 'error'
        })
      }
      callback(new Error(rule.field + ' is required'))
    } else {
      callback()
    }
  }

  private validateSourceUrl = (rule: any, value: string, callback: any) => {
    if (value) {
      if (isValidURL(value)) {
        callback()
      } else {
        this.$message({
          message: 'Invalid URL',
          type: 'error'
        })
        callback(new Error('Invalid URL'))
      }
    } else {
      callback()
    }
  }

  private postForm = Object.assign({}, defaultArticleData)
  private loading = false
  private userListOptions = []
  private rules = {
    imageURL: [{ validator: this.validateRequire }],
    title: [{ validator: this.validateRequire }],
    fullContent: [{ validator: this.validateRequire }],
    sourceURL: [{ validator: this.validateSourceUrl, trigger: 'blur' }]
  }

  private tempTagView?: ITagView
  private tinymceActive = true

  get abstractContentLength() {
    return this.postForm.abstractContent.length
  }

  get lang() {
    return AppModule.language
  }

  // set and get is useful when the data
  // returned by the backend api is different from the frontend
  // e.g.: backend return => "2013-06-25 06:59:25"
  //       frontend need timestamp => 1372114765000
  get timestamp() {
    return (+new Date(this.postForm.timestamp))
  }

  set timestamp(value) {
    this.postForm.timestamp = +new Date(value)
  }

  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of this.setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempTagView = Object.assign({}, this.$route)
  }

  deactivated() {
    this.tinymceActive = false
  }

  activated() {
    this.tinymceActive = true
  }

  private async fetchData(id: number) {
    try {
      const { data } = await getArticle(id, { /* Your params here */ })
      this.postForm = data.article
      // Just for test
      this.postForm.title += `   Parking Sensor Id:${this.postForm.id}`
      this.postForm.abstractContent += `   Parking Sensor Id:${this.postForm.id}`
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Parking Sensor'
      // Set tagsview title
      this.setTagsViewTitle(title)
      // Set page title
      this.setPageTitle(title)
    } catch (err) {
      console.error(err)
    }
  }

  private setTagsViewTitle(title: string) {
    const tagView = this.tempTagView
    if (tagView) {
      tagView.title = `${title}-${this.postForm.id}`
      TagsViewModule.updateVisitedView(tagView)
    }
  }

  private setPageTitle(title: string) {
    document.title = `${title} - ${this.postForm.id}`
  }

  private submitForm() {
    (this.$refs.postForm as Form).validate(valid => {
      if (valid) {
        this.loading = true
        this.$notify({
          title: 'Success',
          message: 'Succcessfully Save',
          type: 'success',
          duration: 2000
        })
        this.postForm.status = 'published'
        // Just to simulate the time of the request
        setTimeout(() => {
          this.loading = false
        }, 0.5 * 1000)
      } else {
        console.error('Submit Error!')
        return false
      }
    })
  }

  private draftForm() {
    if (this.postForm.fullContent.length === 0 || this.postForm.title.length === 0) {
      this.$message({
        message: 'Title and detail content are required',
        type: 'warning'
      })
      return
    }
    this.$message({
      message: 'The draft saved successfully',
      type: 'success',
      showClose: true,
      duration: 1000
    })
    this.postForm.status = 'draft'
  }

  private async getRemoteUserList(name: string) {
    const { data } = await getUsers({ name })
    if (!data.items) return
    this.userListOptions = data.items.map((v: any) => v.name)
  }
}
</script>

<style lang="scss">
.article-textarea {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
  margin-left: 100px;;
}
.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
</style>
