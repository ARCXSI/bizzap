import React
    // , { useEffect } 
    from 'react';

import { Box } from '@mui/material';
import MyTextField from './forms/MyTextField';
import MyPassField from './forms/MyPassField';
import MyButton from './forms/MyButton';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AxiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function Register() {
    // useEffect(() => {
    //     localStorage.removeItem('token');
    // }, []);

    const navigate = useNavigate()

    const schema = yup.object({
        email: yup.string().email('Entre com e-mail válido').required('E-mail é obrigatório'),
        password: yup.string().required('Senha é obrigatória').min(6, 'Senha deve ter no mínimo 6 caracteres')
            .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
            .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
            .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
            .matches(/[!@#$%¨&*()^,.?":;{}|<>+-]/, 'A senha deve conter pelo menos um caractere especial'),
        confirmPassword: yup.string().required('Confirmação de senha é obrigatória').oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
    })

    const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) })

    const submission = (data) => {
        AxiosInstance.post('register/', {
            email: data.email,
            password: data.password,
        })
            .then(() => {
                navigate('/')
            })
    }

    return (
        <div className='bgForm'>

            <form onSubmit={handleSubmit(submission)}>

                <Box className='whiteBox'>
                    <Box className={'itemBox'}>
                        <Box className={'title'}>Cadastro</Box>
                    </Box>

                    <Box className={'itemBox'}>
                        <MyTextField label={'E-mail'} name={'email'} control={control} />
                    </Box>

                    <Box className={'itemBox'}>
                        <MyPassField label={'Senha'} name={'password'} control={control} />
                    </Box>

                    <Box className={'itemBox'}>
                        <MyPassField label={'Confirmar senha'} name={'confirmPassword'} control={control} />
                    </Box>

                    <Box className={'itemBox'}>
                        <MyButton label={'Cadastrar'} type={'submit'} />
                    </Box>

                    <Box className={'itemBox'}>
                        <Link to='/' style={{ textAlign: 'center' }}>Já possui conta? Faça o login</Link>
                    </Box>
                </Box>

            </form>

        </div>
    )
}