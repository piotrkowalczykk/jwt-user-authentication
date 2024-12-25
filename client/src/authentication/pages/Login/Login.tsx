import { Box } from '../../components/Box/Box';
import { Input } from '../../components/Input/Input';
import { Layout } from '../../components/Layout/Layout';
import { useState } from "react";
import classes from './Login.module.css'


export function Login(){

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await fetch("http://localhost:8080/auth/login", 
                {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
                });

            if (response.ok){
                const data = await response.json();
                alert(`${data.message}`);
            } else {
                const errorData = await response.json();

                const errorMessages = errorData.message.split(", ");
                let newErrors = {};

                errorMessages.forEach((errorMessage) => {
                    const [field, message] = errorMessage.split(": ");
                    newErrors[field.trim()] = message.trim();
                });

                setErrors(newErrors);
            }

        } catch (error) {
            console.error("An unexpected error ocured", error);
        }
    }

    return(
        <Layout>
            <form onSubmit={handleSubmit} className={classes.form}>
            <Box type='submit' btnName='Log in' title='Hello Again!'
             text='Is this your first time on Dormitory?' linkName='Join now'
             link='/register'>
                <Input type="text" placeholder="Email" value={formData.email} name="email"
                    error={errors.email} onChange={handleInputChange} />
                <Input type="password" placeholder="Password" value={formData.password} name="password"
                    error={errors.password} onChange={handleInputChange} />
             </Box>
             </form>
        </Layout>
    );
}