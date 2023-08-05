import { LayoutHome } from '@/components/layouts';
import { Typography } from 'antd';

export default function Home() {
	return (
		<>
			<LayoutHome>
				<Typography.Title level={1}>Hello!!</Typography.Title>
			</LayoutHome>
		</>
	);
}
