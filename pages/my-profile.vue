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
        >
            <el-form
                ref="ruleForm"
                :model="ruleForm"
                status-icon
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
            >
                <el-form-item label="Password" prop="pass">
                    <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Confirm" prop="checkPass">
                    <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Age" prop="age">
                    <el-input v-model.number="ruleForm.age" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        Submit
                    </el-button>
                    <el-button @click="resetForm('ruleForm')">
                        Reset
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
export default {
    middleware: ['authentication'],
    data() {
        // const validatePass = (_rule:any, value:string, callback:any) => {
        //     if (value === '')
        //         callback(new Error('Please input the password'));
        //     else {
        //         const ref = <ElForm>this.$refs.ruleForm as any;
        //         const that =  this as any;
        //         if (that.ruleForm.checkPass !== '')
        //             ref.validateField('checkPass');

        //         callback();
        //     }
        // };
        const validatePass = (_rule:any, value:string, callback:any) => {
            if (value === '')
                callback(new Error('Please input the password'));
            else {
                const ref = this.$refs.ruleForm as any;
                const that = this as any;
                if (that.ruleForm.checkPass !== '')
                    ref.validateField('checkPass');

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
            formPassword: {
                oldPassword: '',
                password: '',
                rePassword: ''
            },
            oldPassword: '',
            ruleForm: {
                pass: '',
                checkPass: '',
                age: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
            }
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
        handleChangePassword() {

        }
    }
};
</script>
