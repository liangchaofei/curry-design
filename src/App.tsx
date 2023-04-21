import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import './App.css';

function App() {
  return (
    <div className="App">
      <Menu defaultIndex='0' mode="vertical" defaultOpenSubMenus={["2"]} onSelect={e => alert(e)}>
        <MenuItem>aaa</MenuItem>
        <MenuItem>bbb</MenuItem>
        <SubMenu title='aaa'>
          <MenuItem>ccc</MenuItem>
          <MenuItem>ddd</MenuItem>
        </SubMenu>
      </Menu>
      {/* <div>
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
      </div> */}
    </div>
  );
}

export default App;
