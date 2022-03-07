<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <!-- create section starts here -->
      <div class="createPost-main-container">
        <el-row type="flex" justify="space-between">
          <el-col :span="8">
            <el-form-item
              style="margin-bottom: 40px;"
              class="postInfo-container-item"
              prop="id"
            >
              <material-input
                v-model="postForm.id"
                name="id"
                :disabled="true"
                required
              >
                Charge Station ID
              </material-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item
              class="postInfo-container-item"
              prop="serial"
            >
              <material-input
                v-model="postForm.serial"
                :maxlength="20"
                name="serial"
                required
              >
                Serial Number
              </material-input>
            </el-form-item>
          </el-col>

        </el-row>

        <!-- <el-row type="flex">

          <el-col :span="8">
            <el-form-item
              class="postInfo-container-item"
              prop="is_Private"
            >
                <span class="field-label">Is Private  </span>
                <el-switch v-model="postForm.is_private" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              class="postInfo-container-item"
              prop="status"
            >
                <span class="field-label">Status  </span>
                <el-switch v-model="postForm.status" />
            </el-form-item>
          </el-col>

        </el-row> -->

        <div class="postInfo-container">

          <el-row type="flex" justify="space-between">
            <!-- operator -->
            <el-col :span="8">
              <el-form-item
                label-width="120px"
                label="Operator"
                class="postInfo-container-item"
                prop="operator"
              >
                <el-select
                  v-model="postForm.operator"
                  label-width="350px"
                  clearable
                  style="width: 220px;"
                  class="filter-item"
                  placeholder="Please Choose"
                >
                  <el-option
                    v-for="item in operatorOptions"
                    :key="item.key"
                    :label="item.key"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <!-- Currency -->
            <el-col :span="16">
              <el-form-item
                label-width="120px"
                label="Currency"
                class="postInfo-container-item"
                prop="currency"
              >
                <el-select
                  v-model="postForm.currency"
                  label-width="190px"
                  label="Currency :"
                  clearable
                  class="filter-item"
                  placeholder="Please Choose"
                >
                  <el-option
                    v-for="item in currencyOptions"
                    :key="item.key"
                    :label="item.key"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>

            <!-- Provider -->
            <el-col :span="8">
              <el-form-item
                label-width="120px"
                label="Provider"
                class="postInfo-container-item"
                prop="provider"
                style="margin-top:40px;"
              >
                <el-select
                  v-model="postForm.provider"
                  label-width="190px"
                  label="provider :"
                  clearable
                  style="min-width: 120px;"
                  class="filter-item"
                  placeholder="Please Choose provider"
                >
                  <el-option
                    v-for="item in currencyOptions"
                    :key="item.key"
                    :label="item.key"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <!-- min power  -->
            <el-col :span="8">
              <el-form-item
                prop="power_min"
                class="postInfo-container-item"
                style="padding-left:50px;"
              >
                <material-input
                  v-model="postForm.meta.power_min"
                  :maxlength="8"
                  name="powerMin"
                  required
                >
                  Min. Power (kW)
                </material-input>
              </el-form-item>
            </el-col>
            <!-- max power  -->
            <el-col :span="8">
              <el-form-item
                prop="power_max"
                class="postInfo-container-item"
              >
                <material-input
                  v-model="postForm.meta.power_max"
                  :maxlength="8"
                  name="powerMax"
                  required
                >
                  Max. Power (kW)
                </material-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <!-- charge_box_serial_number -->
            <el-col :span="8">
              <el-form-item
                prop="charge_box_serial_number"
                class="postInfo-container-item"
              >
                <material-input
                  v-model="postForm.charge_box_serial_number"
                  name="charge_box_serial_number"
                  required
                  autosize
                >
                  Charge Box Serial No.
                </material-input>
              </el-form-item>
            </el-col>

            <!-- ocpp_status -->
            <el-col :span="8">
              <el-form-item
                prop="ocpp_status"
                class="postInfo-container-item"
              >
                <material-input
                  v-model="postForm.ocpp_status"
                  name="ocpp_status"
                  required
                >
                  OCPP Status
                </material-input>
              </el-form-item>
            </el-col>

            <!-- ocpp_hash_code -->
            <el-col :span="8">
              <el-form-item
                prop="ocpp_hash_code"
                class="postInfo-container-item"
              >
                <material-input
                  v-model="postForm.ocpp_hash_code"
                  name="ocpp_hash_code"
                  required
                  autosize
                >
                  OCPP Hash Code
                </material-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <!-- charge_point_model -->
            <el-col :span="8">
              <el-form-item
                prop="ocpp_hash_code"
                class="postInfo-container-item"
              >
                <material-input
                  v-model="postForm.charge_point_model"
                  name="charge_point_model"
                  required
                  autosize
                >
                  Model
                </material-input>
              </el-form-item>
            </el-col>

            <!-- charge_point_vendor -->
            <el-col :span="8">
              <el-form-item
                prop="charge_point_vendor"
                class="postInfo-container-item"
              >
                <material-input
                  v-model="postForm.charge_point_vendor"
                  name="charge_point_vendor"
                  required
                >
                  Vendor
                </material-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- maps -->
          <el-row>
            <el-col :span="24">

              <el-form-item
                style="margin-bottom: 40px;"
              >
                <div class="createPost-container">
                  <el-card class="box-card">
                      <el-form-item
                        prop="charge_point_vendor"
                        class="postInfo-container-item"
                        style="margin-bottom:40px;width:250px;object-fit: cover;"
                      >
                        <material-input
                          name="maps"
                        >
                          Search location
                        </material-input>
                      </el-form-item>
                      <img src="@/assets/maps_sample.png"  />
                  </el-card>
                </div>
              </el-form-item>

            </el-col>
          </el-row>

        </div>

      </div>

      <!-- <parking-sensor-detail :is-edit="false" /> -->

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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { isValidURL } from '@/utils/validate'
import { toggleClass } from '@/utils'
// import { getArticle, defaultArticleData } from '@/api/articles'
import { getChargeStation, defaultChargeStationData } from '@/api/chargestations'
// import { getOperator, defaultOperatorData } from '@/api/operators'
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
import ParkingSensorDetail from '@/views/chargepoint/parkingsensor/components/ParkingSensorDetail.vue' // /ParkingSensorDetail.vue'
import '@/assets/custom-theme/index.css'

@Component({
  name: 'ChargeStationDetail',
  components: {
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown,
    MaterialInput,
    Sticky,
    Tinymce,
    UploadImage,
    Warning,
    ParkingSensorDetail
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

  private booleanOptions = [
    { key: 'true', name: 'Available' },
    { key: 'false', name: 'Not Available' }
  ]

  public isNumber = (event: any) => {
    alert('test isnumber')
    event = (event) ? event : window.event;
      var charCode = (event.which) ? event.which : event.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        event.preventDefault();;
      } else {
        return true;
      }
  }

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

  private postForm = Object.assign({}, defaultChargeStationData)
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
    return 'this.postForm.abstractContent.length'
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
      const { data } = await getChargeStation(id, { /* Your params here */ })
      // const { data } = await getArticle(id, { /* Your params here */ })
      console.log('data  ::: ', data)
      this.postForm = data.chargestation
      // Just for test
      this.postForm.title += `   Charge Point Id:${this.postForm.id}`
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Charge Station'
      // this.postForm.status = this.postForm.status.toString()

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
        // this.postForm.status = 'published'
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
    // if (this.postForm.fullContent.length === 0 || this.postForm.title.length === 0) {
    //   this.$message({
    //     message: 'Title and detail content are required',
    //     type: 'warning'
    //   })
    //   return
    // }
    // this.$message({
    //   message: 'The draft saved successfully',
    //   type: 'success',
    //   showClose: true,
    //   duration: 1000
    // })
    // this.postForm.status = 'draft'
  }

  private async getRemoteUserList(name: string) {
    const { data } = await getUsers({ name })
    if (!data.items) return
    this.userListOptions = data.items.map((v: any) => v.name)
  }

  @Watch('theme')
  private onThemeChange() {
    toggleClass(document.body, 'custom-theme')
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
