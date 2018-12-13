<template>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened, isdark: currentMode.isdark}">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <navbar></navbar>
            <app-main></app-main>
            <footbar></footbar>
        </div>
    </div>
</template>

<script>
    /*import { Navbar, Sidebar, AppMain } from './components'*/
    import Navbar from './components/navbar'
    import Sidebar from './components/sidebar'
    import AppMain from './components/AppMain'
    import footbar from './components/footbar'

    export default {
        name: 'layout',
        components: {
            Navbar,
            Sidebar,
            AppMain,
            footbar
        },
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar
            },
            currentMode() {
                return this.$store.state.app.currentMode
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
