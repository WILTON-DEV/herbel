import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#c9a961] text-sm font-medium mb-4">
              Get In Touch
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Your questions, our expert answers
            </h1>
            <p className="text-lg text-white/80">
              Have a question about our products or services? We're here to
              help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-[#1a3a2e] mb-6">
                Contact Information
              </h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-[#1a3a2e] mb-2">Email</h3>
                  <p className="text-gray-700">support@organick.com</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a3a2e] mb-2">Phone</h3>
                  <p className="text-gray-700">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a3a2e] mb-2">Address</h3>
                  <p className="text-gray-700">
                    123 Wellness Street
                    <br />
                    Natural City, NC 12345
                    <br />
                    United States
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a3a2e] mb-2">
                    Business Hours
                  </h3>
                  <p className="text-gray-700">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className=" rounded-2xl p-8 shadow-sm">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#1a3a2e] mb-2"
                  >
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#1a3a2e] mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[#1a3a2e] mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#1a3a2e] mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="w-full"
                  />
                </div>

                <Button className="w-full bg-[#c9a961] hover:bg-[#b89851] text-white py-6">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24 ">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden">
            <img
              src="/map-location-pin.png"
              alt="Location map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
