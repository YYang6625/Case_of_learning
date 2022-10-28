<template>
  <div>{{ MainStore.count }}</div>
  <button @click="changeStateCount">+</button>
  <div>{{ MainStore.foo }}</div>

  <div>使用ToRefs变成响应式:{{ count }}</div>
  <div>使用ToRefs变成响应式:{{ foo }}</div>
</template>

<script lang="ts" setup>
import { useMainStore } from "../store/index";
import { storeToRefs } from "pinia"; //官方建议使用状态时，不调用任何操作

const MainStore = useMainStore(); //命名不能相同
console.log(MainStore); //代理对象，内部存储store与自身的一些方法$patch...

// pinia store中state的逻辑代码
// 使用时每次都需要添加MainStore可能会比较麻烦，此时我们就可以使用解构去一对一,然后直接使用即可
// 但是我们学习vue3时知道，解构之后不是响应式数据了
// const { count, foo } = MainStore;  //非响应式

// 所以pinia也像vue一样提供了响应式api ToRefs(pinia配套方法)
// storeToRefs也就是做了一个reactive的一个是响应式操作并返回出来对象，最后使用解构一一对应
// 使用vue3-ref的话使用就是count.value了，数据存储在value中，和之前MainStore.count也就差不多了

const { count, foo } = storeToRefs(MainStore); //结构后数据响应式
// 定义一个函数
const changeStateCount = () => {
  // 方式一，修改单个参数
  // MainStore.count++;

  // 方式二，同时修改多个数据(pinia性能优化，同时修改多个数据,建议使用)
  MainStore.$patch({
    count: MainStore.count + 1,
    foo: "4556",
    // 对对象类型操作不方便
    arr: [...MainStore.arr, 4], //解构内部数据，返回新数组[1,2,3,4]
  });

  // 方式三，直接将代理对象MainStore内state获取过来
  MainStore.$patch((state) => {
    state.count++;
    state.foo = "height";
    state.arr.push(4);
  });
  // 方式四.封装到actions做处理(与方式二相差不大)
  // 因为代理了MainStore = useMainStore = defineStore，可以直接在MainStore内部去找到方法进行使用
  // 不需要像之前 this.$store.dispatch/commit去派发给全局store(pinia每一个store都是独立的,所以直接使用各自的即可)
  MainStore.changeState(); //方法直接写到了MainStore代理对象上,直接使用
};
</script>
