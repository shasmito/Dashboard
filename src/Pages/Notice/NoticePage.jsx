import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletingNotice, setDeletingNotice] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, [showModal]);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('https://bdu-swe-dept.vercel.app/all-notice');
      setNotices(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();

    let fileUrl = '';
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('key', '18fd545daa360d6cea1fe3c38669c6ec');
      
      try {
        const uploadResponse = await axios.post('https://api.imgbb.com/1/upload', formData);
        fileUrl = uploadResponse.data.data.url;
      } catch (uploadError) {
        console.error('Error uploading file:', uploadError);
        return;
      }
    }

    try {
      const newNotice = { title, description: `${fileUrl}` };
      const response = await axios.post('https://bdu-swe-dept.vercel.app/create-notice', newNotice);
      setNotices([...notices, response.data]);
      setTitle('');
      setDescription('');
      setFile(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating notice:', error);
    }
  };

  const handleDeleteNotice = async (id) => {
    try {
      await axios.delete(`https://bdu-swe-dept.vercel.app/notice/${id}`);
      setNotices(notices.filter(notice => notice._id !== id));
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notices</h1>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Create Notice
      </button>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleCreateNotice} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                    PDF File
                  </label>
                  <input
                    id="file"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    className="bg-gray hover:bg-gray text-white font-bold py-2 px-4 rounded mr-2"
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

      <h2 className="text-xl font-bold mb-4">All Notices</h2>
      <ul>
        {notices.map((notice) => (
          <li key={notice._id} className="border-b border-gray-200 py-2 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{notice.title}</h3>
              <p>{notice.description}</p>
            </div>
            <button
              onClick={() => setDeletingNotice(notice._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
            {deletingNotice === notice._id && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <h3 className="text-lg font-bold">Are you sure you want to delete this notice?</h3>
                      <div className="mt-4 flex items-center justify-end">
                        <button
                          type="button"
                          className="bg-gray hover:bg-gray text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => setDeletingNotice(null)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            handleDeleteNotice(notice._id);
                            setDeletingNotice(null);
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

export default NoticePage;
