import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './servises/store';
import { StrictMode } from 'react';
import reportWebVitals from './reportWebVitals';
import { FireBaseContext } from './servises/context';
import { db } from './utils/fire-base';
import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <StrictMode>
      <FireBaseContext.Provider value={{ db }}>
        <App />
      </FireBaseContext.Provider>
    </StrictMode>
  </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


