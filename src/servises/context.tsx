import React from "react";
import { IAuthContext } from "../utils/types";



export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export const FireBaseContext = React.createContext({});

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

// export const UserContext = React.createContext({});

// export const CartContext = React.createContext({});

// export const OrderContext = React.createContext({});

// export const ProductContext = React.createContext({});

// export const CategoryContext = React.createContext({});

// export const FilterContext = React.createContext({});

// export const SearchContext = React.createContext({});

// export const SortContext = React.createContext({});

// export const PageContext = React.createContext({});
