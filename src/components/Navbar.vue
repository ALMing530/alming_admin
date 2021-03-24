<template>
    <div class="nav-bar">
        <div class="logo">ALMing</div>
        <div >
            <img class="user-icon" src="../assets/logo.png" width="50" alt="">
        </div>
    </div>
</template>
<style scoped>
.nav-bar{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgb(218, 218, 218);
}
.user-icon{
    width: 50px;
    height: 50px;
    border:  1px solid rgba(0, 0, 0, 0);
    border-radius: 50%;
    float: right;
}
.logo{
    height: 50px;
    line-height: 50px;
    color: royalblue;
    font-weight: bold;
    font-size: 30px;
    padding-left: 15px;
    float: left;
}
</style>