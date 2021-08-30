<template>
    <div class="container bootstrap snippet">
        <div class="row">
            <div class="col-sm-10">
                <h1>User name</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3">
                <!--left col-->

                <div class="text-center mb-4">
                    <b-img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" rounded="circle" alt="Circle image" />
                    <h6>Upload a different photo...</h6>
                    <input type="file" class="text-center center-block file-upload">
                </div>
            </div><!--/col-3-->
            <div class="col-sm-9">
                <h1>Profile</h1>
                <div class="tab-content">
                    <div id="home" class="tab-pane active">
                        <hr>
                        <div style="margin-top:1rem">
                            <span>
                                First name
                            </span>
                            <el-input placeholder="Please input" />
                        </div>
                        <div style="margin-top:1rem">
                            <span>
                                Last name
                            </span>
                            <el-input placeholder="Please input" />
                        </div>
                        <div style="margin-top:1rem">
                            <span>
                                Address
                            </span>
                            <el-input placeholder="Please input" />
                        </div>
                        <hr>
                        <el-button>Save change</el-button>
                    </div><!--/tab-pane-->
                </div><!--/tab-pane-->
            </div><!--/tab-content-->
        </div><!--/col-9-->
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-03',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Home'
            }, {
                date: '2016-05-02',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Office'
            }, {
                date: '2016-05-04',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Home'
            }, {
                date: '2016-05-01',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Office'
            }],
            options: [
                { key: 1, value: 'Seller' },
                { key: 2, value: 'Bidder' }
            ],
            selectKey: '',
            page: 1,
            total: 10,
            perPage: 5,
            loadingRemote: false
        };
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
        }
    }
};
</script>
