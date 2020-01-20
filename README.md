# vue-antd-express-mongodb
vue-antd-express-mongodb开发的后台，用于电影记录

## 启动项目：
1. cd server/bin，npm start启动express服务
2. cd web，npm run serve 启动vue项目
3. 进入安装mongodb的目录，cd bin，启动mongodb
+ 注意：mongodb开机自动启动，此步骤可忽略
4. 进入安装adminMongo的目录，npm start启动adminMongo  
+ 前后端关联：
5. express配置跨域
6. vue配置接口基准地址


## 创建项目：
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
+ 注意：mongodb开机自动启动，此步骤可忽略
7. 访问http://127.0.0.1:27017

8. 进入安装adminMongo的目录，npm start启动adminMongo
9. 访问http://localhost:1234/