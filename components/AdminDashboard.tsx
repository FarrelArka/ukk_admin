'use client';

import { useState } from 'react';
import {
  LayoutDashboard, Users, Home, Calendar, CreditCard, Star,
  Menu, X, Search, Filter, Plus, Edit2, Trash2, Eye,
  DollarSign, BookOpen, Bell, LucideIcon
} from 'lucide-react';

// =====================
// TYPES
// =====================

type MenuId = 'dashboard' | 'bookings' | 'units' | 'users' | 'payments' | 'testimonials';

type Stat = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
};

type BookingStatus = 'confirmed' | 'pending' | 'cancelled';
type UnitStatus = 'available' | 'booked' | 'maintenance';

type Booking = {
  id: number;
  user: string;
  unit: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  amount: string;
};

type Unit = {
  id: number;
  name: string;
  category: string;
  status: UnitStatus;
  price: string;
  rooms: number;
};

type MenuItem = {
  id: MenuId;
  label: string;
  icon: LucideIcon;
};

// =====================
// COMPONENT
// =====================

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState<MenuId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // =====================
  // DATA
  // =====================

  const stats: Stat[] = [
    { title: 'Total Bookings', value: '1,234', change: '+12%', icon: Calendar, color: 'bg-blue-500' },
    { title: 'Total Revenue', value: '$45,678', change: '+8%', icon: DollarSign, color: 'bg-green-500' },
    { title: 'Active Units', value: '89', change: '+3%', icon: Home, color: 'bg-purple-500' },
    { title: 'Total Users', value: '567', change: '+15%', icon: Users, color: 'bg-orange-500' }
  ];

  const recentBookings: Booking[] = [
    { id: 1, user: 'John Doe', unit: 'Villa Sunset View', checkIn: '2026-02-01', checkOut: '2026-02-05', status: 'confirmed', amount: '$1,200' },
    { id: 2, user: 'Jane Smith', unit: 'Beach House Deluxe', checkIn: '2026-02-03', checkOut: '2026-02-07', status: 'pending', amount: '$1,800' },
    { id: 3, user: 'Mike Johnson', unit: 'Mountain Cabin', checkIn: '2026-02-05', checkOut: '2026-02-10', status: 'confirmed', amount: '$950' },
    { id: 4, user: 'Sarah Williams', unit: 'City Apartment', checkIn: '2026-02-07', checkOut: '2026-02-09', status: 'cancelled', amount: '$600' }
  ];

  const units: Unit[] = [
    { id: 1, name: 'Villa Sunset View', category: 'Villa', status: 'available', price: '$300/night', rooms: 4 },
    { id: 2, name: 'Beach House Deluxe', category: 'Beach House', status: 'booked', price: '$450/night', rooms: 5 },
    { id: 3, name: 'Mountain Cabin', category: 'Cabin', status: 'available', price: '$190/night', rooms: 2 },
    { id: 4, name: 'City Apartment', category: 'Apartment', status: 'maintenance', price: '$150/night', rooms: 3 }
  ];

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'units', label: 'Units', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'testimonials', label: 'Testimonials', icon: Star }
  ];

  // =====================
  // UTILS
  // =====================

  const getStatusColor = (status: BookingStatus | UnitStatus) => {
    const colors: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700',
      available: 'bg-green-100 text-green-700',
      booked: 'bg-blue-100 text-blue-700',
      maintenance: 'bg-orange-100 text-orange-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  // =====================
  // VIEWS
  // =====================

  const DashboardContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const UnitsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Units Management</h2>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" />
          Add New Unit
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search units..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
            />
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Rooms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {units.map((unit) => (
                <tr key={unit.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{unit.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{unit.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{unit.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{unit.rooms}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(unit.status)}`}>
                      {unit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors"><Eye className="w-4 h-4 text-gray-600" /></button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors"><Edit2 className="w-4 h-4 text-gray-600" /></button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors"><Trash2 className="w-4 h-4 text-red-600" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const DefaultContent = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
      <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{activeMenu}</h3>
      <p className="text-gray-600">This section is under development</p>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard': return <DashboardContent />;
      case 'units': return <UnitsContent />;
      default: return <DefaultContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} z-50`}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold text-gray-900">BookingAdmin</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeMenu === item.id ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {menuItems.find(item => item.id === activeMenu)?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
                <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2"></div>
                <Bell className="w-6 h-6 text-gray-700" />
              </button>
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-gray-800 transition-colors">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">{renderContent()}</div>
      </main>
    </div>
  );
}
