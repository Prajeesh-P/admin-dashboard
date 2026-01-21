import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = () => {
    return (
        <div className="layout-container">
            <Sidebar />
            <main className="main-content">
                <header className="top-nav">
                    <div className="search-bar">
                        {/* Search input could go here */}
                    </div>
                    <div className="user-actions">
                        <div className="user-profile">
                            <div className="avatar">JD</div>
                            <div className="user-info">
                                <span className="user-name">John Doe</span>
                                <span className="user-role">Administrator</span>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="content-wrapper animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
