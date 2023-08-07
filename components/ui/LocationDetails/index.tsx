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
	location: _location;
}
export const LocationDetails: FC<_props> = ({ location }) => {
	const [isLoading, setisLoading] = useState(true);
	const [data, setData] = useState<_location_details_mim | undefined>(
		undefined,
	);
	useEffect(() => {
		getLocationDetails(location.url)
			.then(resp => {
				setData(resp);
			})
			.catch(err => {})
			.finally(() => {
				setisLoading(false);
			});
	}, [location.url]);
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
					maxCount={10}
					maxStyle={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: '#f56a00',
						backgroundColor: '#fde3cf',
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
