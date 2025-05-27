import { createContext } from 'react';
import { ToasterContextProps } from './types';

const ToasterContext = createContext<ToasterContextProps>({} as ToasterContextProps);

export default ToasterContext;