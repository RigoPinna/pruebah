import { FilterOutlined } from '@ant-design/icons';
import { Popover, Button, Select } from 'antd';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
const fillterValues = [
	{
		label: 'Specie',
		options: [
			{
				label: 'Animal',
				value: 'Animal',
			},
			{
				label: 'Cronenberg',
				value: 'Cronenberg',
			},
			{
				label: 'Disease',
				value: 'Disease',
			},
			{
				label: 'Human',
				value: 'Human',
			},
			{
				label: 'Humanoid',
				value: 'Humanoid',
			},
			{
				label: 'Mythological Creature',
				value: 'Mythological Creature',
			},
			{
				label: 'Poopybutthole',
				value: 'Poopybutthole',
			},
			{
				label: 'Robot',
				value: 'Robot',
			},
			{
				label: 'Unknown',
				value: 'unknown',
			},
		],
	},
];
interface _props {
	searchBy: string;
}
export const ButtonFilter: FC<_props> = ({ searchBy }) => {
	const [isOpen, setisOpen] = useState(false);
	const { push } = useRouter();
	const handleClose = (open: boolean) => {
		setisOpen(open);
	};
	const handleOnChange = (filter: string) => {
		if (searchBy !== '') {
			push({
				pathname: '/search',
				query: {
					name: searchBy,
					specie: encodeURIComponent(filter),
				},
			});
		} else {
			push({
				pathname: '/search',
				query: {
					specie: encodeURIComponent(filter),
				},
			});
		}
	};
	return (
		<Popover
			content={
				<Select
					placeholder='Select a filter'
					style={{ width: 200 }}
					onChange={handleOnChange}
					options={fillterValues}
				/>
			}
			title='Filters'
			trigger='click'
			open={isOpen}
			onOpenChange={handleClose}
		>
			<Button
				size='large'
				type='default'
				icon={<FilterOutlined style={{ fontSize: '24px' }} />}
			/>
		</Popover>
	);
};
