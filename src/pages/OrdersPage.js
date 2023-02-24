import * as React from 'react'
import { useEffect, useState } from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	MenuItem,
	Tooltip
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { API_ENDPOINTS, ApiService } from '../services/apiService'
import { TablePageLayout } from '../layouts/table-page'
import Iconify from '../components/iconify'
import { ConfirmDialog } from '../components/confirm-dialog'

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] > a[orderBy]) {
		return -1
	}
	if (b[orderBy] < a[orderBy]) {
		return 1
	}
	return 0
}

export default function OrdersPage() {
	const [isOpen, setIsOpen] = useState(false)
	const [order, setOrder] = useState({})
	const [refreshTable, setRefreshTable] = useState(false)
	const { t } = useTranslation(['nav', 'table'])

	const TABLE_HEAD = [
		{
			id: 'firstName',
			label: t('FirstName', { ns: 'table' }),
			alignRight: false
		},
		{
			id: 'lastName',
			label: t('LastName', { ns: 'table' }),
			alignRight: false
		},
		{
			id: 'email',
			label: 'E-Mail',
			alignRight: false
		},
		{
			id: 'phone',
			label: t('Phone', { ns: 'table' }),
			alignRight: false
		},
		{
			id: 'moneyAmount',
			label: t('MoneyAmount', { ns: 'table' }),
			alignRight: false
		},
		{
			id: 'productsQuantity',
			label: t('ProductsQuantity', { ns: 'table' }),
			alignRight: false
		},
		{
			id: 'status',
			label: t('Status', { ns: 'table' }),
			alignRight: false
		},
		{
			id: 'date',
			label: t('Date', { ns: 'table' }),
			alignRight: false
		},
		{ id: '' }
	]

	return (
		<TablePageLayout
			fetchEndpoint={API_ENDPOINTS.ORDER}
			title={t('Orders')}
			tableHead={TABLE_HEAD}
			refreshTable={refreshTable}
			setRefreshTable={setRefreshTable}
			descendingComparator={descendingComparator}
			button={null}
			colsSpan={9}
			showAdditionalButtonsOnPopover
			filterRow={row => [
				row.firstName,
				row.lastName,
				row.email,
				row.phone,
				`${row.moneyAmount}₴`,
				row.productsQuantity,
				row.status,
				(() => {
					const options = {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit'
					}
					const date = new Date(row.createdAt)
					return date.toLocaleDateString(i18next.language, options)
				})()
			]}
			popoverItem={(item, handleClose) => (
				<MenuItem
					onClick={() => {
						handleClose()
						setOrder(item)
						setIsOpen(true)
					}}
				>
					<Iconify icon={'eva:eye-outline'} sx={{ mr: 2 }} />
					{t('Watch', { ns: 'modal' })}
				</MenuItem>
			)}
			modal={
				<WatchOrderDialog
					order={order}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					setRefreshTable={setRefreshTable}
				/>
			}
		/>
	)
}

const WatchOrderDialog = ({ order, isOpen, setIsOpen, setRefreshTable }) => {
	const { t } = useTranslation(['modal', 'nav', 'table'])
	const [deleteMenuOpen, setDeleteMenuOpen] = useState(false)
	const [changeMenuOpen, setChangeMenuOpen] = useState(false)
	const [orderItems, setOrderItems] = useState([])
	const [sum, setSum] = useState(0)
	const [qty, setQty] = useState(0)
	const [status, setStatus] = useState('')
	const [changeStatusValue, setChangeStatusValue] = useState('')
	const [clickedItemId, setClickedItemId] = useState(null)

	useEffect(() => {
		setSum(order.moneyAmount)
		setQty(order.productsQuantity)
		setStatus(order.status)
		setOrderItems(order.items)
	}, [order.items])

	const handleChangeStatus = async () => {
		await ApiService.updateOne(`${API_ENDPOINTS.ORDER}/status`, order._id, {
			status: changeStatusValue
		})
		setStatus(changeStatusValue)
		setRefreshTable(value => !value)
		setChangeMenuOpen(false)
	}

	const handleDelete = async () => {
		if (clickedItemId) {
			if (orderItems.length === 1) return
			const { data } = await ApiService.deleteOne(
				`${API_ENDPOINTS.ORDER}/item/${clickedItemId}`,
				order._id
			)
			setSum(data.moneyAmount)
			setQty(data.productsQuantity)
			setOrderItems(value => value.filter(x => x._id !== clickedItemId))
			setClickedItemId(null)
		} else {
			await ApiService.deleteOne(API_ENDPOINTS.ORDER, order._id)
			setIsOpen(false)
		}
		setRefreshTable(value => !value)
		setDeleteMenuOpen(false)
	}

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth={'xl'}>
			<DialogTitle sx={{ position: 'relative' }}>
				{t('Orders', { ns: 'nav' })} #{order._id}
				<IconButton
					sx={{ position: 'absolute', right: 0, mx: 2 }}
					onClick={() => setIsOpen(false)}
				>
					<Iconify icon={'eva:close-outline'} />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<DialogContentText sx={{ color: '#232323' }}>
					{t('Client')}: {order.firstName} {order.lastName}
				</DialogContentText>
				<DialogContentText sx={{ color: '#232323' }}>
					{t('Phone', { ns: 'table' })}: {order.phone}
				</DialogContentText>
				<DialogContentText sx={{ color: '#232323' }}>
					E-Mail: {order.email}
				</DialogContentText>
				<DialogContentText sx={{ color: '#232323' }}>
					{t('MoneyAmount', { ns: 'table' })}: {sum}₴
				</DialogContentText>
				<DialogContentText sx={{ color: '#232323' }}>
					{t('ProductsQuantity', { ns: 'table' })}: {qty}
				</DialogContentText>
				<DialogContentText sx={{ color: '#232323' }}>
					{t('Status', { ns: 'table' })}: {status}
				</DialogContentText>
				<DialogContentText sx={{ color: '#232323' }}>
					{t('OrderProdsList')}:
				</DialogContentText>
				<table style={{ textAlign: 'center' }}>
					<thead>
						<tr>
							<th width={'11%'}>{''}</th>
							<th width={'30%'}>{t('OrderTableName')}</th>
							<th width={'17%'}>{t('OrderTablePrice')}</th>
							<th width={'17%'}>{t('OrderTableQty')}</th>
							<th>{t('OrderTableTotal')}</th>
							{status === 'Створене' && orderItems.length > 1 && (
								<th width={'10%'}>{''}</th>
							)}
						</tr>
					</thead>
					<tbody>
						{orderItems?.map((value, index) => (
							<tr key={index}>
								<td>
									<img
										src={`http://localhost:8000${value.product.image}`}
										alt={index}
									/>
								</td>
								<td>{value.product.name}</td>
								<td>{value.product.price}₴</td>
								<td>{value.quantity}</td>
								<td>{value.totalSum}₴</td>
								<td>
									{status === 'Створене' && orderItems.length > 1 && (
										<Tooltip title={t('DeleteOrder')}>
											<IconButton
												size='large'
												color='error'
												onClick={() => {
													setClickedItemId(value._id)
													setDeleteMenuOpen(true)
												}}
											>
												<Iconify icon={'eva:trash-outline'} />
											</IconButton>
										</Tooltip>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<ConfirmDialog
					open={deleteMenuOpen}
					handleClose={() => setDeleteMenuOpen(false)}
					handleYes={() => handleDelete()}
				/>
				<ConfirmDialog
					open={changeMenuOpen}
					handleClose={() => setChangeMenuOpen(false)}
					handleYes={() => handleChangeStatus()}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					variant={'outlined'}
					color={'error'}
					onClick={() => setDeleteMenuOpen(true)}
				>
					{t('DeleteOrder')}
				</Button>
				{status !== 'Виконане' && status !== 'Скасоване' && (
					<Button
						variant={'outlined'}
						color={'error'}
						onClick={() => {
							setChangeStatusValue('Скасоване')
							setChangeMenuOpen(true)
						}}
					>
						{t('CancelOrder')}
					</Button>
				)}
				{status !== 'Виконане' &&
					status !== 'Скасоване' &&
					status !== 'Оброблене менеджером' && (
						<Button
							variant={'outlined'}
							onClick={() => {
								setChangeStatusValue('Оброблене менеджером')
								setChangeMenuOpen(true)
							}}
						>
							{t('ProcessOrder')}
						</Button>
					)}
				{status !== 'Виконане' && status !== 'Скасоване' && (
					<Button
						variant={'contained'}
						onClick={() => {
							setChangeStatusValue('Виконане')
							setChangeMenuOpen(true)
						}}
					>
						{t('DoneOrder')}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	)
}
