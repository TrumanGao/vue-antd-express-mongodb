# vue-antd-express-mongodb
vue-antd-express-mongodb开发的后台，用于电影记录

1. 创建express服务
2. 创建vue项目
3. vue引入ant-design-vue
4. 根据官方文档指引，按需引入
+ 注意：此时重启vue项目会有三个报错
    - Failed to resolve loader: less-loader  // 安装less-loader
    - Cannot find module 'less' // 安装less
    - Inline JavaScript is not enabled. Is it set in your options? // 打开node_modules\less-loader\dist\index.js，22行声名变量options下面添加一行代码：options.javascriptEnabled = true
5. 重启vue项目，成功

6. 进入安装mongodb的目录，cd bin，启动mongodb
7. 访问http://127.0.0.1:27017

8. 进入安装adminMongo的目录，npm start启动adminMongo
9. 访问http://0.0.0.0:1234/ 