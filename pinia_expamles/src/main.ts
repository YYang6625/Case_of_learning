import { createApp } from "vue";
import App from "./App.vue";
// 1.终端安装好npm i pinia之后引入
// 与vuex一样，创建状态库
import { createPinia } from "pinia";
// 2.创建pinia实例
const pinia = createPinia();
const app = createApp(App);
// 3.基本与vuex创建store一致，使用也是
app.use(pinia);
// 挂载
app.mount("#app");
// 4.之后去创建一个store状态管理文件夹
// 5.创建入口文件 index.ts
