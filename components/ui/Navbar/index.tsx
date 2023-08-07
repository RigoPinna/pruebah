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
		if (value.trim() !== '') {
			push({
				pathname: '/search',
				query: {
					name: encodeURIComponent(value.trim()),
				},
			});
		}
	};
	return (
		<Row className={styles.wrapper_header}>
			<Col xs={24}>
				<Layout className={styles.container}>
					<div className={styles.logo_and_search}>
						<Link className={styles.logo} href='/'>
							<Image src={logo} alt='Rick and moorty logo' />
						</Link>
						{pathname !== '/search' && (
							<Input.Search
								className={styles.input_desktop_and_tablet}
								placeholder='Search by name'
								onSearch={handleOnSearch}
							/>
						)}
					</div>
					<Tooltip title='Go to home'>
						<Button
							shape='circle'
							icon={<HomeFilled />}
							onClick={handleGoToHome}
						/>
					</Tooltip>
				</Layout>
				{pathname !== '/search' && (
					<Input.Search
						className={styles.input_mobile}
						placeholder='Search by name'
						onSearch={handleOnSearch}
					/>
				)}
			</Col>
		</Row>
	);
};
