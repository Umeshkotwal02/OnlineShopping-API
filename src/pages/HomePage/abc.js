import React, { lazy } from "react";
import { Link } from "react-router-dom";

const NewArrivalCard = lazy(() => import("../NewArrivalCard"));

const NewArrivalSection = ({ data }) => {
  return (
    <section className="my-[30px]">
      <div className="max-w-[1804px] mx-auto px-3">
        <div className="text-center mb-[30px]">
          <h2 className="text-2xl sm:text-3xl md:text-3xl 2xl:text-4xl !leading-none font-normal mb-3">
            New Arrival
          </h2>
          <p className="xl:text-sm 2xl:text-lg !leading-none font-normal italic">
            &quot;Embrace the festival magic, let joy fill every moment.&quot;
          </p>
        </div>
        <div className="flex flex-wrap -mx-3 gap-y-[25px]">
          {Boolean(data?.newarrival) &&
            data?.newarrival?.map((item, index) => {
              return (
                <div
                  key={"newarrival-" + index}
                  className="new-arrival-card w-full xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 2xl:w-1/5 px-3"
                >
                  <NewArrivalCard info={item} />
                </div>
              );
            })}
          <div className="w-full text-center">
            <Link
              className="2xl:text-lg font-medium px-4 xl:px-[33px] py-2.5 lg:py-[11px] bg-[#E9B159] text-white font-jost inline-flex items-center gap-2.5 3xl:gap-4 hover:bg-black hover:text-white"
              to="/product-page"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalSection;
