// src/app/page.js (or wherever your main page is)

// import CursedHomepage from "./Components/CursedHomepage";
// import ThunderText from "./Components/ThunderText";
import ThunderToText from "./Components/ThunderToText";

export default function HomePage() {
	return (
		<div
			className="min-h-screen bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: 'url("/hand2.jpg")' }}
		>
			<ThunderToText />
			{/* <CursedHomepage/> */}
		</div>
	);
}
