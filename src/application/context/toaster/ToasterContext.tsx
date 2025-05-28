import { createContext } from 'react';

/* Interfaces */
import { ToasterContextProps } from './types';

/* Creating a context with the type of ToasterContextProps. */
const ToasterContext = createContext<ToasterContextProps>({} as ToasterContextProps);

export default ToasterContext;