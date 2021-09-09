<template>
    <el-container style="max-width:80%;margin:0 auto" class="mt-4">
        <div class="row">
            <div class="col-sm-3">
                <div class="text-center mb-4">
                    <!-- <b-img id="avatar" :src="myProfile.avatar" rounded="circle" alt="Circle image" style="max-width:250px;border:1px solid black" /> -->
                    <div class="dashboard-widget mb-30  sticky-menu">
                        <div class="user">
                            <div class="thumb-area">
                                <div class="thumb">
                                    <img :src="avatarUrl" alt="user" style="max-width:100px;max-height:100px;" @error="replaceByDefault">
                                </div>
                            </div>
                            <div class="content">
                                <input type="file" @change="handleChangeImage">
                                <p class="username">
                                    ABC
                                </p>
                                <span class="email">abc@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                <div>
                    <hr>
                    <el-form
                        ref="rulesProfile"
                        :model="myProfile"
                        status-icon
                        :rules="rulesProfile"
                        label-width="120px"
                    >
                        <el-form-item label-width="auto" prop="firstName">
                            <el-input v-model="myProfile.firstName" placeholder="First name" />
                        </el-form-item>
                        <el-form-item label-width="auto" prop="lastName">
                            <el-input v-model="myProfile.lastName" placeholder="Last name" />
                        </el-form-item>
                        <el-form-item label-width="auto" prop="email">
                            <el-input v-model="myProfile.email" placeholder="Email" />
                        </el-form-item>
                        <el-form-item label-width="auto" prop="birthday">
                            <el-date-picker
                                v-model="myProfile.birthday"
                                type="date"
                                placeholder="Birthday"
                                :picker-options="pickerOptions"
                            />
                        </el-form-item>

                        <el-form-item v-if="showAddressInput" label-width="auto" prop="address">
                            <el-input v-model="myProfile.address" placeholder="Address" />
                        </el-form-item>
                        <hr>
                        <el-button @click="handleSave('rulesProfile')">
                            Save change
                        </el-button>
                    </el-form>
                </div>
            </div>
        </div>
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
            >
                <el-form-item label-width="auto" prop="oldPassword">
                    <el-input v-model="passwordForm.oldPassword" placeholder="Old Password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label-width="auto" prop="password">
                    <el-input v-model="passwordForm.password" placeholder="Password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label-width="auto" prop="rePassword">
                    <el-input v-model="passwordForm.rePassword" placeholder="Re-Password" type="password" autocomplete="off" />
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
    </el-container>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { ROLE_ID } from '~/commom/enum';
import { authService } from '~/services/auth';
import { meService } from '~/services/me';
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
            pickerOptions: {
                disabledDate(time:Date) {
                    return time.getTime() > Date.now();
                }
            },
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
                avatar: require('~/assets/images/avatar-default.png'),
                birthday: new Date()
            },
            dialogVisible: false,
            passwordForm: {
                oldPassword: '',
                password: '',
                rePassword: ''
            },
            rules: {
                oldPassword: [
                    { validator: validateOldPass, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                rePassword: [
                    { validator: validateRePass, trigger: 'blur' }
                ]
            },
            rulesProfile: {
                firstName: [
                    {
                        required: true,
                        message: 'Please input First name!',
                        trigger: 'blur',
                    }
                ],
                address: [
                    {
                        required: true,
                        message: 'Please input Address!',
                        trigger: 'blur',
                    }
                ],
                email: [
                    {
                        required: true,
                        message: 'Please input Email!',
                        trigger: 'blur',
                    },
                    {
                        type: 'email',
                        message: 'Email is invalid!',
                        trigger: 'blur',
                    }
                ],
                birthday: [
                    {
                        required: true,
                        message: 'Please select birthday!',
                        trigger: 'blur',
                    },
                    {
                        type: 'date',
                        max: new Date(),
                        message: 'Please select birthday!',
                        trigger: 'blur',
                    },
                ]
            },
            avatarUpload: null as File | null,
        };
    },
    computed: {
        ...mapGetters('auth', ['profile']),
        showAddressInput():boolean {
            return !this.$auth.isRoles(ROLE_ID.SUPER_ADMIN);
        },
        avatarUrl(): string {
            return this.myProfile.avatar ?? '';
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            this.myProfile = { ...this.profile };
            this.$nuxt.$loading.finish();
        });
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
        },
        handleChangeImage(e:any) {
            if (e.target.files && e.target.files.length) {
                const file = e.target.files[0];
                const urlCreator = window.URL || window.webkitURL;
                const imageUrl = urlCreator.createObjectURL(file);
                const image :any = document.getElementById('avatar');
                if (image)
                    image.src = imageUrl;
                this.avatarUpload = file;
            }
        },
        handleSave(formName: string) {
            this.$nuxt.$loading.start();
            this.$refs[formName].validate(async (valid:boolean) => {
                if (valid) {
                    if (this.avatarUpload) {
                        const formData = new FormData();
                        formData.append('avatar', this.avatarUpload);
                        await meService.uploadAvatar(formData).catch(error => {
                            this.$notify.error({
                                title: 'Error',
                                message: error.message || 'Cannot update avatar'
                            });
                        });
                    }
                    console.log(this.myProfile);

                    const result = await meService.updateProfile(this.myProfile).catch(error => {
                        this.$notify.error({
                            title: 'Error',
                            message: error.message || 'Cannot update profile'
                        });
                    });
                    if (result) {
                        this.$notify.success({
                            title: 'Success',
                            message: 'Update profile successfully!'
                        });
                    }
                }
            });
            this.$nuxt.$loading.finish();
        },
        replaceByDefault(e:any) {
            e.target.src = require('~/assets/images/avatar-default.png');
        }
    }
};
</script>
<style lang="scss" scoped>
> ::placeholder {
  color: black;
  opacity: 1; /* Firefox */
}

.dashboard-widget {
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 0px 6px 18px 0px rgb(16 5 54 / 17%);
    padding: 30px 20px;
}
.sticky-menu {
    position: sticky;
}

.username{
    color: #37406f;
    font-size: 24px;
    line-height: 28px;
    margin-top: 20px;
    margin-bottom: 0%;
}

.email{
    text-align: center;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    color: #52606d;
    line-height: 26px;
}

.thumb-area {
    width: 100px;
    margin: 0 auto 30px;
    position: relative;
}

.dashboard-widget .user .thumb-area .thumb {
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
}
.dashboard-widget .user {
    text-align: center;
    margin-bottom: 30px;
}

</style>
