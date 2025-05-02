import {createRoot} from 'react-dom/client'
import {App} from './App.tsx'
import "./styles/style.scss"
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>
    // </StrictMode>,
);
