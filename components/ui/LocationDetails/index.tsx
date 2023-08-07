'use-client';
import { FC, useEffect, useState } from 'react';
import { _location } from '@/types';
import { Row, Col, Typography, Avatar, Spin } from 'antd';
import { SpinnerIcon } from '@/components/custom-icons';
import {
	_location_details,
	_location_details_mim,
	getLocationDetails,
} from '@/services';
import { AvatarResident } from '../AvatarResident';

const spiner = <SpinnerIcon />;
interface _props {
	url: string;
}
export const LocationDetails: FC<_props> = ({ url }) => {
	const [isLoading, setisLoading] = useState(true);
	const [data, setData] = useState<_location_details_mim | undefined>(
		undefined,
	);
	useEffect(() => {
		getLocationDetails(url)
			.then(resp => {
				setData(resp);
			})
			.catch(err => {})
			.finally(() => {
				setisLoading(false);
			});
	}, []);
	if (isLoading) {
		return <Spin tip='Loading' size='small' indicator={spiner} />;
	}
	return (
		<Row style={{ width: '100%' }}>
			<Col style={{ width: '100%' }}>
				<Typography.Title level={4} style={{ display: 'block' }}>
					{data?.name}
				</Typography.Title>
				<Typography.Text style={{ display: 'block' }} strong>
					Type: {data?.type}
				</Typography.Text>
				<Typography.Text style={{ display: 'block' }} strong>
					Dimension: {data?.dimension}
				</Typography.Text>
				<Typography.Title level={5} style={{ display: 'block' }}>
					Residents
				</Typography.Title>
				<Avatar.Group
					style={{ flexWrap: 'wrap' }}
					maxCount={10}
					maxStyle={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: '#0078CE',
						backgroundColor: '#C0E5FF',
						width: '38px',
						height: '38px',
					}}
				>
					{data?.residents.map(url => <AvatarResident key={url} url={url} />)}
				</Avatar.Group>
			</Col>
		</Row>
	);
};
