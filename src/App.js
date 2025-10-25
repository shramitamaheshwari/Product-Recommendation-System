import React, { useState } from "react";
import {
  Search,
  Loader2,
  ShoppingBag,
  DollarSign,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
} from "lucide-react";
import productData from "./products.json"; // your JSON file
import "./App.css";

const iconMap = {
  Phone: Smartphone,
  Laptop: Laptop,
  Tablet: Laptop,
  Wearable: Watch,
  Headphones: Headphones,
  "Smart Speaker": Headphones,
  "Portable Speaker": Headphones,
  Television: Laptop,
  Camera: Laptop,
  "Smart Home": Watch,
  "Gaming Console": Laptop,
  "Power Bank": Laptop,
  Mouse: Laptop,
  Keyboard: Laptop,
  Storage: Laptop,
  Router: Laptop,
  Monitor: Laptop,
  Webcam: Laptop,
  Microphone: Laptop,
  "E-reader": Laptop,
  Accessory: Laptop,
  Tracker: Laptop,
  "VR Headset": Laptop,
  Printer: Laptop,
  UPS: Laptop,
  "Gaming Controller": Laptop,
};

// ✅ Normalize product data
const products = productData.map((p) => ({
  id: p.ID,
  name: p.Name,
  category: p.Category?.toLowerCase(),
  price: p["Price (USD)"],
  rating: p["Rating (1-5)"],
  icon: iconMap[p.Category] || Smartphone,
}));

const ProductRecommendationSystem = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // ✅ Call Hugging Face Zero-Shot Classification
  const fetchAIRecommendations = async (userQuery) => {
    try {
      const candidateLabels = products.map((p) => p.name); // or categories if you prefer
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer ${API_KEY}",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: userQuery,
            parameters: { candidate_labels: candidateLabels },
          }),
        }
      );

      const data = await response.json();

      if (!data.labels) return [];

      const recommendedLabels = data.labels.slice(0, 5); // top 5
      const recommendedProducts = products.filter((p) =>
        recommendedLabels.includes(p.name)
      );

      return recommendedProducts;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter your preferences");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const results = await fetchAIRecommendations(query);
      setRecommendations(results);

      if (results.length === 0) {
        setError("No products match your preferences. Try adjusting your criteria.");
      }
    } catch {
      setError("Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="header">
          <div className="header-icon-wrapper">
            <ShoppingBag className="header-icon" />
            <h1 className="header-title">AI Product Finder</h1>
          </div>
          <p className="header-subtitle">
            Tell us what you're looking for, and our AI will find the perfect match
          </p>
        </div>

        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., I want a phone under $500, or best laptop for work"
              className="search-input"
            />
            <button onClick={handleSearch} disabled={loading} className="search-button">
              {loading ? (
                <>
                  <Loader2 className="search-button-icon spinner" />
                  Searching
                </>
              ) : (
                <>
                  <Search className="search-button-icon" />
                  Search
                </>
              )}
            </button>
          </div>

          <div className="examples-wrapper">
            <span className="examples-label">Try:</span>
            {[
              "Phone under $500",
              "Best laptop",
              "Budget headphones",
              "Premium smartwatch",
            ].map((example) => (
              <button
                key={example}
                onClick={() => setQuery(example)}
                className="example-button"
              >
                {example}
              </button>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>

        {loading && (
          <div className="loading-container">
            <Loader2 className="loading-spinner spinner" />
            <p className="loading-text">Analyzing your preferences...</p>
          </div>
        )}

        {!loading && recommendations.length > 0 && (
          <div>
            <h2 className="results-header">
              Recommended for You ({recommendations.length}{" "}
              {recommendations.length === 1 ? "product" : "products"})
            </h2>
            <div className="products-grid">
              {recommendations.map((product) => {
                const IconComponent = product.icon;
                return (
                  <div key={product.id} className="product-card">
                    <div className="product-header">
                      <IconComponent className="product-icon" />
                      <div className="product-rating">
                        <span className="rating-star">★</span>
                        <span className="rating-value">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-price-wrapper">
                      <DollarSign className="price-icon" />
                      <span className="product-price">${product.price}</span>
                    </div>
                    <button className="view-details-button">View Details</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!loading && hasSearched && recommendations.length === 0 && !error && (
          <div className="empty-state">
            <ShoppingBag className="empty-state-icon" />
            <p className="empty-state-title">No products found matching your preferences</p>
            <p className="empty-state-subtitle">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRecommendationSystem;
