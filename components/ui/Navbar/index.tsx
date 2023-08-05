import { Button, Col, Layout, Row, Tooltip } from 'antd';
import React from 'react';
import logo from '../../../public/logo.png';
import Image from 'next/image';
import styles from './styles.module.css';
import { HomeFilled } from '@ant-design/icons';
import { useRouter } from 'next/router';
export const Navbar = () => {
	const { push } = useRouter();
	const handleGoToHome = () => {
		push(`/`);
	};
	return (
		<Row className={styles.wrapper_header}>
			<Col xs={24}>
				<Layout className={styles.container}>
					<Image src={logo} alt='Rick and moorty logo' />
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
