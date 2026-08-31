import RecentPurchases from '@/components/RecentPurchases'
import ProductGrid from '@/components/ProductGrid'
import WhyChooseUs from '@/components/WhyChooseUs'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <>
      <RecentPurchases />
      <div className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Top Up Robux & Item Game Termurah!</h1>
          <p className="text-lg">Proses instan, aman, dan harga terbaik se-Indonesia.</p>
        </div>
      </div>
      <ProductGrid />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
    </>
  )
}
