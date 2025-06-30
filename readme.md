# 智能助手 - JavaScript版本

这是一个基于Node.js和WebSocket的智能聊天助手，使用阿里云通义千问API提供智能对话服务。

## 功能特点

- 🤖 智能对话：基于阿里云通义千问大模型
- 💬 实时聊天：WebSocket实时通信
- 🎯 任务规划：专门为日常任务提供详细规划
- 🎨 美观界面：现代化UI设计
- 🔊 语音播放：支持文本转语音功能
- 📱 响应式设计：支持多种设备

## 项目结构

```
dim_light/
├── server.js          # WebSocket服务器
├── llm.js            # LLM功能模块
├── package.json      # 项目依赖
├── index.html        # 前端界面
├── demo.txt          # 示例案例
└── README.md         # 项目说明
```

## 安装步骤

1. **安装Node.js**
   确保你的系统已安装Node.js (版本 16+)

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置API密钥**
   在 `llm.js` 文件中修改你的阿里云API密钥：
   ```javascript
   const API_KEY = "你的API密钥";
   ```

4. **启动服务器**
   ```bash
   npm start
   ```
   或者使用开发模式（自动重启）：
   ```bash
   npm run dev
   ```

5. **访问应用**
   打开浏览器访问 `index.html` 文件

## 配置说明

### WebSocket服务器配置
在 `server.js` 中修改服务器配置：
```javascript
const HOST = '192.168.5.12';  // 你的IP地址
const PORT = 8765;            // 端口号
```

### 前端配置
在 `index.html` 中修改WebSocket连接地址：
```javascript
const ws = new WebSocket('ws://192.168.5.12:8765');
```

## API说明

### 消息格式

服务器发送的消息格式：
```json
{
  "type": "response|system|error",
  "message": "消息内容"
}
```

- `response`: 正常的AI回复
- `system`: 系统消息（连接状态等）
- `error`: 错误消息

### WebSocket事件

- `onopen`: 连接建立
- `onmessage`: 接收消息
- `onclose`: 连接关闭
- `onerror`: 连接错误

## 功能模块

### LLM模块 (`llm.js`)
- `qwen_llm(prompt)`: 调用阿里云通义千问API
- `agent(message)`: 主要的消息处理函数

### WebSocket服务器 (`server.js`)
- 实时消息处理
- 连接管理
- 错误处理
- 优雅关闭

## 部署说明

### 本地部署
1. 确保防火墙开放8765端口
2. 启动服务器：`npm start`
3. 访问前端页面

### 公网部署
1. 配置域名解析
2. 使用反向代理（如Nginx）
3. 配置SSL证书（推荐）
4. 修改前端连接地址为域名

## 故障排除

### 常见问题

1. **连接失败**
   - 检查服务器是否启动
   - 确认IP地址和端口正确
   - 检查防火墙设置

2. **API调用失败**
   - 验证API密钥是否正确
   - 检查网络连接
   - 确认API配额是否充足

3. **消息发送失败**
   - 检查WebSocket连接状态
   - 查看浏览器控制台错误信息

### 日志查看
服务器启动后会在控制台显示详细的连接和错误日志。

## 开发说明

### 添加新功能
1. 在 `llm.js` 中添加新的处理逻辑
2. 在 `server.js` 中添加相应的消息处理
3. 在前端添加对应的UI元素

### 自定义样式
修改 `index.html` 中的CSS样式来自定义界面外观。

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交Issue或联系开发者。 