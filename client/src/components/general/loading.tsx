import { Component } from "react"

interface LoadingProps {
	showLoading: boolean
}

class Loading extends Component<LoadingProps> {
	public render() {
		if (!this.props.showLoading) {
			return null
		}

		return (
			<div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
				<div
					className={`animate-spin rounded-full border-4 border-t-4 border-gray-200 w-28 h-28`}
					style={{ borderTopColor: "transparent" }}
				/>
			</div>
		)
	}
}

export default Loading
