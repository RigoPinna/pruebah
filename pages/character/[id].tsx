import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import {
	Badge,
	Breadcrumb,
	Card,
	Col,
	Collapse,
	CollapseProps,
	Divider,
	Image,
	Layout,
	Row,
	Typography,
	theme,
} from 'antd';

import {
	AuditOutlined,
	HomeFilled,
	ManOutlined,
	PushpinOutlined,
	ScheduleTwoTone,
	SmileFilled,
	WomanOutlined,
} from '@ant-design/icons';

import { LayoutGeneral } from '@/components/layouts';

import { _character } from '@/types';
import { LocationDetails } from '@/components/ui/LocationDetails';
import { EpisodeList } from '@/components/ui';
import { statusColors } from '@/utils';

interface _props {
	character: _character;
}
const { useToken } = theme;

const CharacterPage: NextPage<_props> = ({ character }) => {
	const {
		token: { colorBgContainer },
	} = useToken();
	const items: CollapseProps['items'] = [
		{
			key: '1',
			label: 'Location',
			children: <LocationDetails url={character.location.url} />,
		},
		{
			key: '2',
			label: `${character.episode.length > 2 ? 'Episodes' : 'Episode'} • ${
				character.episode.length
			}`,
			children: <EpisodeList episodes={character.episode} />,
		},
	];
	return (
		<LayoutGeneral
			metaTitle={character.name}
			description={`The character ${character.name} by Rick and Morty`}
			image={character.image}
		>
			<Layout style={{ background: `${colorBgContainer}` }}>
				<Layout.Header
					style={{ background: `${colorBgContainer}`, padding: 0 }}
				>
					<Breadcrumb
						items={[
							{
								href: '/',
								title: <HomeFilled />,
							},
							{
								title: 'Character',
							},
							{
								title: (
									<>
										<SmileFilled />
										<span>{character.name}</span>
									</>
								),
							},
						]}
					/>
				</Layout.Header>
				<Layout.Content>
					<Row gutter={[16, 16]}>
						<Col xs={24} md={12}>
							<Badge.Ribbon
								text={character.status}
								color={statusColors[character.status] || 'blue'}
							>
								<Card
									style={{ width: '100%' }}
									cover={
										<Image
											preview={false}
											width='100%'
											src={character.image}
											alt={character.name}
										/>
									}
								>
									<Card.Meta
										title={
											<Row align='middle'>
												<span>
													<PushpinOutlined />
												</span>
												<Typography.Text style={{ marginLeft: '5px' }} strong>
													Origin: {character.origin.name}
												</Typography.Text>
											</Row>
										}
									/>
								</Card>
							</Badge.Ribbon>
						</Col>
						<Col xs={24} md={12}>
							<Typography.Title level={1}>{character.name}</Typography.Title>
							<Divider type='horizontal' />
							<Row align='middle'>
								<AuditOutlined />
								<Typography.Text style={{ marginLeft: '5px' }} strong>
									Species: {character.species}
								</Typography.Text>
							</Row>
							<Row align='middle'>
								<span>
									<WomanOutlined />
									<ManOutlined />
								</span>
								<Typography.Text style={{ marginLeft: '5px' }} strong>
									Gender: {character.gender}
								</Typography.Text>
							</Row>

							<Divider type='horizontal' />
							<Collapse items={items} defaultActiveKey={['1']} />
						</Col>
					</Row>
				</Layout.Content>
			</Layout>
		</LayoutGeneral>
	);
};
export const getStaticPaths: GetStaticPaths = async ctx => {
	const characters = [...Array(826)].map((value, i) => ({
		params: { id: `${i + 1}` },
	}));

	return {
		paths: characters,
		fallback: false,
	};
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { id } = params as { id: string };
		const resp = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/character/${id}`,
			{
				method: 'GET',
			},
		);
		const data = (await resp.json()) as _character;

		return {
			props: {
				character: data,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
export default CharacterPage;
