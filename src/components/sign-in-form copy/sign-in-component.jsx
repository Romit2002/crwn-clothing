import { useContext, useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentfromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss'
import '../button-component/button.component'
import ButtonComp from "../button-component/button.component";
// import { UserContext } from "../../context/user.context";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    const {email, password} = formFields;

    // const { setCurrentUser } = useContext(UserContext);
    // console.log(formFields);

    const resetFormFields = () =>{
                setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async() => {
        await signInWithGooglePopup();
        // const {user} = await signInWithGooglePopup();
        // await createUserDocumentfromAuth(user);
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
            
        
            try{
                const {user} = await signInAuthUserWithEmailAndPassword(email, password);
                // setCurrentUser(user);
                // console.log(response);
                resetFormFields();  
            }
                
        
            catch(error){
                // console.log(error.code);

                switch (error.code){
                    case 'auth/wrong-password':
                        alert('WRONG PASSWORD');
                        break;
                    case 'auth/user-not-found':
                        alert('Email not registered. Sign Up First');
                        break;
                    default:
                        console.log(error);
                        break;
                }

                // if(error.code==='auth/wrong-password'){
                //     alert('WRONG PASSWORD');
                // }
                // else if(error.code==='auth/user-not-found'){
                //     alert('Email not registered. Sign Up First');
                // }
                
            }

        
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };


return (
    <div className="sign-up-container">
        <h2>Already have an account</h2>
        <span>Sign In with your email and password</span>
        <form onSubmit ={handleSubmit}>
            

            <FormInput 
            label='Email'
            type="email" required onChange={handleChange} name="email" value={email}/>

            <FormInput
            label='Password'
             type="password" required onChange={handleChange} name="password" value={password}/>

            
            
            <div className='buttons-container'>
            <ButtonComp type='submit'>Sign In</ButtonComp>

            <ButtonComp type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</ButtonComp>
            </div>
        </form>
    </div>
);
};

export default SignInForm;