import { LayoutGeneral } from '@/components/layouts';

import { NextPage } from 'next';
import img from '../public/404.png';
import Image from 'next/image';
import { Button, Col, Row, Typography } from 'antd';
import styles from '../styles/404.module.css';
const Page404: NextPage = () => {
	return (
		<LayoutGeneral>
			<Row align='middle' justify='center'>
				<Col xs={12}>
					<Image className={styles.img_404} src={img} alt='Not found 404' />
					<Button
						type='primary'
						style={{
							display: 'block',
							margin: '0 auto 16px',
							cursor: 'default',
						}}
					>
						404 error
					</Button>
					<Typography.Title
						style={{
							display: 'block',
							textAlign: 'center',
						}}
						level={1}
					>
						We have lost this page
					</Typography.Title>
					<Typography.Text
						style={{
							display: 'block',
							textAlign: 'center',
						}}
						type='secondary'
					>
						Sorry, the page you are looking for does not exist or has been moved
					</Typography.Text>
				</Col>
			</Row>
		</LayoutGeneral>
	);
};

export default Page404;
