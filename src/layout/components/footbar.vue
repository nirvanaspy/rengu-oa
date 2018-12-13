<template>
    <div class="footbar">
        <div class="footbar-left">
            <div class="wrapper">
                <el-dropdown trigger="click">
                    <div class="menu-wrapper">
                        <span class="mini-menuWrapper" style="color: #fff">
                            <svg-icon icon-class="menu"></svg-icon>
                            菜单
                        </span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item style="display:block;" v-for="item in permission_routers" v-if="!item.hidden && item.children">
                        <span>
                            <router-link :to="item.path + item.children[0].path">
                            <svg-icon class="icon-item" :icon-class="item.children[0].meta.icon"></svg-icon>
                            {{item.children[0].meta.title}}
                        </router-link>
                        </span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="footbar-right">
            <span class="changeColor" @click="changeBackColor">
                <svg-icon icon-class="chanBac"></svg-icon>
            </span>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "footbar",
        data() {
            return {

            }
        },
        methods: {
            changeBackColor() {
                this.$store.dispatch('toggleMode')
            }
        },
        computed: {
            ...mapGetters([
                'permission_routers'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    .footbar {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: #1d2935;
        color: #fff;
        .footbar-right, .footbar-left {
            display: inline-block;
            width: 50%;
        }
        .footbar-right {
            .changeColor{
                width: 40px;
                cursor: pointer;
                float: right;
                display: inline-block;
                color: #fff;
            }
        }
        .footbar-left {
            .wrapper {
                display: none;
                width: 80px;
                cursor: pointer;
                float: left;
                color: #fff;
                height: 30px;
            }
        }
    }
</style>
