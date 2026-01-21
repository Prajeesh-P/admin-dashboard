import {
    Users,
    DollarSign,
    ShoppingCart,
    Activity,
    ArrowUpRight
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../api/dashboardService';
import StatCard from './components/StatCard';
import './Dashboard.css';

const Dashboard = () => {
    // Fetch stats data with 5s polling
    const {
        data: stats,
        isLoading: statsLoading,
        isError: statsError
    } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: dashboardService.getStats,
        refetchInterval: 5000,
    });

    // Fetch revenue data with 5s polling
    const {
        data: revenueData,
        isLoading: revenueLoading,
        isError: revenueError
    } = useQuery({
        queryKey: ['dashboard-revenue'],
        queryFn: dashboardService.getRevenueData,
        refetchInterval: 5000,
    });

    // Fetch users data
    const {
        data: users,
        isLoading: usersLoading,
        isError: usersError
    } = useQuery({
        queryKey: ['dashboard-users'],
        queryFn: dashboardService.getRecentUsers,
        refetchInterval: 10000,
    });

    if (statsLoading || revenueLoading || usersLoading) {
        return <div className="loading-state glass-card">Loading live dashboard data...</div>;
    }

    if (statsError || revenueError || usersError) {
        return <div className="error-state glass-card">Error loading live data. Please check backend.</div>;
    }

    return (
        <div className="dashboard-page">
            <header className="page-header">
                <div>
                    <h1 className="page-title">Dashboard Overview</h1>
                    <p className="page-subtitle">Welcome back! Here's what's happening today.</p>
                </div>
                <button className="primary-btn">
                    <span>Download Report</span>
                </button>
            </header>

            <section className="stats-grid">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.revenue.value.toLocaleString()}`}
                    change={stats.revenue.change}
                    trend={stats.revenue.trend}
                    icon={DollarSign}
                    color="#6366f1"
                />
                <StatCard
                    title="Active Users"
                    value={stats.users.value.toLocaleString()}
                    change={stats.users.change}
                    trend={stats.users.trend}
                    icon={Users}
                    color="#a855f7"
                />
                <StatCard
                    title="New Orders"
                    value={stats.orders.value.toLocaleString()}
                    change={stats.orders.change}
                    trend={stats.orders.trend}
                    icon={ShoppingCart}
                    color="#22d3ee"
                />
                <StatCard
                    title="Avg. Session"
                    value={stats.session.value}
                    change={stats.session.change}
                    trend={stats.session.trend}
                    icon={Activity}
                    color="#f43f5e"
                />
            </section>

            <section className="dashboard-grid">
                <div className="glass-card chart-container large">
                    <div className="card-header">
                        <h3>Revenue Growth</h3>
                        <button className="icon-btn"><ArrowUpRight size={20} /></button>
                    </div>
                    <div className="chart-body" style={{ height: '350px', padding: '1rem' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#131b2e',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        color: '#f8fafc'
                                    }}
                                    itemStyle={{ color: '#6366f1' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card recent-activity">
                    <div className="card-header">
                        <h3>Recent Users</h3>
                    </div>
                    <div className="user-list">
                        {users.map((user: any) => (
                            <div key={user.id} className="user-item">
                                <div className="user-avatar-small">{user.initials}</div>
                                <div className="user-details">
                                    <p className="user-name">{user.name}</p>
                                    <p className="user-email">{user.email}</p>
                                </div>
                                <span className={`status-badge ${user.status}`}>{user.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
