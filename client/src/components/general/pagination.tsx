import { Component } from "react"

interface IProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

class Pagination extends Component<IProps> {
	private handlePageChange = (page: number) => {
		if (page > 0 && page <= this.props.totalPages) {
			this.props.onPageChange(page)
		}
	}

	private createPageNumbers = (): number[] => {
		const pageNumbers: number[] = []

		if (this.props.totalPages <= 3) {
			for (let i = 1; i <= this.props.totalPages; i++) {
				pageNumbers.push(i)
			}
		} else {
			if (this.props.currentPage === 1) {
				pageNumbers.push(1, 2, 3)
			} else if (this.props.currentPage === this.props.totalPages) {
				pageNumbers.push(
					this.props.totalPages - 2,
					this.props.totalPages - 1,
					this.props.totalPages
				)
			} else {
				pageNumbers.push(
					this.props.currentPage - 1,
					this.props.currentPage,
					this.props.currentPage + 1
				)
			}
		}

		return pageNumbers
	}

	public render(): JSX.Element {
		const pageNumbers = this.createPageNumbers()

		return (
			<div className="flex justify-center mt-6">
				<nav>
					<ul className="flex items-center space-x-2">
						<li>
							<button
								onClick={() => this.handlePageChange(this.props.currentPage - 1)}
								disabled={this.props.currentPage === 1}
								className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
								Prev
							</button>
						</li>
						{pageNumbers.map((page) => (
							<li key={page}>
								<button
									onClick={() => this.handlePageChange(page)}
									disabled={page === this.props.currentPage}
									className={`px-4 py-2 border rounded-md ${
										page === this.props.currentPage
											? "bg-slate-800 text-white cursor-default"
											: "bg-gray-200 hover:bg-gray-300"
									}`}>
									{page}
								</button>
							</li>
						))}
						<li>
							<button
								onClick={() => this.handlePageChange(this.props.currentPage + 1)}
								disabled={this.props.currentPage === this.props.totalPages}
								className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
								Next
							</button>
						</li>
					</ul>
				</nav>
			</div>
		)
	}
}

export default Pagination
