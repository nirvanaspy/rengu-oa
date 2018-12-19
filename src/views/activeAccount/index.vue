<template>
    <div>
        <div class="result-container">
            <h3>{{activeResult}}</h3>
            <div></div>
        </div>
    </div>
</template>

<script>
    import { activeUser } from '../../api/register';

    export default {
        name: "active",
        data() {
            return {
                activeUserId: '',
                activeResult: '',
                activeStatus: null
            }
        },
        created() {
            console.log(1)
            this.activeStatus = null
            this.activeUserId = this.getUrlParms('id')
            this.index()
        },
        methods: {
            getUrlParms(name){
                const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                let r = window.location.search.substr(1).match(reg);
                if(r!=null) {
                    return unescape(r[2]);
                }
                return null;
            },
            activeAccount() {
                activeUser(this.activeUserId).then((res) => {
                    this.activeResult = '激活成功！'
                    this.activeStatus = true
                }).catch(() => {
                    this.activeResult = '激活失败！'
                    this.activeStatus = false
                })
            }
        }
    }
</script>

<style scoped>

</style>
