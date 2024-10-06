import React, { useState,useEffect,ReactElement,ReactNode } from 'react'

/**
 * Sheet组件
 * 
 * Sheet组件用于包裹和展示页面或组件中的内容
 * 它是一个函数式组件，接受一个包含`children`属性的props对象
 * `children`属性用于定义组件内部的内容，可以是任意的React节点
 * 
 * @param {React.ReactNode} children - 组件内部要展示的内容
 * @returns {React.ReactNode} - 返回包含children的React节点
 */

interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
interface SheetTriggerProps {
  children: React.ReactNode
  asChild?: boolean
  onClick?: () => void
}

interface SheetContentProps {
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  isOpen?: boolean
  onClose?: () => void
}
export const Sheet: React.FC<SheetProps> = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(open || false)

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    if (onOpenChange) {
      onOpenChange(newOpen)
    }
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SheetTrigger) {
            return React.cloneElement(child as ReactElement<SheetTriggerProps>, {
              onClick: () => handleOpenChange(true)
            })
          }
          if (child.type === SheetContent) {
            return React.cloneElement(child as ReactElement<SheetContentProps>, {
              isOpen,
              onClose: () => handleOpenChange(false)
            })
          }
        }
        return child
      })}
    </>
  )
}
/**
 * SheetTrigger 是一个 React 函数组件，用于封装和展示传入的子组件。
 * 它的主要目的是作为 Sheet（一种从屏幕边缘滑出的面板）的触发器，但实际功能较为通用，可以展示任何子组件。
 * 该组件支持“asChild”属性，允许它作为子组件传递给其他组件。
 * 
 * @param {React.ReactNode} children - 要展示的子节点。
 * @param {boolean} asChild - （可选）指示是否将该组件作为子组件使用。默认为 false。
 * @returns 渲染的子节点。
 */

export const SheetTrigger: React.FC<SheetTriggerProps> = ({ children, asChild, onClick }) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as ReactElement, { onClick })
  }
  return (<button onClick={onClick}>{children}</button>);
}

/**
 * SheetContent 组件用于创建一个可抽屉式的面板，通常用于展示额外的信息或者选项.
 * 该组件是一个 React 函数组件，接受一个包含 `children` 和 `side` 的对象作为参数.
 * 
 * @param {React.ReactNode} children - 要在 SheetContent 内部展示的内容.
 * @param {side} - 可选参数，指定 SheetContent 从哪个方向滑出. 默认值为 'left'.
 * 可以是 'left', 'right', 'top', 或 'bottom' 之一.
 */
export const SheetContent: React.FC<SheetContentProps> = ({ children, side = 'left', isOpen, onClose }) => {
  const sideStyles = {
    top: 'top-0 left-0 right-0',
    right: 'top-0 right-0 bottom-0',
    bottom: 'bottom-0 left-0 right-0',
    left: 'top-0 left-0 bottom-0'
  }

  const translateStyles = {
    top: 'translate-y-[-100%]',
    right: 'translate-x-full',
    bottom: 'translate-y-full',
    left: 'translate-x-[-100%]'
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-10" onClick={onClose} />
      <div className={`fixed ${sideStyles[side]} w-3/4 p-4 sm:max-w-sm bg-white z-20 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : translateStyles[side]}`}>
        <div className="h-full overflow-y-auto p-6 ">
          <button
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close sheet"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </>
  )
}
/**
 * SheetHeader 组件用于在页面或组件的顶部展示一些标题或辅助说明文字。
 * 它接收一个 React 节点作为子元素，并将其显示在一个具有底部边距的 div 容器中。
 * 
 * @param {React.ReactNode} children - 要在 SheetHeader 组件中显示的内容，可以是字符串、元素或其他 React 节点。
 * @returns {React.Element} 返回一个 div 元素，包含传入的 children，并应用了名为 "mb-4" 的 CSS 类以添加底部边距。
 */

export const SheetHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mb-4">{children}</div>
}

/**
 * 定义一个React函数组件，用于显示表格的标题
 * 此组件接受一个含有子元素的属性对象，并将其渲染在一个带有样式的`<h3>`标签中
 * 
 * @param {React.ReactNode} children - 要在标题内显示的子元素
 * @returns {React.ReactElement} - 渲染后的标题元素
 */
export const SheetTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h3 className="text-lg font-semibold">{children}</h3>;
};
export const SheetDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-sm text-muted-foreground">{children}</p>
}