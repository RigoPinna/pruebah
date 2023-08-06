import { GetStaticProps, NextPage } from 'next';
import { LayoutHome } from '@/components/layouts';
import { CharacterList, _character_minify } from '@/components/ui';

import { _character, _result_api } from '@/types';
import { useState } from 'react';
import { Paginator } from '@/components/ui/Paginator';
import { fomatterCharacters } from '@/utils';
import { useShowNotification } from '@/hooks';
import { Skeleton } from 'antd';

export const getStaticProps: GetStaticProps = async ctx => {
	try {
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/character`,
			{
				method: 'GET',
			},
		);
		const data = (await resp.json()) as _result_api;
		const characters_minify = fomatterCharacters(data);
		return {
			props: {
				characters: characters_minify,
				status: 'ok',
				pages: data.info.pages,
			},
		};
	} catch (error) {
		return {
			props: {
				characters: [],
				status: 'error',
				pages: 0,
			},
		};
	}
};
interface _props {
	characters: _character_minify[];
	status: 'ok' | 'error';
	pages: number;
}

const Home: NextPage<_props> = ({ characters, status, pages }) => {
	const [result, setResult] = useState<_character_minify[]>(characters);
	const [notification, openNotification] = useShowNotification();
	const [isLoading, setisLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const handleChangePage = (page: number) => {
		setisLoading(true);
		fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/character/?page=${page}`)
			.then(resp => resp.json())
			.then((characters: _result_api) => {
				const newCharacters = fomatterCharacters(
					characters,
				) as _character_minify[];
				setResult(newCharacters);
				setisLoading(false);
				setCurrentPage(page);
			})
			.catch(err => {
				setisLoading(false);
				openNotification(
					{
						message: `We have a little problem.`,
						description: `Sorry. Unless you've got a time machine, that content is unavailable.`,
						placement: 'top',
					},
					'error',
				);
			})
			.finally(() => {
				setisLoading(false);
			});
	};

	return (
		<>
			{notification}
			<LayoutHome>
				<Skeleton
					loading={isLoading}
					round
					active
					avatar={{ shape: 'square', size: 'large' }}
				>
					<CharacterList characters={result} />
				</Skeleton>
				{!isLoading && (
					<Paginator
						currentPage={currentPage}
						pages={pages}
						onChange={handleChangePage}
					/>
				)}
			</LayoutHome>
		</>
	);
};
export default Home;
