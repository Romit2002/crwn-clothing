import { Fragment, useContext } from 'react';
// import { ProductsContext } from '../../context/product.context';
import { CategoriesContext } from '../../context/categories.context';
import ProductsCard from '../../components/product-card/product-card.component';
import CategoryPreview from '../../components/category-preview/category-preview.component';

// import './shop.styles.scss';

import { Route, Routes } from 'react-router-dom';

const CategoriesPreview = () => {

    const { categoriesMap } = useContext(CategoriesContext);


    return (

        // <Routes>
        //     <Route index element={<CategoryPreview />} />
        // </Routes>

        

        // <Fragment>

        // {
        //     Object.keys(categoriesMap).map((title) => (
        //         <Fragment key={title}>
        //             <h2>{title}</h2>
        //             <div className='products-container'>
        //             {
        //                 categoriesMap[title].map((product) =>(
        //                 <ProductsCard key={product.id} product={product}/>
        //                 ))
        //             }
        //             </div>
        //         </Fragment>
        //     ))
        // }
        // </Fragment>

        <Fragment>
            {
                Object.keys(categoriesMap).map((title)=>{
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    );
                })
            }
        </Fragment>

        
        
    );
};

export default CategoriesPreview;