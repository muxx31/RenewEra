import React, { useState, useEffect } from "react";
import api from "../services/api";
import Card from "../components/Card";

const SupplierDashboard = ({ user, onLogout }) => {
  const [requirements, setRequirements] = useState([]);
  const [myMaterials, setMyMaterials] = useState([]);
  const [activeTab, setActiveTab] = useState("browse"); // browse | upload | my
  const [formData, setFormData] = useState({
    materialType: "",
    weight: "",
    freeOrPaid: "free",
    additionalInfo: "",
  });
  const [notifiedIds, setNotifiedIds] = useState([]);

  const headers = { Authorization: `Bearer ${user.token}` };

  // Fetch functions
  const fetchRequirements = async () => {
    try {
      const res = await api.get("/requirements", { headers });
      setRequirements(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyMaterials = async () => {
    try {
      const res = await api.get("/materials/my", { headers });
      setMyMaterials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchRequirements();
    fetchMyMaterials();
  }, [user]);

  // Notify toggle
  const handleNotifyToggle = (id) => {
    if (notifiedIds.includes(id)) {
      setNotifiedIds(notifiedIds.filter((nid) => nid !== id));
    } else {
      setNotifiedIds([...notifiedIds, id]);
      api.post(`/interactions/requirement/${id}/interest`, {}, { headers });
    }
  };

  // Upload form handlers
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await api.post("/materials", formData, { headers });
      setFormData({ materialType: "", weight: "", freeOrPaid: "free", additionalInfo: "" });
      fetchMyMaterials();
      setActiveTab("my");
    } catch (err) {
      alert(err.response?.data?.error || "Upload failed");
    }
  };

  const handleDeleteMaterial = async (id) => {
    if (!confirm("Delete this material?")) return;
    try {
      await api.delete(`/materials/${id}`, { headers });
      fetchMyMaterials();
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-radial-[at_50%_75%] from-white via-yellow-50 to-yellow-100 to-90% p-4 sm:p-6 md:p-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Welcome, {user?.name || "Supplier!"}</h1>
        <button
          onClick={onLogout}
          className="border-yellow-950 border-double border-8 bg-amber-100 text-yellow-950 px-4 py-2 rounded w-full sm:w-auto hover:bg-red-100"
        >
          Logout
        </button>
      </div>

      {/* Horizontal buttons for tabs */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 gap-3 sm:gap-0 mb-6">
        <button
          onClick={() => setActiveTab("browse")}
          className={`px-4 py-2 rounded w-full sm:w-auto ${
            activeTab === "browse" ? "bg-yellow-900 text-white" : "bg-gray-300"
          }`}
        >
          Browse Requirements
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 rounded w-full sm:w-auto ${
            activeTab === "upload" ? "bg-yellow-900 text-white" : "bg-gray-300"
          }`}
        >
          Upload Material
        </button>
        <button
          onClick={() => setActiveTab("my")}
          className={`px-4 py-2 rounded w-full sm:w-auto ${
            activeTab === "my" ? "bg-yellow-900 text-white" : "bg-gray-300"
          }`}
        >
          My Materials
        </button>
      </div>

      {/* Conditional rendering */}
      {activeTab === "browse" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {requirements.map((req) => (
            <Card
              key={req._id}
              item={req}
              onNotifyToggle={handleNotifyToggle}
              isNotified={notifiedIds.includes(req._id)}
            />
          ))}
        </div>
      )}

      {activeTab === "upload" && (
        <form
          className="bg-white p-4 sm:p-6 rounded shadow max-w-lg mx-auto w-full"
          onSubmit={handleUpload}
        >
          <input
            name="materialType"
            value={formData.materialType}
            onChange={handleInputChange}
            placeholder="Material Type"
            required
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="Weight (kg)"
            type="number"
            required
            className="w-full p-2 mb-3 border rounded"
          />
          <select
            name="freeOrPaid"
            value={formData.freeOrPaid}
            onChange={handleInputChange}
            className="w-full p-2 mb-3 border rounded"
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            placeholder="Additional Info"
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Upload
          </button>
        </form>
      )}

      {activeTab === "my" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {myMaterials.map((m) => (
            <div
              key={m._id}
              className="bg-white p-4 rounded shadow flex flex-col justify-between gap-3"
            >
              <div>
                <h3 className="font-bold text-lg">{m.materialType}</h3>
                <p>Weight: {m.weight} kg</p>
                <p>{m.freeOrPaid}</p>
                <p>{m.additionalInfo}</p>
              </div>
              <button
                onClick={() => handleDeleteMaterial(m._id)}
                className="border-2 border-red-800 text-red-800 px-4 py-2 rounded w-full sm:w-auto"
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

export default SupplierDashboard;
