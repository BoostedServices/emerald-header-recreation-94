
import React from 'react';

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      username: "tiko",
      avatar: "T",
      review: "+rep thanks @zulx for support fast reset key",
      date: "6/18/2025 11:06 AM"
    },
    {
      id: 2,
      username: "jremg_loves_cats",
      avatar: "J",
      review: "+rep really good cheese and good staff and @zulx for a fast reply",
      date: "6/20/2025 8:20 AM"
    },
    {
      id: 3,
      username: "Big Greg",
      avatar: "B",
      review: "+rep bro this cheat is so ud like I was playing with my friend helping him to get unreal, I got like 10 kids which friend me to confront me I am cheating, I m playing 1 week with this and still not banned",
      date: "6/20/2025 9:55 PM"
    },
    {
      id: 4,
      username: "sozadeutsch",
      avatar: "S",
      review: "+rep Works good with the cheapest prices on the market",
      date: "6/21/2025 6:36 AM"
    },
    {
      id: 5,
      username: "Uptize69",
      avatar: "U",
      review: "+rep shop slot",
      date: "6/21/2025 9:39 AM"
    },
    {
      id: 6,
      username: "jremg_loves_cats",
      avatar: "J",
      review: "+rep @zulx the best thank you for the help best cheat",
      date: "6/21/2025 11:47 AM"
    },
    {
      id: 7,
      username: "! @Swirl",
      avatar: "S",
      review: "+rep @zulx 1d key fast support",
      date: "6/21/2025 2:31 PM"
    },
    {
      id: 8,
      username: "IROH",
      avatar: "I",
      review: "+rep @! Shylo best owner he tickles me in my no no square best",
      date: "6/22/2025 7:16 PM"
    },
    {
      id: 9,
      username: "🤷🏽♂",
      avatar: "🤷",
      review: "+rep @Sharow helped me instantly",
      date: "6/23/2025 12:09 PM"
    },
    {
      id: 10,
      username: "spizzy",
      avatar: "S",
      review: "+Rep Fortnite unreal and temp, I paid extra so I could use the temp early and it works!! You guys will love it ❤️",
      date: "6/23/2025 1:08 PM"
    },
    {
      id: 11,
      username: "! MATRIX",
      avatar: "M",
      review: "+Rep @! Shylo gave me free key extension wtf 3678213619/10 best support too",
      date: "6/23/2025 2:19 PM"
    },
    {
      id: 12,
      username: "! solar",
      avatar: "S",
      review: "+rep legit guy @! Shylo",
      date: "6/23/2025 2:20 PM"
    },
    {
      id: 13,
      username: "sweet-girl",
      avatar: "S",
      review: "+rep 1d @zulx +rep 1 day key for private and I might marry @zulx cutie 🩸",
      date: "6/23/2025 2:36 PM"
    },
    {
      id: 14,
      username: "tester.77",
      avatar: "T",
      review: "+rep best support out of all servers @! Shylo",
      date: "6/23/2025 3:59 PM"
    },
    {
      id: 15,
      username: "maxhasiqfr",
      avatar: "M",
      review: "+rep legit unreal fn",
      date: "6/24/2025 9:48 AM"
    },
    {
      id: 16,
      username: "sweet-girl",
      avatar: "S",
      review: "+rep squid skin cup this cheat so good",
      date: "6/25/2025 3:32 PM"
    },
    {
      id: 17,
      username: "tickles",
      avatar: "T",
      review: "+rep @! Shylo cute aura owner that aura farms and sells good products that are really affordable, the ui's for each cute product are really sexy aswell",
      date: "6/25/2025 4:26 PM"
    },
    {
      id: 18,
      username: "91",
      avatar: "9",
      review: "+rep @! Shylo good helper",
      date: "6/26/2025 12:23 AM"
    },
    {
      id: 19,
      username: "Panic",
      avatar: "P",
      review: "+rep Echo is one of the Best Software I tried in the past been ud for over 2 weeks on same acc",
      date: "6/26/2025 9:13 AM"
    },
    {
      id: 20,
      username: "sweet-girl",
      avatar: "S",
      review: "+rep Echo private ngl the best and underrated cheat i ever seen because it's has the cheapest prices i ever seen while being so ud, playing on same acc legit cheating for 1 week dominating all players",
      date: "6/26/2025 1:36 PM"
    }
  ];

  // Function to get dynamic padding based on text length
  const getDynamicPadding = (review: string) => {
    const length = review.length;
    if (length < 50) return "p-3";
    if (length < 100) return "p-4";
    if (length < 150) return "p-5";
    return "p-6";
  };

  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div 
            className="text-[#08C422] text-sm font-medium mb-2 flex items-center justify-center gap-2"
            data-animate="fade-in-up"
            data-delay="100"
          >
            Reviews
          </div>
          <h2 
            className="text-4xl font-bold mb-4 text-white"
            data-animate="fade-in-up"
            data-delay="200"
          >
            Hear from our customers
          </h2>
          <p 
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            data-animate="fade-in-up"
            data-delay="300"
          >
            Read why thousands of gamers trust our software to dominate every match.
          </p>
        </div>

        <div 
          className="relative h-[500px] overflow-hidden"
          data-animate="fade-in-up"
          data-delay="400"
        >
          {/* Top fade overlay */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#121212] to-transparent z-10 pointer-events-none"></div>
          
          {/* Bottom fade overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#121212] to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling container */}
          <div className="animate-[scroll_25s_linear_infinite] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            {duplicatedReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className={`bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-gray-600/30 rounded-lg ${getDynamicPadding(review.review)} backdrop-blur-sm hover:from-[#333333] hover:to-[#222222] transition-all duration-200 min-h-[120px] shadow-lg`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] rounded-full flex items-center justify-center text-white text-sm font-semibold border border-gray-600/20">
                      {review.avatar}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium text-sm truncate">{review.username}</span>
                      <span className="text-[#08C422] text-xs bg-[#08C422]/10 px-2 py-1 rounded-full shrink-0">
                        Echo
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-2 line-clamp-3">
                      {review.review}
                    </p>
                    <div className="text-gray-500 text-xs">
                      {review.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
