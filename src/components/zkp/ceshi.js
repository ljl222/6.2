import React, { useState } from 'react';
import { shenqishuchuhanshu,shenqiyanzhenghanshu } from '../../components/zkp/zkp copy';
// 在 React 中创建一个按钮，当用户点击它时，调用函数来处理文本框中的值。具体步骤如下：

// 1. 在组件中定义一个状态变量 `value`，用于存储文本框中的值。


function TextInput() {
    const [value, setValue] = useState('');

    function handleButtonClick(value) {
      console.log(`输入框的值为：${value}`);
      shenqishuchuhanshu(value)
    }
    return (
      <div>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        <button onClick={() => handleButtonClick(value)}>生成证明</button>
        
      </div>
    );
  }
export default TextInput;

// 3. 在按钮的 `onClick` 事件处理程序中调用 `handleButtonClick` 函数，并将文本框中的值作为参数传递进去。



