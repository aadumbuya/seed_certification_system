import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { format } from 'date-fns';
import { Upload, FileText, Save, Send, Award } from 'lucide-react';

// Mock data for seed submissions
const MOCK_SEED_SUBMISSIONS = [
  {
    id: '1001',
    seedType: 'Maize',
    variety: 'Highland F1',
    location: 'Nairobi, Kenya',
    submissionDate: '2025-03-15T08:30:00Z',
    status: 'APPROVED',
    inspector: { name: 'John Smith' },
    certificateId: 'CERT-001',
    labReports: [
      { id: 'LR001', date: '2025-03-10', result: 'Germination 95%' },
      { id: 'LR002', date: '2025-03-12', result: 'Purity 98%' },
    ],
    bioData: { seedName: 'Highland Maize', productionDate: '2024-12-01', batchNumber: 'MAZ-001' },
  },
  {
    id: '1002',
    seedType: 'Wheat',
    variety: 'Red Ruby',
    location: 'Eldoret, Kenya',
    submissionDate: '2025-04-01T14:45:00Z',
    status: 'PENDING',
    inspector: null,
    certificateId: null,
    labReports: [],
    bioData: { seedName: 'Ruby Wheat', productionDate: '2025-01-15', batchNumber: 'WHT-002' },
  },
  {
    id: '1003',
    seedType: 'Rice',
    variety: 'Basmati Gold',
    location: 'Mwea, Kenya',
    submissionDate: '2025-03-28T10:15:00Z',
    status: 'REJECTED',
    inspector: { name: 'Sarah Johnson' },
    certificateId: null,
    rejectionReason: 'Germination rate below standards',
    labReports: [{ id: 'LR003', date: '2025-03-25', result: 'Germination 70%' }],
    bioData: { seedName: 'Gold Basmati', productionDate: '2024-11-20', batchNumber: 'RCE-003' },
  },
  {
    id: '1004',
    seedType: 'Soybean',
    variety: 'Early Harvest',
    location: 'Kisumu, Kenya',
    submissionDate: '2025-04-05T09:00:00Z',
    status: 'APPROVED',
    inspector: { name: 'Mike Williams' },
    certificateId: 'CERT-002',
    labReports: [
      { id: 'LR004', date: '2025-04-01', result: 'Purity 99%' },
    ],
    bioData: { seedName: 'Early Soy', productionDate: '2025-01-10', batchNumber: 'SOY-004' },
  },
  {
    id: '1005',
    seedType: 'Cotton',
    variety: 'White Star',
    location: 'Kitui, Kenya',
    submissionDate: '2025-04-08T16:30:00Z',
    status: 'DRAFT',
    inspector: null,
    certificateId: null,
    labReports: [],
    bioData: { seedName: 'Star Cotton', productionDate: '2025-02-01', batchNumber: 'COT-005' },
  },
];

const FarmerDashboard = () => {
  const navigate = useNavigate(); // For navigation to certificate page
  const [seedSubmissions, setSeedSubmissions] = useState(MOCK_SEED_SUBMISSIONS);
  const [showSeedForm, setShowSeedForm] = useState(false);
  const [showLabReportForm, setShowLabReportForm] = useState(null);
  const [showSeedDetails, setShowSeedDetails] = useState(null);
  const [showCertificates, setShowCertificates] = useState(false); // State for showing certificates list
  const [formData, setFormData] = useState({
    id: '',
    seedType: '',
    variety: '',
    location: '',
    bioData: { seedName: '', productionDate: '', batchNumber: '' },
    status: 'DRAFT',
  });
  const [labReportData, setLabReportData] = useState({ date: '', result: '' });
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    draft: 0,
  });

  // Calculate stats on mount and when submissions change
  React.useEffect(() => {
    const approved = seedSubmissions.filter(sub => sub.status === 'APPROVED').length;
    const pending = seedSubmissions.filter(sub => sub.status === 'PENDING').length;
    const rejected = seedSubmissions.filter(sub => sub.status === 'REJECTED').length;
    const draft = seedSubmissions.filter(sub => sub.status === 'DRAFT').length;
    setStats({
      totalSubmissions: seedSubmissions.length,
      approved,
      pending,
      rejected,
      draft,
    });
  }, [seedSubmissions]);

  // Seed Report Form Handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('bioData.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        bioData: { ...prev.bioData, [field]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveDraft = () => {
    const newId = formData.id || (parseInt(seedSubmissions[seedSubmissions.length - 1]?.id || '1000') + 1).toString();
    const updatedSubmission = { ...formData, id: newId, status: 'DRAFT', submissionDate: new Date().toISOString(), labReports: [] };
    setSeedSubmissions(prev => {
      const exists = prev.find(sub => sub.id === newId);
      if (exists) {
        return prev.map(sub => (sub.id === newId ? updatedSubmission : sub));
      }
      return [...prev, updatedSubmission];
    });
    setShowSeedForm(false);
    setFormData({ id: '', seedType: '', variety: '', location: '', bioData: { seedName: '', productionDate: '', batchNumber: '' }, status: 'DRAFT' });
  };

  const handleSubmitForVerification = () => {
    const newId = formData.id || (parseInt(seedSubmissions[seedSubmissions.length - 1]?.id || '1000') + 1).toString();
    const updatedSubmission = { ...formData, id: newId, status: 'PENDING', submissionDate: new Date().toISOString(), labReports: [] };
    setSeedSubmissions(prev => {
      const exists = prev.find(sub => sub.id === newId);
      if (exists) {
        return prev.map(sub => (sub.id === newId ? updatedSubmission : sub));
      }
      return [...prev, updatedSubmission];
    });
    setShowSeedForm(false);
    setFormData({ id: '', seedType: '', variety: '', location: '', bioData: { seedName: '', productionDate: '', batchNumber: '' }, status: 'DRAFT' });
  };

  // Lab Report Handlers
  const handleLabReportChange = (e) => {
    setLabReportData({ ...labReportData, [e.target.name]: e.target.value });
  };

  const handleLabReportSubmit = (seedId) => {
    const newLabReport = {
      id: `LR${Math.random().toString(36).slice(2, 9)}`,
      date: labReportData.date,
      result: labReportData.result,
    };
    setSeedSubmissions(prev =>
      prev.map(sub =>
        sub.id === seedId ? { ...sub, labReports: [...(sub.labReports || []), newLabReport] } : sub
      )
    );
    setShowLabReportForm(null);
    setLabReportData({ date: '', result: '' });
  };

  // Edit Seed
  const handleEditSeed = (seed) => {
    setFormData(seed);
    setShowSeedForm(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-600 text-white p-6">
        <h2 className="text-xl font-serif italic mb-8">Digital Seed<br />Certification<br />System</h2>
        <div className="space-y-4">
          <div
            className="flex items-center space-x-3 p-2 hover:bg-green-500 rounded-md cursor-pointer"
            onClick={() => setShowSeedForm(true)}
          >
            <Upload className="h-5 w-5" />
            <span className="text-lg font-medium">Submit Seed Report</span>
          </div>
          <div
            className="flex items-center space-x-3 p-2 hover:bg-green-500 rounded-md cursor-pointer"
            onClick={() => {
              setShowCertificates(false);
              setShowSeedDetails(null);
            }}
          >
            <FileText className="h-5 w-5" />
            <span className="text-lg font-medium">My Seeds</span>
          </div>
          <div
            className="flex items-center space-x-3 p-2 hover:bg-green-500 rounded-md cursor-pointer"
            onClick={() => {
              setShowCertificates(true);
              setShowSeedDetails(null);
            }}
          >
            <Award className="h-5 w-5" />
            <span className="text-lg font-medium">Certificates</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Farmer Dashboard</h1>

        {/* Certificates View */}
        {showCertificates ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">My Certificates</h2>
            {seedSubmissions.filter(sub => sub.status === 'APPROVED' && sub.certificateId).length === 0 ? (
              <p className="text-gray-500">No certificates available. Submit seeds for certification to receive certificates.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certificate ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seed Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variety</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {seedSubmissions
                    .filter(sub => sub.status === 'APPROVED' && sub.certificateId)
                    .map(sub => (
                      <tr key={sub.certificateId}>
                        <td className="px-6 py-4 whitespace-nowrap">{sub.certificateId}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{sub.seedType}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{sub.variety}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => navigate(`/certificate/${sub.certificateId}`)}
                          >
                            View Certificate
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              {['Total Submissions', 'Approved', 'Pending', 'Rejected', 'Draft'].map((key) => (
                <div key={key} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-gray-500 text-sm uppercase">{key}</h3>
                  <p className="text-3xl font-bold">{stats[key.toLowerCase().replace(' ', '')]}</p>
                </div>
              ))}
            </div>

            {/* Seed Submissions Table */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">My Seed Submissions</h2>
              {seedSubmissions.length === 0 ? (
                <p className="text-gray-500">No submissions found. Start by submitting a seed report.</p>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seed Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variety</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {seedSubmissions.map(sub => (
                      <tr key={sub.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{sub.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{sub.seedType}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{sub.variety}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{sub.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              sub.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                              sub.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              sub.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="text-blue-600 hover:underline mr-2"
                            onClick={() => setShowSeedDetails(sub.id)}
                          >
                            View Details
                          </button>
                          {sub.status === 'DRAFT' && (
                            <button
                              className="text-green-600 hover:underline mr-2"
                              onClick={() => handleEditSeed(sub)}
                            >
                              Edit
                            </button>
                          )}
                          {(sub.status === 'DRAFT' || sub.status === 'PENDING') && (
                            <button
                              className="text-purple-600 hover:underline"
                              onClick={() => setShowLabReportForm(sub.id)}
                            >
                              Upload Lab Report
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* Seed Report Form Modal */}
        {showSeedForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Submit Seed Report</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Seed Type</label>
                  <input
                    type="text"
                    name="seedType"
                    value={formData.seedType}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Variety</label>
                  <input
                    type="text"
                    name="variety"
                    value={formData.variety}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Seed Name</label>
                  <input
                    type="text"
                    name="bioData.seedName"
                    value={formData.bioData.seedName}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Production Date</label>
                  <input
                    type="date"
                    name="bioData.productionDate"
                    value={formData.bioData.productionDate}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Batch Number</label>
                  <input
                    type="text"
                    name="bioData.batchNumber"
                    value={formData.bioData.batchNumber}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setShowSeedForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
                    onClick={handleSaveDraft}
                  >
                    <Save className="w-4 h-4 mr-2" /> Save Draft
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-green-600 text-white rounded flex items-center"
                    onClick={handleSubmitForVerification}
                  >
                    <Send className="w-4 h-4 mr-2" /> Submit for Verification
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lab Report Upload Modal */}
        {showLabReportForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Upload Lab Report</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Report Date</label>
                  <input
                    type="date"
                    name="date"
                    value={labReportData.date}
                    onChange={handleLabReportChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Result</label>
                  <textarea
                    name="result"
                    value={labReportData.result}
                    onChange={handleLabReportChange}
                    className="w-full p-2 border rounded"
                    rows="4"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setShowLabReportForm(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-green-600 text-white rounded"
                    onClick={() => handleLabReportSubmit(showLabReportForm)}
                  >
                    Upload Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Seed Details Modal */}
        {showSeedDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Seed Details</h2>
              {(() => {
                const seed = seedSubmissions.find(sub => sub.id === showSeedDetails);
                if (!seed) return <p>Seed not found.</p>;
                return (
                  <div className="space-y-4">
                    <p><strong>ID:</strong> {seed.id}</p>
                    <p><strong>Seed Type:</strong> {seed.seedType}</p>
                    <p><strong>Variety:</strong> {seed.variety}</p>
                    <p><strong>Location:</strong> {seed.location}</p>
                    <p><strong>Status:</strong> {seed.status}</p>
                    <p><strong>Seed Name:</strong> {seed.bioData.seedName}</p>
                    <p><strong>Production Date:</strong> {format(new Date(seed.bioData.productionDate), 'MMM d, yyyy')}</p>
                    <p><strong>Batch Number:</strong> {seed.bioData.batchNumber}</p>
                    <div>
                      <h3 className="font-semibold">Lab Reports</h3>
                      {seed.labReports.length > 0 ? (
                        <table className="min-w-full mt-2">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left">Date</th>
                              <th className="px-4 py-2 text-left">Result</th>
                            </tr>
                          </thead>
                          <tbody>
                            {seed.labReports.map(report => (
                              <tr key={report.id}>
                                <td className="px-4 py-2">{report.date}</td>
                                <td className="px-4 py-2">{report.result}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>No lab reports uploaded.</p>
                      )}
                    </div>
                    {seed.status === 'APPROVED' && seed.certificateId && (
                      <>
                        <p><strong>Certificate ID:</strong> {seed.certificateId}</p>
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => navigate(`/certificate/${seed.certificateId}`)}
                        >
                          View Certificate
                        </button>
                      </>
                    )}
                    {seed.status === 'REJECTED' && seed.rejectionReason && (
                      <p><strong>Rejection Reason:</strong> {seed.rejectionReason}</p>
                    )}
                    <div className="flex justify-end">
                      <button
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={() => setShowSeedDetails(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;