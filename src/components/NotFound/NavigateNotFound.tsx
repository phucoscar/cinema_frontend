import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NavigateNotFound = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/not-found')
    }, [navigate])
    return (
        <div></div>
    )
}

export default NavigateNotFound