'use-client';
import { NextPage } from 'next';
import { LayoutGeneral } from '@/components/layouts';
import { useSearchParams } from 'next/navigation';
import { Typography, Input, Layout, theme, Row, Col, Statistic } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import { CharacterList } from '@/components/ui';

import { NumberResults } from '@/components/ui/NumberResult';
const { useToken } = theme;
const SearchPage: NextPage = () => {
	const searchParams = useSearchParams();
	const {
		token: { colorBgContainer },
	} = useToken();
	const name = decodeURIComponent(searchParams.get('name') || '');

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
							<Input.Search
								placeholder='Search by name'
								onSearch={() => {}}
								value={name}
								size='large'
								style={{
									width: '100%',
								}}
							/>
							<Typography.Title
								level={1}
								style={{
									display: 'block',
									width: 'fit-content',
									margin: '0 auto',
								}}
							>
								{name}
							</Typography.Title>
							<NumberResults total={1000} />
						</Col>
					</Row>
				</Layout.Header>
				<Layout.Content
					style={{
						background: `${colorBgContainer}`,
					}}
				>
					<CharacterList characters={[]} />
				</Layout.Content>
			</Layout>
		</LayoutGeneral>
	);
};

export default SearchPage;
