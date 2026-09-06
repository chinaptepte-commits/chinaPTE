/**
 * chinaPTE · Listening practice
 * Total: 68 items
 */
(function (global) {
  "use strict";
  var LISTENING_BANK = [
  {
    "id": 1,
    "type": "MCQ",
    "en": "Speaker: The main reason for the delay was a shortage of raw materials, not labor.\nQuestion: What caused the delay?",
    "answer": "Shortage of raw materials",
    "zhAnalysis": "听力MCQ：抓 main reason，排除 labor。",
    "vocab": []
  },
  {
    "id": 2,
    "type": "MCQ",
    "en": "Speaker: We will postpone the seminar until the guest speaker recovers.\nQuestion: What will happen to the seminar?",
    "answer": "It will be postponed",
    "zhAnalysis": "postpone=推迟。",
    "vocab": []
  },
  {
    "id": 3,
    "type": "MCQ",
    "en": "Speaker: Tickets are cheaper online than at the box office.\nQuestion: Where are tickets cheaper?",
    "answer": "Online",
    "zhAnalysis": "比较级 cheaper…than。",
    "vocab": []
  },
  {
    "id": 4,
    "type": "MCQ",
    "en": "Speaker: The lab is closed on weekends for maintenance.\nQuestion: When is the lab closed?",
    "answer": "On weekends",
    "zhAnalysis": "时间细节。",
    "vocab": []
  },
  {
    "id": 5,
    "type": "MCQ",
    "en": "Speaker: Although the theory is popular, evidence remains limited.\nQuestion: What is said about the evidence?",
    "answer": "It remains limited",
    "zhAnalysis": "Although 让步后重点。",
    "vocab": []
  },
  {
    "id": 6,
    "type": "MCQ",
    "en": "Speaker: Please submit soft copies by email and hard copies to the office.\nQuestion: What must students submit?",
    "answer": "Both soft and hard copies",
    "zhAnalysis": "both…and。",
    "vocab": []
  },
  {
    "id": 7,
    "type": "MCQ",
    "en": "Speaker: The exhibition extends for two more weeks due to popular demand.\nQuestion: Why is the exhibition extended?",
    "answer": "Popular demand",
    "zhAnalysis": "due to 原因。",
    "vocab": []
  },
  {
    "id": 8,
    "type": "MCQ",
    "en": "Speaker: Graduates in engineering had the highest employment rate this year.\nQuestion: Which group had the highest employment?",
    "answer": "Engineering graduates",
    "zhAnalysis": "最高级。",
    "vocab": []
  },
  {
    "id": 9,
    "type": "FIB",
    "en": "The lecture will be held in the _____ auditorium at 3 pm.",
    "answer": "main / large",
    "zhAnalysis": "听力FIB：注意拼写。",
    "vocab": []
  },
  {
    "id": 10,
    "type": "FIB",
    "en": "Applicants must provide two academic _____.",
    "answer": "references / referees",
    "zhAnalysis": "references。",
    "vocab": []
  },
  {
    "id": 11,
    "type": "FIB",
    "en": "The chemical reaction releases a large amount of _____.",
    "answer": "heat / energy",
    "zhAnalysis": "heat/energy。",
    "vocab": []
  },
  {
    "id": 12,
    "type": "FIB",
    "en": "Library books can be renewed _____ unless reserved.",
    "answer": "online / twice",
    "zhAnalysis": "online。",
    "vocab": []
  },
  {
    "id": 13,
    "type": "FIB",
    "en": "The survey received more than five hundred _____.",
    "answer": "responses / replies",
    "zhAnalysis": "responses。",
    "vocab": []
  },
  {
    "id": 14,
    "type": "FIB",
    "en": "Students should arrive _____ minutes before the exam starts.",
    "answer": "fifteen / 15 / ten",
    "zhAnalysis": "数字题。",
    "vocab": []
  },
  {
    "id": 15,
    "type": "FIB",
    "en": "The manuscript was published in a peer-reviewed _____.",
    "answer": "journal",
    "zhAnalysis": "journal。",
    "vocab": []
  },
  {
    "id": 16,
    "type": "FIB",
    "en": "Wear protective _____ in the laboratory at all times.",
    "answer": "equipment / gear",
    "zhAnalysis": "equipment。",
    "vocab": []
  },
  {
    "id": 17,
    "type": "HCS",
    "en": "A lecture on urban heat islands explains how concrete stores heat and raises night temperatures. Trees and reflective roofs are recommended.",
    "answer": "Summary: heat storage + mitigation (trees/roofs)",
    "zhAnalysis": "HCS：选最完整准确摘要。",
    "vocab": []
  },
  {
    "id": 18,
    "type": "HCS",
    "en": "A talk on sleep cycles covers REM and deep sleep, linking deep sleep to memory consolidation.",
    "answer": "Include REM/deep sleep and memory link",
    "zhAnalysis": "抓核心概念与因果。",
    "vocab": []
  },
  {
    "id": 19,
    "type": "HCS",
    "en": "Discussion of electric buses: high purchase cost vs lower operating emissions; charging network needed.",
    "answer": "Cost vs emissions + charging need",
    "zhAnalysis": "对比结构摘要。",
    "vocab": []
  },
  {
    "id": 20,
    "type": "HCS",
    "en": "History snippet: printing press spread literacy by making books cheaper and more available.",
    "answer": "Printing → cheaper books → literacy",
    "zhAnalysis": "因果链。",
    "vocab": []
  },
  {
    "id": 21,
    "type": "HCS",
    "en": "Nutrition talk: balanced diets need protein, carbs, fats, and micronutrients; supplements are secondary.",
    "answer": "Balance first; supplements secondary",
    "zhAnalysis": "主次信息。",
    "vocab": []
  },
  {
    "id": 22,
    "type": "SMW",
    "en": "The opposite of temporary is _____.",
    "answer": "permanent / lasting",
    "zhAnalysis": "SMW：选近义/搭配。",
    "vocab": []
  },
  {
    "id": 23,
    "type": "SMW",
    "en": "A person who designs buildings is an _____.",
    "answer": "architect",
    "zhAnalysis": "职业名词。",
    "vocab": []
  },
  {
    "id": 24,
    "type": "SMW",
    "en": "To give money for charity is to _____.",
    "answer": "donate",
    "zhAnalysis": "donate。",
    "vocab": []
  },
  {
    "id": 25,
    "type": "SMW",
    "en": "A book of maps is called an _____.",
    "answer": "atlas",
    "zhAnalysis": "atlas。",
    "vocab": []
  },
  {
    "id": 26,
    "type": "SMW",
    "en": "The study of living things is _____.",
    "answer": "biology",
    "zhAnalysis": "biology。",
    "vocab": []
  },
  {
    "id": 27,
    "type": "SMW",
    "en": "Something that can be trusted is _____.",
    "answer": "reliable / trustworthy",
    "zhAnalysis": "reliable。",
    "vocab": []
  },
  {
    "id": 28,
    "type": "SMW",
    "en": "To make something larger is to _____.",
    "answer": "expand / enlarge",
    "zhAnalysis": "expand。",
    "vocab": []
  },
  {
    "id": 29,
    "type": "SMW",
    "en": "A period of ten years is a _____.",
    "answer": "decade",
    "zhAnalysis": "decade。",
    "vocab": []
  },
  {
    "id": 30,
    "type": "SMW",
    "en": "Water in solid form is _____.",
    "answer": "ice",
    "zhAnalysis": "ice。",
    "vocab": []
  },
  {
    "id": 31,
    "type": "MCQ",
    "en": "Speaker: Registration closes this Friday; late applications will not be accepted.\nQuestion: What happens to late applications?",
    "answer": "They will not be accepted",
    "zhAnalysis": "否定细节。",
    "vocab": []
  },
  {
    "id": 32,
    "type": "FIB",
    "en": "The campus _____ runs every twenty minutes during term.",
    "answer": "shuttle / bus",
    "zhAnalysis": "shuttle bus。",
    "vocab": []
  },
  {
    "id": 33,
    "type": "MCQ",
    "en": "Speaker: The delay was caused by software failure, not staff shortages.\nQuestion: What caused the delay?",
    "answer": "Software failure",
    "zhAnalysis": "抓 caused by，排除 staff。",
    "vocab": []
  },
  {
    "id": 34,
    "type": "MCQ",
    "en": "Speaker: We will extend library hours during the exam period only.\nQuestion: When will library hours be extended?",
    "answer": "During the exam period",
    "zhAnalysis": "时间细节 exam period。",
    "vocab": []
  },
  {
    "id": 35,
    "type": "MCQ",
    "en": "Speaker: Scholarships cover tuition but not accommodation costs.\nQuestion: What do scholarships not cover?",
    "answer": "Accommodation costs",
    "zhAnalysis": "but not 后是答案。",
    "vocab": []
  },
  {
    "id": 36,
    "type": "MCQ",
    "en": "Speaker: The seminar has moved from Room 12 to the main hall.\nQuestion: Where is the seminar now?",
    "answer": "The main hall",
    "zhAnalysis": "moved … to 后地点。",
    "vocab": []
  },
  {
    "id": 37,
    "type": "MCQ",
    "en": "Speaker: Applications close at midnight on the thirtieth.\nQuestion: When do applications close?",
    "answer": "Midnight on the thirtieth",
    "zhAnalysis": "截止时间。",
    "vocab": []
  },
  {
    "id": 38,
    "type": "MCQ",
    "en": "Speaker: The main benefit of the reform is improved access, not lower fees.\nQuestion: What is the main benefit?",
    "answer": "Improved access",
    "zhAnalysis": "main benefit，排除 fees。",
    "vocab": []
  },
  {
    "id": 39,
    "type": "MCQ",
    "en": "Speaker: Please bring a calculator; dictionaries are not allowed.\nQuestion: What are students not allowed to bring?",
    "answer": "Dictionaries",
    "zhAnalysis": "not allowed。",
    "vocab": []
  },
  {
    "id": 40,
    "type": "MCQ",
    "en": "Speaker: Enrolment rose in engineering but fell in history.\nQuestion: In which subject did enrolment fall?",
    "answer": "History",
    "zhAnalysis": "fell in history。",
    "vocab": []
  },
  {
    "id": 41,
    "type": "MCQ",
    "en": "Speaker: The guest lecture is optional for first-year students.\nQuestion: Who may skip the guest lecture?",
    "answer": "First-year students (it is optional for them)",
    "zhAnalysis": "optional for first-year。",
    "vocab": []
  },
  {
    "id": 42,
    "type": "FIB",
    "en": "Speaker: Please submit your _____ before the Friday deadline.\nBlank:",
    "answer": "assignment / essay / coursework",
    "zhAnalysis": "FIB听写：assignment/essay。",
    "vocab": []
  },
  {
    "id": 43,
    "type": "FIB",
    "en": "Speaker: The laboratory will reopen after _____.\nBlank:",
    "answer": "maintenance / repairs",
    "zhAnalysis": "FIB：maintenance/repairs。",
    "vocab": []
  },
  {
    "id": 44,
    "type": "FIB",
    "en": "Speaker: Students must show their _____ cards at the entrance.\nBlank:",
    "answer": "student / identity / ID",
    "zhAnalysis": "FIB：student/ID cards。",
    "vocab": []
  },
  {
    "id": 45,
    "type": "FIB",
    "en": "Speaker: The research was funded by a government _____.\nBlank:",
    "answer": "grant / subsidy",
    "zhAnalysis": "FIB：grant。",
    "vocab": []
  },
  {
    "id": 46,
    "type": "FIB",
    "en": "Speaker: Please revise the draft according to tutor _____.\nBlank:",
    "answer": "feedback / comments",
    "zhAnalysis": "FIB：feedback。",
    "vocab": []
  },
  {
    "id": 47,
    "type": "FIB",
    "en": "Speaker: Public transport can reduce traffic _____.\nBlank:",
    "answer": "congestion",
    "zhAnalysis": "FIB：congestion。",
    "vocab": []
  },
  {
    "id": 48,
    "type": "FIB",
    "en": "Speaker: The survey used a random _____ of graduates.\nBlank:",
    "answer": "sample",
    "zhAnalysis": "FIB：sample。",
    "vocab": []
  },
  {
    "id": 49,
    "type": "FIB",
    "en": "Speaker: Orientation week includes a campus _____.\nBlank:",
    "answer": "tour / map session",
    "zhAnalysis": "FIB：tour。",
    "vocab": []
  },
  {
    "id": 50,
    "type": "FIB",
    "en": "Speaker: Accurate _____ is essential in Write From Dictation.\nBlank:",
    "answer": "spelling",
    "zhAnalysis": "FIB：spelling。",
    "vocab": []
  },
  {
    "id": 51,
    "type": "HCS",
    "en": "Summary A: The talk focuses on how parks improve mental health and fitness.\nSummary B: The talk mainly discusses museum ticket prices.\nAudio topic: urban green spaces and wellbeing.\nQuestion: Which summary is correct?",
    "answer": "Summary A",
    "zhAnalysis": "HCS：选与录音主旨一致的摘要A。",
    "vocab": []
  },
  {
    "id": 52,
    "type": "HCS",
    "en": "Summary A: The lecture explains peer review delays only.\nSummary B: The lecture explains peer review improves quality despite being slow.\nAudio topic: peer review benefits and limits.\nQuestion: Which summary is correct?",
    "answer": "Summary B",
    "zhAnalysis": "HCS：完整主旨选B。",
    "vocab": []
  },
  {
    "id": 53,
    "type": "HCS",
    "en": "Summary A: Scholarships increased enrolment among low-income students.\nSummary B: Scholarships reduced teaching quality.\nAudio topic: scholarship impact study.\nQuestion: Which summary is correct?",
    "answer": "Summary A",
    "zhAnalysis": "HCS：选A。",
    "vocab": []
  },
  {
    "id": 54,
    "type": "HCS",
    "en": "Summary A: Desalination is cheap and uses little energy.\nSummary B: Desalination helps scarce regions but is energy-intensive.\nAudio topic: desalination pros and cons.\nQuestion: Which summary is correct?",
    "answer": "Summary B",
    "zhAnalysis": "HCS：选B。",
    "vocab": []
  },
  {
    "id": 55,
    "type": "HCS",
    "en": "Summary A: The speaker recommends banning all internships.\nSummary B: The speaker supports structured, preferably paid internships.\nAudio topic: internship quality.\nQuestion: Which summary is correct?",
    "answer": "Summary B",
    "zhAnalysis": "HCS：选B。",
    "vocab": []
  },
  {
    "id": 56,
    "type": "SMW",
    "en": "Audio: The committee will reconvene next Thursday to finalise the timetable.\nMissing word in transcript: The committee will _____ next Thursday to finalise the timetable.",
    "answer": "reconvene",
    "zhAnalysis": "SMW：reconvene。",
    "vocab": []
  },
  {
    "id": 57,
    "type": "SMW",
    "en": "Audio: Empirical evidence supports the new teaching method.\nMissing: _____ evidence supports the new teaching method.",
    "answer": "Empirical",
    "zhAnalysis": "SMW：Empirical。",
    "vocab": []
  },
  {
    "id": 58,
    "type": "SMW",
    "en": "Audio: Students must enrol before the registration deadline.\nMissing: Students must _____ before the registration deadline.",
    "answer": "enrol",
    "zhAnalysis": "SMW：enrol。",
    "vocab": []
  },
  {
    "id": 59,
    "type": "SMW",
    "en": "Audio: Biodiversity loss threatens fragile ecosystems.\nMissing: _____ loss threatens fragile ecosystems.",
    "answer": "Biodiversity",
    "zhAnalysis": "SMW：Biodiversity。",
    "vocab": []
  },
  {
    "id": 60,
    "type": "SMW",
    "en": "Audio: Please allocate sufficient time for revision.\nMissing: Please _____ sufficient time for revision.",
    "answer": "allocate",
    "zhAnalysis": "SMW：allocate。",
    "vocab": []
  },
  {
    "id": 61,
    "type": "SMW",
    "en": "Audio: The findings were statistically significant.\nMissing: The findings were statistically _____.",
    "answer": "significant",
    "zhAnalysis": "SMW：significant。",
    "vocab": []
  },
  {
    "id": 62,
    "type": "SMW",
    "en": "Audio: Infrastructure investment creates long-term jobs.\nMissing: _____ investment creates long-term jobs.",
    "answer": "Infrastructure",
    "zhAnalysis": "SMW：Infrastructure。",
    "vocab": []
  },
  {
    "id": 63,
    "type": "SMW",
    "en": "Audio: Orientation week begins on Monday morning.\nMissing: _____ week begins on Monday morning.",
    "answer": "Orientation",
    "zhAnalysis": "SMW：Orientation。",
    "vocab": []
  },
  {
    "id": 64,
    "type": "SMW",
    "en": "Audio: Rising inflation has increased tuition costs.\nMissing: Rising _____ has increased tuition costs.",
    "answer": "inflation",
    "zhAnalysis": "SMW：inflation。",
    "vocab": []
  },
  {
    "id": 65,
    "type": "FIB",
    "en": "The speaker emphasises the need for ______ feedback during the drafting stage.",
    "answer": "formative",
    "zhAnalysis": "讲话者强调起草阶段需要形成性反馈。",
    "vocab": []
  },
  {
    "id": 66,
    "type": "FIB",
    "en": "According to the lecture, urban ______ can reduce reliance on private vehicles.",
    "answer": "planning",
    "zhAnalysis": "根据讲座，城市规划可减少对私家车的依赖。",
    "vocab": []
  },
  {
    "id": 67,
    "type": "HIW",
    "en": "The correct transcript mentions peer review, not peer reviewal, as the standard process.",
    "answer": "peer review",
    "zhAnalysis": "正确文本提到同行评审（peer review）为标准流程。",
    "vocab": []
  },
  {
    "id": 68,
    "type": "SMW",
    "en": "Which factor most improved retention in the study? Regular mentoring sessions.",
    "answer": "Regular mentoring sessions",
    "zhAnalysis": "研究中最提升留存的因素是什么？定期导师辅导。",
    "vocab": []
  }
];
  LISTENING_BANK.forEach(function (item) {
    if (!item.sentence && item.en) item.sentence = item.en;
    if (!item.analysis && item.zhAnalysis) item.analysis = item.zhAnalysis;
  });

  global.LISTENING_BANK = LISTENING_BANK;
})(typeof window !== "undefined" ? window : globalThis);
