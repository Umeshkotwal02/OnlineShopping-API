import React, { useEffect, useState } from 'react'
import Banner from './HomePage/Banner'
import Motion from './HomePage/Motion'
import FestivalSpecial from './HomePage/FestivalSpecial'
import SareeEdit from './HomePage/SareeEdit'
import SareeEditMobi from './MobilePages/SareeEditMobi'
import OnlineShopDesignStudio from './HomePage/OnlineShopDesignStudio'
import BridalLahegaCholi from './HomePage/BridalLahegaCholi'
import CustomerStoriesSection from './HomePage/CustomerStoriesSection'
import OurInstaPage from './HomePage/OurInstaPage'
import NewOnOnlineSwiper from './HomePage/NewOnOnlineSwiper'
import Loader from '../components/Loader'
import ShopByColorSlick from './HomePage/ShopByColorSlick'
import WatchShopSection from './HomePage/WatchShopSection'
import MainHeaderMobi from '../components/mobileheadercomp/MobileHeader'
import CategoryMenuMobi from './MobilePages/CategoryMenuMobi'
import { useNavigate } from 'react-router-dom'
import CarosoleSlickMobi from './MobilePages/CarosoleSlickMobi'
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomePageDetails } from '../redux/homepage/homeThunk'
import ShopByCategorySlick from './HomePage/ShopByCategorySlick'
import NewArrivalSection from './HomePage/NewArrivalSection'
import SearchBar from '../components/SearchBar'
import CarosoleSilckSlider from './HomePage/CarosoleSilckSlider'


function HomePage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHomePageDetails());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <MainHeaderMobi />
      <span className='d-lg-none'>
        <SearchBar />
      </span>

      {/* <SearchBar /> */}
      <CategoryMenuMobi />

      {/* Carosolve Web */}
      <CarosoleSilckSlider bannerList={data?.AllBanners?.banner1}
        onClick={() => {
          navigate(
            `/product-page?category=${data?.AllBanners?.banner1.category_id}`
          );
        }}
      />
      {/* Carosolve Mobile */}
      <CarosoleSlickMobi bannerList={data?.AllBanners?.banner1}
        onClick={() => {
          navigate(
            `/product-page?category=${data?.AllBanners?.banner1.category_id}`
          );
        }} />

      <ShopByCategorySlick data={data?.categorydata} />
      <WatchShopSection data={data?.watch_and_shop} />

      <BridalLahegaCholi data={data?.pre_weding_festives} />

      <NewArrivalSection data={data} />
      <NewOnOnlineSwiper data={data?.New_on_kapoor} />

      <Motion motionBanner={data?.AllBanners?.banner6} />
      <FestivalSpecial data={data} />
      <Banner saleBanner={data?.AllBanners?.banner4} />
      <ShopByColorSlick data={data?.colorist_product} />
      <SareeEdit data={data} />
      {/* <SareeEditMobi data={data} /> */}
      <CustomerStoriesSection data={data} />
      <OurInstaPage instaBanner={data?.our_story} />
      <OnlineShopDesignStudio data={data} />
    </div>
  )
}

export default HomePage
