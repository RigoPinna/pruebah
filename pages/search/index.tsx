'use-client';
import { NextPage } from 'next';
import { LayoutGeneral } from '@/components/layouts';
import { useSearchParams } from 'next/navigation';
import {
	Typography,
	Input,
	Layout,
	theme,
	Row,
	Col,
	Popover,
	Button,
} from 'antd';
import {
	ButtonFilter,
	CharacterList,
	_character_minify,
} from '@/components/ui';

import { NumberResults } from '@/components/ui/NumberResult';
import { ChangeEvent, useEffect, useState } from 'react';
import { _result_api } from '@/types';
import { useRouter } from 'next/router';
import { getCharacterByNameOrSpecie } from '@/services';
import { FilterOutlined } from '@ant-design/icons';
const { useToken } = theme;

interface _result {
	status: 'ok' | 'error';
	searchBy: string;
	fillter: string;
	characters: _character_minify[];
	count: number;
}
const SearchPage: NextPage = () => {
	const { push } = useRouter();
	const searchParams = useSearchParams();
	const [result, setResult] = useState<_result>({
		status: 'ok',
		count: 0,
		fillter: '',
		searchBy: '',
		characters: [],
	});
	const [isLoading, setisLoading] = useState(true);
	const [searchByName, setSearchByName] = useState('');
	const {
		token: { colorBgContainer },
	} = useToken();
	useEffect(() => {
		const name = decodeURIComponent(searchParams.get('name') || '');
		const specie = decodeURIComponent(searchParams.get('specie') || '');
		if (name !== '' || specie !== '') {
			getCharacterByNameOrSpecie(name, specie)
				.then(data => {
					setResult({
						status: 'ok',
						searchBy: name,
						fillter: '',
						count: data.info.count,
						characters: data.results,
					});
					setisLoading(false);
				})
				.catch(err => {
					console.log(err);
					setisLoading(false);
					setResult({
						status: 'error',
						count: 0,
						fillter: '',
						searchBy: name,
						characters: [],
					});
				})
				.finally(() => {
					setisLoading(false);
				});
		}
	}, [searchParams]);
	const handleOnSearch = (value: string) => {
		if (value.trim() !== '') {
			push({
				pathname: '/search',
				query: {
					name: encodeURIComponent(value.trim()),
				},
			});
		}
	};
	const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		setSearchByName(target.value);
	};
	return (
		<LayoutGeneral>
			<Layout>
				<Layout.Header
					style={{
						background: `${colorBgContainer}`,
						height: 'fit-content',
					}}
				>
					<Row justify={'center'}>
						<Col xs={13}>
							<Row>
								<Input.Search
									onChange={handleOnChange}
									placeholder='Search by name'
									onSearch={handleOnSearch}
									value={searchByName}
									size='large'
									style={{
										flex: 1,
										marginRight: '16px',
									}}
								/>
								<ButtonFilter searchBy={result.searchBy} />
							</Row>
							<Typography.Title
								level={1}
								style={{
									display: 'block',
									width: 'fit-content',
									margin: '0 auto',
								}}
							>
								{result?.searchBy}
							</Typography.Title>
							<NumberResults total={result?.count || 0} />
						</Col>
					</Row>
				</Layout.Header>
				<Layout.Content
					style={{
						background: `${colorBgContainer}`,
					}}
				>
					<CharacterList characters={result?.characters || []} />
				</Layout.Content>
			</Layout>
		</LayoutGeneral>
	);
};

export default SearchPage;
