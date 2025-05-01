import { createContext} from "react";
import { ContextType } from "../hooks/CreateContextPro";


export const MyContext = createContext<ContextType | undefined>(undefined);