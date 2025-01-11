import React from "react"

interface IProps {
	showLoading: boolean
}

class Loading extends React.Component<IProps> {
	public render() {
		if (!this.props.showLoading) {
			return null
		}

		return (
			<div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 opacity-50">
				<div
					className={`animate-spin rounded-full border-4 border-t-4 border-gray-200 w-28 h-28`}
					style={{ borderTopColor: "transparent" }}
				/>
			</div>
		)
	}
}

export default Loading
