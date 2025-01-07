import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoIosCheckmark } from 'react-icons/io';
import { GoPencil } from 'react-icons/go';
import { Row, Col, Container } from 'react-bootstrap';
import Payment from './Payment';
import AddressCard from './AddressCard';
import { WalletIcon } from '../../assets/SvgIcons';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const steps = [
  { id: 'SignUp', label: 'Sign Up', icon: <IoIosCheckmark className="fs-1" />, isActive: true },
  { id: 'Address', label: 'Address', icon: <GoPencil className="fs-5" />, isActive: false },
  { id: 'Payment', label: 'Payment', icon: <WalletIcon />, isActive: false },
];

const CheckOutPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'Address');
  const [loading, setLoading] = useState(true);

  const breadcrumbArray = [
    <Link to="/" key="1" className="text-dark fw-light text-decoration-none">
      Home
    </Link>,
    <Link to="/bag" key="2" className="text-dark fw-light text-decoration-none">
      Bag
    </Link>,
    <span key="3" className="text-dark fw-light">
      Checkout
    </span>,
  ];

  const handleTabClick = (stepId) => {
    if (stepId !== 'SignUp') {
      setActiveTab(stepId);
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'Address':
        return <AddressCard />;
      case 'Payment':
        return <Payment />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb list={breadcrumbArray} />
      <Container className="my-5">
        <Row className="w-100 align-items-center mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <Col

                className={`d-flex align-items-center gap-2 justify-content-center text-center ${step.id === 'SignUp' || activeTab === step.id ? 'text-dark' : 'text-muted'
                  }`}
                onClick={() => handleTabClick(step.id)}
                style={step.id === 'SignUp' ? { cursor: 'pointer' } : {}}
              >
                <div
                  className={`d-flex align-items-center justify-content-center rounded-circle ${step.id === 'SignUp'
                    ? 'bg-dark text-white'
                    : activeTab === step.id
                      ? 'bg-dark text-white'
                      : 'bg-secondary text-white'
                    }`}
                  style={{
                    width: '10vw',
                    height: '10vw',
                    maxWidth: '60px',
                    maxHeight: '60px',
                  }}
                >
                  {step.icon}
                </div>
                <span className="fs-6 fw-medium">{step.label}</span>
              </Col>
              {index < steps.length - 1 && (
                <Col xs={2} md={2} sm={2} className="px-0 d-flex align-items-center justify-content-center">
                  <span
                    className="d-block w-100"
                    style={{
                      height: '3px',
                      borderTop: activeTab === steps[index + 1]?.id ? '3px dashed black' : '3px dashed rgba(150, 150, 150, 1)',
                    }}
                  />
                </Col>
              )}
            </React.Fragment>
          ))}
        </Row>

        <div>{renderActiveView()}</div>
      </Container>
    </>
  );
};

export default CheckOutPage;
