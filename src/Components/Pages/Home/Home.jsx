
import Banner from '../../Home/Banner/Banner'
import TrandingProducts from '../../Home/TrandingProducts/TrandingProducts'
import Coupons from '../../Home/Coupons/Coupons'
import ProductSection from '../../Home/ProductSection/ProductSection'
import Testimonials from '../../Home/Testimonial/Testimonial'
import FeaturedMakers from '../../Home/FeaturedMakers/FeaturedMakers'
import UpcomingLaunches from '../../Home/upcomingLaunches/upcomingLaunches'
import ProductAnalytics from '../../Home/ProductAnalytics/ProductAnalytics'
import ProductRecommendations from '../../Home/RecommendedProducts/recommendedProducts'

const Home = () => {
  return (
    <div className='' >


      <Banner />
      <ProductSection />
      <TrandingProducts />
      <Coupons />
      <Testimonials />
      <FeaturedMakers />
      <UpcomingLaunches />
      <ProductAnalytics />
      <ProductRecommendations />







    </div>
  )
}

export default Home
