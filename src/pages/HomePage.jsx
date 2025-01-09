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
import Loader from '../components/Loader'
import ShopByColorSlick from './HomePage/ShopByColorSlick'
import WatchShopSection from './HomePage/WatchShopSection'
import MainHeaderMobi from '../components/mobileheadercomp/MobileHeader'
import CategoryMenuMobi from './MobilePages/CategoryMenuMobi'
import { STORAGE } from '../config/config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../Constant/constApi'
import CarosoleSlickMobi from './MobilePages/CarosoleSlickMobi'
import { info } from 'sass'
import CustomerStories from '../components/CustomerStories'


function HomePage() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchHomePageDetails = async () => {
    const userProfile = JSON.parse(localStorage.getItem(STORAGE?.USERDETAIL));
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}home`, {
        user_type: userProfile?.user_type ?? STORAGE?.B2C,
        device_id: localStorage.getItem(STORAGE?.DEVICEID),
        user_id: userProfile?.id,
        is_mobile: "0",
        is_admin: "0",
      });

      if (data && data.STATUS === 200) {
        setData(data.DATA || []);
        // console.log("homedata", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Simulating loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchHomePageDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  console.log("image data- :: ", data?.newarrival?.product_image);

  return (
    <div>
      <MainHeaderMobi />
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

      {/* <CategorySection data={data?.categorydata} /> */}
      <ShopByCategorySlick data={data?.categorydata} />
      <WatchShopSection data={data?.watch_and_shop} />

      {/* <BridalLahegaCholi /> */}

      <NewArrivalCard data={data} />
      <NewOnOnlineSwiper info={data?.New_on_kapoor} />

      <Motion motionBanner={data?.AllBanners?.banner6} />
      <FestivalSpecial data={data} />
      <Banner saleBanner={data?.AllBanners?.banner4} />
      <ShopByColorSlick data={data?.colorist_product} />
      <SareeEdit data={data} />
      <SareeEditMobi />
      <OurInstaPage instaBanner={data?.our_story} />
      <CustomerStoriesSection data={data} />
      <OnlineShopDesignStudio data={data} />
    </div>
  )
}

export default HomePage
