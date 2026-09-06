/**
 * chinaPTE · Listening — MCQ / FIB / HCS / SMW
 * Total: 32 items
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
  }
];
  LISTENING_BANK.forEach(function (item) {
    if (!item.sentence && item.en) item.sentence = item.en;
    if (!item.analysis && item.zhAnalysis) item.analysis = item.zhAnalysis;
  });
  global.LISTENING_BANK = LISTENING_BANK;
})(typeof window !== "undefined" ? window : globalThis);
