import LineCountTextarea from "@/components/InputCounter/LineCountTextarea";
import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import TextInput from "@/components/InputCounter/TextInput";
import Feedback from "@/components/InputCounter/Feedback";
import FeedbackCard from "@/components/UI/FeedbackCard";
import Button from "@/components/UI/Button";

const Reviewer = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [valueWithNumbers, setValueWithNumbers] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);

  const handleFeedbackRequest = async (type) => {
    setIsloading(true);
    setClickedButton(type);
    if (value) {
      setError("");

      try {
        const requestFeedback = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            content: type,
            input: valueWithNumbers,
          }),
        });
        if (requestFeedback.ok) {
          const responseData = await requestFeedback.json();
          console.log("Request happend", responseData);
          setFeedbackList((prevFeedbackList) => [
            ...prevFeedbackList,
            responseData,
          ]);
          setIsloading(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsloading(false)
      setClickedButton("");
      setError("Field cannot be empty");
    }
  };

  const handleSubmit = async (inputText) => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          input: inputText,
        }),
      });
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  const handleAccept = (line) => {
    // Implement logic to accept improvement for this line
    console.log(`Accepted improvement for line ${line}`);
  };

  const handleDecline = (line) => {
    // Implement logic to decline improvement for this line
    console.log(`Declined improvement for line ${line}`);
  };

  return (
    <div class="min-h-screen flex flex-col h-screen">
      <div class="flex-2 flex flex-row overflow-y-hidden">
        <main class="flex-1 bg-indigo-100 overflow-y-auto">
          <main className="flex flex-col items-center justify-between">
            <section className="w-full mx-auto">
              <div className="">
                <div class="bg-gradient-to-r from-fuchsia-200 via-violet-200 to-violet-300 min-h-screen p-5">
                  <div className="magicOuter relative shadow-sm border-slate-100 bg-white rounded-lg flex flex-col justify-between mb-5 p-5">
                    <Button
                      onClick={() => handleFeedbackRequest("developer")}
                      isLoading={isLoading & (clickedButton == ["developer"])}
                    >
                      {" "}
                      Developer
                    </Button>
                    <Button
                      onClick={() =>
                        handleFeedbackRequest("sr-product-manager")
                      }
                      isLoading={
                        isLoading & (clickedButton == ["sr-product-manager"])
                      }
                    >
                      {" "}
                      Sr Product Manager
                    </Button>
                  </div>

                  {[...feedbackList].reverse().map((feedback, index) => (
                    <FeedbackCard
                      key={index}
                      type={feedback.content}
                      content={feedback.answer}
                    />
                  ))}
                </div>
              </div>
            </section>
          </main>
        </main>

        <nav
          class="order-first w-6/12	
           overflow-y-auto"
        >
          <div className="InputBlock h-full p-10">
            <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900">
              Input
            </h1>
            <h2 class="mb-4 text-xl font-medium leading-none tracking-tight text-gray-900">
              Paste your User Story
            </h2>

            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 "
            ></label>
            <div>
              <div className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                <LineCountTextarea
                  value={value}
                  numOfLines={10}
                  onValueChange={(newValue) => setValue(newValue)}
                  onValueChangeWithNumbers={(newValueWithNumbers) =>
                    setValueWithNumbers(newValueWithNumbers)
                  }
                  placeholder="Enter your text here..."
                />
                {error && (
                  <div
                    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <span class="font-medium">{error}</span>
                  </div>
                )}
              </div>

              {/* <TextInput onSubmit={handleSubmit} />
            {feedback.length > 0 && (
              <Feedback
                feedback={feedback}
                onAccept={handleAccept}
                onDecline={handleDecline}
              />
            )} */}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Reviewer;
