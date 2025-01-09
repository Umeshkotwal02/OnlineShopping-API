import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MegaMenuContent from "./Demo"
import "./demo.css"

const MegaMenuButton = ({
  buttonLabel,
  variation,
  category_image,
  categoryId,
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (shouldReload) {
      const timer = setTimeout(() => {
        window.location.reload();
        setShouldReload(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [shouldReload]);

  const handleNavigate = (subcategories) => {
    const allCategoryIds = [categoryId];

    navigate("/product-page", {
      state: {
        category: allCategoryIds,
      },
    });

    setShouldReload(true);
  };

  const isValidImage =
    category_image &&
    category_image.category_image &&
    typeof category_image.category_image === "string";

  const variationKeys = Object.keys(variation);
  const maxColumns = 5;
  const usedColumns = Math.min(
    variationKeys.length + (isValidImage ? 1 : 0),
    maxColumns
  );

  const getAllSubcategories = () => {
    return variationKeys.reduce((acc, key) => {
      if (Array.isArray(variation[key])) {
        acc.push(...variation[key]);
      }
      return acc;
    }, []);
  };

  return (
    <div className="position-relative">
      <button
        className="btn btn-primary position-relative text-center text-capitalize py-2 px-4"
        id="lehenga-menu-button"
        onMouseEnter={() => setMenuVisible(true)}
        onMouseLeave={() => setMenuVisible(false)}
        onClick={() => handleNavigate(getAllSubcategories())}
      >
        {buttonLabel}
      </button>
      {isValidImage && !imageError && (
        <MegaMenuContent
          variation={variation}
          variationKeys={variationKeys}
          maxColumns={maxColumns}
          usedColumns={usedColumns}
          category_image={category_image}
          setShouldReload={setShouldReload}
          menuVisible={menuVisible}
          categoryId={categoryId}
          handleNavigate={handleNavigate}
          setImageError={setImageError}
          navigate={navigate}
        />
      )}
    </div>
  );
};

export default MegaMenuButton;
