import Image from 'next/image';
export default function TopNavServer() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light ftco-navbar-light">
			<div className="container-xl">
				<a className="navbar-brand" href="/">
					<Image
						className="img-fluid"
						width="100"
						height="25"
						src="/logo-simple.svg"
						alt="E-Digital Group Logo"
					/>
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<a className="nav-link" href="/solutions">
								Solutions
							</a>
						</li>

						<li className="nav-item">
							<a className="nav-link" href="/work">
								Work
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/resources">
								Resources
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/blog">
								Blog
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/about">
								About
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/contact">
								Contact
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
