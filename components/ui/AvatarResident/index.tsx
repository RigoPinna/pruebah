'use-client';
import { _resident, _url_character, getResidents } from '@/services';
import { Avatar, Skeleton, Tooltip } from 'antd';
import { FC, useEffect, useState } from 'react';
interface _props {
	url: _url_character;
}
export const AvatarResident: FC<_props> = ({ url }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [resident, setResident] = useState<_resident | undefined>(undefined);
	useEffect(() => {
		getResidents(url)
			.then(character => {
				setResident(character);
			})
			.catch(err => {
				console.log('ERROR');
				setResident(undefined);
				setIsLoading(false);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);
	if (isLoading) {
		return <Skeleton.Avatar active={true} size='default' shape='circle' />;
	}

	return (
		<>
			{resident?.name && (
				<Tooltip title={resident?.name} placement='top'>
					<Avatar size='large' src={resident?.image} />
				</Tooltip>
			)}
		</>
	);
};
