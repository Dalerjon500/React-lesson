
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import CreateContextPro from './hooks/CreateContextPro';
import { ToastContainer} from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


createRoot(document.getElementById('root')!).render(
    <>
        <Router>
            <CreateContextPro>
                <DndProvider backend={HTML5Backend}>
                    <App/>
                    <ToastContainer />
                </DndProvider>
            </CreateContextPro>
        </Router>
    </>
);
