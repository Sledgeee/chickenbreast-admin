export const useUser = () => {
	const user = localStorage.getItem('user')
	return user ? JSON.parse(user) : null
}
