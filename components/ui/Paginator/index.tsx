'use client';
import { Pagination, Row, Space } from 'antd';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

interface _props {
	pages: number;
	onChange: (currenPage: number) => void;
}
export const Paginator: FC<_props> = ({ pages, onChange }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const { push, query } = useRouter();
	const updateParams = (numberPage: string) => {
		push({ query: { ...query, page: numberPage } }, undefined, {
			shallow: true,
		});
	};
	const handleUpdatePaginators = (page: number) => {
		onChange(page);
		setCurrentPage(page);
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
