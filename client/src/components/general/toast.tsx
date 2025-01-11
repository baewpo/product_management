import { ToastOptions, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const toastOptions: ToastOptions = {
	position: "top-right",
	autoClose: 3000,
	closeOnClick: true,
}

const showToast = (type: string, message: string, options = {}) => {
	const config = { ...toastOptions, ...options }

	switch (type) {
		case "success":
			toast.success(message, config)
			break
		case "error":
			toast.error(message, config)
			break
		case "info":
			toast.info(message, config)
			break
		case "warning":
			toast.warning(message, config)
			break
		default:
			toast(message, config)
			break
	}
}

export { showToast }
