import React from 'react';
import './style.css';
import Link from 'next/link';


const Page = () => {
    return (
        <div>
            <div className="card">
                <Link href="/Date">
                    <img src="service.jpg" alt="" />
                    <div className="card-content">
                        <h1>Service Title</h1>
                        <p>Description about the service</p>

                    </div>
                </Link>
            </div>

            
            <div className="card">
                <img src="reports.jpeg" alt="" />

                <span></span>

            </div>
            <div className="card">
                <Link href="/Docpage">
                    <img src="Docservice.jpg" alt="" />
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
