import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation.js";
import { useState } from "react";
import DPModal from "./DPModal.jsx";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const [modalOpen, setModalOpen] = useState(false);
	const [profilePicUrl, setProfilePicUrl] = useState("");

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	const openModal = (imageUrl) => {
		setProfilePicUrl(imageUrl);
		setModalOpen(true);
	  };

	  const closeModal = () => {
		setModalOpen(false);
	  };

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}

			onClick={() => setSelectedConversation(conversation)}>

				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='h-12 w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' 
							onClick={() => openModal(conversation.profilePic)}/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
			{modalOpen && (
        	<DPModal imageUrl={profilePicUrl} onClose={closeModal} />
      )}
		</>
	);
};
export default Conversation;
