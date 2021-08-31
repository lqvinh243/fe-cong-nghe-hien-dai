<template>
    <div class="container bootstrap snippet">
        <div class="row mt-4">
            <div class="col-sm-3">
                <!--left col-->

                <div class="text-center mb-4">
                    <b-img :src="myProfile.avatar" rounded="circle" alt="Circle image" style="max-width:250px;border:1px solid black" />
                    <input type="file" class="text-center center-block file-upload">
                </div>
            </div><!--/col-3-->
            <div class="col-sm-9">
                <el-row :gutter="0">
                    <el-col :span="12">
                        <h1>Profile</h1>
                    </el-col>
                    <el-col :span="12" class="text-right">
                        <el-button @click="showChangePassword">
                            Change password
                        </el-button>
                    </el-col>
                </el-row>
                <div id="home" class="tab-pane active">
                    <hr>
                    <div style="margin-top:1rem">
                        <span>
                            First name
                        </span>
                        <el-input v-model="myProfile.firstName" placeholder="Please input" />
                    </div>
                    <div style="margin-top:1rem">
                        <span>
                            Last name
                        </span>
                        <el-input v-model="myProfile.lastName" placeholder="Please input" />
                    </div>
                    <div style="margin-top:1rem">
                        <span>
                            Address
                        </span>
                        <el-input v-model="myProfile.address" placeholder="Please input" />
                    </div>

                    <hr>
                    <el-button>Save change</el-button>
                </div><!--/tab-pane-->
            </div><!--/tab-pane-->
        </div><!--/col-9-->
        <el-dialog
            title="Update password"
            :visible.sync="dialogVisible"
            width="30%"
            :show-close="false"
        >
            <el-form
                ref="passwordForm"
                :model="passwordForm"
                status-icon
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
            >
                <el-form-item label="Old Password" prop="oldPassword">
                    <el-input v-model="passwordForm.oldPassword" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="passwordForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Confirm" prop="rePassword">
                    <el-input v-model="passwordForm.rePassword" type="password" autocomplete="off" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('passwordForm')">
                        Submit
                    </el-button>
                    <el-button @click="resetForm('passwordForm')">
                        Cannel
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { authService } from '~/services/auth';
export default {
    middleware: ['authentication'],
    data() {
        const validateOldPass = (_rule:any, value:string, callback:any) => {
            if (value === '')
                callback(new Error('Please input the password'));
            callback();
        };
        const validatePass = (_rule:any, value:string, callback:any) => {
            if (value === '')
                callback(new Error('Please input the password'));
            else {
                const ref = this.$refs.passwordForm as any;
                const that = this as any;
                if (that.passwordForm.rePassword !== '')
                    ref.validateField('rePassword');

                callback();
            }
        };
        const validateRePass = (_rule:any, value:string, callback:any) => {
            if (value === '')
                callback(new Error('Please input the re-password'));
            else {
                const that = this as any;
                if (that.passwordForm.rePassword !== that.passwordForm.password)
                    callback(new Error('Two inputs don\'t match!'));

                callback();
            }
        };
        return {
            options: [
                { key: 1, value: 'Seller' },
                { key: 2, value: 'Bidder' }
            ],
            selectKey: '',
            loadingRemote: false,
            myProfile: {
                firstName: '',
                lastName: '',
                email: '',
                avatar: ''
            },
            dialogVisible: false,
            passwordForm: {
                oldPassword: '',
                password: '',
                rePassword: ''
            },
            rules: {
                oldPassword: [
                    {
                        validator: validateOldPass, trigger: 'change'
                    }
                ],
                password: [
                    { validator: validatePass, trigger: 'change' }
                ],
                rePassword: [
                    {
                        validator: validateRePass, trigger: 'change'
                    }
                ]
            },
        };
    },
    computed: {
        ...mapGetters('auth', ['profile'])
    },
    mounted() {
        this.myProfile = this.profile;
    },
    methods: {
        handleClick() {
            console.log('click');
        },
        remoteMethod(query: string) {
            console.log(query);
        },
        handleChangePage() {
            console.log(this.page);
        },
        showChangePassword() {
            this.dialogVisible = true;
        },
        submitForm(formName: string) {
            this.$refs[formName].validate(async (valid:boolean) => {
                if (valid) {
                    const result = await authService.updatePassword(this.passwordForm.oldPassword, this.passwordForm.password).catch(error => {
                        this.$notify.error({
                            title: 'Error',
                            message: error.message || 'Cannot update password'
                        });
                    });
                    if (result) {
                        this.$notify.success({
                            title: 'Success',
                            message: 'Update password successfully!'
                        });
                    }
                }
            });
        },
        resetForm(formName: string) {
            this.$refs[formName].resetFields();
            this.dialogVisible = false;
        }
    }
};
</script>
