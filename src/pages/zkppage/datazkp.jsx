
import React, { useState } from 'react';
import { shenqishuchuhanshu,shenqiyanzhenghanshu } from '../../components/zkp/zkp copy';
function InputComponent() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" id='numb' value={inputValue} onChange={handleInputChange} />
      <p>输入的值为：{inputValue}</p>
      <button className="btn btn-primary btn-lg" onClick={shenqishuchuhanshu}>zkp</button>
    </div>
  );
}

export default InputComponent;


// 这个组件包含一个输入框和一个显示输入值的段落。useState hook 用于追踪输入框的值。handleInputChange 函数被调用来更新输入框的值，以便在输入时显示新的值。

// 在父组件中，可以使用以下方式来渲染这个组件：



