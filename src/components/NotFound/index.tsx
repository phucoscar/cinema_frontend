import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate()
    const navigateHome = (e: any) => {
        e.preventDefault();
        navigate('/')
    }
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={navigateHome}>Back Home</Button>}
        />
    )
};

export default NotFound;