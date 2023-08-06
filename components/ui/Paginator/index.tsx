'use client';
import { Pagination, Row } from 'antd';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

interface _props {
	pages: number;
	currentPage: number;
	onChange: (currenPage: number) => void;
}
export const Paginator: FC<_props> = ({ pages, onChange, currentPage }) => {
	const handleUpdatePaginators = (page: number) => {
		onChange(page);
	};
	return (
		<Row justify='center'>
			<Pagination
				current={currentPage}
				total={pages}
				pageSize={1}
				onChange={handleUpdatePaginators}
			/>
		</Row>
	);
};
