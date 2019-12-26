<template>
  <div class="main">
    <el-divider content-position="left"><span style="color: #f4516c; font-weight: bold">修改密码</span></el-divider>
    <div class="body">
      <el-form :model="form" ref="form" :rules="rules" label-position="right" label-width="80px"
               :hide-required-asterisk="false">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input autocomplete="off" placeholder="请输入原密码" v-model="form.oldPwd" size="small"
                    show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input autocomplete="off" placeholder="请输入新密码" v-model="form.newPwd" size="small"
                    show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input autocomplete="off" placeholder="请再次输入新密码" v-model="form.confirmPwd" size="small"
                    show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save('form')" :loading="loading">保存</el-button>
          <el-button type="info" @click="cancel('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "UpdatePwd",
        data() {
            const validate = (rule, value, callback) => {
                if (value !== this.form.newPwd) {
                    callback(new Error('密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    userName: this.$store.state.TOKEN.name,
                    oldPwd: '',
                    newPwd: '',
                    confirmPwd: ''
                },

                loading: false,
                rules: {
                    oldPwd: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                    newPwd: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                    confirmPwd: [
                        {required: true, message: '确认密码不能为空', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'},
                        {validator: validate, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            save(form) {
                let that = this;
                that.$refs[form].validate((valid) => {
                    if (valid) {
                        that.loading = true;
                        let oldPwd = that.$aes.encrypt(that.form.oldPwd);
                        let newPwd = that.$aes.encrypt(that.form.newPwd);
                        that.$axios.put(that.$api.userInfo.updatePwd, {
                            userName: that.form.userName,
                            oldPwd: oldPwd,
                            newPwd: newPwd,
                        }).then(res => {
                            that.loading = false;
                            if (res) {
                                that.$message.success("修改密码成功");
                                that.cancel(form);
                            }
                        }).catch(res => {
                            that.loading = false;
                        })
                    }
                });
            },
            // 重置表单
            cancel(form) {
                this.$refs[form].resetFields();
            },
        }
    }
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 8px;

    .body {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 40px;
    }

  }
</style>
