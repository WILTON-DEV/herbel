import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon, CalendarIcon } from "./icons";
import Image from "next/image";

const posts = [
  {
    title: "The complete guide to essential oils for beginners",
    date: "March 15, 2024",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Top 10 benefits of using organic essential oils daily",
    date: "March 12, 2024",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "How to choose the right essential oil for your needs",
    date: "March 10, 2024",
    image: "/placeholder.svg?height=300&width=400",
  },
];

export function BlogSection() {
  return (
    <section className="bg-[#f5f1e8] py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div className="space-y-2">
            <p className="text-[#c9a961] text-sm font-medium tracking-wide">
              FROM OUR BLOG
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a3a2e]">
              Latest insights, trends, and expert tips
            </h2>
          </div>
          <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white">
            View All
            <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card
              key={index}
              className=" overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#1a3a2e]/60 text-sm">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#1a3a2e] leading-tight">
                  {post.title}
                </h3>
                <button className="text-[#c9a961] font-medium flex items-center gap-2 hover:gap-3 transition-all">
                  Read More
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
