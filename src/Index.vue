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
        <h2>23131</h2>
<el-container style="height: 800px; border: 2px solid #eee">
    
  <el-aside width="600px" style="background-color: rgb(238, 241, 246)">

    <vue-query-builder :rules="rules" v-model="output" :labels="labels" @sql="getSql"></vue-query-builder>--
  </el-aside>
  
  <el-container>
    <el-header style="text-align: left; font-size: 12px">
    
    <el-button :plain="true" type="primary" @click="open2">查询</el-button>
    </el-header>
    
    <el-main>
        <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="userId"
      label="用户ID"
      width="180">
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
          id: "create_time",
          inputType: "date",
          label: "CreateTime",
          operands: ["Start Date", "End Date"]
        },
        {
          type: "custom-component",
          id: "first_name",
          label: "First Name"
        },
        {
          type: "text",
          id: "last_name",
          label: "Last Name"
        },
        {
          type: "radio",
          id: "plan_type",
          label: "Plan Type",
          choices: [
            { label: "Standard", value: "standard" },
            { label: "Premium", value: "premium" }
          ]
        },
        {
          type: "checkbox",
          id: "sizes",
          label: "Sizes",
          choices: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" }
          ]
        },

        {
          type: "select",
          id: "select",
          label: "Color",
          operators: ["=", "<>"],
          choices: [
            { label: "red", value: "Red" },
            { label: "orange", value: "Orange" },
            { label: "yellow", value: "Yellow" },
            { label: "green", value: "Green" },
            { label: "blue", value: "Blue" },
            { label: "indigo", value: "Indigo" },
            { label: "violet", value: "Violet" }
          ]
        }
      ],
      output: {},
      labels: {
        matchType: "Match Type",
        matchTypes: [
          { id: "and", label: "AND" },
          { id: "or", label: "OR" }
        ],
        addRule: "Add Rule",
        removeRule: "&times;",
        addGroup: "Add Group",
        removeGroup: "&times;",
        textInputPlaceholder: "value"
      },
      editForm: {
        sql: this.sql
      },
      tableData: [
			{
				"id": 1,
				"userId": 123,
				"name": "zhang",
				"type": 1,
				"createTime": "2022-01-20T09:44:21"
			},
			{
				"id": 2,
				"userId": 456,
				"name": "li",
				"type": 1,
				"createTime": "2022-01-20T09:44:27"
			},
			{
				"id": 3,
				"userId": 789,
				"name": "uu",
				"type": 2,
				"createTime": "2022-01-20T09:44:32"
			}
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
      //     this.$axios.get("http://jsonplaceholder.typicode.com/posts/2")
      this.$axios.get("http://localhost:8030/query/test/123").then(res => {
        console.log(res);
        this.$message(this.sql);
      });
    },
    open2() {
      this.editForm.sql = this.sql;
      this.$axios
        .post("http://localhost:8030/query/test", this.editForm)
        .then(res => {
          console.log(res);
          this.$message(this.sql);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>