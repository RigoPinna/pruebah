import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';

const { useNotification } = notification;
type _type_notification =
	| 'destroy'
	| 'error'
	| 'success'
	| 'info'
	| 'open'
	| 'warning';

export const useShowNotification = () => {
	const [api, contextHolder] = useNotification();
	const handleShowNotification = (
		notifyParams: ArgsProps,
		type: _type_notification,
	) => {
		const { [type]: notification } = api;
		//@ts-ignore
		notification(notifyParams);
	};

	return [contextHolder, handleShowNotification] as const;
};
