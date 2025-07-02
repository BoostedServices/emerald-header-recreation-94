import React, { useState } from 'react';
import BundlePopup from './BundlePopup';

const BundlesSection = () => {
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);

  const bundles = [
    {
      id: 'unreal-bundle',
      name: 'Unreal Bundle',
      price: '$104.98',
      originalPrice: '$161.50',
      discount: 35,
      items: 2,
      stock: 50,
      image: '/EchoUploads/29651d57-006b-40d3-8caa-7e889141958b.png'
    },
    {
      id: 'champion-bundle',
      name: 'Champion Bundle',
      price: '$68.98',
      originalPrice: '$91.97',
      discount: 25,
      items: 2,
      stock: 30,
      image: '/EchoUploads/771af544-6100-401f-a0ca-cef9313f9b22.png'
    },
    {
      id: 'diamond-bundle',
      name: 'Diamond Bundle',
      price: '$34.98',
      originalPrice: '$43.73',
      discount: 20,
      items: 2,
      stock: 25,
      image: '/EchoUploads/340a12e3-a8ad-455c-866f-ec49f380b073.png'
    }
  ];

  const getBundleItems = (bundleId: string) => {
    switch (bundleId) {
      case 'unreal-bundle':
        return [
          {
            name: 'Lifetime License (Unlimited hours)',
            description: 'Echo Unreal',
            price: '$69.99',
            originalPrice: '$0.00',
            duration: 'Lifetime License (Unlimited hours)',
            image: '/EchoUploads/29651d57-006b-40d3-8caa-7e889141958b.png'
          },
          {
            name: 'Lifetime License (Unlimited hours)',
            description: 'Echo Temp Spoofer',
            price: '$34.99',
            originalPrice: '$0.00',
            duration: 'Lifetime License (Unlimited hours)',
            image: '/EchoUploads/e361b6c2-7afd-4b48-8183-c06ae7610f22.png'
          }
        ];
      case 'diamond-bundle':
        return [
          {
            name: '1 Week License (168 hours)',
            description: 'Echo Unreal',
            price: '$14.99',
            originalPrice: '$0.00',
            duration: '1 Week License (168 hours)',
            image: '/EchoUploads/20e50704-5145-4161-8e66-06219d53effa.png'
          },
          {
            name: 'One Time Usage (48 hours)',
            description: 'Echo Perm Spoofer',
            price: '$19.99',
            originalPrice: '$0.00',
            duration: 'One Time Usage (48 hours)',
            image: '/EchoUploads/340a12e3-a8ad-455c-866f-ec49f380b073.png'
          }
        ];
      case 'champion-bundle':
        return [
          {
            name: 'Lifetime usage (Unlimited hours)',
            description: 'Echo Perm Spoofer',
            price: '$34.99',
            originalPrice: '$0.00',
            duration: 'Lifetime usage (Unlimited hours)',
            image: '/EchoUploads/340a12e3-a8ad-455c-866f-ec49f380b073.png'
          },
          {
            name: '1 Month License (730 hours)',
            description: 'Echo Unreal',
            price: '$33.99',
            originalPrice: '$0.00',
            duration: '1 Month License (730 hours)',
            image: '/EchoUploads/20e50704-5145-4161-8e66-06219d53effa.png'
          }
        ];
      default:
        return [];
    }
  };

  const handleViewMore = (bundleId: string) => {
    setSelectedBundle(bundleId);
  };

  const handleClosePopup = () => {
    setSelectedBundle(null);
  };

  const selectedBundleData = bundles.find(bundle => bundle.id === selectedBundle);

  return (
    <div className="py-20 px-4 bg-[#121212]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-[#08C422]">Our</span>{' '}
            <span className="text-white">Bundles</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Save more with our bundle packages
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bundles.map((bundle) => (
            <div 
              key={bundle.id} 
              className="group cursor-pointer"
              onClick={() => handleViewMore(bundle.id)}
            >
              {/* Bundle Card */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 h-64 mb-4 transition-transform duration-300 hover:scale-105">
                {/* Save Badge */}
                <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#08C422] to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                    <path fill="#fff" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" opacity="0.5"/>
                    <path fill="#fff" d="m10.413 8.498l.164-.294C11.21 7.068 11.527 6.5 12 6.5s.79.568 1.423 1.704l.164.294c.18.323.27.484.41.59c.14.107.316.147.665.226l.318.072c1.23.278 1.845.417 1.991.888c.147.47-.273.96-1.111 1.941l-.217.254c-.238.278-.357.418-.41.59c-.055.172-.037.358 0 .73l.032.338c.127 1.308.19 1.962-.193 2.253c-.383.29-.958.026-2.11-.504l-.298-.138c-.327-.15-.49-.226-.664-.226c-.173 0-.337.076-.664.226l-.298.138c-1.152.53-1.727.795-2.11.504c-.383-.29-.32-.945-.193-2.253l.032-.338c.037-.372.055-.558 0-.73c-.053-.172-.172-.312-.41-.59l-.217-.254c-.838-.98-1.258-1.47-1.111-1.941c.146-.47.76-.61 1.99-.888l.319-.072c.35-.08.524-.119.665-.225c.14-.107.23-.268.41-.59"/>
                  </svg>
                  SAVE {bundle.discount}%
                </div>

                {/* Bundle Label */}
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#08C422] to-[#07A91E] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Bundle
                </div>
                
                <img 
                  src={bundle.image} 
                  alt={bundle.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Slash animation overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/35 to-transparent transform -rotate-12 translate-x-[-100%] group-hover:animate-[slash_1.5s_ease-in-out_infinite]"></div>
                </div>
              </div>
              
              {/* Bundle Info */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-2">{bundle.name}</h3>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#08C422] text-lg font-bold">From {bundle.price}</span>
                  {bundle.originalPrice && (
                    <span className="text-gray-500 line-through text-sm">{bundle.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bundle Popup */}
      {selectedBundle && selectedBundleData && (
        <BundlePopup
          isOpen={!!selectedBundle}
          onClose={handleClosePopup}
          bundleName={selectedBundleData.name}
          items={getBundleItems(selectedBundle)}
        />
      )}
    </div>
  );
};

export default BundlesSection;
