import { agent } from './llm.js';

async function testLLM() {
    console.log('🧪 开始测试LLM功能...\n');
    
    const testCases = [
        "今天孩子要学着泡一杯茶",
        "我想学习如何做一道简单的菜",
        "如何整理我的房间"
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        console.log(`📝 测试用例 ${i + 1}: "${testCase}"`);
        console.log('⏳ 正在处理...');
        
        try {
            const startTime = Date.now();
            const response = await agent(testCase);
            const endTime = Date.now();
            
            console.log(`✅ 响应时间: ${endTime - startTime}ms`);
            console.log(`📄 响应内容:\n${response}\n`);
            console.log('─'.repeat(50) + '\n');
            
        } catch (error) {
            console.error(`❌ 测试失败: ${error.message}\n`);
        }
    }
    
    console.log('🎉 LLM功能测试完成！');
}

// 运行测试
testLLM().catch(console.error); 