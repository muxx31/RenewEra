import React, { useState, useEffect } from "react";
import api from "../services/api";
import Card from "../components/Card";

const StartupDashboard = ({ user, onLogout }) => {
  const [materials, setMaterials] = useState([]);
  const [myRequirements, setMyRequirements] = useState([]);
  const [activeTab, setActiveTab] = useState("browse"); // browse | upload | my
  const [formData, setFormData] = useState({
    startupName: "",
    materialType: "",
    minimumWeight: "",
    additionalDetails: "",
  });
  const [notifiedIds, setNotifiedIds] = useState([]);

  const headers = { Authorization: `Bearer ${user.token}` };

  const fetchMaterials = async () => {
    try {
      const res = await api.get("/materials", { headers });
      setMaterials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyRequirements = async () => {
    try {
      const res = await api.get("/requirements/my", { headers });
      setMyRequirements(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchMaterials();
    fetchMyRequirements();
  }, [user]);

  const handleNotifyToggle = (id) => {
    if (notifiedIds.includes(id)) {
      setNotifiedIds(notifiedIds.filter((nid) => nid !== id));
    } else {
      setNotifiedIds([...notifiedIds, id]);
      api.post(`/interactions/material/${id}/interest`, {}, { headers });
    }
  };

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await api.post("/requirements", formData, { headers });
      setFormData({ startupName: "", materialType: "", minimumWeight: "", additionalDetails: "" });
      fetchMyRequirements();
      setActiveTab("my");
    } catch (err) {
      alert(err.response?.data?.error || "Upload failed");
    }
  };

  const handleDeleteRequirement = async (id) => {
    if (!confirm("Delete this requirement?")) return;
    try {
      await api.delete(`/requirements/${id}`, { headers });
      fetchMyRequirements();
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-radial-[at_50%_75%] from-white via-yellow-50 to-yellow-100 to-90% p-4 sm:p-6 md:p-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
        Welcome, {user?.name || "Supplier!"}
        </h1>
        <button
          onClick={onLogout}
          className="border-yellow-950 border-double border-8 bg-amber-100 text-yellow-950 px-4 py-2 rounded w-full sm:w-auto hover:bg-red-100"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-6">
        <button
          onClick={() => setActiveTab("browse")}
          className={`px-4 py-2 rounded w-full sm:w-auto ${
            activeTab === "browse" ? "bg-yellow-950 text-white" : "bg-gray-300"
          }`}
        >
          Browse Materials
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 rounded w-full sm:w-auto ${
            activeTab === "upload" ? "bg-yellow-950 text-white" : "bg-gray-300"
          }`}
        >
          Upload Requirement
        </button>
        <button
          onClick={() => setActiveTab("my")}
          className={`px-4 py-2 rounded w-full sm:w-auto ${
            activeTab === "my" ? "bg-yellow-950 text-white" : "bg-gray-300"
          }`}
        >
          My Requirements
        </button>
      </div>

      {/* Conditional Rendering */}
      {activeTab === "browse" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {materials.map((m) => (
            <Card
              key={m._id}
              item={m}
              onNotifyToggle={handleNotifyToggle}
              isNotified={notifiedIds.includes(m._id)}
            />
          ))}
        </div>
      )}

      {activeTab === "upload" && (
        <form
          className="bg-white p-4 sm:p-6 rounded shadow w-full max-w-lg mx-auto"
          onSubmit={handleUpload}
        >
          <input
            name="startupName"
            value={formData.startupName}
            onChange={handleInputChange}
            placeholder="Startup Name"
            required
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            name="materialType"
            value={formData.materialType}
            onChange={handleInputChange}
            placeholder="Material Type"
            required
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            name="minimumWeight"
            value={formData.minimumWeight}
            onChange={handleInputChange}
            placeholder="Minimum Weight (kg)"
            type="number"
            required
            className="w-full p-2 mb-3 border rounded"
          />
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleInputChange}
            placeholder="Additional Details"
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-green-600 transition"
          >
            Upload
          </button>
        </form>
      )}

      {activeTab === "my" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {myRequirements.map((r) => (
            <div
              key={r._id}
              className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between sm:items-center gap-3"
            >
              <div>
                <h3 className="font-bold text-lg">{r.materialType}</h3>
                <p className="text-sm sm:text-base">Startup: {r.startupName}</p>
                <p className="text-sm sm:text-base">
                  Minimum Weight: {r.minimumWeight} kg
                </p>
                <p className="text-sm sm:text-base">{r.additionalDetails}</p>
              </div>
              <button
                onClick={() => handleDeleteRequirement(r._id)}
                className="border-2 border-red-700 text-red-700 px-4 py-2 rounded hover:bg-red-200 transition w-full sm:w-auto"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StartupDashboard;
