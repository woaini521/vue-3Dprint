<template>
  <div class="body">
    <div class="form">
      <el-form ref="form" :rules="rules" :model="userInfo">
<!--        <div class="line">-->
<!--          <div class="label">头像</div>-->
<!--          <el-image :src="avatar"></el-image>-->
<!--        </div>-->
        <div class="line">
          <div class="label">账号</div>
          <div class="value">{{userInfo.userName}}</div>
        </div>
        <div class="line">
          <div class="label">昵称</div>
          <div class="value">
            <el-form-item class="form-item" prop="nickName">
              <el-input autocomplete="off" placeholder="请输入昵称" v-model="userInfo.nickName" size="small" maxlength="10"
                        show-word-limit></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="line">
          <div class="label">创建时间</div>
          <div class="value">{{userInfo.createDate}}</div>
        </div>
        <div class="line">
          <div class="label">总容量</div>
          <div class="value">{{userInfo.space}}</div>
        </div>
        <div class="line">
          <div class="label">已用容量</div>
          <div class="value">{{userInfo.spaceUsed}}</div>
        </div>
      </el-form>
      <div class="line_btn">
        <el-button type="primary" @click="save('form')" :loading="loading">保存</el-button>
        <el-button type="info" @click="reset('form')" :loading="loading">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "UpdatePwd",
        data() {
            const validate0 = (rule, value, callback) => {
                if (!this.checkSpecialKey(value)) {
                    callback(new Error('不能使用特殊字符'));
                } else {
                    callback();
                }
            };
            return {
                avatar: require('@/static/user_128px.png'),
                userInfo: {},
                loading: false,
                rules: {
                    nickName: [
                        {min: 2, max: 10, message: '昵称限制2-10个字符', trigger: 'blur'},
                        {required: true, message: '昵称不能为空', trigger: 'blur'},
                        {validator: validate0, trigger: 'blur'}
                    ]
                }

            };
        },
        created() {
            this.getUser();
        },
        methods: {
            checkSpecialKey(str) {
                const specialKey = "[`~!#$^&*()=|{}':;'\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘' ";
                for (let i = 0; i < str.length; i++) {
                    if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
                        return false;
                    }
                }
                return true;
            },
            getUser() {
                let that = this;
                that.$axios.get(that.$api.userInfo.getOne, {
                    params: {
                        userName: that.$store.state.TOKEN.name
                    }
                }).then(res => {
                    setTimeout(function () {
                        if (res) {
                            that.userInfo = res.data.data;
                        }
                    }, 500)
                }).catch(res => {
                })
            },
            save(form) {
                let that = this;
                that.$refs[form].validate((valid) => {
                    if (valid) {
                        that.loading = true;
                        that.$axios.put(that.$api.userInfo.update,
                            that.userInfo
                        ).then(res => {
                            that.loading = false;
                            if (res) {
                                that.$message.success("保存成功");
                                that.$store.commit('saveNickName', that.userInfo.nickName);
                                that.$router.replace("/admin/updateInfo");
                            }
                        }).catch(res => {

                        })
                    }
                });
            },
            reset(form) {
                this.$refs[form].resetFields();
                this.loading = true;
                this.getUser();
                this.loading = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
  .body {
    width: 95%;
    margin: 0 auto;

    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #fff;
      border-radius: 8px;
      box-shadow: #b8bacc 0 2px 4px;
      margin: 10px auto;
      padding: 40px 0;

      .line {
        line-height: 60px;
        width: 320px;
        padding: 5px 20px;
        border-bottom: #b8bacc 0.5px dashed;
        display: flex;

        .label {
          font-size: 15px;
          text-align: right;
          width: 70px;
        }

        .value {
          margin-left: 50px;
          font-size: 16px;
          color: #b8bacc;
          height: 60px;

          .form-item {
            margin-top: 8px;
          }
        }
      }

      .line_btn {
        margin: 20px 0;
        padding: 5px 20px;
        text-align: center;
      }
    }
  }
</style>
