// 导入必要的模块
import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
 
// 定义拖拽类型
const ItemTypes = {
  BOX: 'box',
};
 
// 拖拽源组件
const DraggableBox = ({ id, left, top }) => {
  console.log(id,left,top);
  const [, ref] = useDrag({
  type: ItemTypes.BOX,
  item: { id, left, top },
  });
 
  const click=()=>{
    console.log(123);
  }
 
  return (
  <div ref={ref} style={{ position: 'absolute', left, top, cursor: 'move' }} onClick={click}>
    Drag me
  </div>
  );
};
 
// 放置目标组件
const DroppableContainer = () => {
  const [boxes, setBoxes] = useState([
  { id: 1, left: 10, top: 10 },
  { id: 2, left: 100, top: 10 },
  ]);
 
  const moveBox = (id, left, top) => {
  const newBoxes = boxes.map((box) => (box.id === id ? { ...box, left, top } : box));
  setBoxes(newBoxes);
  };
 
  const [, drop] = useDrop({
  accept: ItemTypes.BOX,
  drop: (item, monitor) => {
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    moveBox(item.id, left, top);
    console.log(boxes)
  },
  });
 
  return (
  <div ref={drop} style={{ width: '500px', height: '500px', position: 'relative', border: '1px solid #ccc' }}>
    {boxes.map((box) => (
    <DraggableBox key={box.id} {...box} />
    ))}
  </div>
  );
};
 
// 主组件
const DragAndDropExample = () => {
 
  return (
  <DndProvider backend={HTML5Backend}>
    <DroppableContainer />
  </DndProvider>
  );
};
 
export default DragAndDropExample;