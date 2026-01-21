import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const vary = (base, percent = 0.05) => {
    const change = base * percent * (Math.random() * 2 - 1);
    return Math.floor(base + change);
};

const USERS = [
    { id: 1, name: 'Sarah Jenkins', email: 'sarah.j@example.com', status: 'online', initials: 'SJ' },
    { id: 2, name: 'Marcus Chen', email: 'm.chen@example.com', status: 'online', initials: 'MC' },
    { id: 3, name: 'Elena Rodriguez', email: 'elena.r@example.com', status: 'busy', initials: 'ER' },
    { id: 4, name: 'David Kim', email: 'd.kim@example.com', status: 'offline', initials: 'DK' },
    { id: 5, name: 'Amara Okafor', email: 'a.okafor@example.com', status: 'online', initials: 'AO' }
];

app.get('/api/stats', (req, res) => {
    res.json({
        revenue: { value: vary(54239, 0.01), change: '12.5%', trend: 'up' },
        users: { value: vary(2420, 0.02), change: '8.2%', trend: 'up' },
        orders: { value: vary(1210, 0.02), change: '3.1%', trend: 'down' },
        session: { value: '12m 45s', change: '5.4%', trend: 'up' }
    });
});

app.get('/api/revenue', (req, res) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const baseValues = [4000, 3000, 5000, 4500, 6000, 5500, 7000];

    const data = months.map((month, i) => ({
        name: month,
        revenue: vary(baseValues[i], 0.03)
    }));

    res.json(data);
});

app.get('/api/users', (req, res) => {
    res.json(USERS);
});

app.listen(PORT, () => {
    console.log(`🚀 Mock Backend running at http://localhost:${PORT}`);
});
