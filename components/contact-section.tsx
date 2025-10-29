import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export function ContactSection() {
  return (
    <section className="bg-[#f5f1e8] py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Customer service"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right - Form */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1a3a2e]">
                Your questions,{" "}
                <span className="text-[#1a3a2e]/70">our expert answers</span>
              </h2>
              <p className="text-[#1a3a2e]/70 leading-relaxed">
                Have questions about our products? Our team of experts is here
                to help you find the perfect solution for your wellness needs.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Your name"
                  className=" border-[#1a3a2e]/20"
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  className=" border-[#1a3a2e]/20"
                />
              </div>
              <Input placeholder="Subject" className=" border-[#1a3a2e]/20" />
              <Textarea
                placeholder="Your message"
                rows={5}
                className=" border-[#1a3a2e]/20 resize-none"
              />
              <Button className="bg-[#c9a961] hover:bg-[#b89851] text-white px-8 py-6 w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
