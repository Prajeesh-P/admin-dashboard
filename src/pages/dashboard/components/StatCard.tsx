import type { LucideIcon } from 'lucide-react';
import './StatCard.css';

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: LucideIcon;
    color: string;
}

const StatCard = ({ title, value, change, trend, icon: Icon, color }: StatCardProps) => {
    return (
        <div className="glass-card stat-card">
            <div className="stat-header">
                <div className="stat-icon-wrapper" style={{ backgroundColor: `${color}15`, color: color }}>
                    <Icon size={24} />
                </div>
                <div className={`stat-trend ${trend}`}>
                    {trend === 'up' ? '+' : '-'}{change}
                </div>
            </div>
            <div className="stat-body">
                <h3 className="stat-value">{value}</h3>
                <p className="stat-title">{title}</p>
            </div>
            <div className="stat-chart-sparkline">
                {/* Placeholder for small sparkline */}
                <div className="sparkline-bar" style={{ height: '40%', background: color }}></div>
                <div className="sparkline-bar" style={{ height: '70%', background: color }}></div>
                <div className="sparkline-bar" style={{ height: '50%', background: color }}></div>
                <div className="sparkline-bar" style={{ height: '90%', background: color }}></div>
                <div className="sparkline-bar" style={{ height: '60%', background: color }}></div>
            </div>
        </div>
    );
};

export default StatCard;
