import { useParams } from "react-router-dom";

import { useContext, useState, useEffect, Fragment } from "react";

import { CategoriesContext } from "../../context/categories.context";
import ProductsCard from "../../components/product-card/product-card.component";

import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);

    // const products = categoriesMap[category];

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return(
        <Fragment>
        <h2 className='categorytitle'>{category.toUpperCase()}</h2>

        <div className='category-container'>
            
            {
                products && products.map((product)=> <ProductsCard key={product.id} product={product} />)
            }
        </div>
        </Fragment>
        
    )
};

export default Category;