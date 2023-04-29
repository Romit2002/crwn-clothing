import './button-style.scss';

const BUTTON_TYPES = {
    google:'google-sign-in',
    inverted: 'inverted'
}

const ButtonComp = ({children, buttonType, ...otherProps}) =>{
    return(
        <button className={`button-container ${BUTTON_TYPES[buttonType]}`}
        {...otherProps}
        >
        {children}
        </button>
    )
}

export default ButtonComp;