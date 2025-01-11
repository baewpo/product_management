import React from "react"

interface IProps {
    show: boolean
    onClose: () => void
    text: string
    onConfirm: () => void
}

interface IStates {
}

class GeneralConfirmModal extends React.Component<IProps, IStates> {
	constructor(props: IProps) {
		super(props)
	}

	public render(): JSX.Element {
		if (!this.props.show) return <></>

		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
				<div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md mx-5">
					<label className="block my-10 text-lg font-bold text-center">{this.props.text}</label>
					<div className="flex justify-end gap-3 mt-5">
						<button
							className="bg-slate-800 rounded-full px-4 py-2 border border-transparent text-center text-sm text-white transition-all ease-in-out duration-500 shadow-sm hover:shadow hover:bg-slate-700"
							onClick={this.props.onConfirm}>
							Confirm
						</button>
						<button
							className="rounded-full px-4 py-2 text-slate-800 shadow-sm hover:text-white hover:bg-slate-700 border border-slate-700 hover:shadow hover:border-slate-800 transition-all ease-in-out duration-500 text-sm bg-white"
							onClick={this.props.onClose}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default GeneralConfirmModal
