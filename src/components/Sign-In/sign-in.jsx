import React from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-label/form-label';
import CustomButton from '../custom-button/custom-button';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            email: '',
            password: ''
        }
    }

    handleSubmit= async event => {
        event.preventDefault();
        const {password, email} = this.state;

        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''})
        }catch(error){
            console.log(error);
        }
    }

    handleChange= event => {
        const {value, name} = event.target;

        this.setState({[name]: value})
    }   

    render() {
        return(
            <div className='sign-in'>
                <h1>I already have an account</h1>
                <span>Sign In with your id and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name="email" handleChange={this.handleChange} label="email" value={this.state.email} required/>
                    
                    <FormInput 
                    type="password" 
                    name="password" 
                    value={this.state.password} 
                    label="password"
                    handleChange={this.handleChange}
                    required/>
                    
                    <div className='buttons'>
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default SignIn;