import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import field1 from "../assets/field.jpg";
import field2 from "../assets/field1.jpg";
import field3 from "../assets/field2.jpg";

function FieldDetails() {
  const location = useLocation();
  const field = location.state; // Retrieve field details passed from the search page

  const images = [field1, field2, field3];
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const [reviews, setReviews] = useState([
    {
      name: "John Doe",
      comment: "Great place to play with friends. Loved the environment!",
      rating: 5,
      time: "2 mins ago",
    },
    {
      name: "Jane Smith",
      comment: "Decent facilities but the parking was a hassle.",
      rating: 4,
      time: "10 mins ago",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleAddComment = () => {
    if (!newComment || newRating < 1) {
      alert("Please provide a valid comment and rating.");
      return;
    }

    const newReview = {
      name: "Guest User",
      comment: newComment,
      rating: newRating,
      time: "Just now",
    };

    setReviews((prevReviews) => [newReview, ...prevReviews]);
    setNewComment("");
    setNewRating(0);
  };

  return (
    <div className="font-sans">
      <div className="p-4 lg:max-w-7xl max-w-xl max-lg:mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Field Images */}
          <div className="min-h-[600px] lg:col-span-3 bg-white rounded-lg w-full lg:sticky top-0 text-center p-8">
            {/* Main Image */}
            <div className="carousel w-full rounded-lg overflow-hidden relative">
              <div className="carousel-item w-full">
                <img
                  src={images[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-4/5 max-w-[800px] rounded-lg object-cover mx-auto"
                />
              </div>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <button onClick={handlePrevSlide} className="btn btn-circle">
                  ❮
                </button>
                <button onClick={handleNextSlide} className="btn btn-circle">
                  ❯
                </button>
              </div>
            </div>

            <hr className="border-gray-300 my-6" />

            {/* Thumbnails */}
            <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center mx-auto">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`w-24 h-24 max-lg:w-20 max-lg:h-20 p-3 rounded-lg cursor-pointer ${
                    currentSlide === index
                      ? "border-2 border-blue-500"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Field Details and Reviews */}
          <div className="lg:col-span-2">
            {/* Field Details */}
            <h2 className="text-2xl font-bold text-gray-800">
              {field.fieldName}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-gray-800 text-xl font-bold">
                ${field.hourPrice}
              </p>
              <p className="text-gray-400 text-sm">
                Followers: {field.followersCount}
              </p>
              <p className="text-yellow-400 flex items-center">
                ⭐ {field.averageRating.toFixed(1)}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">
                About the Field
              </h3>
              <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                <li>Located at {field.googleMapsLocation}</li>
                <li>Landmark: {field.landMark}</li>
                <li>Price per hour: ${field.hourPrice}</li>
              </ul>
            </div>

            {/* Add Review Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Add a Review</h3>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="textarea textarea-bordered w-full mb-4"
                placeholder="Write your comment here..."
              ></textarea>
              <div className="rating rating-lg mb-4">
                {[...Array(5)].map((_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-yellow-400"
                    onClick={() => setNewRating(index + 1)}
                  />
                ))}
              </div>
              <button
                onClick={handleAddComment}
                className="btn btn-primary w-full"
              >
                Submit
              </button>
            </div>

            {/* Reviews Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Reviews</h3>
              {reviews.map((review, index) => (
                <div key={index} className="flex items-start mt-8">
                  <img
                    src="https://via.placeholder.com/50"
                    className="w-12 h-12 rounded-full border-2 border-white"
                    alt="User Avatar"
                  />
                  <div className="ml-3">
                    <h4 className="text-sm font-bold">{review.name}</h4>
                    <div className="flex space-x-1 mt-1">
                      <p className="text-yellow-400">⭐ {review.rating}</p>
                      <p className="text-xs !ml-2 font-semibold">
                        {review.time}
                      </p>
                    </div>
                    <p className="text-xs mt-4">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FieldDetails;
