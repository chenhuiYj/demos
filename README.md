# demos
个人练习的一些demo，简单的小实例

## 使用方式
#### 安装依赖
    $ npm install
#### 热刷新
    $ browser-sync start --server --files '**/*.js,**/*.html'

## 目录说明

### vue和其它demos

blur-text:文字模糊

nav:滑动导航

shopping-card:购物车清单

slider-img:图片轮播

smoke-text:烟雾文字效果

sudoku:所谓的数独

tab:选项卡

todoList:小目标

### jquery-demos:基于jquery的demos

accordion:手风琴

ancient-poetry:古诗词

ancient-poetry1：古诗词

ancient-poetry2：古诗词

drop：拖拽

idiom：猜成语

light-ad：仿电商广告，局部变暗

magnifier：放大镜效果

riddle1：谜语

riddle2：谜语

slider-3：广告展示，滑动展示

taobao-ad：防淘宝广告

tiggle：展开与收起


### es6-demos:es6的demos

## 其它说明

1.现在的demo都是es5+css写的，gulp的es6和sass的编译没有进行测试过，大家注意下！

2.有些文件引入了vue.min.js，就是说明这个实例是基于vue的。vue的版本是2.2.6

3.package.json虽然配置了热刷新的代码，但是直接 npm run dev 没有起到热刷新的效果，一定要按照上图手输。
## License
### MIT