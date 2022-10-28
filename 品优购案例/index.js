window.addEventListener('load',function() {
    // 运动函数封装
function animate(obj,target){
    clearInterval(obj.timer);//清除重复调用的动画，防止叠加
    obj.timer = setInterval(function(){
    /* var obj = {};
    obj.name = 'andy' */
    //将周期性计时器方法作为属性赋给obj对象  属性名timer timer：setInterval(function(){}
    //图片移动距离 / 步长 =速度 （周期性执行这个步长达到变速，因为offsetLeft是动态的）
    var step = (target - obj.offsetLeft) / 10;  
    //三元表达式 步长取整
    step = step > 0 ? Math.ceil(step) : Math.floor(step);  
    // 到达后停止
    if(obj.offsetLeft == target){
        clearInterval(obj.timer);
    }
    obj.style.left = obj.offsetLeft + step +'px';
    },10)
}

// 小圆排他封装函数
function circleChange() {
// 清空所有小圆(左右点击都会使用,直接封装成函数)
for(var i = 0; i < ol.children.length; i++){
        ol.children[i].className = '';
} 
    // 留下当前小圆的current
    ol.children[circle].className = 'current';
}

//获取元素
var arrow_l = document.querySelector('.arrow_l');
var arrow_r = document.querySelector('.arrow_r');
var focus = document.querySelector('.focus');
var focus_ul = focus.querySelector('ul');
var focus_li = focus.querySelectorAll('li')
var ol = focus.querySelector('.circle');
var focusWidth = focus.offsetWidth;
focus.addEventListener('mouseenter',function(){
    arrow_l.style.display = 'block';
    arrow_r.style.display = 'block';
    clearInterval(timer); //不使用就清楚赋null
    timer = null; 
})
focus.addEventListener('mouseleave',function(){
    arrow_l.style.display = 'none';
    arrow_r.style.display = 'none';
    timer = setInterval(function() {  //因为在最后已经声明了这个timer,直接使用不需要var
    arrow_r.click();
    },3000)
    
})
for (var i = 0;i < focus_li.length; i++){
    var li = document.createElement('li');
    // 为每个li设置索引号属性  提供给后面动画
    li.setAttribute('index',i);   
    //随着i循环 为每一个li设置一个index数字，从0开始
    //图片轮播动画 （移动距离=图片宽度*第几个（为每个li添加索引号index））
    // 索引号从0开始，第一个0，达到效果点击第一个不移动，点击第二个移动一个图片距离
    //封装移动动画函数 （有定位才能移动，改变定位top/left移动）
    ol.appendChild(li);
    ol.children[0].className = 'current';
    /* var ol_li = ol.querySelector('li');  不足写法
ol_li.addEventListener('click',function() {
    for(var i = 0; i < ol_li.length; i++){
        ol_li[i].className = '';
    }    // 创建li之后直接对其绑定事件,不需要另外循坏再创建绑定事件，提高效率
}) */
    li.addEventListener('click',function() {
        for(var i = 0; i < ol.children.length; i++){
            // 次数为ol子元素的个数
        ol.children[i].className = '';
    }
    this.className = 'current'; //点击哪个哪个生效
    // 这里需要给current加权重，否则权重不够
    var index = this.getAttribute('index');
    //调用封装函数 点击一次调用一次
    animate(focus_ul,- index * focusWidth);
    //我们移动的是ul和图片的大小，但是其实获取不到具体数值，因为不确定产品图片个数
    // 但是盒子的大小是和ul产品图片大小相等的，所以我们的target应该是 盒子*移动到第几个的num

    // 解决点击第三个小圆再点击右箭头跳转到第二个图片和第二个小圆的bug
    num = circle = index;
    })
}

//点击左侧按钮左右滚动   (始终要理解offsetLeft是动态的,当left改变时,offsetLeft也改变了)
// 无缝衔接滚动(再最后一li后clone第一li然后当移动到clone时令left = 0回到最左边 ）
var frist_li = focus_ul.children[0].cloneNode(true);  //true 深克隆 false浅克隆
focus_ul.appendChild(frist_li);
var num = 0;
var circle = 0;
arrow_r.addEventListener('click',function() {
    if(num == focus_ul.children.length - 1){
        //移动到最后一个li后，再点击就是跳转到第一个li（复制第一个li）
        // 这里有四个li，点击三次到最后一个，点击4次到第五个也就是复制的第一个li
        // 使用点击次数和li的关系是length-1
        // 点击到了第五个li就让点击次数置0，也使left置零
        // 由于 num++ 这样的话下次点击就是 num=1*focusWidth   left = 0 +focusWidth 也就是第二个li
        num = 0;
        focus_ul.style.left = 0;
    }
    num++;
    animate(focus_ul, -num * focusWidth);

    // 小圆跟随箭头移动  从第一个开始 点击一次++一次
    circle++;
    // 由于小li复制了一个比小圆多，circle=4时也就是重新回到第一张，所以当小圆走完一遍之后要置零
    circle = circle % ol.children.length;
    // 调用封装函数清空所有小圆
    circleChange();
})

// 右侧按钮功能   (始终要理解offsetLeft是动态的,当left改变时,offsetLeft也改变了)
arrow_l.addEventListener('click',function() {
    if(num == 0){
    // 将left值改为最后一个clone.li，再通过点击animate动画移动到倒数第二个li
    // 因为ul是先将left变成最后一个，一共五个，left变成第五个此时的Left应该是ul.length-1*focusWidth
    // num==0,left就变成最后那个复制的li了,num也变成最后li的
    // 再次点击,num-- left 变成ul.length-2*focusWidth 又由于处于最后一个li,所以向左运动
        num = focus_ul.children.length-1;
    // 向左移动,负值   如果没加单位left没变 但是num变化了,所以就会向右运动,而不是向左运动,直到left=ul.length-2*focusWidth,也就是倒数第二个li
        focus_ul.style.left = -num * focusWidth + 'px';
    }
    num--;
    animate(focus_ul, -num * focusWidth);

    // 小圆跟随左箭头移动 点击一次--次 跳转到最后一个小圆也就是下标为3/ol.children.length-1
    circle--;
    if(circle < 0) {
        circle = ol.children.length-1;
    }
    // 或者三元表达式:circle = circle < 0 ? ol.children.length-1 : circle;
    circleChange();
})
// 自动播放轮播图(定时器)   手动点击事件
var timer = setInterval(function() {
// 自动播放轮播图就是手动点击左按钮,js有手动点击事件,自动为我们执行某个事件
arrow_r.click();
},3000)
// 在开头已有鼠标经过停止这个计时器,移开启动计时器即可

// 最后可以添加一给节流阀效果 令flag=true时才能执行左右按钮事件 也就是左右按钮事件完成再令flag=true
// 也就是再animate()内再添加一个回调函数 函数内令flag=true,在左右点击按钮事件内先添加if条件,为ture时
// 再执行if内的左右按钮原本的功能

//  if和  && 运算符有类似功能
})


//轮播图板块
// 轮播图功能: 
// 鼠标移动到上面显示左右点击按键  离开隐藏
// 鼠标在轮播图上停止播放 
// 鼠标离开继续自动播放
// 点击向左向右播放对应图片
// 自动播放 
// 点击小圆点跳转到效果图