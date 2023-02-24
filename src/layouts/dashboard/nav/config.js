import SvgColor from '../../../components/svg-color'

const icon = name => (
	<SvgColor
		src={`/assets/icons/navbar/${name}.svg`}
		sx={{ width: 24, height: 24 }}
	/>
)

const navConfig = [
	{
		title: 'Admins',
		path: '/admins',
		icon: icon('admins')
	},
	{
		title: 'Orders',
		path: '/orders',
		icon: icon('orders')
	},
	{
		title: 'Feedbacks',
		path: '/feedbacks',
		icon: icon('feedbacks')
	}
]

export default navConfig
