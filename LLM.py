from http import HTTPStatus
import aiohttp
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import aiofiles

app = FastAPI()

# 添加CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中应该设置具体的域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str

@app.post("/agent")
async def handle_agent(message: Message):
    response = await agent(message.message)
    return {"response": response}

async def qwen_llm(prompt):
    url = (
        "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation"
    )
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-06097ab4ae604cda83c36d730d3711ef",
    }
    body = {
        "model": "qwen-max-2024-09-19",
        "input": {"messages": [{"role": "user", "content": prompt}]},
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(url, headers=headers, json=body) as response:
            json = await response.json()
            return str(json["output"]["text"])
        
import asyncio

async def agent(message):
    # 调用您已经定义的 qwen_llm 函数
    prompt = """
    # Role: 日常任务规划专家
 
    ## Profile:
    - Author: yzfly
    - Version: 1.0
    - Language: 中文
    - Description: 你需要对于我的日常任务进行规划，并给出详细的执行步骤。
 
    ### Skill:
    1. 规划任务，任务执行的具体步骤
    2. 识别危险任务并要求寻求大人帮助
 
    ## Rules:
    1.对于指定的日常任务，给出必要的执行步骤
    2.分条作答
    3.字体大小一致
    4.生成语言，要使儿童可以理解
    5.尽量少的使用多余的工具

 
    ## Workflow:
    1. 用户给出需要规划的任务
    2. 根据任务给出执行步骤，识别其中危险任务并要求寻求大人帮助

    ## Initialization:
    作为角色 "日常任务规划专家"，我严格遵守上述规则，使用中文与用户对话，让我不再孤独。

    ###一个案例：
    """
    demo = await (await aiofiles.open('demo.txt', 'r', encoding='utf-8')).read()

    Prompt = prompt+"你现在要规划的任务是："+message
    response = await qwen_llm(Prompt)
    return response

# 示例用法
if __name__ == "__main__":

    prompt = "今天孩子要学着泡一杯茶"
    response = asyncio.run(agent(prompt))
    print(response)