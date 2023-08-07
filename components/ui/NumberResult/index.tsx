import { FireOutlined } from '@ant-design/icons';
import { Row, Typography } from 'antd';
import CountUp from 'react-countup';
import styles from './styles.module.css';
import { FC } from 'react';
interface _props {
	total: number;
}
export const NumberResults: FC<_props> = ({ total }) => {
	if (total === 0) {
		return <></>;
	}
	return (
		<Row justify={'center'} align='middle'>
			<Typography.Text type='secondary'>
				<span>
					<FireOutlined color='#FF9900' />
				</span>
				Discover
			</Typography.Text>
			<CountUp className={styles.number} delay={1} end={total} separator=',' />
			<Typography.Text type='secondary'>Characters</Typography.Text>
		</Row>
	);
};
