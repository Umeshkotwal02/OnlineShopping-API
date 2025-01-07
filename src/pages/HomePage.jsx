import React, { useEffect, useState } from 'react'
import Banner from './HomePage/Banner'
import Motion from './HomePage/Motion'
import CarosoleSilckSlider from './HomePage/CarosoleSilck'
import ShopByCategorySlick from './HomePage/ShopByCategory'
import FestivalSpecial from './HomePage/FestivalSpecial'
import SareeEdit from './HomePage/SareeEdit'
import SareeEditMobi from './MobilePages/SareeEditMobi'
import OnlineShopDesignStudio from './HomePage/OnlineShopDesignStudio'
import NewArrivalCard from './HomePage/NewArrivalCard'
import BridalLahegaCholi from './HomePage/BridalLahegaCholi'
import CustomerStoriesSection from './HomePage/CustomerStoriesSection'
import OurInstaPage from './HomePage/OurInstaPage'
import NewOnOnlineSwiper from './HomePage/NewOnOnlineSwiper'
import CategorySection from './HomePage/CategoryCustomCard'
import Loader from '../components/Loader'
import ShopByColorSlick from './HomePage/ShopByColorSlick'
import WatchShopSection from './HomePage/WatchShopSection'
import MainHeaderMobi from '../components/mobileheadercomp/MobileHeader'
import CategoryMenuMobi from './MobilePages/CategoryMenuMobi'


function HomePage() {

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
    <div>
      <MainHeaderMobi />
      <CategoryMenuMobi />
      <CarosoleSilckSlider />
      <CategorySection />
      <ShopByCategorySlick />
      <WatchShopSection />

      <BridalLahegaCholi />

      <NewArrivalCard />

      <NewOnOnlineSwiper />

      <Motion />
      <FestivalSpecial />
      <Banner />
      <ShopByColorSlick />
      <SareeEdit />
      <SareeEditMobi />
      <CustomerStoriesSection />
      <OurInstaPage />
      <OnlineShopDesignStudio />
    </div>
  )
}

export default HomePage
