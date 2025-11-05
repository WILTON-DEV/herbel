import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ArrowRightIcon } from "@/components/icons";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Benefits of Essential Oils for Daily Wellness",
      excerpt:
        "Discover how incorporating essential oils into your daily routine can enhance your overall wellbeing and promote natural healing.",
      date: "March 15, 2024",
      category: "Wellness",
      image: "/essential-oils-wellness-lifestyle.jpg",
    },
    {
      id: 2,
      title: "How to Choose the Right Essential Oil for You",
      excerpt:
        "Learn about different essential oil properties and find the perfect match for your specific needs and preferences.",
      date: "March 10, 2024",
      category: "Guide",
      image: "/essential-oil-selection-guide.jpg",
    },
    {
      id: 3,
      title: "Sustainable Sourcing: Our Commitment to Nature",
      excerpt:
        "Explore our sustainable practices and how we ensure every ingredient is ethically sourced and environmentally friendly.",
      date: "March 5, 2024",
      category: "Sustainability",
      image: "/sustainable-botanical-farming.jpg",
    },
    {
      id: 4,
      title: "Essential Oil Safety Tips and Best Practices",
      excerpt:
        "Important guidelines for using essential oils safely and effectively to maximize benefits while minimizing risks.",
      date: "February 28, 2024",
      category: "Safety",
      image: "/essential-oil-safety-tips.jpg",
    },
    {
      id: 5,
      title: "DIY Recipes: Create Your Own Blends at Home",
      excerpt:
        "Step-by-step instructions for creating custom essential oil blends tailored to your personal preferences.",
      date: "February 20, 2024",
      category: "DIY",
      image: "/diy-essential-oil-blending.jpg",
    },
    {
      id: 6,
      title: "The Science Behind Aromatherapy",
      excerpt:
        "Understanding the scientific principles that make aromatherapy an effective complementary wellness practice.",
      date: "February 15, 2024",
      category: "Science",
      image: "/aromatherapy-science-research.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#c9a961] text-sm font-medium mb-4">Our Blog</p>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Latest insights, trends, and expert tips
            </h1>
            <p className="text-lg text-white/80">
              Stay informed with our latest articles on essential oils,
              wellness, and natural living.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className=" rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[#c9a961] text-sm font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-[#1a3a2e] mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Button
                    variant="link"
                    className="text-[#c9a961] p-0 h-auto font-medium group"
                  >
                    Read More
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
