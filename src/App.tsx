import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <Button onClick={() => alert(1)}>按钮</Button>
      </div>
      <div>
        <Button disabled>按钮</Button>
      </div>
      <div>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>按钮</Button>
      </div>
      <div>
        <Button btnType={ButtonType.Danger} href="www.baidu.com">按钮</Button>
      </div>
      <div>
        <Button btnType={ButtonType.Link} href="www.baidu.com">按钮</Button>
      </div>
      <div>
        <Button btnType={ButtonType.Link} disabled href="www.baidu.com">按钮</Button>
      </div>
    </div>
  );
}

export default App;
