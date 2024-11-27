'use client';

import {
	FaJs,
	FaNodeJs,
	FaReact,
	FaHtml5,
	FaCss3Alt,
	FaAws,
	FaPhp,
	FaPython,
	FaVuejs,
} from 'react-icons/fa';
import {
	SiNextdotjs,
	SiMongodb,
	SiMysql,
	SiBackbonedotjs,
	SiHugo,
	SiGooglecloud,
	SiDjango,
	SiPostgresql,
	SiMariadb,
	SiCouchbase,
	SiElectron,
	SiPwa,
	SiEmberdotjs,
	SiRabbitmq,
	SiApachekafka,
	SiPlatformdotsh,
	SiCloudinary,
	SiCloudflare,
	SiOpenai,
	SiNginx,
	SiApache,
	SiExpress,
	SiWordpress,
	SiStrapi,
	SiPocketbase,
	SiJquery,
	SiCodeigniter,
	SiLaravel,
	SiPytorch,
	SiTensorflow,
	SiOpencv,
} from 'react-icons/si';
import { MdOutlineSmartToy } from 'react-icons/md';

export default function List({}) {
	const frontEnd = [
		{ name: 'HTML5', icon: <FaHtml5 /> },
		{ name: 'CSS3', icon: <FaCss3Alt /> },
		{ name: 'JavaScript', icon: <FaJs /> },
		{ name: 'React', icon: <FaReact /> },
		{ name: 'Next.js', icon: <SiNextdotjs /> },
		{ name: 'Backbone.js', icon: <SiBackbonedotjs /> },
		{ name: 'PWA', icon: <SiPwa /> },
		{ name: 'Vue.js', icon: <FaVuejs /> },
		{ name: 'jQuery', icon: <SiJquery /> },
	];

	const backEnd = [
		{ name: 'Node.js', icon: <FaNodeJs /> },
		{ name: 'Express', icon: <SiExpress /> },
		{ name: 'PHP', icon: <FaPhp /> },
		{ name: 'Laravel', icon: <SiLaravel /> },
		{ name: 'CodeIgniter', icon: <SiCodeigniter /> },
		{ name: 'Python', icon: <FaPython /> },
		{ name: 'NginX', icon: <SiNginx /> },
		{ name: 'Apache', icon: <SiApache /> },
	];

	const databases = [
		{ name: 'MySQL', icon: <SiMysql /> },
		{ name: 'MariaDB', icon: <SiMariadb /> },
		{ name: 'MongoDB', icon: <SiMongodb /> },
		{ name: 'Postgres', icon: <SiPostgresql /> },
		{ name: 'Couchbase', icon: <SiCouchbase /> },
	];

	const cms = [
		{ name: 'WordPress', icon: <SiWordpress /> },
		{ name: 'Django', icon: <SiDjango /> },
		{ name: 'Hugo', icon: <SiHugo /> },
		{ name: 'ExpressionEngine', icon: <SiHugo /> },
		{ name: 'Strapi', icon: <SiStrapi /> },
		{ name: 'PocketBase', icon: <SiPocketbase /> },
	];

	const cloud = [
		{ name: 'AWS', icon: <FaAws /> },
		{ name: 'Google Cloud', icon: <SiGooglecloud /> },
		{ name: 'OpenAI', icon: <SiOpenai /> },
		{ name: 'Platform.sh', icon: <SiPlatformdotsh /> },
		{ name: 'Coudinary', icon: <SiCloudinary /> },
		{ name: 'CloudFlare', icon: <SiCloudflare /> },
	];

	const ai = [
		{ name: 'OpenAI', icon: <SiOpenai /> },
		{ name: 'Python', icon: <FaPython /> },
		{ name: 'PyTorch', icon: <SiPytorch /> },
		{ name: 'TensorFlow', icon: <SiTensorflow /> },
		{ name: 'OpenCV', icon: <SiOpencv /> },
	];

	function List(list) {
		return list.map((tech, index) => (
			<div key={tech.name}>
				<span className="icon">{tech.icon}</span>
				<span className="name">{tech.name}</span>
			</div>
		));
	}
	return (
		<section className="ftco-section ftco-border-top ftco-section-technologies bg-darken">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col heading-section text-center">
						<span className="subheading">Tech Stack</span>
						<h2>Technologies We Work With</h2>
					</div>
				</div>
				<div
					className="row justify-content-center"
					data-aos="fade-up"
					data-aos-duration="1000"
				>
					<div className="col-6 col-md-4 col-lg-2 tech-list">
						<h4>Client</h4>
						{List(frontEnd)}
					</div>
					<div className="col-6 col-md-4 col-lg-2 tech-list">
						<h4>Server</h4>
						{List(backEnd)}
					</div>
					<div className="col-6 col-md-4 col-lg-2 tech-list">
						<h4>Databases</h4>
						{List(databases)}
					</div>
					<div className="col-6 col-md-4 col-lg-2 tech-list">
						<h4>Cloud</h4>
						{List(cloud)}
					</div>
					<div className="col-6 col-md-4 col-lg-2 tech-list">
						<h4>CMS</h4>
						{List(cms)}
					</div>
					<div className="col-6 col-md-4 col-lg-2 tech-list">
						<h4>AI</h4>
						{List(ai)}
					</div>
				</div>
			</div>
		</section>
	);
}
