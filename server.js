import { WebSocketServer } from 'ws';
import { agent } from './llm.js';

// WebSocket服务器配置
const HOST = '127.0.0.1';  // 你的公网IP地址
const PORT = 8765;

// 创建WebSocket服务器
const wss = new WebSocketServer({
    host: HOST,
    port: PORT
});

console.log(`WebSocket服务器已启动，监听地址: ws://${HOST}:${PORT}`);

// 连接计数器
let connectionCount = 0;

// WebSocket连接处理
wss.on('connection', (ws, req) => {
    const clientId = ++connectionCount;
    const clientIP = req.socket.remoteAddress;
    
    console.log(`新的客户端连接 [ID: ${clientId}, IP: ${clientIP}]`);
    
    // 发送欢迎消息
    ws.send(JSON.stringify({
        type: 'system',
        message: '连接成功！我是你的智能助手小光，有什么可以帮助你的吗？'
    }));

    // 消息处理
    ws.on('message', async (data) => {
        try {
            const message = data.toString();
            console.log(`收到来自客户端 ${clientId} 的消息: ${message}`);
            
            // 发送正在处理的消息
            ws.send(JSON.stringify({
                type: 'system',
                message: '正在思考中...'
            }));

            // 调用LLM处理消息
            const response = await agent(message);
            
            console.log(`发送响应给客户端 ${clientId}: ${response}`);
            
            // 发送处理结果
            ws.send(JSON.stringify({
                type: 'response',
                message: response
            }));

        } catch (error) {
            console.error(`处理客户端 ${clientId} 消息时发生错误:`, error);
            
            // 发送错误消息
            ws.send(JSON.stringify({
                type: 'error',
                message: `抱歉，处理你的消息时遇到了问题：${error.message}`
            }));
        }
    });

    // 连接关闭处理
    ws.on('close', (code, reason) => {
        console.log(`客户端 ${clientId} 断开连接 [代码: ${code}, 原因: ${reason || '未知'}]`);
    });

    // 错误处理
    ws.on('error', (error) => {
        console.error(`客户端 ${clientId} 连接错误:`, error);
    });
});

// 服务器错误处理
wss.on('error', (error) => {
    console.error('WebSocket服务器错误:', error);
});

// 优雅关闭处理
process.on('SIGINT', () => {
    console.log('\n正在关闭WebSocket服务器...');
    wss.close(() => {
        console.log('WebSocket服务器已关闭');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n正在关闭WebSocket服务器...');
    wss.close(() => {
        console.log('WebSocket服务器已关闭');
        process.exit(0);
    });
});

// 未捕获异常处理
process.on('uncaughtException', (error) => {
    console.error('未捕获的异常:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的Promise拒绝:', reason);
}); 