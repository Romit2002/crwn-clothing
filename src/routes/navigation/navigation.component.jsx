import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
// import './navigation.styles.scss';
import { UserContext } from "../../context/user.context";
import { useContext } from "react";
import { SignOutUser } from "../../utils/firebase/firebase.util";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../context/cart.context";

import { NaviGationContainer, NavLink, NavLinksContainer, LogoContainer } from "./navigation.styles";

const Navigation = () => {

    const { currentUser } = useContext(UserContext);

    const {isCartOpen} = useContext(CartContext);
    // const signOutHandler = async() => {
    //     await SignOutUser();
    //     setCurrentUser(null);
    // }
    // console.log(currentUser);

    return(
      <Fragment>
        <NaviGationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className='logo' />
            </LogoContainer>    
            <NavLinksContainer>
                <NavLink to='/shop'>
                    SHOP

                </NavLink>
                {
                    currentUser ?(
                        <span className='nav-link' onClick={SignOutUser}>
                            SIGN OUT
                        </span> ):
                    
                

                (<NavLink to='/auth'>
                    SIGN IN

                </NavLink>)}
                <CartIcon/>
            </NavLinksContainer>
            {isCartOpen && <CartDropDown />}
        </NaviGationContainer>
        <Outlet/>
      </Fragment>
    );
};

export default Navigation;