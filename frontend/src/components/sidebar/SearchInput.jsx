import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};
	return (

		<div className="flex items-center justify-between">
			<form onSubmit={handleSubmit} className='flex items-center gap-2'>
				<input
					type='text'
					placeholder='Search…'
					className='input h-8 input-bordered rounded-full'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button type='submit' className='btn btn-circle bg-sky-500 px-0.8 py-0.8 text-white'>
					<IoSearchSharp className='w-3 h-3 outline-none' />
				</button>
			</form>
			<div>
				<SlOptionsVertical className='ml-2 w-4 h-4 outline-none'/>
			</div>
		</div>

	);
};
export default SearchInput;
