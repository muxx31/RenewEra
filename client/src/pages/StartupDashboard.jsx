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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Startup Dashboard</h1>
        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* Horizontal buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("browse")}
          className={`px-4 py-2 rounded ${activeTab === "browse" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Browse Materials
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 rounded ${activeTab === "upload" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Upload Requirement
        </button>
        <button
          onClick={() => setActiveTab("my")}
          className={`px-4 py-2 rounded ${activeTab === "my" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          My Requirements
        </button>
      </div>

      {/* Conditional rendering */}
      {activeTab === "browse" && (
        <>
          {materials.map((m) => (
            <Card
              key={m._id}
              item={m}
              onNotifyToggle={handleNotifyToggle}
              isNotified={notifiedIds.includes(m._id)}
            />
          ))}
        </>
      )}

      {activeTab === "upload" && (
        <form className="bg-white p-4 rounded shadow" onSubmit={handleUpload}>
          <input
            name="startupName"
            value={formData.startupName}
            onChange={handleInputChange}
            placeholder="Startup Name"
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            name="materialType"
            value={formData.materialType}
            onChange={handleInputChange}
            placeholder="Material Type"
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            name="minimumWeight"
            value={formData.minimumWeight}
            onChange={handleInputChange}
            placeholder="Minimum Weight (kg)"
            type="number"
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleInputChange}
            placeholder="Additional Details"
            className="w-full p-2 mb-2 border rounded"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Upload
          </button>
        </form>
      )}

      {activeTab === "my" && (
        <>
          {myRequirements.map((r) => (
            <div
              key={r._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center mb-2"
            >
              <div>
                <h3 className="font-bold">{r.materialType}</h3>
                <p>Startup: {r.startupName}</p>
                <p>Minimum Weight: {r.minimumWeight} kg</p>
                <p>{r.additionalDetails}</p>
              </div>
              <button
                onClick={() => handleDeleteRequirement(r._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default StartupDashboard;
