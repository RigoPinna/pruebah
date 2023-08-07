import Link from 'next/link';

import { useRouter } from 'next/router';
import Image from 'next/image';

import { Button, Col, Layout, Row, Tooltip, Input } from 'antd';
import { HomeFilled } from '@ant-design/icons';

import logo from '../../../public/logo.png';
import styles from './styles.module.css';

export const Navbar = () => {
	const { push, pathname } = useRouter();
	const handleGoToHome = () => {
		push(`/`);
	};
	const handleOnSearch = (value: string) => {
		push({
			pathname: '/search',
			query: {
				name: encodeURIComponent(value),
			},
		});
	};
	return (
		<Row className={styles.wrapper_header}>
			<Col xs={24}>
				<Layout className={styles.container}>
					<Row align='middle'>
						<Link href='/'>
							<Image src={logo} alt='Rick and moorty logo' />
						</Link>
						{pathname !== '/search' && (
							<Input.Search
								placeholder='Search by name'
								onSearch={handleOnSearch}
								style={{ width: 250, marginLeft: '16px' }}
							/>
						)}
					</Row>
					<Tooltip title='Go to home'>
						<Button
							shape='circle'
							icon={<HomeFilled />}
							onClick={handleGoToHome}
						/>
					</Tooltip>
				</Layout>
			</Col>
		</Row>
	);
};
