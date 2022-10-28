// 定义容器（真就defineStore）
import { defineStore } from "pinia";
// pinia的store是不合并的，所以使用的时候必然要对每一个store命名

// useMainStore是一个函数
// 在组件中，使用代理对象取接收这个函数，代理对象就存在所有方法和数据，使用时只需要 代理对象.state/actions/getters
export const useMainStore = defineStore("main", {
  // 1. state 组件请求数据的三种方式
  state: () => {
    // 推荐是用箭头函数，不会造成变量的交叉污染
    return {
      count: 100,
      foo: "123",
      arr: [1, 2, 3],
    };
  },
  // 作为等同于store状态的计算值computed,存在缓存功能,依赖未改变不会重复调用
  getters: {
    // 会自动推到类型
    count10(state): number {
      return state.count + 10;  //推荐使用
      // return this.count + 10;  也可以直接使用this找到数据,但是可能需要手动去写ts返回类型,因为不能自动识别
    },
  },

  // 2.pinia的actions与vuex不同的是，这就就相当于methods，可以直接通过this去访问state中的数据
  // 支持异步任务函数，不像vuex利用mutations和actions区别同步异步
  actions: {
    changeState() {
      this.count++;
      this.foo = "789";
    },
  },
});
