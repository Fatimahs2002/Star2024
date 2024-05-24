import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faChartLine, faSignOutAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Customers from './Customers';
// import Home from './Home';
// import Profile from './Profile';
import Settings from './Settings';
// import Reports from './Reports';
import '../style/Sidebar.css'; // Import the custom CSS file

const Sidebar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [activeComponent, setActiveComponent] = useState('');

    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    const pageContent = () => {
        switch (activeComponent) {
            // case 'profile':
            //     return <Profile />;
            case 'settings':
                return <Settings />;
            // case 'reports':
            //     return <Reports />;
            case 'customers':
                return <Customers />;
            default:
                return;
        }
    };

    return (
        <div className={`d-flex ${isVisible ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
            <div className="bg-light border-right sidebar" id="sidebar-wrapper">
                <div className="list-group list-group-flush">
                    <div className="list-group-item list-group-item-action bg-light" onClick={() => setActiveComponent('home')}>
                        <FontAwesomeIcon icon={faHome} />
                        {isVisible && <span className="ml-2">Category</span>}
                    </div>
                    <div className="list-group-item list-group-item-action bg-light" onClick={() => setActiveComponent('profile')}>
                        <FontAwesomeIcon icon={faUser} />
                        {isVisible && <span className="ml-2">Products</span>}
                    </div>
                    <div className="list-group-item list-group-item-action bg-light" onClick={() => setActiveComponent('settings')}>
                        <FontAwesomeIcon icon={faCog} />
                        {isVisible && <span className="ml-2">Settings</span>}
                    </div>
                    <div className="list-group-item list-group-item-action bg-light" onClick={() => setActiveComponent('reports')}>
                        <FontAwesomeIcon icon={faChartLine} />
                        {isVisible && <span className="ml-2">Reports</span>}
                    </div>
                </div>
            </div>

            <div id="page-content-wrapper" className="w-100 page-content">
                <nav className="navbar navbar-light bg-light border-bottom d-flex">
                    <Button variant="outline-primary" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={isVisible ? faChevronLeft : faChevronRight} />
                    </Button>
                    <div className="" onClick={() => setActiveComponent('logout')}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        {isVisible && <span className="ml-2">Logout</span>}
                    </div>
                </nav>
                <div className="container-fluid">
                    <h1>Dashbaord</h1>
                    {pageContent()}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
