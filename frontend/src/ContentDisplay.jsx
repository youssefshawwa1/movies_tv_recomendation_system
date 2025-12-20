import {
  FaFilm,
  FaTv,
  FaCalendar,
  FaClock,
  FaGlobe,
  FaUser,
  FaUsers,
  FaList,
} from "react-icons/fa";

const ContentDisplay = ({ items, title, color }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between m-2">
        <h2 className="text-xl font-bold text-gray-800">
          {title}
          <span className={`text-${color}-600`}>({items.length} results)</span>
        </h2>
        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          Showing {items.length} items
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800 truncate">
                  {item.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center whitespace-nowrap ml-2 bg-${color}-100 text-${color}-800
                  }`}
                >
                  {item.type === "Movie" ? (
                    <FaFilm className="mr-1" />
                  ) : (
                    <FaTv className="mr-1" />
                  )}
                  {item.type}
                </span>
              </div>

              {item.similarity && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Match Score
                    </span>
                    <span className={`text-sm font-bold text-${color}-600`}>
                      {item.similarity.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r to-gray-500 h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${item.similarity}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 space-y-4">
              {item.description && (
                <div>
                  <p className="text-gray-700 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                {item.release_year && (
                  <div className="flex items-center text-gray-600">
                    <FaCalendar className="mr-2 text-blue-500" />
                    <div>
                      <div className="text-xs text-gray-500">Year</div>
                      <div className="font-medium">{item.release_year}</div>
                    </div>
                  </div>
                )}

                {item.duration && (
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2 text-green-500" />
                    <div>
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="font-medium">{item.duration}</div>
                    </div>
                  </div>
                )}

                {item.country && (
                  <div className="flex items-center text-gray-600">
                    <FaGlobe className="mr-2 text-red-500" />
                    <div>
                      <div className="text-xs text-gray-500">Country</div>
                      <div className="font-medium truncate">{item.country}</div>
                    </div>
                  </div>
                )}

                {item.platform && (
                  <div className="flex items-center text-gray-600">
                    <FaList className="mr-2 text-purple-500" />
                    <div>
                      <div className="text-xs text-gray-500">Platform</div>
                      <div className="font-medium truncate">
                        {item.platform}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {item.director && (
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-start">
                    <FaUser className="mt-1 mr-2 text-gray-500" />
                    <div>
                      <div className="text-xs text-gray-500">Director</div>
                      <div className="font-medium text-gray-800">
                        {item.director}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {item.cast && (
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-start">
                    <FaUsers className="mt-1 mr-2 text-gray-500" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500">Cast</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.cast
                          .split(", ")
                          .slice(0, 3)
                          .map((actor, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {actor}
                            </span>
                          ))}
                        {item.cast.split(", ").length > 3 && (
                          <span className="text-xs text-gray-500 ml-1">
                            +{item.cast.split(", ").length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {item.listed_in && (
                <div className="pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500 mb-2">Categories</div>
                  <div className="flex flex-wrap gap-2">
                    {item.listed_in.split(", ").map((category, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 bg-gradient-to-r from-${color}-50 to-${color}-50 text-${color}-700 text-xs font-medium rounded-full border border-${color}-100`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mt-8 p-5 bg-gradient-to-r from-${color}-50 to-${color}-50 rounded-xl border border-${color}-100`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {items.filter((item) => item.type === "Movie").length}
            </div>
            <div className="text-sm text-gray-600">Movies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {items.filter((item) => item.type === "TV Show").length}
            </div>
            <div className="text-sm text-gray-600">TV Shows</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {items.filter((item) => item.similarity > 40).length}
            </div>
            <div className="text-sm text-gray-600">High Matches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {new Set(items.map((item) => item.platform)).size}
            </div>
            <div className="text-sm text-gray-600">Platforms</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDisplay;
