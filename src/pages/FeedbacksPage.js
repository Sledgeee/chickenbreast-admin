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

export default function FeedbacksPage() {
	const [refreshTable, setRefreshTable] = useState(false)
	const { t } = useTranslation(['nav', 'table'])

	const TABLE_HEAD = [
		{ id: 'name', label: t('Name', { ns: 'table' }), alignRight: false },
		{
			id: 'email',
			label: 'E-Mail',
			alignRight: false
		},
		{ id: 'subject', label: t('Subject', { ns: 'table' }), alignRight: false },
		{ id: 'message', label: t('Message', { ns: 'table' }), alignRight: false },
		{ id: '' }
	]

	return (
		<TablePageLayout
			fetchEndpoint={API_ENDPOINTS.FEEDBACKS}
			title={t('Feedbacks')}
			tableHead={TABLE_HEAD}
			refreshTable={refreshTable}
			setRefreshTable={setRefreshTable}
			descendingComparator={descendingComparator}
			button={null}
		/>
	)
}
