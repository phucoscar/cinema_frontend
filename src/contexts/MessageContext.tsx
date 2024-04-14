import { message } from 'antd';
import React, { ReactNode, createContext } from 'react';

interface IMessageContext {
    children: ReactNode;
}

interface IMessageContextProvider {
    success: any;
    error: any;
    warning: any;
}

export const MessageContextProvider = createContext<IMessageContextProvider | undefined>(undefined);

const MessageContext: React.FC<IMessageContext> = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = (content: string) => {
        messageApi.open({
            type: 'success',
            content: content,
        });
    };

    const error = (content: string) => {
        messageApi.open({
            type: 'error',
            content: content,
        });
    };

    const warning = (content: string) => {
        messageApi.open({
            type: 'warning',
            content: content,
        });
    };

    const data = {
        success,
        error,
        warning
    }

    return (
        <>
            {contextHolder}
            <MessageContextProvider.Provider value={data}>{children}</MessageContextProvider.Provider>
        </>
    )
}

export default MessageContext