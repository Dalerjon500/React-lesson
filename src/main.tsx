import { StrictMode } from 'react'
import ReactDom from 'react-dom/client'
import App from './App.tsx'
import CreateContextPro from "./hooks/CreateContextPro.tsx";
import "bootstrap/dist/css/bootstrap.min.css";


ReactDom.createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <CreateContextPro>
          <App />
      </CreateContextPro>
  </StrictMode>,
)
