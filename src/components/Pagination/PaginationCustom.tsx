import React from 'react';
import './index.css'
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

interface IPaginationCustom {
    pageSize: number
    total: number
    pageCurrent: number
    getFilms: any
}

const PaginationCustom: React.FC<IPaginationCustom> = ({
    pageSize,
    total,
    pageCurrent,
    getFilms
}) => {

    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        console.log('Page: ', pageNumber);
        getFilms(pageNumber, 6)
    };

    return (
        <div className='Pagination'>
            <Pagination
                showSizeChanger={false}
                onChange={onChange}
                defaultCurrent={pageCurrent}
                total={total}
                pageSize={pageSize}
                hideOnSinglePage={false}
            />
        </div>
    )
}

export default PaginationCustom;
