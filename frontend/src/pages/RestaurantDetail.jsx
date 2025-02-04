import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:6969/restaurant/${id}`);
        setRestaurant(response.data);
        setLoading(false);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to load restaurant details");
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-gray-200 border-t-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl border border-red-100 p-4 rounded-2xl">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex cursor-pointer items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to results
        </button>

        {restaurant && (
          <div className="space-y-8">
            {/* Main Info Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden">
              {restaurant.featured_image && (
                <div className="h-[400px] w-full relative group">
                  <img
                    src={restaurant.featured_image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              <div className="p-8">
                {/* Restaurant Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
                    {restaurant.establishment_types?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {restaurant.establishment_types.map((type, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                            {type}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
                      <span className="text-gray-900 font-semibold mr-1">
                        {restaurant.user_rating?.aggregate_rating}
                      </span>
                      <span className="text-yellow-400">★</span>
                    </div>
                    <span className="text-sm text-gray-500">{restaurant.user_rating?.rating_text}</span>
                    <span className="text-sm text-gray-500">{restaurant.user_rating?.votes} votes</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Location Info */}
                    <div className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm">{restaurant.location?.address}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {restaurant.location?.locality}, {restaurant.location?.city}
                        </p>
                        {restaurant.location?.zipcode && (
                          <p className="text-sm text-gray-500">ZIP: {restaurant.location?.zipcode}</p>
                        )}
                      </div>
                    </div>

                    {/* Cuisine Info */}
                    <div className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                      </svg>
                      <div>
                        <p className="font-medium">Cuisines</p>
                        <p className="text-sm">{restaurant.cuisines}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Cost Info */}
                    <div className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-medium">Pricing</p>
                        <p className="text-sm">Average cost for two: ₹{restaurant.average_cost_for_two}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Price Range: {'₹'.repeat(restaurant.price_range)}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <div>
                        <p className="font-medium">Features</p>
                        <div className="mt-2 space-y-2">
                          {restaurant.has_online_delivery && (
                            <div className="flex items-center gap-2 text-green-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span className="text-sm">Online Delivery</span>
                            </div>
                          )}
                          {restaurant.has_table_booking && (
                            <div className="flex items-center gap-2 text-blue-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                              </svg>
                              <span className="text-sm">Table Booking</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  {restaurant.menu_url && (
                    <a
                      href={restaurant.menu_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl
                               hover:bg-gray-800 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      View Menu
                    </a>
                  )}
                  {restaurant.photos_url && (
                    <a
                      href={restaurant.photos_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl
                               border border-gray-200 hover:bg-gray-50 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      View Photos
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Events Section */}
            {restaurant.zomato_events?.length > 0 && (
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {restaurant.zomato_events.map((eventData, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900">{eventData.event.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">{eventData.event.description}</p>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Start:</span> {eventData.event.start_date}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">End:</span> {eventData.event.end_date}
                        </p>
                        {eventData.event.photos?.length > 0 && (
                          <div className="mt-4">
                            <img
                              src={eventData.event.photos[0].photo.url}
                              alt={eventData.event.title}
                              className="rounded-lg w-full h-48 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links Section */}
            {(restaurant.book_url || restaurant.url) && (
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Links</h2>
                <div className="flex flex-wrap gap-4">
                  {restaurant.book_url && (
                    <a
                      href={restaurant.book_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl
                               hover:bg-blue-700 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Book a Table
                    </a>
                  )}
                  {restaurant.url && (
                    <a
                      href={restaurant.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-xl
                               hover:bg-gray-700 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 