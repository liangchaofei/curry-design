import React, { useState, createContext } from "react";
import classnames from "classnames";

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void;
export interface MenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    children?: React.ReactNode
}

interface IMenuContext {
    index: number;
    onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({
    index: 0,
})

const Menu: React.FC<MenuProps> = props => {
    const { defaultIndex, className, mode, style, children, onSelect, ...restProps } = props;
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classnames(className, 'curry-menu', {
        'menu-vertical': mode === 'vertical'
    })

    const handleClick = (index: number) => {
        setActive(index)
        onSelect && onSelect(index)
    }
    const passedContext: IMenuContext = {
        index: currentActive || 0,
        onSelect: handleClick
    }

    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>
                {children}
            </MenuContext.Provider>
        </ul>
    )
}
Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}
export default Menu;