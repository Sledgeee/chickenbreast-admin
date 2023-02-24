import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { API_ENDPOINTS } from '../services/apiService'
import { TablePageLayout } from '../layouts/table-page'

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] > a[orderBy]) {
		return -1
	}
	if (b[orderBy] < a[orderBy]) {
		return 1
	}
	return 0
}

export default function AdminsPage() {
	const [refreshTable, setRefreshTable] = useState(false)
	const { t } = useTranslation(['nav', 'table'])

	const TABLE_HEAD = [
		{ id: 'user_Id', label: 'Telegram ID', alignRight: false },
		{
			id: 'username',
			label: t('Username', { ns: 'table' }),
			alignRight: false
		},
		{ id: 'role', label: t('Role', { ns: 'table' }), alignRight: false },
		{ id: '' }
	]

	return (
		<TablePageLayout
			fetchEndpoint={API_ENDPOINTS.ADMIN}
			title={t('Admins')}
			tableHead={TABLE_HEAD}
			refreshTable={refreshTable}
			setRefreshTable={setRefreshTable}
			descendingComparator={descendingComparator}
			button={null}
		/>
	)
}
