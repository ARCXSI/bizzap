import { React, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import MyTextField from './forms/MyTextField';
import MyPassField from './forms/MyPassField';
import MyButton from './forms/MyButton';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AxiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';
import MyMessage from './MyMessage';

export default function Login() {
    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    const navigate = useNavigate()
    const { handleSubmit, control } = useForm()
    const [showMsg, setShowMsg] = useState(false)

    const submission = (data) => {
        AxiosInstance.post('login/', {
            email: data.email,
            password: data.password,
        })
            .then((res) => {
                console.log(res)
                localStorage.setItem('token', res.data.token)
                navigate('/inicio')
            })
            .catch((error) => {
                setShowMsg(true)
                console.error('Erro durante o login', error)
            })
    }

    return (
        <div className='bgForm'>

            <form onSubmit={handleSubmit(submission)}>

                <Box className='whiteBox'>
                    <Box className={'itemBox'}>
                        <Box className={'title'}>Login</Box>
                    </Box>

                    <Box className={'itemBox'}>
                        <MyTextField label={'E-mail'} name={'email'} control={control} />
                    </Box>

                    <Box className={'itemBox'}>
                        <MyPassField label={'Senha'} name={'password'} control={control} />
                    </Box>

                    <Box className={'itemBox'}>
                        <MyButton label={'Logar'} type={'submit'} />
                    </Box>

                    <Box className={'itemBox'}>
                        <Link to='/cadastro' style={{ textAlign: 'center' }}>Não possui conta? Cadastre-se</Link>
                    </Box>

                    <Box className={'itemBox'}>
                        <Link to='/requisicao/redefinicao_de_senha' style={{ textAlign: 'center' }}>Esqueceu sua senha?</Link>
                    </Box>

                    {showMsg ? <MyMessage text={'Login falhou, tente novamente'} color={'#EC5A76'} /> : null}
                </Box>

            </form>

        </div>
    )
}