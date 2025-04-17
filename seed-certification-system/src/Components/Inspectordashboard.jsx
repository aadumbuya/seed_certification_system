import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, XCircle, Clock, Send, Clipboard, File } from 'lucide-react';

// Mock data
const MOCK_SUBMISSIONS = [
  {
    id: '1001',
    farmerId: 'F001',
    farmerName: 'Alice Brown',
    seedType: 'Maize',
    variety: 'Highland F1',
    quantity: '500 kg',
    status: 'PENDING',
    labReports: [
      { id: 'LR001', date: '2025-03-10', result: 'Germination 95%' },
      { id: 'LR002', date: '2025-03-12', result: 'Purity 98%' },
    ],
    seedReports: [
      { id: 'SR001', date: '2025-03-11', observations: 'Good physical condition, no visible pests.' },
    ],
    bioData: { seedName: 'Highland Maize', productionDate: '2024-12-01', batchNumber: 'MAZ-001' },
  },
  {
    id: '1002',
    farmerId: 'F002',
    farmerName: 'Bob White',
    seedType: 'Wheat',
    variety: 'Red Ruby',
    quantity: '300 kg',
    status: 'PENDING',
    labReports: [],
    seedReports: [],
    bioData: { seedName: 'Ruby Wheat', productionDate: '2025-01-15', batchNumber: 'WHT-002' },
  },
  {
    id: '1003',
    farmerId: 'F003',
    farmerName: 'Charlie Green',
    seedType: 'Rice',
    variety: 'Basmati Gold',
    quantity: '400 kg',
    status: 'REJECTED',
    labReports: [{ id: 'LR003', date: '2025-03-25', result: 'Germination 70%' }],
    seedReports: [],
    bioData: { seedName: 'Gold Basmati', productionDate: '2024-11-20', batchNumber: 'RCE-003' },
  },
];

const InspectorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); // Track sidebar view
  const [searchTerm, setSearchTerm] = useState('');
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
  const [labReportData, setLabReportData] = useState({ submissionId: '', date: '', result: '' });
  const [seedReportData, setSeedReportData] = useState({ submissionId: '', date: '', observations: '' });

  // Filter submissions for the table
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch =
      searchTerm === '' ||
      submission.farmerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.seedType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.farmerId?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Calculate report counts for dashboard summary
  const totalLabReports = submissions.reduce((count, sub) => count + (sub.labReports?.length || 0), 0);
  const totalSeedReports = submissions.reduce((count, sub) => count + (sub.seedReports?.length || 0), 0);

  // Handlers for report forms
  const handleLabReportChange = (e) => {
    setLabReportData({ ...labReportData, [e.target.name]: e.target.value });
  };

  const handleSeedReportChange = (e) => {
    setSeedReportData({ ...seedReportData, [e.target.name]: e.target.value });
  };

  const handleLabReportSubmit = (e) => {
    e.preventDefault();
    const { submissionId, date, result } = labReportData;
    if (!submissionId || !date || !result) {
      alert('Please fill in all fields.');
      return;
    }
    const newReport = {
      id: `LR${Math.random().toString(36).slice(2, 9)}`,
      date,
      result,
    };
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === submissionId
          ? { ...sub, labReports: [...(sub.labReports || []), newReport] }
          : sub
      )
    );
    setLabReportData({ submissionId: '', date: '', result: '' });
  };

  const handleSeedReportSubmit = (e) => {
    e.preventDefault();
    const { submissionId, date, observations } = seedReportData;
    if (!submissionId || !date || !observations) {
      alert('Please fill in all fields.');
      return;
    }
    const newReport = {
      id: `SR${Math.random().toString(36).slice(2, 9)}`,
      date,
      observations,
    };
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === submissionId
          ? { ...sub, seedReports: [...(sub.seedReports || []), newReport] }
          : sub
      )
    );
    setSeedReportData({ submissionId: '', date: '', observations: '' });
  };

  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" /> Approved
          </span>
        );
      case 'REJECTED':
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 flex items-center">
            <XCircle className="w-3 h-3 mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 flex items-center">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-600 text-white p-6">
        <h2 className="text-xl font-serif italic mb-8">Digital Seed<br />Certification<br />System</h2>
        <div className="space-y-4">
          <div
            className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-green-500' : 'hover:bg-green-500'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FileText className="h-5 w-5" />
            <span className="text-lg font-medium">Dashboard</span>
          </div>
          <div
            className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
              activeTab === 'labReports' ? 'bg-green-500' : 'hover:bg-green-500'
            }`}
            onClick={() => setActiveTab('labReports')}
          >
            <Clipboard className="h-5 w-5" />
            <span className="text-lg font-medium">Lab Reports</span>
          </div>
          <div
            className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
              activeTab === 'seedReports' ? 'bg-green-500' : 'hover:bg-green-500'
            }`}
            onClick={() => setActiveTab('seedReports')}
          >
            <File className="h-5 w-5" />
            <span className="text-lg font-medium">Seed Reports</span>
          </div>
          <div
            className="flex items-center space-x-3 p-2 hover:bg-green-500 rounded-md cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            <FileText className="h-5 w-5" />
            <span className="text-lg font-medium">My Profile</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === 'dashboard' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold text-gray-800">Inspector Dashboard</h1>
              <p className="text-gray-600">Overview of seed submissions and reports</p>
            </div>

            {/* Summary Cards */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700">Total Lab Reports Filled</h3>
                <p className="text-2xl font-bold text-green-600">{totalLabReports}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700">Total Seed Reports Filled</h3>
                <p className="text-2xl font-bold text-green-600">{totalSeedReports}</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by farmer, seed type, or ID..."
                  className="pl-10 pr-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Submissions Table */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seed Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variety</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lab Reports</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seed Reports</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map(sub => (
                  <tr key={sub.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{sub.farmerId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sub.farmerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sub.seedType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sub.variety}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{sub.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={sub.status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {sub.labReports?.length > 0 ? (
                        <ul className="text-sm text-gray-600">
                          {sub.labReports.map(report => (
                            <li key={report.id}>
                              {report.date}: {report.result}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        'No lab reports'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {sub.seedReports?.length > 0 ? (
                        <ul className="text-sm text-gray-600">
                          {sub.seedReports.map(report => (
                            <li key={report.id}>
                              {report.date}: {report.observations}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        'No seed reports'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Lab Report Form */}
        {activeTab === 'labReports' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Submit Lab Report</h2>
            <form onSubmit={handleLabReportSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Submission</label>
                <select
                  name="submissionId"
                  value={labReportData.submissionId}
                  onChange={handleLabReportChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select a submission</option>
                  {submissions.map(sub => (
                    <option key={sub.id} value={sub.id}>
                      {sub.farmerId} - {sub.farmerName} ({sub.seedType})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Test Date</label>
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
                <label className="block text-sm font-medium text-gray-700">Test Result</label>
                <textarea
                  name="result"
                  value={labReportData.result}
                  onChange={handleLabReportChange}
                  className="w-full p-2 border rounded"
                  rows="4"
                  placeholder="E.g., Germination 95%, Purity 98%"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" /> Submit Lab Report
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Seed Report Form */}
        {activeTab === 'seedReports' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Submit Seed Report</h2>
            <form onSubmit={handleSeedReportSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Submission</label>
                <select
                  name="submissionId"
                  value={seedReportData.submissionId}
                  onChange={handleSeedReportChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select a submission</option>
                  {submissions.map(sub => (
                    <option key={sub.id} value={sub.id}>
                      {sub.farmerId} - {sub.farmerName} ({sub.seedType})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Inspection Date</label>
                <input
                  type="date"
                  name="date"
                  value={seedReportData.date}
                  onChange={handleSeedReportChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Observations</label>
                <textarea
                  name="observations"
                  value={seedReportData.observations}
                  onChange={handleSeedReportChange}
                  className="w-full p-2 border rounded"
                  rows="4"
                  placeholder="E.g., Good physical condition, no visible pests."
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" /> Submit Seed Report
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectorDashboard;