import React, { useState, useContext, FunctionComponentElement } from "react";
import classnames from 'classnames';
import { MenuItemProps } from './menuItem'
import { MenuContext } from './menu'

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, style, title, className, children }) => {
    const context = useContext(MenuContext);
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
    const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;

    const [menuOpen, setOpen] = useState(isOpened)

    const classes = classnames('menu-item submenu-item', className, {
        'is-active': context.index === index
    })

    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }

    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
        onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
    } : {

    }
    const renderChildren = () => {
        const subMenuClasses = classnames('curry-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error('Warning: SubMenu has a child which is not a MenuItem component')
            }
        })
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }
    return (
        <li key={index} className={classes} style={style} {...hoverEvents}>
            <div className="submenu-title" onClick={handleClick} {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu;