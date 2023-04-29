import { createContext, useState, useEffect } from "react";

import SHOP_DATA from '../shop-data.js';
import { addCollectionAndDocumnets, getCategoriesAndDocuments } from "../utils/firebase/firebase.util.js";
export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setcategoriesMap] = useState({});

    // useEffect(()=>{
    //     addCollectionAndDocumnets('categories', SHOP_DATA);
    // }, []);

    // To get our All shopping categories
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            // console.log(categoryMap);
            setcategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[]);

    const value = {categoriesMap};
    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}