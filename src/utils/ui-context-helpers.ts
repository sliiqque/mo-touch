import { createContext } from "react";

export const UIContext = createContext(undefined);

// Prevent fast refresh warning by moving to separate file
export default UIContext;
