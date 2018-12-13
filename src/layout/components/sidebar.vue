<template>
    <transition :name="transitionName">
        <div class="sidebar-container" v-show="isCollpase">
            <div class="sidebar-title">
                <div class="title-text">导航菜单</div>
                <div class="close-side" @click="toggleSidebar">
                    <svg-icon icon-class="close"></svg-icon>
                </div>
            </div>
            <div class="router-item">
                <ul class="router-list">
                    <!--<li class="router-item">
                        <router-link to="/home">
                            <svg-icon class="icon-item" icon-class="form"></svg-icon>
                            首页
                        </router-link>
                    </li>
                    <li class="router-item">
                        <router-link to="/about">
                            <svg-icon class="icon-item" icon-class="people"></svg-icon>
                            关于我们
                        </router-link>
                    </li>
                    <li class="router-item">
                        <router-link to="/login">
                            <svg-icon class="icon-item" icon-class="logo1"></svg-icon>
                            登录
                        </router-link>
                    </li>
                    <li class="router-item">
                        <router-link to="/register">
                            <svg-icon class="icon-item" icon-class="log"></svg-icon>
                            注册
                        </router-link>
                    </li>-->
                    <li class="router-item" v-for="item in myRoutes" v-if="!item.hidden && item.children">
                        <router-link :to="item.path + item.children[0].path">
                            <svg-icon class="icon-item" :icon-class="item.children[0].meta.icon"></svg-icon>
                            {{item.children[0].meta.title}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "sidebar",
        data() {
            return {
                myRoutes: []
            }
        },
        methods: {
            toggleSidebar() {
                this.$store.dispatch('toggleSideBar')
            }
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'permission_routers'
            ]),
            isCollpase() {
                return !this.sidebar.opened
            },
            transitionName() {
                if(!this.sidebar.opened) {
                    return 'open'
                } else {
                    return 'collpase'
                }
            }
        },
        created() {
            this.myRoutes = this.permission_routers
            // console.log(this.myRoutes)
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar-container.isCollpase {
        display: none;
    }
    .sidebar-container {
        position: fixed;
        z-index: 1000;
        bottom: 30px;
        top: 100px;
        left: 0;
        width: 250px;
        // background: #f5f5f5;
        background: rgb(51,72,92);
        /*background: hsla(0,0%,100%,.25) border-box;*/
        box-shadow: -3px 0 3px rgba(0,0,0,.1);
        .sidebar-title {
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            .title-text {
                border-bottom: 1px solid #ddd;
                color: #fff;
            }
            .close-side {
                position: absolute;
                top: 2px;
                right: 18px;
                cursor: pointer;
                color: #aaa;
            }
            .close-side:hover {
                color: #3da8f5
            }
        }
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        li {
            text-decoration: none;
            height: 40px;
            line-height: 40px;
            padding: 2px 16px;
            text-align: left;
            border-bottom: 1px solid rgb(55,77,99);
            .icon-item {
                margin-right: 10px;
            }
            a {
                display: inline-block;
                width: 100%;
                text-decoration: none;
                color: #fff;
                font-size: 14px;
                // color: #333;
            }
        }
        li.router-item:hover {
            // background: #eee;
            background: rgb(231,76,60);
        }
    }
    .sidebar-container::before {
        content: '';
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        margin: 0;
        z-index: -1;
        -webkit-filter: blur(20px);
        filter: blur(20px);
    }


    // 动画
    .open-enter {
        transform: translate3d(-100%, 0, 0);
    }
    .open-leave-to {
        /* transform: translate3d(-20%, 0, 0); */
    }
    .open-enter-active,
    .open-leave-active {
        transition: transform 0.4s ease;
    }
    .collpase-enter {
        /* transform: translate3d(-20%, 0, 0); */
    }
    .collpase-leave-to {
        transform: translate3d(-100%, 0, 0);
    }
    .collpase-enter-active,
    .collpase-leave-active {
        transition: transform 0.3s ease;
    }
    .collpase-leave-active {
        z-index: 2;
    }
    .bg-blur {
        filter: blur(20px);
    }
</style>
