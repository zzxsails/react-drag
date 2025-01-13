import './App.css';
import Home from './views/Home';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
const onResize = (event, { size }) => {
  console.log('Current size:', size);
};

const MyResizableComponentWithCallback = () => (
 

    <ResizableBox
      width={200}
      height={200}
      minConstraints={[100, 100]}
      maxConstraints={[300, 300]}
      onResize={onResize}
    >
      <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }}>
        Resizable Content
      </div>
    </ResizableBox>
);
function App() {
  return (
    <div className="App">
      {/* react-redux用法：根组件引入store */}
      <Home />
      {/* <MyResizableComponentWithCallback /> */}
    </div>
  );
}

export default App;
