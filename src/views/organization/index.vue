<template>
  <div class="app-container">

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        :label="$t('chargeStation_table.id')"
        prop="id"
        sortable="custom"
        align="center"
        min-width="25px"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Name"
        min-width="50px"
      >
        <template slot-scope="{row}">
          <span
            class="link-type"
            @click="handleUpdate(row)"
          >{{ row.operator }}</span>
          <!-- <el-tag>{{ row.operator | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('chargeStation_table.status')"
        align="center"
        min-width="32px"
      >
        <template slot-scope="{row}">
          <span style="height:60px;">
            <i class="el-icon-check"
              v-if="row.status === true"
              style="color: green;font-size:1.5em;font-weight:400;"
              title="Available"
            />
            <i class="el-icon-close fa-3x"
              v-if="row.status === false"
              style="color: red;font-size:1.5em;font-weight:400;"
              title="UnAvailable"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('chargeStation_table.lastUpdated')"
        align="center"
        min-width="54px"
      >
        <template slot-scope="{row}">
          <span>{{ row.lastUpdated }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('chargeStation_table.action')"
        align="center"
        min-width="50px"
        class-name="fixed-width"
      >
         <template slot-scope="{row, $index}">
           <el-row>
              <el-col>
                  <router-link :to="'/organization/organization/edit/'+row.id">
                    <i
                      class="el-icon-edit-outline hover"
                      style="color:blue;font-size:1.2em;"
                    />
                  </router-link>
                  &nbsp;&nbsp;&nbsp;
                  <i
                    class="el-icon-delete hover"
                    style="color:red;font-size:1.2em;"
                    @click="handleDelete(row, $index)"
                  />

              </el-col>
          </el-row>

        </template>
      </el-table-column>

    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >

      <el-form
        ref="dataForm"
        :rules="rules"
        :model="tempChargeStationData"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          :label="$t('table.type')"
          prop="type"
        >
          <el-select
            v-model="tempChargeStationData.type"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.displayName"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('table.date')"
          prop="timestamp"
        >
          <el-date-picker
            v-model="tempChargeStationData.timestamp"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>
        <el-form-item
          :label="$t('table.title')"
          prop="title"
        >
          <el-input v-model="tempChargeStationData.title" />
        </el-form-item>
        <el-form-item :label="$t('table.status')">
          <el-select
            v-model="tempChargeStationData.status"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.importance')">
          <el-rate
            v-model="tempChargeStationData.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top:8px;"
          />
        </el-form-item>
        <el-form-item :label="$t('table.remark')">
          <el-input
            v-model="tempChargeStationData.abstractContent"
            :autosize="{minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogPageviewsVisible"
      title="Reading statistics"
    >
      <el-table
        :data="pageviewsData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="key"
          label="Channel"
        />
        <el-table-column
          prop="pageviews"
          label="Pageviews"
        />
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogPageviewsVisible = false"
        >{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { cloneDeep } from 'lodash'
import { getChargeStations, getPageviews, createChargeStation, updateChargeStation, defaultChargeStationData } from '@/api/chargestations'
import { IChargeStationData } from '@/api/types'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
import Pagination from '@/components/Pagination/index.vue'

const calendarTypeOptions = [
  { key: 'CN', displayName: 'China' },
  { key: 'US', displayName: 'USA' },
  { key: 'JP', displayName: 'Japan' },
  { key: 'EU', displayName: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc: { [key: string]: string }, cur) => {
  acc[cur.key] = cur.displayName
  return acc
}, {}) as { [key: string]: string }

@Component({
  name: 'ChargeStation',
  components: {
    Pagination
  },
  filters: {
    typeFilter: (type: string) => {
      return calendarTypeKeyValue[type]
    },
    statusFilter: (status: boolean) => {
      return status === true ? 'Availabe' : 'Unavailabe'
    }
  }
})
export default class extends Vue {
  private tableKey = 0
  private list: IChargeStationData[] = []
  private total = 0
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 20,
    importance: undefined,
    title: undefined,
    type: undefined,
    sort: '+id'
  }

  private importanceOptions = [1, 2, 3]
  private calendarTypeOptions = calendarTypeOptions
  private sortOptions = [
    { label: 'ID Ascending', key: '+id' },
    { label: 'ID Descending', key: '-id' }
  ]

  private statusOptions = ['published', 'draft', 'deleted']
  private showReviewer = false
  private dialogFormVisible = false
  private dialogStatus = ''
  private textMap = {
    update: 'Edit',
    create: 'Create'
  }

  private dialogPageviewsVisible = false
  private pageviewsData = []
  private rules = {
    type: [{ required: true, message: 'type is required', trigger: 'change' }],
    timestamp: [{ required: true, message: 'timestamp is required', trigger: 'change' }],
    title: [{ required: true, message: 'title is required', trigger: 'blur' }]
  }

  private downloadLoading = false
  private tempChargeStationData = defaultChargeStationData

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getChargeStations(this.listQuery)
    this.list = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
  }

  private handleModifyStatus(row: any, status: string) {
    this.$message({
      message: 'Successful operation',
      type: 'success'
    })
    row.status = status
  }

  private sortChange(data: any) {
    const { prop, order } = data
    if (prop === 'id') {
      this.sortByID(order)
    }
  }

  private sortByID(order: string) {
    if (order === 'ascending') {
      this.listQuery.sort = '+id'
    } else {
      this.listQuery.sort = '-id'
    }
    this.handleFilter()
  }

  private getSortClass(key: string) {
    const sort = this.listQuery.sort
    return sort === `+${key}` ? 'ascending' : 'descending'
  }

  private resetTempChargeStationData() {
    this.tempChargeStationData = cloneDeep(defaultChargeStationData)
  }

  private handleCreate() {
    this.resetTempChargeStationData()
    this.dialogStatus = 'create'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private createData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        const chargestationData = this.tempChargeStationData
        chargestationData.id = Math.round(Math.random() * 100) + 1024 // mock a id
        chargestationData.operator = 'vue-typescript-admin'
        const { data } = await createChargeStation({ chargestation: chargestationData })
        data.chargestation.timestamp = Date.parse(data.chargestation.timestamp)
        this.list.unshift(data.chargestation)
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Created successfully',
          type: 'success',
          duration: 2000
        })
      }
    })
  }

  private handleUpdate(row: any) {
    this.tempChargeStationData = Object.assign({}, row)
    this.tempChargeStationData.timestamp = +new Date(this.tempChargeStationData.timestamp)
    this.dialogStatus = 'update'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private updateData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        const tempData = Object.assign({}, this.tempChargeStationData)
        tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        const { data } = await updateChargeStation(tempData.id, { chargestation: tempData })
        const index = this.list.findIndex(v => v.id === data.chargestation.id)
        this.list.splice(index, 1, data.chargestation)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      }
    })
  }

  private handleDelete(row: any, index: number) {
    this.$notify({
      title: 'Success',
      message: 'Delete Successfully',
      type: 'success',
      duration: 2000
    })
    this.list.splice(index, 1)
  }

  private async handleGetPageviews(pageviews: string) {
    const { data } = await getPageviews({ pageviews })
    this.pageviewsData = data.pageviews
    this.dialogPageviewsVisible = true
  }

  private handleDownload() {
    this.downloadLoading = true
    const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    const data = formatJson(filterVal, this.list)
    exportJson2Excel(tHeader, data, 'table-list')
    this.downloadLoading = false
  }
}

</script>

<style scoped>
.hover{
  cursor: pointer;
}
</style>
