import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useColorContext, colors } from "./ColorContext";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const category = "movies";
  const API_KEY = "SHvfyqv9qQ8UmsWdKvDn6g==Qq6nokHKFpMk8icl";
  const { currentColor, setCurrentColorIndex } = useColorContext();
  const [quoteChanged, setQuoteChanged] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const tweetText = `"${quote}" - ${author}`;
  const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`;

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    if (pageLoaded) {
      const timeout = setTimeout(() => {
        setQuoteChanged(false);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [quoteChanged, setQuoteChanged, pageLoaded]);

  const fetchQuote = () => {
    axios
      .get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
        headers: { "X-Api-Key": API_KEY },
      })
      .then((response) => {
        const { data } = response;
        if (data && data.length > 0) {
          setQuote(data[0].quote);
          setAuthor(data[0].author);
          setPageLoaded(true); // Set pageLoaded to true after fetching the initial quote
        } else {
          console.log("No quotes found in the response.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleClick = () => {
    setQuoteChanged(true);
    fetchQuote();
    setTimeout(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);
  };

  return (
    <div className="card ">
      <div className="card-body">
        <div className="mx-3">
          <figure>
            <blockquote id="text" className="mt-5">
              <p
                style={{ color: currentColor }}
                className={`fs-3 fs-md-6${
                  quoteChanged || !pageLoaded ? "fade-out" : "fade-in"
                }`}
              >
                <FontAwesomeIcon icon={faQuoteLeft} /> {quote}
              </p>
            </blockquote>
            <figcaption
              className={`blockquote-footer mt-2 ${
                quoteChanged || !pageLoaded ? "fade-out" : "fade-in"
              }`}
              id="author"
              style={{ color: currentColor }}
            >
              {author}
            </figcaption>
          </figure>
          <div className="d-flex justify-content-between">
            <div>
              <a
                target="_top"
                href={tweetURL}
                id="tweet-quote"
                className="btn mt-3"
              >
                {" "}
                <FontAwesomeIcon
                  style={{ height: "30", color: currentColor }}
                  icon={faTwitter}
                />
              </a>
            </div>

            <div>
              <button
                className="btn btn-primary mt-4 fw-light"
                style={{ backgroundColor: currentColor, border: "none" }}
                id="new-quote"
                onClick={handleClick}
              >
                New Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
