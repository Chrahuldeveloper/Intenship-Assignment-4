import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const DropdownPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(() => {
    const storedUser = localStorage.getItem("selectedUser");
    return storedUser ? Number(storedUser) : "";
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => console.error("Failed to fetch users"));
  }, []);

  const handleSubmit = () => {
    if (selectedUser) {
      localStorage.setItem("selectedUser", selectedUser);
      navigate("/details");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-blue-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80vw] md:w-[60vw] lg:w-[30vw] border border-blue-200">
        <h2 className="text-lg font-bold text-blue-700 mb-4">Select a User</h2>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(Number(e.target.value))}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button 
          onClick={handleSubmit} 
          className={`px-4 py-2 rounded mt-4 w-full transition ${selectedUser ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`} 
          disabled={!selectedUser}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const UserDetailsPage = () => {
  const [user, setUser] = useState(null);
  const selectedUser = Number(localStorage.getItem("selectedUser"));
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedUser) {
      fetch(`https://jsonplaceholder.typicode.com/users/${selectedUser}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => console.error("Failed to fetch user details"));
    }
  }, [selectedUser]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-blue-50">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-[80vw] md:w-[60vw] lg:w-[30vw] border border-blue-200">
          <h2 className="text-xl font-bold text-blue-700">{user.name}</h2>
          <p className="text-gray-700">Email: {user.email}</p>
          <p className="text-gray-700">Address: {`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</p>
          <p className="text-gray-700">Company: {user.company.name}</p>
          <div className="mt-4 flex justify-between">
            <button onClick={() => navigate("/")} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
              Back
            </button>
            <button onClick={() => navigate("/final")} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const FinalPage = () => {
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const handleFinish = () => {
    if (note.trim()) {
      localStorage.setItem("userNote", note);
      navigate("/summary");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-blue-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80vw] md:w-[60vw] lg:w-[30vw] border border-blue-200">
        <h2 className="text-lg font-bold text-blue-700 mb-4">Enter a Note</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          onClick={handleFinish} 
          className={`px-4 py-2 rounded mt-4 w-full transition ${note.trim() ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`} 
          disabled={!note.trim()}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

const SummaryPage = () => {
  const selectedUser = Number(localStorage.getItem("selectedUser"));
  const userNote = localStorage.getItem("userNote");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-blue-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80vw] md:w-[60vw] lg:w-[30vw] border border-blue-200">
        <h2 className="text-lg font-bold text-blue-700 mb-4">Summary</h2>
        <p className="text-gray-700">Selected User ID: {selectedUser}</p>
        <p className="text-gray-700">Note: {userNote}</p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DropdownPage />} />
        <Route path="/details" element={<UserDetailsPage />} />
        <Route path="/final" element={<FinalPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
