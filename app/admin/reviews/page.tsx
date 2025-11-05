import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon, CheckIcon, XIcon } from "@/components/icons";

const reviews = [
  {
    id: 1,
    customer: "John Doe",
    product: "Pure Essence Oil",
    rating: 5,
    comment: "Excellent quality! Will buy again.",
    date: "2024-01-15",
    status: "pending",
  },
  {
    id: 2,
    customer: "Jane Smith",
    product: "CBD Dropper 30ml",
    rating: 4,
    comment: "Good product, fast delivery.",
    date: "2024-01-14",
    status: "approved",
  },
  {
    id: 3,
    customer: "Mike Johnson",
    product: "Lavender Oil",
    rating: 5,
    comment: "Amazing scent and quality!",
    date: "2024-01-13",
    status: "approved",
  },
  {
    id: 4,
    customer: "Sarah Williams",
    product: "Peppermint Oil",
    rating: 3,
    comment: "Decent but expected more.",
    date: "2024-01-12",
    status: "pending",
  },
];

export default function ReviewsPage() {
  return (
    <div>Reviews page coming soon</div>
    // <div className="space-y-6">
    //   <div>
    //     <h1 className="text-3xl font-bold text-[#1a3a2e]">Reviews</h1>
    //     <p className="text-muted-foreground">Manage customer reviews and ratings</p>
    //   </div>

    //   <Card>
    //     <CardHeader>
    //       <CardTitle>All Reviews</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <div className="space-y-4">
    //         {reviews.map((review) => (
    //           <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
    //             <div className="flex items-start justify-between mb-2">
    //               <div>
    //                 <p className="font-medium">{review.customer}</p>
    //                 <p className="text-sm text-muted-foreground">{review.product}</p>
    //               </div>
    //               <div className="flex items-center space-x-1">
    //                 {[...Array(5)].map((_, i) => (
    //                   <StarIcon
    //                     key={i}
    //                     className={`h-4 w-4 ${i < review.rating ? "fill-[#d4a574] text-[#d4a574]" : "text-gray-300"}`}
    //                   />
    //                 ))}
    //               </div>
    //             </div>
    //             <p className="text-sm mb-2">{review.comment}</p>
    //             <div className="flex items-center justify-between">
    //               <p className="text-xs text-muted-foreground">{review.date}</p>
    //               {review.status === "pending" ? (
    //                 <div className="flex items-center space-x-2">
    //                   <Button size="sm" variant="outline" className="h-7 bg-transparent">
    //                     <CheckIcon className="h-3 w-3 mr-1" />
    //                     Approve
    //                   </Button>
    //                   <Button size="sm" variant="outline" className="h-7 text-red-600 bg-transparent">
    //                     <XIcon className="h-3 w-3 mr-1" />
    //                     Reject
    //                   </Button>
    //                 </div>
    //               ) : (
    //                 <span className="text-xs text-green-600">Approved</span>
    //               )}
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
  );
}
