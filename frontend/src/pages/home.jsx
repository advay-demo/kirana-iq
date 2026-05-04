  import store1 from "../assets/images/store1.jpg";
  import store2 from "../assets/images/store2.jpg";
  import store3 from "../assets/images/store3.jpg";
  import store4 from "../assets/images/store4.jpg";
  import store5 from "../assets/images/store5.jpg";
  import store6 from "../assets/images/store6.jpg";
  import store7 from "../assets/images/store7.jpg";
  import store8 from "../assets/images/store8.jpg";

  function Home() {
    return (
      <div>
        
        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center text-center mt-20 px-4">
          
          <h1 className="text-5xl font-semibold tracking-tight max-w-2xl">
            Smarter inventory decisions for modern retail
          </h1>

          <p className="mt-4 text-gray-500 max-w-xl">
            Track product availability, predict restocking needs, and discover smart alternatives — all in one place.
          </p>

          <div className="mt-8 w-full max-w-xl flex items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            
            <input
              type="text"
              placeholder="Search for a product (milk, bread, rice...)"
              className="flex-1 px-4 py-3 outline-none"
            />

            <button className="bg-orange-500 text-white px-5 py-3 font-medium hover:bg-orange-600 transition">
              Search
            </button>

          </div>

        </section>

        <section className="mt-24 px-6">
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold">Product Availability</h3>
              <p className="mt-2 text-gray-500 text-sm">
                Check real-time availability across multiple retail platforms instantly.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold">Smart Alternatives</h3>
              <p className="mt-2 text-gray-500 text-sm">
                Discover similar products when your desired item is out of stock.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold">Restocking Predictions</h3>
              <p className="mt-2 text-gray-500 text-sm">
                AI-powered insights to predict demand and optimize your inventory.
              </p>
            </div>
            

          </div>

        </section>

        <section className="mt-32 px-6 text-center">
    
    <h2 className="text-3xl font-semibold">
      How KiranaIQ Works
    </h2>

    <p className="mt-3 text-gray-500 max-w-xl mx-auto">
      A simple 3-step process to make smarter retail decisions.
    </p>

    <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

      <div className="flex flex-col items-center text-center">
        <div className="text-orange-500 text-2xl font-bold">01</div>
        <h3 className="mt-3 font-semibold">Search Product</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-xs">
          Enter the product you want to check across multiple platforms.
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="text-orange-500 text-2xl font-bold">02</div>
        <h3 className="mt-3 font-semibold">Compare Availability</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-xs">
          Instantly see availability across different retail services.
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="text-orange-500 text-2xl font-bold">03</div>
        <h3 className="mt-3 font-semibold">Get Smart Insights</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-xs">
          Discover alternatives and predict restocking trends.
        </p>
      </div>

    </div>

  </section>
  <section className="mt-20">

      <p className="text-xs text-center tracking-widest text-gray-400 mb-8">
        TRUSTED BY RETAILERS ACROSS INDIA
      </p>

      <div className="overflow-hidden w-full">

        <div className="flex gap-6 w-max animate-scroll">

          {[store1, store2, store3, store4, store5, store6,
            store7, store8, store1, store2, store3, store4, store5, store6,
             store7, store8
          ].map((img, i) => (
            <img
              key={i}
              src={img}
              className="h-48 w-80 object-cover rounded-xl flex-shrink-0"
            />
          ))}

        </div>

      </div>

  </section>

  <section className="mt-32 px-6">
    
    <div className="max-w-4xl mx-auto bg-orange-50 border border-orange-100 rounded-2xl p-10 text-center">
      
      <h2 className="text-3xl font-semibold">
        Start making smarter retail decisions today
      </h2>

      <p className="mt-3 text-gray-600">
        Join KiranaIQ and take control of your inventory, insights, and availability tracking.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition">
          Get Started as Customer
        </button>

        <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
          Join as Retailer
        </button>

      </div>

    </div>

  </section>

  <footer className="mt-32 border-t border-gray-200 px-6 py-16">

    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

      {/* LEFT SIDE — BIG STATEMENT */}
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight max-w-md">
          We simplify <span className="text-orange-500">retail decisions </span>  
          so businesses can grow smarter.
        </h2>
      </div>

      {/* RIGHT SIDE — LINKS */}
      <div className="grid grid-cols-2 gap-8">

        {/* PRODUCT */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700">Product</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li className="hover:text-black cursor-pointer">Features</li>
            <li className="hover:text-black cursor-pointer">How it Works</li>
            <li className="hover:text-black cursor-pointer">Pricing</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li className="hover:text-black cursor-pointer">About</li>
            <li className="hover:text-black cursor-pointer">Contact</li>
            <li className="hover:text-black cursor-pointer">Privacy</li>
          </ul>
        </div>

      </div>

    </div>

  <div className="mt-12">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">

      {/* LEFT — LOGO */}
      <div className="font-semibold text-lg">
        <span className="text-orange-500">Kirana</span>
        <span className="text-orange-300 ml-1">IQ</span>
      </div>

      {/* RIGHT — COPYRIGHT + CONNECT */}
      <div className="mt-3 md:mt-0 flex items-center gap-6">

        <span>© {new Date().getFullYear()} KiranaIQ</span>

        <div className="flex items-center gap-4">
          <span className="text-gray-400">Connect:</span>

          <a href="https://linkedin.com/in/YOUR_ID" target="_blank" className="hover:text-black">
            Linkedin
          </a>

          <a href="https://github.com/YOUR_ID" target="_blank" className="hover:text-black">
            Github
          </a>

          <a href="mailto:your@email.com" className="hover:text-black">
            Mail
          </a>
        </div>

      </div>

    </div>
  </div>

  </footer>

      </div>
    )
  }

  export default Home