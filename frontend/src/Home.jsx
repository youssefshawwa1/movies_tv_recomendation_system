import { useState, useEffect } from "react";
import { FaSearch, FaFilm, FaTv } from "react-icons/fa";
import axios from "axios";
import ContentDisplay from "./ContentDisplay";
function Home() {
  const apiLink = "http://localhost:8000";
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("red");
  const [formData, setFormData] = useState({
    query: "",
    contentType: "Movie",
    contentKind: "recommend",
    limit: 10,
  });
  useEffect(() => {
    setItems(null);
  }, [formData.contentType]);
  const [items, setItems] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        formData.contentKind === "recommend" ? "recommend" : "search";
      const paramName =
        formData.contentKind === "recommend" ? "title" : "query";

      const { data } = await axios.get(
        `${apiLink}/${endpoint}?${paramName}=${formData.query}&type=${formData.contentType}&limit=${formData.limit}`
      );
      setItems(data.results);

      //   console.log("Results:", data.results);
      // setData(data.results); // Assuming you have a state setter
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
      console.log(items);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "contentType") {
      if (value == "Movie") setColor("red");
      else if (value == "TV Show") setColor("blue");
      else setColor("purple");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen justify-center p-4">
      <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              Movie & TV Show{" "}
              <span className={`text-${color}-600`}>Recommender</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Discover personalized recommendations based on your preferences
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gray-100 rounded-full mr-4">
                <FaSearch className="text-gray-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Find Your Next Watch
                </h2>
                <p className="text-gray-600">Enter what you're looking for</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Field */}
              <div>
                <label
                  htmlFor="query"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  What are you looking for?
                </label>

                <div className="relative">
                  <input
                    type="text"
                    id="query"
                    name="query"
                    value={formData.query}
                    onChange={handleInputChange}
                    placeholder={`${
                      formData.contentKind == "find"
                        ? "Enter movie or TV show description/title..."
                        : "Enter movie or TV show title..."
                    }`}
                    className="w-full px-4 py-3 pl-12 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                    required
                  />
                  <FaSearch className="absolute left-4 top-4 text-gray-400 text-xl" />
                </div>
                <div className="my-4 flex items-center justify-around">
                  <label
                    className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 w-34 ${
                      formData.contentKind === "recommend"
                        ? "border-gray-400 bg-gray-50 ring-2 ring-gray-200"
                        : "border-gray-300 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="contentKind"
                      value="recommend"
                      checked={formData.contentKind === "recommend"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />

                    <div className="font-semibold text-gray-800">
                      Reccomender
                    </div>
                  </label>
                  <label
                    className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 w-34 ${
                      formData.contentKind === "find"
                        ? "border-gray-400 bg-gray-50 ring-2 ring-gray-200"
                        : "border-gray-300 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="contentKind"
                      value="find"
                      checked={formData.contentKind === "find"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="font-semibold text-gray-800">Find</div>
                  </label>
                </div>
              </div>

              {/* Radio Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Content Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Movie Option */}

                  <label
                    className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.contentType === "Movie"
                        ? "border-red-400 bg-red-50 ring-2 ring-red-200"
                        : "border-gray-300 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="contentType"
                      value="Movie"
                      checked={formData.contentType === "Movie"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full mr-3 ${
                          formData.contentType === "Movie"
                            ? "bg-red-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <FaFilm
                          className={`text-lg ${
                            formData.contentType === "Movie"
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          Movies
                        </div>
                        <div className="text-sm text-gray-600">
                          Feature films
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* TV Show Option */}
                  <label
                    className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.contentType === "TV Show"
                        ? "border-blue-400 bg-blue-50 ring-2 ring-blue-200"
                        : "border-gray-300 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="contentType"
                      value="TV Show"
                      checked={formData.contentType === "TV Show"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full mr-3 ${
                          formData.contentType === "TV Show"
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <FaTv
                          className={`text-lg ${
                            formData.contentType === "TV Show"
                              ? "text-blue-600"
                              : "text-gray-600"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          TV Shows
                        </div>
                        <div className="text-sm text-gray-600">
                          Series & episodes
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Both Option */}
                  <label
                    className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.contentType === "both"
                        ? "border-purple-400 bg-purple-50 ring-2 ring-purple-200"
                        : "border-gray-300 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="contentType"
                      value="both"
                      checked={formData.contentType === "both"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full mr-3 ${
                          formData.contentType === "both"
                            ? "bg-purple-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <div className="flex">
                          <FaFilm
                            className={`m-2 text-lg ${
                              formData.contentType === "both"
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
                          />
                          <FaTv
                            className={`m-2 text-lg ${
                              formData.contentType === "both"
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Both</div>
                        <div className="text-sm text-gray-600">
                          Movies & TV shows
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Additional Options */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Advanced Options (Optional)
                  </span>
                  <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                    Optional
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Number of Results
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-500 outline-none"
                      defaultValue="10"
                      onChange={handleInputChange}
                      name="limit"
                    >
                      <option value="5">5 results</option>
                      <option value="10">10 results</option>
                      <option value="20">20 results</option>
                      <option value="30">30 results</option>
                      <option value="40">40 results</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-gray-600 to-gray-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-gray-700 hover:to-${color}-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center`}
              >
                <FaSearch className="mr-3" />
                {formData.contentKind == "find"
                  ? "Find Data"
                  : "Get Recommendation"}
              </button>

              {/* Helper Text */}
              <p className="text-center text-gray-500 text-sm">
                Enter a movie or TV show title or description to get
                personalized recommendations
              </p>
            </form>
          </div>
        </div>
      </div>

      {items && (
        <ContentDisplay
          title={formData.contentKind.toUpperCase()}
          isLoading={isLoading}
          items={items}
          color={color}
        />
      )}
    </div>
  );
}

export default Home;
