import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import reviewService from "../services/reviewService";
import field1 from "../assets/field.jpg";
import field2 from "../assets/field1.jpg";
import field3 from "../assets/field2.jpg";

function FieldDetails() {
  const location = useLocation();
  const field = location.state; // Retrieve field details passed from the search page

  const images = [field1, field2, field3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleFollowToggle = () => {
    setIsFollowing((prevState) => !prevState);
    console.log(isFollowing ? "Unfollowed" : "Followed");
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddComment = async () => {
    if (!newComment || newRating < 1) {
      alert("Please provide a valid comment and rating.");
      return;
    }

    const payload = {
      fieldId: field.fieldId,
      rating: newRating,
      comment: newComment,
    };

    const response = await reviewService.createReview(payload);

    if (response.status === 200 || response.status === 201) {
      setReviews((prevReviews) => [response?.data, ...prevReviews]);
      setReviews(response?.data?.reviewsList);
    }
    setReviews((prevReviews) => [newReview, ...prevReviews]);
    setNewComment("");
    setNewRating(0);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewService.getFieldReviews(field?.fieldId);
        if (response.status === 200 || response.status === 201) {
          setReviews(response?.data?.reviewsList || []);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    if (field?.fieldId) {
      fetchReviews();
    }
  }, []);

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
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              {/* Field Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  {field.fieldName}
                </h2>
                <button
                  onClick={handleFollowToggle}
                  className={`btn ${
                    isFollowing ? "btn-error" : "btn-primary"
                  } btn-sm`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>

              {/* Price and Stats */}
              <div className="flex flex-wrap gap-6 items-center mt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-600">
                    ${field.hourPrice}
                  </span>
                  <span className="text-sm text-gray-400">(per hour)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-600">
                    <span className="badge badge-outline badge-primary">
                      Followers: {field.followersCount}
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-yellow-400">
                  <span className="text-lg">⭐</span>
                  <span className="text-lg font-bold">
                    {field.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({reviews.length}){" "}
                  </span>
                </div>
              </div>

              {/* Field Overview */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800">
                  Field Overview
                </h3>
                <ul className="space-y-2 mt-4 text-gray-600 text-sm">
                  <li>
                    <span className="font-semibold">Google Maps:</span>{" "}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        field.googleMapsLocation
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {field.googleMapsLocation}
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold">Landmark:</span>{" "}
                    {field.landMark}
                  </li>
                </ul>
              </div>
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
