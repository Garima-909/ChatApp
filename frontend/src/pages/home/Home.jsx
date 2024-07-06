import MessageContainer from "../../components/Messages/MessageContainer.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";

const Home = () => {
	return (
		<div className=' h-[90%]  flex  rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;

// sm:h-[450px] md:h-[550px] overflow-auto