import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResearchPage = () => {
  const [researchPosts, setResearchPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deletingResearch, setDeletingResearch] = useState(null);

  useEffect(() => {
    fetchResearchPosts();
  }, [showModal]);

  const fetchResearchPosts = async () => {
    try {
      const response = await axios.get('https://bdu-swe-dept.vercel.app/all-research');
      setResearchPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching research posts:', error);
    }
  };

  const handleCreateResearch = async (e) => {
    e.preventDefault();
    try {
      const newResearch = { title, description };
      const response = await axios.post('https://bdu-swe-dept.vercel.app/create-research', newResearch);
      setResearchPosts([...researchPosts, response.data]);
      setTitle('');
      setDescription('');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating research post:', error);
    }
  };

  const handleDeleteResearch = async (id) => {
    try {
      await axios.delete(`https://bdu-swe-dept.vercel.app/research/${id}`);
      setResearchPosts(researchPosts.filter(research => research._id !== id));
    } catch (error) {
      console.error('Error deleting research post:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Research Posts</h1>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Create Research Post
      </button>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleCreateResearch} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <textarea
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Research paper Or Publication Link
                  </label>
                  <input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  ></input>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-gray font-bold py-2 px-4 rounded mr-2"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">All Research Posts</h2>
      <ul>
        {researchPosts.map((research) => (
          <li key={research._id} className="border-b border-gray-200 py-2 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{research.title}</h3>
              <p>{research.description}</p>
            </div>
            <button
              onClick={() => setDeletingResearch(research._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
            {deletingResearch === research._id && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <h3 className="text-lg font-bold">Are you sure you want to delete this research post?</h3>
                      <div className="mt-4 flex items-center justify-end">
                        <button
                          type="button"
                          className="bg-gray-500 hover:bg-gray-700 text-gray font-bold py-2 px-4 rounded mr-2"
                          onClick={() => setDeletingResearch(null)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            handleDeleteResearch(research._id);
                            setDeletingResearch(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResearchPage;
