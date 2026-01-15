import { useState, useEffect } from 'react';
import SurveyApi from '../../api/Survey';

export default function SurveyPage() {
  const [traLoi, setTraLoi] = useState({});
  const [questions, setquestions] = useState([]);
  const handleChange = (id, value) => {
    setTraLoi((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  useEffect(() => {
    const fetchdata = async () => {
      const res = await SurveyApi.getsurvey();
      setquestions(res);
    };
    fetchdata();
  }, []);
  useEffect(() => {
    if (questions.length === 0) return;

    const lastQuestionId = questions[questions.length - 1].id;

    setTraLoi((prev) => {
      if (prev[lastQuestionId] !== undefined) return prev;

      return {
        ...prev,
        [lastQuestionId]: 0,
      };
    });
  }, [questions]);
  const handleSubmitSurvey = async () => {
    const chuaTraLoi = questions.some((q) => {
      return traLoi[q.id] < 0 || traLoi[q.id] == null;
    });

    if (chuaTraLoi) {
      //console.log(traLoi);
      alert('⚠️ Bạn chưa trả lời hết tất cả các câu hỏi!');
      return;
    }

    const tokenRaw = localStorage.getItem('token');
    const userID = tokenRaw ? JSON.parse(tokenRaw)?.[0]?.userID : null;

    if (!userID) {
      alert('User not logged in');
      return;
    }

    const payload = questions.map((q) => ({
      userId: userID,
      questionId: q.id,
      score: traLoi[q.id] ?? 5, // nếu chưa chọn → 5
    }));
    //console.log(payload);

    const checkOK = SurveyApi.submitsurvey(payload);
    if (!checkOK) console.log('Lỗi chưa được gửi');
    // //chuyển hướng sang trang kết thúc
    window.location.href = '/finishedsurvey';
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 p-6 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Khảo sát bài kiểm tra sử dụng AI
          </h1>
          <p className="text-slate-600">
            Vui lòng đánh giá từ 1 (Hoàn toàn không đồng ý) đến 10 (hoàn toàn đồng ý) hoặc Có/Không
            vào các câu hỏi khảo sát
          </p>
        </div>

        {/* Survey Card */}
        <div className="space-y-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-xl p-8">
          {questions.map((q, index) => (
            <div key={q.id} className="p-5 rounded-2xl bg-white/60 border border-slate-200">
              <div className="mb-4">
                <p className="text-slate-800 font-medium mb-2">{q.question}</p>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-xs text-slate-500">
                    {index != questions.length - 1 && (
                      <>
                        <span>Hoàn toàn không đồng ý</span>
                        <span>Hoàn toàn đồng ý</span>
                      </>
                    )}
                  </div>
                  {index != questions.length - 1 && (
                    <>
                      <div className="grid grid-cols-10 gap-2">
                        {Array.from({ length: 10 }).map((_, index) => {
                          const value = index + 1;
                          const active = traLoi[q.id] === value;

                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => handleChange(q.id, value)}
                              className={`h-10 rounded-xl border text-sm font-medium transition
                            ${
                              active
                                ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white border-transparent shadow-md'
                                : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-400 hover:text-emerald-600'
                            }
                          `}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                  {index == questions.length - 1 && (
                    <>
                      <div className="grid grid-cols-10 gap-2">
                        {Array.from({ length: 2 }).map((_, index) => {
                          const value = index;
                          const active = (traLoi[q.id] || 0) === value;

                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => handleChange(q.id, value)}
                              className={`h-10 rounded-xl border text-sm font-medium transition
                            ${
                              active
                                ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white border-transparent shadow-md'
                                : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-400 hover:text-emerald-600'
                            }
                          `}
                            >
                              {value === 0 ? 'Không' : 'Có'}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              className="px-6 py-3 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white font-medium shadow-lg hover:scale-[1.02] hover:shadow-emerald-500/40 transition"
              onClick={() => handleSubmitSurvey()}
            >
              Submit Survey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
