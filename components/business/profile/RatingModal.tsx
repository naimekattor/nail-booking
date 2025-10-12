"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { FiArrowLeft } from "react-icons/fi";

const RatingModal = ({ open, onOpenChange, serviceName }: any) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log({ rating, comment, serviceName });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full p-6 rounded-lg">
        <DialogHeader className="flex flex-col gap-2">
          <div
            className="flex items-center gap-2 cursor-pointer text-gray-500"
            onClick={() => onOpenChange(false)}
          >
            <FiArrowLeft />
            <span>Back</span>
          </div>
          <DialogTitle className="text-lg font-bold mt-2">
            Give a review
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            How Was Your Working Experience
          </DialogDescription>
        </DialogHeader>

        {/* Star Rating */}
        <div className="flex justify-center gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <svg
                className={`w-8 h-8 ${
                  star <= (hoverRating || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.038 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
            </button>
          ))}
        </div>

        {/* Optional comment */}
        <div className="mt-6 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Describe your experience (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter here"
            className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <DialogFooter className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#F6339A] to-[#9810FA] text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
