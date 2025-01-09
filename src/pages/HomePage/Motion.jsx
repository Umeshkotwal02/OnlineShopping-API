import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "../../styles/Motion.css";
import Loader from '../../components/Loader';

const Motion = ({ motionBanner }) => {
  const [loading, setLoading] = useState(true);

  // Simulating loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* Parallax Background Section */}
      {motionBanner?.map((item, index) => (
        <section
          key={index}
          className="sixth-section"
          style={{
            backgroundImage: `url(${item?.file})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <motion.div
            className="content-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Optional content */}
          </motion.div>
        </section>
      ))}
    </>
  );
};

export default Motion;
