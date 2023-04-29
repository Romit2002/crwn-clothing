import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentfromAuth } from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss';
import '../button-component/button.component'
import ButtonComp from "../button-component/button.component";
// import { UserContext } from "../../context/user.context";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    const {displayName, email, password, confirmPassword} = formFields;

    // console.log(formFields);

    // const { setCurrentUser } = useContext(UserContext);

    // console.log('hit');

    const resetFormFields = () =>{
                setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
            if(password !== confirmPassword){
                alert("Passwords do not match");
                    return;
                }
        
            try{
                const {user} = await createAuthUserWithEmailAndPassword(
                    email,password
                );

                // setCurrentUser(user);
              //      console.log(response);
              await createUserDocumentfromAuth (user, {displayName});  
              resetFormFields();  
            }
                
        
            catch(error){
                if(error.code === 'auth/email-already-in-use'){
                    alert('Cannot Create User as Email already in-use');
                }
                else{
                    console.log('user creation encountered an error',error);
            
                }
            }

        
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };


return (
    <div className="sign-up-container">
        <h2>Don't have an account</h2>
        <span>Sign Up with your email and password</span>
        <form onSubmit ={handleSubmit}>
            <FormInput
            label='Display Name'
            type="text" required onChange={handleChange} name="displayName" value={displayName}/>

            <FormInput 
            label='Email'
            type="email" required onChange={handleChange} name="email" value={email}/>

            <FormInput
            label='Password'
             type="password" required onChange={handleChange} name="password" value={password}/>

            
            <FormInput
            label='Confirm Password'
            type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

            <ButtonComp buttonType='inverted' type='submit'>Sign Up</ButtonComp>
        </form>
    </div>
);
};

export default SignUpForm;