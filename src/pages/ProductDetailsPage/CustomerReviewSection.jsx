import React from 'react';
import { Rating } from '@mui/material';
import { FaStar } from 'react-icons/fa6';
import CustomerReview from './CustomerReview';

const CustomerReviewSection = ({ productInfo, BorderLinearProgress }) => {
  return (
    <div className="container py-4 border-top">
      <div className="row g-4">
        <div className="col-lg-5 px-3">
          <h3 className="h4 font-weight-medium text-dark mb-4">Customer reviews</h3>
          <div className="d-flex flex-column flex-lg-row align-items-center border shadow-sm p-3 rounded mb-4">
            <div className="col-4 text-center">
              <h4 className="display-4 font-weight-medium text-black">
                {parseFloat(productInfo?.product_rating?.avg_rating).toFixed(1)}
              </h4>
              <Rating
                value={parseFloat(productInfo?.product_rating?.avg_rating).toFixed(1)}
                readOnly
                icon={<FaStar className="text-warning" />}
                emptyIcon={<FaStar className="text-secondary" />}
              />
            </div>
            <div className="col-8 border-start ps-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div className="d-flex align-items-center mb-2" key={rating}>
                  <span className="me-2 h5 mb-0">{rating}</span>
                  <div className="flex-grow-1">
                    <BorderLinearProgress
                      variant="determinate"
                      value={parseFloat(productInfo?.product_rating?.percentage_ratings[rating])}
                    />
                  </div>
                  <span className="ms-2 h5 mb-0">
                    {parseFloat(productInfo?.product_rating?.percentage_ratings[rating])}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-7 px-3">
          <h3 className="h4 font-weight-medium text-dark mb-4">Top reviews from India</h3>
          <div className="overflow-auto p-3" style={{ maxHeight: '400px' }}>
            <CustomerReview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewSection;
