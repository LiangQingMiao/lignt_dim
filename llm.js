import fetch from 'node-fetch';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 阿里云API配置
const API_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation";
const API_KEY = "sk-06097ab4ae604cda83c36d730d3711ef";

/**
 * 调用阿里云通义千问API
 * @param {string} prompt - 用户输入的提示
 * @returns {Promise<string>} - API返回的文本响应
 */
async function qwen_llm(prompt) {
    try {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
        };

        const body = {
            "model": "qwen-max-2024-09-19",
            "input": {
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            }
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json.output.text;
    } catch (error) {
        console.error('调用LLM API时发生错误:', error);
        return `抱歉，我遇到了一些问题：${error.message}`;
    }
}

/**
 * 主要的agent函数，处理用户消息并返回规划建议
 * @param {string} message - 用户输入的消息
 * @returns {Promise<string>} - 处理后的响应
 */
async function agent(message) {
    try {
        // 读取demo.txt文件
        const demoPath = join(__dirname, 'demo.txt');
        const demo = await readFile(demoPath, 'utf-8');

        const prompt = `
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
${demo}

你现在要规划的任务是：${message}
        `;

        const response = await qwen_llm(prompt);
        return response;
    } catch (error) {
        console.error('Agent处理消息时发生错误:', error);
        return `抱歉，我在处理你的请求时遇到了问题：${error.message}`;
    }
}

export { agent, qwen_llm }; 