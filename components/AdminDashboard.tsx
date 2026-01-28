'use client';

import { useState } from 'react';
import {
  LayoutDashboard, Users, Home, Calendar, CreditCard, Star,
  Menu, X, Search, Filter, Plus, Edit2, Trash2, Eye,
  DollarSign, BookOpen, Bell, LucideIcon, ChevronLeft, ChevronRight,
  Mail, Phone, MapPin, Check, XCircle, Clock
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
type UserRole = 'admin' | 'user' | 'guest';
type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded';
type PaymentMethod = 'credit_card' | 'bank_transfer' | 'e_wallet' | 'cash';
type TestimonialStatus = 'approved' | 'pending' | 'rejected';

type Booking = {
  id: number;
  user: string;
  unit: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  amount: string;
  email?: string;
  phone?: string;
  guests?: number;
};

type Unit = {
  id: number;
  name: string;
  category: string;
  status: UnitStatus;
  price: string;
  rooms: number;
  location?: string;
  capacity?: number;
};

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: 'active' | 'inactive';
  joinedDate: string;
  totalBookings: number;
  totalSpent: string;
};

type Payment = {
  id: number;
  bookingId: number;
  user: string;
  amount: string;
  status: PaymentStatus;
  method: PaymentMethod;
  date: string;
  transactionId: string;
};

type Testimonial = {
  id: number;
  user: string;
  unit: string;
  rating: number;
  comment: string;
  date: string;
  status: TestimonialStatus;
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
  const [searchTerm, setSearchTerm] = useState('');

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
    { 
      id: 1, 
      user: 'John Doe', 
      unit: 'Villa Sunset View', 
      checkIn: '2026-02-01', 
      checkOut: '2026-02-05', 
      status: 'confirmed', 
      amount: '$1,200',
      email: 'john.doe@email.com',
      phone: '+1 234-567-8901',
      guests: 4
    },
    { 
      id: 2, 
      user: 'Jane Smith', 
      unit: 'Beach House Deluxe', 
      checkIn: '2026-02-03', 
      checkOut: '2026-02-07', 
      status: 'pending', 
      amount: '$1,800',
      email: 'jane.smith@email.com',
      phone: '+1 234-567-8902',
      guests: 6
    },
    { 
      id: 3, 
      user: 'Mike Johnson', 
      unit: 'Mountain Cabin', 
      checkIn: '2026-02-05', 
      checkOut: '2026-02-10', 
      status: 'confirmed', 
      amount: '$950',
      email: 'mike.j@email.com',
      phone: '+1 234-567-8903',
      guests: 2
    },
    { 
      id: 4, 
      user: 'Sarah Williams', 
      unit: 'City Apartment', 
      checkIn: '2026-02-07', 
      checkOut: '2026-02-09', 
      status: 'cancelled', 
      amount: '$600',
      email: 'sarah.w@email.com',
      phone: '+1 234-567-8904',
      guests: 3
    },
    { 
      id: 5, 
      user: 'Robert Brown', 
      unit: 'Lake House', 
      checkIn: '2026-02-10', 
      checkOut: '2026-02-15', 
      status: 'confirmed', 
      amount: '$2,100',
      email: 'robert.b@email.com',
      phone: '+1 234-567-8905',
      guests: 5
    }
  ];

  const units: Unit[] = [
    { 
      id: 1, 
      name: 'Villa Sunset View', 
      category: 'Villa', 
      status: 'available', 
      price: '$300/night', 
      rooms: 4,
      location: 'Bali, Indonesia',
      capacity: 8
    },
    { 
      id: 2, 
      name: 'Beach House Deluxe', 
      category: 'Beach House', 
      status: 'booked', 
      price: '$450/night', 
      rooms: 5,
      location: 'Maldives',
      capacity: 10
    },
    { 
      id: 3, 
      name: 'Mountain Cabin', 
      category: 'Cabin', 
      status: 'available', 
      price: '$190/night', 
      rooms: 2,
      location: 'Swiss Alps',
      capacity: 4
    },
    { 
      id: 4, 
      name: 'City Apartment', 
      category: 'Apartment', 
      status: 'maintenance', 
      price: '$150/night', 
      rooms: 3,
      location: 'New York, USA',
      capacity: 6
    },
    { 
      id: 5, 
      name: 'Lake House', 
      category: 'Lake House', 
      status: 'available', 
      price: '$420/night', 
      rooms: 4,
      location: 'Lake Como, Italy',
      capacity: 8
    }
  ];

  const users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 234-567-8901',
      role: 'user',
      status: 'active',
      joinedDate: '2024-01-15',
      totalBookings: 5,
      totalSpent: '$6,200'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 234-567-8902',
      role: 'user',
      status: 'active',
      joinedDate: '2024-03-20',
      totalBookings: 3,
      totalSpent: '$4,500'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.j@email.com',
      phone: '+1 234-567-8903',
      role: 'user',
      status: 'active',
      joinedDate: '2024-06-10',
      totalBookings: 8,
      totalSpent: '$12,300'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.w@email.com',
      phone: '+1 234-567-8904',
      role: 'admin',
      status: 'active',
      joinedDate: '2023-11-05',
      totalBookings: 2,
      totalSpent: '$2,100'
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert.b@email.com',
      phone: '+1 234-567-8905',
      role: 'user',
      status: 'inactive',
      joinedDate: '2024-08-22',
      totalBookings: 1,
      totalSpent: '$800'
    }
  ];

  const payments: Payment[] = [
    {
      id: 1,
      bookingId: 1,
      user: 'John Doe',
      amount: '$1,200',
      status: 'completed',
      method: 'credit_card',
      date: '2026-01-25',
      transactionId: 'TXN001234'
    },
    {
      id: 2,
      bookingId: 2,
      user: 'Jane Smith',
      amount: '$1,800',
      status: 'pending',
      method: 'bank_transfer',
      date: '2026-01-26',
      transactionId: 'TXN001235'
    },
    {
      id: 3,
      bookingId: 3,
      user: 'Mike Johnson',
      amount: '$950',
      status: 'completed',
      method: 'e_wallet',
      date: '2026-01-27',
      transactionId: 'TXN001236'
    },
    {
      id: 4,
      bookingId: 4,
      user: 'Sarah Williams',
      amount: '$600',
      status: 'refunded',
      method: 'credit_card',
      date: '2026-01-28',
      transactionId: 'TXN001237'
    },
    {
      id: 5,
      bookingId: 5,
      user: 'Robert Brown',
      amount: '$2,100',
      status: 'completed',
      method: 'credit_card',
      date: '2026-01-28',
      transactionId: 'TXN001238'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      user: 'John Doe',
      unit: 'Villa Sunset View',
      rating: 5,
      comment: 'Amazing place! The view was breathtaking and the villa was exactly as described. Would definitely come back!',
      date: '2026-01-20',
      status: 'approved'
    },
    {
      id: 2,
      user: 'Jane Smith',
      unit: 'Beach House Deluxe',
      rating: 4,
      comment: 'Great location and beautiful house. Only minor issue was the WiFi connection, but overall a fantastic stay.',
      date: '2026-01-22',
      status: 'approved'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      unit: 'Mountain Cabin',
      rating: 5,
      comment: 'Perfect getaway! Cozy cabin with stunning mountain views. The host was very responsive and helpful.',
      date: '2026-01-24',
      status: 'pending'
    },
    {
      id: 4,
      user: 'Sarah Williams',
      unit: 'City Apartment',
      rating: 3,
      comment: 'The apartment was clean but smaller than expected. Location was good though.',
      date: '2026-01-25',
      status: 'approved'
    },
    {
      id: 5,
      user: 'Robert Brown',
      unit: 'Lake House',
      rating: 5,
      comment: 'Absolutely stunning property! The lake view is incredible. Perfect for a family vacation.',
      date: '2026-01-27',
      status: 'pending'
    }
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

  const getStatusColor = (status: BookingStatus | UnitStatus | PaymentStatus | UserRole | TestimonialStatus | string) => {
    const colors: Record<string, string> = {
      // Booking Status
      confirmed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700',
      
      // Unit Status
      available: 'bg-green-100 text-green-700',
      booked: 'bg-blue-100 text-blue-700',
      maintenance: 'bg-orange-100 text-orange-700',
      
      // Payment Status
      completed: 'bg-green-100 text-green-700',
      failed: 'bg-red-100 text-red-700',
      refunded: 'bg-purple-100 text-purple-700',
      
      // User Role
      admin: 'bg-purple-100 text-purple-700',
      user: 'bg-blue-100 text-blue-700',
      guest: 'bg-gray-100 text-gray-700',
      
      // User Status
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      
      // Testimonial Status
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const formatPaymentMethod = (method: PaymentMethod) => {
    const methods: Record<PaymentMethod, string> = {
      credit_card: 'Credit Card',
      bank_transfer: 'Bank Transfer',
      e_wallet: 'E-Wallet',
      cash: 'Cash'
    };
    return methods[method];
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  // =====================
  // VIEWS
  // =====================

  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
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

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentBookings.slice(0, 5).map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.user}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.unit}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.checkOut}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{booking.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const BookingsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Bookings Management</h2>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" />
          New Booking
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Guests</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">#{booking.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{booking.user}</p>
                      <p className="text-xs text-gray-500">{booking.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.unit}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.checkOut}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.guests}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{booking.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Rooms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {units.map((unit) => (
                <tr key={unit.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{unit.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{unit.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <MapPin className="w-3 h-3" />
                      {unit.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{unit.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{unit.rooms}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{unit.capacity} guests</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(unit.status)}`}>
                      {unit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
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

  const UsersContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Phone className="w-3 h-3" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.joinedDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.totalBookings}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{user.totalSpent}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
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

  const PaymentsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Payments Management</h2>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" />
          New Payment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-700">{payment.transactionId}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">#{payment.bookingId}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.user}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{payment.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatPaymentMethod(payment.method)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{payment.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
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

  const TestimonialsContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Testimonials Management</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
            />
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold text-lg">
                    {testimonial.user.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{testimonial.user}</h4>
                    <p className="text-sm text-gray-600">{testimonial.unit}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(testimonial.rating)}
                      <span className="text-xs text-gray-500">{testimonial.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(testimonial.status)}`}>
                  {testimonial.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-4 pl-16">{testimonial.comment}</p>
              <div className="flex gap-2 pl-16">
                {testimonial.status === 'pending' && (
                  <>
                    <button className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Approve
                    </button>
                    <button className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      Reject
                    </button>
                  </>
                )}
                <button className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  View Details
                </button>
                <button className="px-3 py-1.5 bg-gray-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors flex items-center gap-1">
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard': return <DashboardContent />;
      case 'bookings': return <BookingsContent />;
      case 'units': return <UnitsContent />;
      case 'users': return <UsersContent />;
      case 'payments': return <PaymentsContent />;
      case 'testimonials': return <TestimonialsContent />;
      default: return <DashboardContent />;
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeMenu === item.id 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
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

        {/* Content */}
        <div className="p-8">{renderContent()}</div>
      </main>
    </div>
  );
}
