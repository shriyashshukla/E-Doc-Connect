// pages/index.js
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, Typography, Button, Spin, Row, Col } from 'antd';

const { Meta } = Card;

const ListServices = () => {
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchServices = () => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:5000/service/getall`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setServicesList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
        setError('Failed to fetch services. Please try again later.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <Typography.Title level={2} className="text-center mb-4">
        Our Services
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {loading && <Spin />}
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
        {servicesList.map((service) => (
          <Col key={service.id} xs={24} sm={12} md={8}>
            <ServiceCard serviceDetails={service} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const ServiceCard = ({ serviceDetails }) => {
  const router = useRouter();

  const handleBuyClick = () => {
    const confirmation = window.confirm(`Are you sure you want to book ${serviceDetails.name}?`);
    if (confirmation) {
      router.push('/Form');
    }
  };

  return (
    <Card
      hoverable
      cover={<img alt={serviceDetails.name} src={`http://localhost:5000/${serviceDetails.image}`} />}
      actions={[
        <Button 
          type="primary" 
          onClick={handleBuyClick} 
          className="bg-blue-500 hover:bg-blue-700 text-white"
        >
          Buy
        </Button>,
      ]}
      className="shadow-md rounded-lg p-4 border border-gray-200"
    >
      <Meta title={serviceDetails.name} description={serviceDetails.description} />
      <Typography.Title level={4} className="text-center mt-4">
        Rs{serviceDetails.price}
      </Typography.Title>
    </Card>
  );
};

export default ListServices;
