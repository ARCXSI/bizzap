import { React, useEffect, useMemo, useState } from 'react';
import AxiosInstance from './AxiosInstance';
import { Box } from '@mui/material';

export default function Home() {
    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    const getData = () => {
        AxiosInstance.get(`users/`)
            .then((res) => {
                setMyData(res.data)
                setLoading(false)
                console.log(res.data)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='content'>
            {loading ?
                <p>Carregando...</p> :
                <div>
                    {myData.map((item, index) => (
                        <Box key={index} sx={{ p: 2, m: 2, boxShadow: 3 }}>
                            <div>ID: {item.id}</div>
                            <div>E-mail: {item.email}</div>
                        </Box>
                    ))}
                </div>
            }
        </div>
    )
}
