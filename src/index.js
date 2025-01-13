import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store'
import {Provider} from 'react-redux'//provider提供只需要在出口文件引入store可以在任意界面使用store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <DndProvider backend={HTML5Backend}> */}
        <App />
      {/* </DndProvider> */}
  </React.StrictMode>
  </Provider>
)
//订阅 DOM会自动使用diff算法不会增大开销
//使用react-redux不需要在根页面中实时检测store改变,redux需要
// store.subscribe(()=>{
//     root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   )
// })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
