import { Badge, Button, Card, Col, Image } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from './CharacterCard.module.css';
import { FC } from 'react';
import { _status_character } from '@/types';
export interface _character_minify {
	id: number;
	image: string;
	name: string;
	species: string;
	status: _status_character;
	statusColor: 'green' | 'orange' | 'grey';
}
export const CharacterCard: FC<_character_minify> = ({
	id,
	image,
	name,
	species,
	status,
	statusColor,
}) => {
	const goToDetailsPage = () => {
		console.log(id);
	};

	return (
		<Col xs={24} sm={12} md={8} lg={4}>
			<Badge.Ribbon text={status} color={statusColor}>
				<Card
					className={styles.card}
					hoverable
					cover={<Image src={image} alt={name} />}
					actions={[
						<Button
							onClick={goToDetailsPage}
							className={styles.cta}
							key='view-more'
							type='text'
							icon={<ArrowRightOutlined />}
						>
							View more
						</Button>,
					]}
				>
					<Card.Meta title={name} description={`Specie: ${species}`} />
				</Card>
			</Badge.Ribbon>
		</Col>
	);
};
