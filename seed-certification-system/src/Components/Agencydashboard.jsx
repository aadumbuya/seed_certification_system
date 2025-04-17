import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle, XCircle, Clock, FileText, Award, BarChart2, Users, Briefcase, Layers, Clipboard } from 'lucide-react';

// Mock data remains unchanged
const MOCK_INSPECTOR_APPLICATIONS = [
  { id: 1, fullName: 'John Doe', organization: 'SeedCert Inc.', status: 'pending', licenseNumber: 'LIC123' },
  { id: 2, fullName: 'Jane Smith', organization: 'AgriCheck', status: 'approved', licenseNumber: 'LIC456' },
  { id: 3, fullName: 'Mike Johnson', organization: 'SeedSafe', status: 'rejected', licenseNumber: 'LIC789' },
];

const MOCK_SEEDS = [
  { id: '1001', farmerName: 'Alice Brown', seedType: 'Maize', status: 'APPROVED', inspector: 'John Smith', certificateId: 'CERT-001' },
  { id: '1002', farmerName: 'Bob White', seedType: 'Wheat', status: 'PENDING', inspector: null },
];

const MOCK_ANALYTICS = {
  producers: { count: 50, trend: '+37.8%', period: 'month' },
  seedGrowers: { count: 20, trend: '-2%', period: 'month' },
  sellers: { count: 30, trend: '-8%', period: 'month' },
  importers: { count: 40, trend: '+11%', period: 'week' },
  exporters: { count: 70, trend: '-2%', period: 'month' },
  certificateApprovalRate: 68,
  monthlySeedData: [
    { month: 'Jan', value: 20 },
    { month: 'Feb', value: 25 },
    { month: 'Mar', value: 30 },
    { month: 'Apr', value: 22 },
    { month: 'May', value: 18 },
    { month: 'Jun', value: 15 },
    { month: 'Jul', value: 24 },
    { month: 'Aug', value: 45 },
    { month: 'Sep', value: 30 },
    { month: 'Oct', value: 18 },
    { month: 'Nov', value: 22 },
    { month: 'Dec', value: 20 },
  ],
  topSeeds: [
    { type: 'Coffee Seeds', quantity: 20 },
    { type: 'Tomato Seeds', quantity: 50 },
    { type: 'Beans Seeds', quantity: 30 },
  ],
};

// Component definitions
const CategoryCard = ({ icon, title, count, trend, period }) => {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {icon}
          <div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <p className="text-xl font-semibold text-gray-800">{count}</p>
          </div>
        </div>
        <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <CheckCircle className="h-4 w-4 mr-1" /> : <XCircle className="h-4 w-4 mr-1" />}
          <span>{trend} this {period}</span>
        </div>
      </div>
    </div>
  );
};

const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  return (
    <div className="flex items-end h-20 space-x-1 w-full overflow-x-auto">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1 min-w-[2rem]">
          <div
            className={`w-4 ${index === 7 ? 'bg-green-600' : 'bg-gray-200'} rounded-t relative`}
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          >
            {index === 7 && (
              <div className="bg-green-600 text-white text-xs px-1 rounded absolute -top-6 left-1/2 transform -translate-x-1/2">
                +35%
              </div>
            )}
          </div>
          <span className="text-xs text-gray-600 mt-1">{item.month}</span>
        </div>
      ))}
    </div>
  );
};

const DonutChart = ({ percentage }) => {
  const radius = 36;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percentage / 100);
  return (
    <div className="relative w-20 h-20 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth} />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#4A704A"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="47" textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#4B5563">
          of approved
        </text>
        <text x="50" y="58" textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#4B5563">
          Certificate
        </text>
        <text x="50" y="30" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold" fill="#2F4F2F">
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

const CircularChart = () => {
  return (
    <div className="w-36 h-36 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="2" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="#E5E7EB" strokeWidth="2" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#E5E7EB" strokeWidth="2" />
        <path d="M50,15 A35,35 0 0,1 85,50" fill="none" stroke="#4A704A" strokeWidth="4" strokeLinecap="round" />
        <path d="M50,20 A30,30 0 0,1 80,50" fill="none" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" />
        <path d="M85,50 A35,35 0 0,1 50,85" fill="none" stroke="#9ACD32" strokeWidth="4" strokeLinecap="round" />
        <path d="M80,50 A30,30 0 0,1 50,80" fill="none" stroke="#CD853F" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
};

const Agencydashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [subTab, setSubTab] = useState('pending');
  const [inspectorApplications, setInspectorApplications] = useState(MOCK_INSPECTOR_APPLICATIONS);
  const [seeds, setSeeds] = useState(MOCK_SEEDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSeedDetails, setShowSeedDetails] = useState(null);
  const [analytics] = useState(MOCK_ANALYTICS);
  const [timeframe, setTimeframe] = useState('quarterly');

  useEffect(() => {
    // Simulate dynamic data loading if needed
  }, []);

  const handleApprove = (id) => {
    setInspectorApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: 'approved' } : app))
    );
  };

  const handleReject = (id) => {
    setInspectorApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: 'rejected' } : app))
    );
  };

  const filteredApplications = inspectorApplications.filter(app =>
    (subTab === 'all' || app.status === subTab) &&
    (app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.licenseNumber?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredSeeds = seeds.filter(seed =>
    seed.farmerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seed.seedType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingApplicationsCount = inspectorApplications.filter(app => app.status === 'pending').length;
  const approvedSeedsCount = seeds.filter(seed => seed.status === 'APPROVED').length;

  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'approved':
      case 'APPROVED':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> Approved</span>;
      case 'rejected':
      case 'REJECTED':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 flex items-center"><XCircle className="w-3 h-3 mr-1" /> Rejected</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 flex items-center"><Clock className="w-3 h-3 mr-1" /> Pending</span>;
    }
  };

  return (
    <div className="flex min-h-screen bg-green-50 max-w-[1920px] mx-auto">
      {/* Sidebar */}
      <div className="w-72 bg-green-700 text-white p-6">
        <h2 className="text-2xl font-serif italic mb-8 text-brown-100">Digital Seed<br />Certification<br />System</h2>
        <div className="space-y-4">
          <div
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${activeTab === 'dashboard' ? 'bg-green-600' : 'hover:bg-green-600'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart2 className="h-5 w-5" />
            <span className="text-lg font-medium">Dashboard</span>
          </div>
          <div
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${activeTab === 'inspectors' ? 'bg-green-600' : 'hover:bg-green-600'}`}
            onClick={() => setActiveTab('inspectors')}
          >
            <Users className="h-5 w-5" />
            <span className="text-lg font-medium">Inspector Applications</span>
            {pendingApplicationsCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">{pendingApplicationsCount}</span>
            )}
          </div>
          <div
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${activeTab === 'seeds' ? 'bg-green-600' : 'hover:bg-green-600'}`}
            onClick={() => setActiveTab('seeds')}
          >
            <Layers className="h-5 w-5" />
            <span className="text-lg font-medium">Seed Monitoring</span>
            <span className="bg-yellow-500 text-white text-xs rounded-full px-2 py-1">{seeds.length}</span>
          </div>
          <div
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${activeTab === 'certificates' ? 'bg-green-600' : 'hover:bg-green-600'}`}
            onClick={() => setActiveTab('certificates')}
          >
            <Award className="h-5 w-5" />
            <span className="text-lg font-medium">Certificates</span>
            <span className="bg-green-300 text-white text-xs rounded-full px-2 py-1">{approvedSeedsCount}</span>
          </div>
          <div
            className="flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-green-600"
            onClick={() => navigate('/farmer/dashboard')}
          >
            <svg className="h-5 w-5 text-green-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" />
              <path d="M8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4z" />
              <path d="M15 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <span className="text-lg font-medium">Farmer Dashboard</span>
          </div>
          <div
            className="flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-green-600"
            onClick={() => navigate('/inspector')}
          >
            <svg className="h-5 w-5 text-green-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
            </svg>
            <span className="text-lg font-medium">Inspector Dashboard</span>
          </div>
          <div
            className="flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-green-600"
            onClick={onLogout}
          >
            <svg className="h-5 w-5 text-green-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span className="text-lg font-medium">Log Out</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow-lg max-w-[1600px] mx-auto">
          <div className="p-8 border-b border-green-200">
            <h1 className="text-4xl font-bold text-green-800">Agency Dashboard</h1>
            <p className="text-gray-600 mt-2">Overview and management of seed certification processes</p>
          </div>

          {activeTab === 'dashboard' && (
            <div className="p-8">
              {/* Analytics Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
                <CategoryCard
                  icon={<Users className="h-6 w-6 text-red-600" />}
                  title="Producers"
                  count={analytics.producers.count}
                  trend={analytics.producers.trend}
                  period={analytics.producers.period}
                />
                <CategoryCard
                  icon={<Briefcase className="h-6 w-6 text-green-600" />}
                  title="Seed Growers"
                  count={analytics.seedGrowers.count}
                  trend={analytics.seedGrowers.trend}
                  period={analytics.seedGrowers.period}
                />
                <CategoryCard
                  icon={<Users className="h-6 w-6 text-blue-600" />}
                  title="Sellers"
                  count={analytics.sellers.count}
                  trend={analytics.sellers.trend}
                  period={analytics.sellers.period}
                />
                <CategoryCard
                  icon={<Clipboard className="h-6 w-6 text-purple-600" />}
                  title="Total Importers"
                  count={analytics.importers.count}
                  trend={analytics.importers.trend}
                  period={analytics.importers.period}
                />
                <CategoryCard
                  icon={<Briefcase className="h-6 w-6 text-yellow-600" />}
                  title="Exporters"
                  count={analytics.exporters.count}
                  trend={analytics.exporters.trend}
                  period={analytics.exporters.period}
                />
              </div>

              {/* Monthly Overview & Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-1">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">Overview</h3>
                      <p className="text-sm text-gray-600">Monthly Earnings</p>
                    </div>
                    <select
                      className="p-2 border border-gray-300 rounded-md bg-white text-gray-700"
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <BarChart data={analytics.monthlySeedData} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-1 flex justify-center items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2 text-center">Approved Certificates</h3>
                    <p className="text-sm text-gray-600 mb-4 text-center">Approval Rate</p>
                    <DonutChart percentage={analytics.certificateApprovalRate} />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-1 flex justify-center items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2 text-center">Approved Seeds</h3>
                    <p className="text-sm text-gray-600 mb-4 text-center">Distribution by Type</p>
                    <CircularChart />
                  </div>
                </div>
              </div>

              {/* Seeds Sections Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Categories of Seeds By Sellers */}
                <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-green-800">Categories of Seeds by Sellers</h3>
                    <div className="flex items-center">
                      <Search className="h-5 w-5 text-gray-500 mr-2" />
                      <input
                        type="text"
                        placeholder="Search sellers or seeds..."
                        className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <select className="ml-4 p-2 border border-gray-300 rounded-md bg-white text-sm">
                        <option value="30">Last 30 days</option>
                        <option value="60">Last 60 days</option>
                        <option value="90">Last 90 days</option>
                      </select>
                    </div>
                  </div>
                  <table className="min-w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Sellers</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Seeds</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { seller: 'Miriam Alison', desc: 'Owner and Farm Owner', seed: 'Coffee Seeds', seedDesc: 'Premium quality seeds', qty: 20 },
                        { seller: 'Ali Mark', desc: 'Produces 2000 tomato per season', seed: 'Tomato Seeds', seedDesc: 'High yield variety', qty: 50 },
                        { seller: 'Millay Faiso', desc: 'Seller and Producer for millet in the region', seed: 'Millet Seeds', seedDesc: 'Drought-resistant variety', qty: 20 },
                        { seller: 'Jemimah Diana', desc: 'Imports Beans and sells them to almost 1000 sellers', seed: 'Beans Seeds', seedDesc: 'High protein variety', qty: 30 },
                      ].map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                              <div>
                                <p className="font-medium text-gray-700">{item.seller}</p>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-200 rounded mr-3"></div>
                              <div>
                                <p className="font-medium text-gray-700">{item.seed}</p>
                                <p className="text-xs text-gray-500">{item.seedDesc}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-800 font-medium">{item.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Frequent Approved Seeds (Smaller) */}
                <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Frequent Approved Seeds</h3>
                  <div className="space-y-3">
                    {analytics.topSeeds.map((seed, index) => (
                      <div key={index} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded mr-2"></div>
                          <div>
                            <p className="font-medium text-gray-700 text-sm">{seed.type}</p>
                            <p className="text-xs text-gray-500">Premium quality</p>
                          </div>
                        </div>
                        <div className="text-base font-medium text-green-600">{seed.quantity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inspectors' && (
            <div className="p-8">
              <div className="p-4 border-b border-green-200 flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by name, organization, or license number..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  {['all', 'pending', 'approved', 'rejected'].map(tab => (
                    <button
                      key={tab}
                      className={`px-4 py-2 rounded-md ${subTab === tab ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-100'}`}
                      onClick={() => setSubTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200 mt-6">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Full Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Organization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">License Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map(app => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{app.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{app.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{app.organization}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{app.licenseNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={app.status} /></td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          {app.status === 'pending' && (
                            <>
                              <button className="text-green-600 hover:underline" onClick={() => handleApprove(app.id)}>Approve</button>
                              <button className="text-red-600 hover:underline" onClick={() => handleReject(app.id)}>Reject</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'seeds' && (
            <div className="p-8">
              <div className="p-4 border-b border-green-200 flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by farmer or seed type..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200 mt-6">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seed Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inspector</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certificate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSeeds.map(seed => (
                    <tr key={seed.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{seed.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{seed.farmerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{seed.seedType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={seed.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{seed.inspector || 'Not Assigned'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{seed.certificateId || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => setShowSeedDetails(seed.id)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Seed Details Modal */}
              {showSeedDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">Seed Details</h3>
                    <p><strong>ID:</strong> {seeds.find(s => s.id === showSeedDetails)?.id}</p>
                    <p><strong>Farmer:</strong> {seeds.find(s => s.id === showSeedDetails)?.farmerName}</p>
                    <p><strong>Seed Type:</strong> {seeds.find(s => s.id === showSeedDetails)?.seedType}</p>
                    <p><strong>Status:</strong> {seeds.find(s => s.id === showSeedDetails)?.status}</p>
                    <p><strong>Inspector:</strong> {seeds.find(s => s.id === showSeedDetails)?.inspector || 'Not Assigned'}</p>
                    <p><strong>Certificate:</strong> {seeds.find(s => s.id === showSeedDetails)?.certificateId || 'N/A'}</p>
                    <div className="flex justify-end mt-6">
                      <button
                        className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                        onClick={() => setShowSeedDetails(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="p-8">
              <div className="p-4 border-b border-green-200 flex flex-col md:flex-row justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by certificate ID or farmer name..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200 mt-6">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certificate ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seed Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inspector</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSeeds
                    .filter(seed => seed.certificateId)
                    .map(seed => (
                      <tr key={seed.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">{seed.certificateId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">{seed.farmerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">{seed.seedType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">{seed.inspector}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={seed.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:underline">Download Certificate</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agencydashboard;