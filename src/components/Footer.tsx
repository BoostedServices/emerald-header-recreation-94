import React from 'react';
const Footer = () => {
  const products = ['Echo Valorant Full', 'Echo Ultimate', 'Echo Unreal', 'Echo Temp Spoofer', 'Echo Perm Spoofer'];
  return <footer className="relative bg-gradient-to-br from-[#08C422] to-[#07A91E] text-white">
      {/* Improved Wave Animation */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <div className="relative w-full h-32">
          {/* First wave layer */}
          <svg className="absolute top-0 left-0 w-full h-full animate-wave1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="#0AF426" fillOpacity="0.8" />
          </svg>
          
          {/* Second wave layer */}
          <svg className="absolute top-0 left-0 w-full h-full animate-wave2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,64L48,80C96,96,192,128,288,144C384,160,480,160,576,144C672,128,768,96,864,80C960,64,1056,64,1152,80C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="#09D024" fillOpacity="0.6" />
          </svg>
          
          {/* Third wave layer */}
          <svg className="absolute top-0 left-0 w-full h-full animate-wave3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,32L48,48C96,64,192,96,288,112C384,128,480,128,576,112C672,96,768,64,864,48C960,32,1056,32,1152,48C1248,64,1344,96,1392,112L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="#07A91E" fillOpacity="0.9" />
          </svg>
        </div>
      </div>

      <div className="pt-36 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Products Section */}
            <div>
              <h3 className="text-xl font-bold mb-6">Products</h3>
              <ul className="space-y-3">
                {products.map((product, index) => <li key={index}>
                    <a href="#" className="text-white/90 hover:text-white transition-colors duration-200">
                      {product}
                    </a>
                  </li>)}
              </ul>
            </div>

            {/* Email Subscription */}
            
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Country/region</span>
                  <select className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm text-white focus:outline-none">
                    <option value="us">United States (USD $)</option>
                  </select>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {/* Payment method icons would go here */}
                  
                  
                  
                  
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-white/70">
              <p>© 2025, Echo Software</p>
              <div className="flex justify-center gap-4 mt-2">
                <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of service</a>
                <a href="#" className="hover:text-white transition-colors">Contact information</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;