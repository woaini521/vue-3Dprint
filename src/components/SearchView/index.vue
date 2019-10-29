<template>
  <el-form class="search-form" :inline="true" :model="queryColums" ref="searchForm">
    <template v-for="(item,key) in queryColums">
<!--      字符串搜索-->
      <el-form-item
        :label="item.label"
        :key="key"
        class="item"
        :prop="key +'.defaultValue'"
        v-if="item.type === 'string' && !item.options">
        <el-input
          clearable
          :placeholder="'请输入'+item.label"
          v-model="item.defaultValue"
          :maxlength="item.maxlength"
        ></el-input>
      </el-form-item>
<!--      日期搜索-->
      <el-form-item
        :label="item.label"
        :key="key"
        class="item"
        :prop="key +'.defaultValue'"
        v-if="item.type === 'date' && !item.options && !item.isRange">
        <el-date-picker
          clearable
          type="date"
          :placeholder="'请选择' + item.label"
          :editable="false"
          v-model="item.defaultValue">
        </el-date-picker>
      </el-form-item
        >
<!--      日期范围搜索-->
      <el-form-item
        :label="item.label"
        :key="key"
        class="item"
        v-if="item.type === 'date' && !item.options && item.isRange">
        <el-col :span="11">
          <el-form-item :prop="key + '.defaultValue.start'">
            <el-date-picker
              clearable
              type="date"
              placeholder="请选择开始日期"
              :editable="false"
              v-model="item.defaultValue.start">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">&nbsp;-</el-col>
        <el-col :span="11">
          <el-form-item
            :prop="key +'.defaultValue.end'">
            <el-date-picker
              clearable
              type="date"
              placeholder="请选择结束日期"
              :editable="false"
              v-model="item.defaultValue.end">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

<!--      日期时间搜索-->
      <el-form-item
        :label="item.label"
        :key="key"
        class="item"
        :prop="key + '.defaultValue'"
        v-if="item.type === 'datetime' && !item.options && !item.isRange">
        <el-date-picker
          clearable
          type="datetime"
          :placeholder="'请选择' + item.label"
          :editable="false"
          :v-modle="item.defaultValue">
        </el-date-picker>
      </el-form-item>
<!--      日期时间范围搜素-->
      <el-form-item
        :label="item.label"
        :key="key"
        class="item"
        v-if="item.type === 'datetime' && !item.options && item.isRange">
        <el-col :span="11">
          <el-form-item :prop="key + '.defaultValue.start'">
            <el-date-picker
              clearable
              type="datetime"
              placeholder="请选择开始日期"
              :editable="false"
              v-model="item.defaultValue.start">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">&nbsp;-</el-col>
        <el-col :span="11">
          <el-form-item
            :prop="key +'.defaultValue.end'">
            <el-date-picker
              clearable
              type="datetime"
              placeholder="请选择结束日期"
              :editable="false"
              v-model="item.defaultValue.end">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

<!--      下拉框搜索-->
      <el-form-item
        :label="item.label"
        :key="key"
        class="item"
        :prop="key + '.defaultValue'"
        v-if="item.options">
        <el-select
          :placeholder="'请选择' + item.label"
          clearable
          v-model="item.defaultValue">
          <el-option
            v-for="option in item.options"
            :key="option.key"
            :label="option.desc"
            :value="option.key">
          </el-option>
          <el-option v-if="item.bOptionDefault" value label="全部"></el-option>
        </el-select>
      </el-form-item>
    </template>
<!--    按钮-->
    <el-form-item class="item" label-width="10px">
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button type="default" @click="reset('searchForm')">重置</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
    export default {
        name: "index",
        props: ["colums"],
        data(){
            let queryColums = {};
            if(this.colums){
                for(let key in this.colums){
                    let colum = this.colums[key];
                    if(!colum.notCreated && colum.queryable){
                        queryColums[key] = colum;
                    }
                }
            }
            return { queryColums };
        },

        methods:{
            search(){
                let queryCondition = {};
                if(this.queryColums){
                    for(let key in this.queryColums){
                        let queryColum = this.queryColums[key];
                        let name = key;
                        if(queryColum.queryAlias && queryColum.queryAlias !== ""){
                            name = queryColum.queryAlias;
                        }
                        if(queryColum.isRange){ //范围查询
                            name = name.replace(/(\w)/,v => v.toUpperCase());
                            //范围查询
                            if(queryColum.defaultValue.start && queryColum.defaultValue.start !== ""){
                                if(queryColum.type === "date"){
                                    queryCondition["start" + name] = queryColum.defaultValue.start.format("yyyy-MM-dd");
                                }else if(queryColum.type === "datetime"){
                                    queryCondition["start" + name] = queryColum.defaultValue.start.format("yyyy-MM-dd hh:mm:ss");
                                }else{
                                    queryCondition["start" + name] = queryColum.defaultValue.start.format("yyyy-MM-dd");
                                }
                            }
                            if(queryColum.defaultValue.end && queryColum.defaultValue.end !== ""){
                                if(queryColum.type === "date"){
                                    queryCondition["end" + name] = queryColum.defaultValue.start.format("yyyy-MM-dd");
                                }else if(queryColum.type === "datetime"){
                                    queryCondition["end" + name] = queryColum.defaultValue.start.format("yyyy-MM-dd hh:mm:ss");
                                }else{
                                    queryCondition["end" + name] = queryColum.defaultValue.start.format("yyyy-MM-dd");
                                }
                            }
                        }else{  //非范围查询
                            if(queryColum.defaultValue !== ""){
                                if(queryColum.type === "date"){
                                    //queryCondition[name] = queryColum.defaultValue.format("yyyy-MM-dd");
                                    queryCondition[name] = queryColum.defaultValue;
                                }else if(queryColum.type === "datetime"){
                                    queryCondition[name] = queryColum.defaultValue.format("yyyy-MM-dd hh:mm:ss");
                                }else{
                                    queryCondition[name] = queryColum.defaultValue;
                                }
                            }
                        }
                    }
                }
                this.$emit("query",queryCondition);
            },
            reset(formName){
                this.$refs[formName].resetFields();
                this.$emit("query",{});
            }
        }
    }
</script>

<style lang="scss">
  .search-form .el-form-item .el-input__inner{
    padding-right: 20px;
  }
  .search-form .el-form-item{
    margin: auto 10px auto 0;
    font-weight: bold;
  }
</style>
