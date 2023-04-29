import './cart-dropdown.styles.scss';
import ButtonComp from '../button-component/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { useNavigate } from 'react-router-dom';


const CartDropDown = () => {
    
    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    const goToCheckOutHandler = () => {
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items' >
            {cartItems.map((item) => (
                <CartItem key={item.id} CartItem={item} />
            ))}
            </div>
            <ButtonComp onClick={goToCheckOutHandler}>GO TO CHECKOUT</ButtonComp>

        </div>
    )
}

export default CartDropDown;