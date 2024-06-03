import { React, useState } from 'react';
import { Box } from '@mui/material';
import MyPassField from './forms/MyPassField';
import MyButton from './forms/MyButton';
import { useForm } from 'react-hook-form';
import AxiosInstance from './AxiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import MyMessage from './MyMessage';

export default function PasswordReset() {
    const navigate = useNavigate()

    const { token } = useParams()

    const { handleSubmit, control } = useForm()

    const [showMsg, setShowMsg] = useState(false)

    const submission = (data) => {
        AxiosInstance.post('api/password_reset/confirm/', {
            password: data.passwordConfirm,
            token: token,
        })
            .then((res) => {
                if (res.status && res.status === 200) {
                    setShowMsg(true)
                    setTimeout(() => {
                        navigate('/')
                    }, 3000) // 3s
                }
            })
    }

    return (
        <div className='bgForm'>

            <form onSubmit={handleSubmit(submission)}>

                <Box className='whiteBox'>
                    <Box className={'itemBox'}>
                        <Box className={'title'} sx={{ textAlign: 'center' }}>Redefina sua senha</Box>
                    </Box>

                    {/* <Box className={'itemBox'}>
                        <MyPassField label={'Senha antiga'} name={'passwordOld'} control={control} />
                    </Box> */}

                    <Box className={'itemBox'}>
                        <MyPassField label={'Senha nova'} name={'passwordNew'} control={control} />
                    </Box>

                    <Box className={'itemBox'}>
                        <MyPassField label={'Confirme a senha'} name={'passwordConfirm'} control={control} />
                    </Box>

                    <Box className={'itemBox'}>
                        <MyButton label={'Redefinir'} type={'submit'} />
                    </Box>

                    {showMsg ? <MyMessage text={'Senha redefinida com sucesso'} color={'#69c9ab'} /> : null}

                </Box>

            </form>

        </div>
    )
}