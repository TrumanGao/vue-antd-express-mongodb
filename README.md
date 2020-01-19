# vue-antd-express-mongodb
vue-antd-express-mongodb开发的后台，用于电影记录

1. 创建express服务
2. 创建vue项目
3. vue引入ant-design-vue
4. 根据官方文档指引，按需引入
+ 注意：此时重启vue项目会有三个报错
1) Failed to resolve loader: less-loader  // 安装less-loader
2) Cannot find module 'less' // 安装less
3) Inline JavaScript is not enabled. Is it set in your options? // 打开node_modules\less-loader\dist\index.js，22行声名变量options下面添加一行代码：options.javascriptEnabled = true
5. 重启vue项目