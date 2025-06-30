import asyncio
import websockets
from LLM import agent  # 导入原有的agent函数

async def websocket_handler(websocket):
    try:
        print("新的客户端连接")
        async for message in websocket:
            print(f"收到消息: {message}")
            # 调用 agent 函数处理消息
            response = await agent(message)
            # 发送响应回客户端
            await websocket.send(response)
            print(f"发送响应: {response}")
    except websockets.exceptions.ConnectionClosed:
        print("客户端断开连接")
    except Exception as e:
        print(f"发生错误: {str(e)}")

async def main():
    # 启动 WebSocket 服务器
    server = await websockets.serve(
        websocket_handler,
        "127.0.0.1",
        8765,
        ping_interval=None  # 可选：禁用自动ping以减少网络流量
    )
    print("WebSocket 服务器已启动，监听端口 8765")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main()) 