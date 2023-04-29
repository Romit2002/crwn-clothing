import ButtonComp from "../button-component/button.component";
import './product-card.styles.scss';
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const ProductsCard = ({product}) => {

    const {name, price, imageUrl} = product; 
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

    return(
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <ButtonComp buttonType='inverted' onClick={()=>addItemToCart(product)}>Add to Cart</ButtonComp>
        </div>

    );
};

export default ProductsCard;