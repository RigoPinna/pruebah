import { Button, Card, Col, Image } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from './CharacterCard.module.css';
export const CharacterCard = () => {
	return (
		<Col xs={24} sm={12} md={8} lg={4}>
			<Card
				className={styles.card}
				hoverable
				cover={
					<Image
						src='https://rickandmortyapi.com/api/character/avatar/1.jpeg'
						alt='name'
					/>
				}
				actions={[
					<Button
						className={styles.cta}
						key='view-more'
						type='text'
						icon={<ArrowRightOutlined />}
					>
						View more
					</Button>,
				]}
			>
				<Card.Meta title='Character Name' description='Spaces: Human' />
			</Card>
		</Col>
	);
};
