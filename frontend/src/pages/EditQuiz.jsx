





// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const EditQuiz = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [quizData, setQuizData] = useState({
//     title: "",
//     description: "",
//     timer: "",
//     questions: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const { data } = await axios.get(`http://localhost:5000/api/quizzes/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setQuizData({
//           title: data.title,
//           description: data.description || "",
//           timer: data.timer,
//           questions: data.questions || [],
//         });
//       } catch (error) {
//         setError("Failed to fetch quiz data.");
//       }
//     };
//     fetchQuiz();
//   }, [id]);

//   const handleChange = (e) => {
//     setQuizData({ ...quizData, [e.target.name]: e.target.value });
//   };

//   const handleQuestionChange = (index, event) => {
//     const updatedQuestions = [...quizData.questions];
//     updatedQuestions[index] = {
//       ...updatedQuestions[index],
//       questionText: event.target.value,
//     };
//     setQuizData({ ...quizData, questions: updatedQuestions });
//   };

//   const handleOptionChange = (qIndex, optIndex, event) => {
//     const updatedQuestions = [...quizData.questions];
//     updatedQuestions[qIndex].options[optIndex] = event.target.value;
//     setQuizData({ ...quizData, questions: updatedQuestions });
//   };

//   const handleAnswerChange = (index, event) => {
//     const updatedQuestions = [...quizData.questions];
//     updatedQuestions[index].answer = event.target.value;
//     setQuizData({ ...quizData, questions: updatedQuestions });
//   };

  
//   const removeQuestion = (index) => {
//     const updatedQuestions = [...quizData.questions];
//     updatedQuestions.splice(index, 1);
//     setQuizData({ ...quizData, questions: updatedQuestions });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     if (!quizData.title.trim() || !quizData.description.trim() || !quizData.timer) {
//       setError("Quiz title, description, and timer are required.");
//       setLoading(false);
//       return;
//     }

//     const token = localStorage.getItem("token");

//     try {
//       await axios.put(
//         `http://localhost:5000/api/quizzes/${id}`,
//         { 
//           title: quizData.title,
//           description: quizData.description,
//           timer: quizData.timer,
//           questions: quizData.questions 
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSuccess(true);
//       navigate("/admin")
//     } catch (error) {
//       setError("Failed to update quiz.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Quiz</h2>

//         {error && <p className="text-red-500 mb-3">{error}</p>}
//         {success && <p className="text-green-500 mb-3">Quiz updated successfully!</p>}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Quiz Title */}
//           <div className="flex gap-3 flex-col">
//             <label className="block text-gray-700 font-medium">Quiz Title:</label>
//             <input
//               type="text"
//               name="title"
//               value={quizData.title}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div className="flex gap-3 flex-col">
//             <label className="block text-gray-700 font-medium">Description:</label>
//             <textarea
//               name="description"
//               value={quizData.description}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>

//           {/* Timer */}
//           <div className="flex gap-3 flex-col">
//             <label className="block text-gray-700 font-medium">Timer (seconds):</label>
//             <input
//               type="number"
//               name="timer"
//               value={quizData.timer}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>

//           {/* Questions */}
//           <h3 className="text-xl font-semibold mt-4">Questions</h3>
//           {quizData.questions.map((question, qIndex) => (
//             <div key={qIndex} className="p-4  rounded-lg shadow">
//               <label className="block text-gray-700 font-medium">Question: <span>{qIndex+1}</span></label>
             
//               <input
//                 type="text"
//                 name="questionText"
//                 value={question.questionText}
//                 onChange={(e) => handleQuestionChange(qIndex, e)}
//                 className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
//                 required
//               />

//               {/* Options */}
//               <label className="block text-gray-700 font-medium mt-2">Options:</label>
//               {question.options.map((option, optIndex) => (
                
//                 <input
//                   key={optIndex}
//                   type="text"
//                   value={option}
//                   onChange={(e) => handleOptionChange(qIndex, optIndex, e)}
//                   className="w-full p-2 border border-gray-300 rounded-lg mt-1"
//                   required
//                   placeholder={`Option ${optIndex + 1}`}
//                 />
                
//               ))}

//               {/* Correct Answer */}
//               <label className="block text-gray-700 font-medium mt-2">Correct Answer:</label>
//               <input
//                 type="text"
//                 name="correctAnswer"
//                 value={question.answer}
//                 onChange={(e) => handleAnswerChange(qIndex, e)}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 required={question.questionText !== ""}
//               />
//               <button
//                 type="button"
//                 onClick={() => removeQuestion(qIndex)}
//                 className="w-56 bg-red-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-red-600 transition"
//               >
//                 Remove Question
//               </button>
//             </div>
//           ))}


//           {/* Submit Button */}
//           <div className="flex  ">
//           <button
//             type="submit"
//             className="w-56 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Update Quiz"}
//           </button>
//           </div>
//         </form>

//         {/* Cancel Button */}
//         <div className="flex ">
//         <button
//           onClick={() => navigate("/admin")}
//           className="w-56 mt-3  bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
//         >
//           Cancel
//         </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditQuiz;




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    timer: "",
    questions: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(`http://localhost:5000/api/quizzes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizData({
          title: data.title,
          description: data.description || "",
          timer: data.timer,
          questions: data.questions || [],
        });
      } catch (error) {
        setError("Failed to fetch quiz data.");
      }
    };
    fetchQuiz();
  }, [id]);

  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      questionText: event.target.value,
    };
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, optIndex, event) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options[optIndex] = event.target.value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleAnswerChange = (index, event) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index].answer = event.target.value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { questionText: "", options: ["", "", "", ""], answer: "" },
      ],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions.splice(index, 1);
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!quizData.title.trim() || !quizData.description.trim() || !quizData.timer) {
      setError("Quiz title, description, and timer are required.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/quizzes/${id}`,
        { 
          title: quizData.title,
          description: quizData.description,
          timer: quizData.timer,
          questions: quizData.questions 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
      alert("Quiz updated successfully")
      navigate("/admin");
    } catch (error) {
      setError("Failed to update quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Quiz</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}
        {success && <p className="text-green-500 mb-3">Quiz updated successfully!</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-3 flex-col">
            <label className="block text-gray-700 font-medium">Quiz Title:</label>
            <input
              type="text"
              name="title"
              value={quizData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="flex gap-3 flex-col">
            <label className="block text-gray-700 font-medium">Description:</label>
            <textarea
              name="description"
              value={quizData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="flex gap-3 flex-col">
            <label className="block text-gray-700 font-medium">Timer (seconds):</label>
            <input
              type="number"
              name="timer"
              value={quizData.timer}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <h3 className="text-xl font-semibold mt-4">Questions</h3>
          {quizData.questions.map((question, qIndex) => (
            <div key={qIndex} className="p-4 rounded-lg shadow">
              <label className="block text-gray-700 font-medium">Question: <span>{qIndex + 1}</span></label>
              <input
                type="text"
                name="questionText"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                required
              />

              <label className="block text-gray-700 font-medium mt-2">Options:</label>
              {question.options.map((option, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, optIndex, e)}
                  className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                  required
                  placeholder={`Option ${optIndex + 1}`}
                />
              ))}

              <label className="block text-gray-700 font-medium mt-2">Correct Answer:</label>
              <input
                type="text"
                name="correctAnswer"
                value={question.answer}
                onChange={(e) => handleAnswerChange(qIndex, e)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required={question.questionText !== ""}
              />

              <button
                type="button"
                onClick={() => removeQuestion(qIndex)}
                className="w-56 bg-red-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-red-600 transition"
              >
                Remove Question
              </button>
            </div>
          ))}

          <div className="flex justify-start">
            <button
              type="button"
              onClick={addQuestion}
              className="w-56 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Add Question
            </button>
          </div>

          <div className="flex">
            <button
              type="submit"
              className="w-56 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Quiz"}
            </button>
          </div>
        </form>

        <div className="flex">
          <button
            onClick={() => navigate("/admin")}
            className="w-56 mt-3 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;

