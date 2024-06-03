import { React, useState } from 'react';
import { Box } from '@mui/material';
import MyTextField from './forms/MyTextField';
import MyButton from './forms/MyButton';
import { useForm } from 'react-hook-form';
import AxiosInstance from './AxiosInstance';
import MyMessage from './MyMessage';

export default function PasswordResetRequest() {
    const { handleSubmit, control } = useForm()

    const [showMsg, setShowMsg] = useState(false)

    const submission = (data) => {
        AxiosInstance.post('api/password_reset/', {
            email: data.email,
        })
            .then((res) => {
                if (res.status && res.status === 200) {
                    setShowMsg(true)
                }
            })
    }

    return (
        <div className='bgForm'>

            <form onSubmit={handleSubmit(submission)}>

                <Box className='whiteBox'>
                    <Box className={'itemBox'}>
                        <Box className={'title'} sx={{ textAlign: 'center' }}>Redefinição de senha</Box>
                    </Box>

                    <span style={{ margin: '-10px 0', padding: '0 10px', textAlign: 'center' }}>Para prosseguir, informe seu e-mail</span>

                    <Box className={'itemBox'}>
                        <MyTextField label={'E-mail'} name={'email'} control={control} />
                    </Box>

                    <Box className={'itemBox'}>
                        <MyButton label={'Confirmar'} type={'submit'} />
                    </Box>

                    {showMsg ? <MyMessage text={'Por favor, verifique seu e-mail para prosseguir'} color={'#69c9ab'} /> : null}

                </Box>

            </form>

        </div>
    )
}