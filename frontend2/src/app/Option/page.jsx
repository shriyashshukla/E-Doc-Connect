import React from 'react';
import './style.css';
import Link from 'next/link';

const Page = () => {
    return (
        <div className="container">
            <div className="card">
                <Link href="/homeservice">
                    <img src="service.jpg" alt="Service" />
                    <div className="card-content">
                        <h1>Service Title</h1>
                        <p>Description about the service</p>
                    </div>
                </Link>
            </div>

            <div className="card premium">
                <img src="reports.jpeg" alt="Reports" />
                <span>Premium</span>
            </div>

            <div className="card">
                <Link href="/Docpage">
                    <img src="Docservice.jpg" alt="Doc Service" />
                    <div className="card-content">
                        <h1>Doc Service Title</h1>
                        <p>Description about the doc service</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Page;
