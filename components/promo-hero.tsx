"use client";
import { useState, useEffect } from "react";
import { MessageCircle, Leaf, TrendingUp } from "lucide-react";

export function PromoHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Natural Healing",
      subtitle: "Pure Herbal Remedies",
      price: "45,000",
      oldPrice: "75,000",
      image: "/botanical-ingredients-and-essential-oil.jpg",
      description: "100% Organic Ingredients",
    },
    {
      title: "Essential Oils",
      subtitle: "Premium Quality",
      price: "35,000",
      oldPrice: "60,000",
      image: "/sustainable-botanical-farming.jpg",
      description: "Pure & Natural",
    },
    {
      title: "Wellness Tinctures",
      subtitle: "Traditional Medicine",
      price: "50,000",
      oldPrice: "85,000",
      image: "/essential-oil-bottles-with-botanical-ingredients-a.jpg",
      description: "Trusted Remedies",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-6">
      {/* Main Hero Carousel */}
      <div className="relative rounded-xl overflow-hidden h-[400px] lg:h-[460px] bg-gradient-to-br from-green-900 to-green-950">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-800/40 via-green-950 to-black">
              <div className="absolute top-10 left-20 w-64 h-64 bg-green-600/30 blur-3xl rounded-full" />
              <div className="absolute top-0 right-40 w-96 h-96 bg-green-500/20 blur-3xl rounded-full" />
            </div>

            <div className="relative h-full grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] items-center">
              {/* Left Content */}
              <div className="relative z-10 px-6 lg:px-12 py-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-[#D4A029] text-2xl lg:text-3xl font-black tracking-tight">
                      The
                    </div>
                    <Leaf className="w-8 h-8 text-[#3CB54A]" fill="#3CB54A" />
                  </div>
                  <div className="text-[#D4A029] text-3xl lg:text-5xl font-black tracking-tight">
                    Organic
                  </div>
                  <div className="text-[#D4A029] text-sm lg:text-base font-bold mt-1">
                    PLUG UG
                  </div>
                  <div className="text-[#3CB54A] text-xs lg:text-sm font-semibold mt-2">
                    {slide.description}
                  </div>
                </div>

                {/* Product Title */}
                <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-6">
                  {slide.title}
                  <br />
                  {slide.subtitle}
                </h2>

                <div className="inline-flex items-center gap-3 bg-[#D4A029] rounded-full px-6 py-3 mb-6">
                  <span className="text-sm text-white/80 line-through">
                    UGX {slide.oldPrice}
                  </span>
                  <span className="text-2xl lg:text-3xl font-black text-white">
                    {slide.price}
                  </span>
                </div>

                {/* T&Cs */}
                <p className="text-white/60 text-xs">Natural & Safe</p>
              </div>

              {/* Right Product Image */}
              <div className="relative h-full hidden lg:block">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-[#D4A029] w-8" : "bg-white/40 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button className="absolute bottom-5 right-5 bg-[#D4A029] hover:bg-[#B8891F] text-white px-6 py-2 rounded text-sm font-bold z-20 transition-colors">
          DISCOVER ›
        </button>
      </div>

      {/* Right Side Cards */}
      <div className="flex flex-col gap-4 lg:gap-6">
        {/* Top Info Card */}
        <div className="bg-white rounded-xl p-6 h-[190px] lg:h-[218px] shadow-sm border border-gray-100">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3CB54A] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900">WhatsApp</div>
                <div className="text-xs text-gray-600">
                  Order Natural Remedies
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D4A029] rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900">
                  100% Organic
                </div>
                <div className="text-xs font-bold text-[#3CB54A]">
                  Pure Herbal Medicine
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-[#3CB54A]" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900">
                  NATURAL WELLNESS
                </div>
                <div className="text-xs text-gray-600">
                  Trusted by Thousands
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Promo Card */}
        <div className="relative bg-gradient-to-br from-green-900 to-green-950 rounded-xl overflow-hidden h-[190px] lg:h-[218px]">
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="text-[#D4A029] text-lg font-black">
                  The Organic
                </div>
                <Leaf className="w-5 h-5 text-[#3CB54A]" fill="#3CB54A" />
              </div>
              <div className="text-[#D4A029] text-xs font-bold">PLUG UG</div>
              <div className="text-white text-xs mt-2">
                Premium Herbal Solutions
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-white text-xl font-black">
                Natural Healing!
              </div>
              <div className="inline-block bg-[#D4A029] text-white px-4 py-1 rounded text-xs font-bold">
                UP TO 40% OFF
              </div>
            </div>
          </div>

          {/* Product Images Overlay */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-32 h-32">
            <img
              src="/essential-oil-bottles-with-botanical-ingredients-a.jpg"
              alt="Herbal Products"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="absolute bottom-2 left-6 right-6 flex items-center justify-between text-white text-[8px] font-bold opacity-60">
            <span>Oils</span>
            <span>Tinctures</span>
            <span>Balms</span>
            <span>Teas</span>
            <span>Capsules</span>
          </div>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// export function PromoHero() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       title: "WELLNESS SALE",
//       subtitle: "Premium CBD Oil Collection",
//       description: "Full Spectrum CBD Oil 1000mg",
//       price: "UGX 299,999",
//       oldPrice: "UGX 450,000",
//       image: "/premium-cbd-oil-bottle-with-dropper-on-natural-bac.jpg",
//       badge: "50% OFF",
//     },
//     {
//       title: "NEW ARRIVAL",
//       subtitle: "Organic Essential Oils",
//       description: "Lavender Essential Oil Set",
//       price: "UGX 149,999",
//       oldPrice: "UGX 200,000",
//       image: "/lavender-essential-oil-bottles-with-flowers.jpg",
//       badge: "25% OFF",
//     },
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
//       {/* Main Hero Carousel - Takes 2 columns on desktop */}
//       <div className="lg:col-span-2 relative rounded-xl overflow-hidden h-[320px] lg:h-[460px] bg-gradient-to-br from-green-50 to-green-100">
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-500 ${
//               index === currentSlide ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <div className="h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-4 px-6 lg:px-8">
//               <div className="relative z-10">
//                 <div className="inline-flex items-center gap-2 bg-white/90 text-[#1a3a2e] px-4 py-1 rounded-full text-xs tracking-wide uppercase mb-4 shadow-sm">
//                   {slide.title}
//                 </div>
//                 <h2 className="text-2xl lg:text-5xl font-extrabold text-[#1a3a2e] leading-tight mb-2 lg:mb-3">
//                   {slide.subtitle}
//                 </h2>
//                 <p className="text-sm lg:text-xl text-[#1a3a2e]/80 mb-3 lg:mb-4">
//                   {slide.description}
//                 </p>
//                 <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
//                   <span className="text-3xl lg:text-4xl font-extrabold text-[#1a3a2e]">
//                     {slide.price}
//                   </span>
//                   <span className="text-base lg:text-lg text-[#1a3a2e]/60 line-through">
//                     {slide.oldPrice}
//                   </span>
//                   <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs lg:text-sm font-semibold">
//                     {slide.badge}
//                   </span>
//                 </div>
//                 <Link href="/shop">
//                   <Button className="bg-[#1a3a2e] hover:bg-[#0f2419] text-white px-6 py-3 lg:px-8 lg:py-6 text-sm lg:text-base rounded-lg">
//                     Shop Now →
//                   </Button>
//                 </Link>
//               </div>
//               <div className="relative hidden lg:block h-full">
//                 <img
//                   src={slide.image || "/placeholder.svg"}
//                   alt={slide.description}
//                   className="w-full h-full object-cover object-center rounded-lg"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`h-2 rounded-full transition-all ${
//                 index === currentSlide ? "bg-[#1a3a2e] w-8" : "bg-black/30 w-2"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Right Side Ad Banners - Stacked vertically */}
//       <div className="flex flex-col gap-4 lg:gap-6">
//         {/* Top Ad Banner */}
//         <Link href="/shop?category=wellness" className="group">
//           <div className="relative rounded-xl overflow-hidden h-[150px] lg:h-[218px] bg-gradient-to-br from-amber-400 to-orange-500 hover:shadow-xl transition-shadow">
//             <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
//               <div>
//                 <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-2">
//                   Flash Sale
//                 </span>
//                 <h3 className="text-xl lg:text-2xl font-bold leading-tight">
//                   Health & Wellness
//                 </h3>
//                 <p className="text-sm mt-1 opacity-90">Up to 40% OFF</p>
//               </div>
//               <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
//                 Shop Now
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </Link>

//         {/* Bottom Ad Banner */}
//         <Link href="/shop?category=essential-oils" className="group">
//           <div className="relative rounded-xl overflow-hidden h-[150px] lg:h-[218px] bg-gradient-to-br from-purple-500 to-pink-500 hover:shadow-xl transition-shadow">
//             <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
//               <div>
//                 <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-2">
//                   New Arrival
//                 </span>
//                 <h3 className="text-xl lg:text-2xl font-bold leading-tight">
//                   Essential Oils
//                 </h3>
//                 <p className="text-sm mt-1 opacity-90">Premium Collection</p>
//               </div>
//               <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
//                 Discover
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }
