'use-client';
import { NextPage } from 'next';
import { LayoutGeneral } from '@/components/layouts';
import { useSearchParams } from 'next/navigation';
import { Typography, Input, Layout, theme, Row, Col } from 'antd';
import {
	ButtonFilter,
	CharacterList,
	Paginator,
	SearchLoadingList,
	_character_minify,
} from '@/components/ui';

import { NumberResults } from '@/components/ui/NumberResult';
import { ChangeEvent, useEffect, useState } from 'react';
import { _result_api } from '@/types';
import { useRouter } from 'next/router';
import { getCharacterByNameOrSpecie } from '@/services';
import { DotChartOutlined, FilterOutlined } from '@ant-design/icons';
const { useToken } = theme;

interface _result {
	status: 'ok' | 'error';
	searchBy: string;
	currentPage: number;
	pages: number;
	characters: _character_minify[];
	count: number;
}
const SearchPage: NextPage = () => {
	const { push } = useRouter();
	const searchParams = useSearchParams();
	const [result, setResult] = useState<_result>({
		status: 'ok',
		currentPage: 1,
		count: 0,
		pages: 0,
		searchBy: '',
		characters: [],
	});
	const [isLoading, setisLoading] = useState(true);
	const [searchByName, setSearchByName] = useState('');
	const {
		token: { colorBgContainer },
	} = useToken();
	const handleGetResult = (name: string, specie: string, page?: number) => {
		if (name !== '' || specie !== '') {
			getCharacterByNameOrSpecie(name, specie, page || 1)
				.then(data => {
					setResult({
						status: 'ok',
						searchBy: name,
						currentPage: page || 1,
						pages: data.info.pages,
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
						pages: 0,
						currentPage: 0,
						searchBy: name,
						characters: [],
					});
				})
				.finally(() => {
					setisLoading(false);
				});
		}
	};
	useEffect(() => {
		handleGetResult(
			decodeURIComponent(searchParams.get('name') || ''),
			decodeURIComponent(searchParams.get('specie') || ''),
		);
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
	const handleNextPage = (pageSelected: number) => {
		handleGetResult(
			decodeURIComponent(searchParams.get('name') || ''),
			decodeURIComponent(searchParams.get('specie') || ''),
			pageSelected,
		);
	};
	return (
		<LayoutGeneral metaTitle='Search'>
			<Layout>
				<Layout.Header
					style={{
						background: `${colorBgContainer}`,
						height: 'fit-content',
						padding: '0',
					}}
				>
					<Row justify={'center'}>
						<Col xs={24} sm={24} lg={13}>
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
					{isLoading ? (
						<SearchLoadingList />
					) : (
						<>
							<CharacterList characters={result?.characters || []} />
							{result.pages > 1 && (
								<Paginator
									currentPage={result.currentPage}
									pages={result.pages}
									onChange={handleNextPage}
								/>
							)}
						</>
					)}
				</Layout.Content>
			</Layout>
		</LayoutGeneral>
	);
};

export default SearchPage;
