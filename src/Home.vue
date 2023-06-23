<!--
 * @Author: Youuuuu 9694096+qq1293654480@user.noreply.gitee.com
 * @Date: 2022-10-20 15:56:07
 * @LastEditors: Youuuuu 9694096+qq1293654480@user.noreply.gitee.com
 * @LastEditTime: 2022-10-20 19:53:28
 * @FilePath: \vue-query-builder\src\Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>

<el-container style="height: 600px; border: 2px solid #eee">

<el-aside width="700px" style="background-color: rgb(238, 241, 246)">

  <vue-query-builder :rules="rules" v-model="output" :labels="labels" @sql="getSql"></vue-query-builder>--
</el-aside>

<el-container>
  <el-header style="text-align: left;background-color: #F7F7F7;border-style:solid; border-color:#F7F7F7; ">

  <el-button :plain="true" type="primary" @click="open2">查询</el-button>

  </el-header>

  <el-main>
      <el-table
      border
  :data="tableData"
  stripe

  style="width: 100%">
  <el-table-column
    prop="id"
    label="ID"
    width="80">
  </el-table-column>
  <el-table-column
    prop="userId"
    label="用户ID"
    width="100">
  </el-table-column>
  <el-table-column
    prop="name"
    label="名字">
  </el-table-column>
  <el-table-column
    prop="type"
    label="类型">
  </el-table-column>
  <el-table-column
    prop="createTime"
    label="创建时间">
  </el-table-column>
</el-table>

  </el-main>
</el-container>

</el-container>
<el-footer>
  <strong> Where条件：{{sql}}</strong>
 </el-footer>
  </div>
</template>

<script>
import VueQueryBuilder from "./VueQueryBuilder";
export default {
data() {
  return {
    rules: [
      {
        type: "text",
        id: "id",
        label: "Id"
      },
      {
        type: "text",
        id: "userId",
        label: "UserId"
      },
      {
        type: "text",
        id: "name",
        label: "Name"
      },
      {
        type: "text",
        id: "type",
        label: "Type"
      },
      {
        type: "text",
        id: "createTime",
        inputType: "date",
        label: "CreateTime",
      //  operands: ["Start Date", "End Date"]
      }
    ],
    output: {},
    labels: {
      matchType: "匹配类型",
      matchTypes: [
        { id: "and", label: "AND" },
        { id: "or", label: "OR" }
      ],
      addRule: "添加规则",
      removeRule: "&times;",
      addGroup: "添加组",
      removeGroup: "&times;",
      textInputPlaceholder: "value"
    },
    editForm: {
      sql: this.sql
    },
    tableData: [
    {  }
  ]
  };
},
computed: {
  outputFormatted: function() {
    return JSON.stringify(this.output, null, 2);
  }
},
components: {
  VueQueryBuilder
},
methods: {
  updateQuery: function(value) {
    this.output = value;
  },
  getSql(sql) {
    this.sql = sql;
  },
  open() {
    this.$axios.get("http://localhost:8000/query/test/123").then(res => {
      console.log(res);
      this.$message(this.sql);
    });
  },
  open2() {
    this.editForm.sql = this.sql;
    this.$axios
      .post( "http://localhost:8000/query/test", this.editForm)
      .then(res => {
        console.log(res.data.data);
        this.tableData=res.data.data.list;
     //   this.$message(this.sql);
        this.$notify({
          title: '成功',
          message: '查询成功',
          type: 'success'
          ,
          duration: 1500
        });
      });
  }
}
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #8dc4fa;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
