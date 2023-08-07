import { Row, Col, Space, Skeleton } from 'antd';
import React from 'react';

export const SearchLoadingList = () => {
	return (
		<Row gutter={[20, 20]}>
			<Col xs={24} sm={12} md={8} lg={4}>
				<Space direction='vertical'>
					<Skeleton.Image active />
					<Skeleton.Input active />
				</Space>
			</Col>
			<Col xs={24} sm={12} md={8} lg={4}>
				<Space direction='vertical'>
					<Skeleton.Image active />
					<Skeleton.Input active />
				</Space>
			</Col>
			<Col xs={24} sm={12} md={8} lg={4}>
				<Space direction='vertical'>
					<Skeleton.Image active />
					<Skeleton.Input active />
				</Space>
			</Col>
			<Col xs={24} sm={12} md={8} lg={4}>
				<Space direction='vertical'>
					<Skeleton.Image active />
					<Skeleton.Input active />
				</Space>
			</Col>
			<Col xs={24} sm={12} md={8} lg={4}>
				<Space direction='vertical'>
					<Skeleton.Image active />
					<Skeleton.Input active />
				</Space>
			</Col>
			<Col xs={24} sm={12} md={8} lg={4}>
				<Space direction='vertical'>
					<Skeleton.Image active />
					<Skeleton.Input active />
				</Space>
			</Col>
		</Row>
	);
};
