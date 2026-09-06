/**
 * chinaPTE · Reading — FIB / Re-order / MCQ
 * Total: 30 items
 */
(function (global) {
  "use strict";
  var READING_BANK = [
  {
    "id": 1,
    "type": "FIB",
    "en": "The scientific method relies on careful _____ and repeatable experiments.",
    "answer": "observation",
    "zhAnalysis": "FIB：observation。先读整句抓搭配。",
    "vocab": []
  },
  {
    "id": 2,
    "type": "FIB",
    "en": "Students must _____ their essays before the Friday deadline.",
    "answer": "submit",
    "zhAnalysis": "FIB：submit 提交。",
    "vocab": []
  },
  {
    "id": 3,
    "type": "FIB",
    "en": "The museum offers free _____ to children under twelve.",
    "answer": "admission / entry",
    "zhAnalysis": "FIB：admission/entry。",
    "vocab": []
  },
  {
    "id": 4,
    "type": "FIB",
    "en": "Climate change poses a serious _____ to coastal communities.",
    "answer": "threat",
    "zhAnalysis": "FIB：threat。",
    "vocab": []
  },
  {
    "id": 5,
    "type": "FIB",
    "en": "The professor asked us to _____ the main arguments in one paragraph.",
    "answer": "summarize",
    "zhAnalysis": "FIB：summarize。",
    "vocab": []
  },
  {
    "id": 6,
    "type": "FIB",
    "en": "Public transport is more _____ than driving in rush hour.",
    "answer": "efficient / convenient",
    "zhAnalysis": "FIB：efficient/convenient。",
    "vocab": []
  },
  {
    "id": 7,
    "type": "FIB",
    "en": "The study found a strong _____ between exercise and mood.",
    "answer": "correlation / link",
    "zhAnalysis": "FIB：correlation。",
    "vocab": []
  },
  {
    "id": 8,
    "type": "FIB",
    "en": "Please keep your _____ as proof of purchase.",
    "answer": "receipt",
    "zhAnalysis": "FIB：receipt。",
    "vocab": []
  },
  {
    "id": 9,
    "type": "FIB",
    "en": "The new policy will _____ into effect next month.",
    "answer": "come / go",
    "zhAnalysis": "FIB：come/go into effect。",
    "vocab": []
  },
  {
    "id": 10,
    "type": "FIB",
    "en": "Researchers need _____ funding to continue the project.",
    "answer": "adequate / sufficient",
    "zhAnalysis": "FIB：adequate/sufficient。",
    "vocab": []
  },
  {
    "id": 11,
    "type": "RO",
    "en": "A) Finally, conclusions were drawn.\nB) Data were then analyzed statistically.\nC) The researchers first collected samples.\nD) A hypothesis was formulated beforehand.",
    "answer": "D-C-B-A",
    "zhAnalysis": "排序：假设→采样→分析→结论。找 first/then/finally。",
    "vocab": []
  },
  {
    "id": 12,
    "type": "RO",
    "en": "A) As a result, air quality improved.\nB) The city introduced congestion charges.\nC) Traffic volume in the centre fell.\nD) Many drivers switched to public transport.",
    "answer": "B-D-C-A",
    "zhAnalysis": "收费→换乘→车流降→空气改善。",
    "vocab": []
  },
  {
    "id": 13,
    "type": "RO",
    "en": "A) This discovery changed medical practice.\nB) Fleming noticed mold killing bacteria.\nC) Penicillin was later purified for treatment.\nD) He was studying bacterial cultures.",
    "answer": "D-B-C-A",
    "zhAnalysis": "研究→发现→提纯→改变实践。",
    "vocab": []
  },
  {
    "id": 14,
    "type": "RO",
    "en": "A) Graduates with these skills find jobs faster.\nB) Employers value communication highly.\nC) Universities now offer soft-skills workshops.\nD) Traditional degrees alone are often insufficient.",
    "answer": "B-D-C-A",
    "zhAnalysis": "雇主重视→仅学位不够→工作坊→就业更快。",
    "vocab": []
  },
  {
    "id": 15,
    "type": "RO",
    "en": "A) Wetlands were drained for farmland.\nB) Flooding became more severe downstream.\nC) Natural water storage was lost.\nD) Restoration projects began decades later.",
    "answer": "A-C-B-D",
    "zhAnalysis": "排水→失去蓄水→洪涝→恢复。",
    "vocab": []
  },
  {
    "id": 16,
    "type": "RO",
    "en": "A) Peer review checks quality before publication.\nB) Scientists submit manuscripts to journals.\nC) Accepted papers reach a wider audience.\nD) Revisions are often requested.",
    "answer": "B-A-D-C",
    "zhAnalysis": "投稿→评议→修改→发表。",
    "vocab": []
  },
  {
    "id": 17,
    "type": "RO",
    "en": "A) Bike lanes were painted on main roads.\nB) Accidents involving cyclists decreased.\nC) The city aimed to promote green commuting.\nD) More people started cycling to work.",
    "answer": "C-A-D-B",
    "zhAnalysis": "目标→划车道→更多骑行→事故降。",
    "vocab": []
  },
  {
    "id": 18,
    "type": "RO",
    "en": "A) The vaccine was tested in clinical trials.\nB) Regulatory approval followed successful results.\nC) Researchers identified a promising antigen.\nD) Mass vaccination campaigns were launched.",
    "answer": "C-A-B-D",
    "zhAnalysis": "抗原→试验→批准→接种。",
    "vocab": []
  },
  {
    "id": 19,
    "type": "RO",
    "en": "A) Online courses expanded access to education.\nB) Completion rates remained a challenge.\nC) Platforms added mentoring features.\nD) Engagement and finish rates improved.",
    "answer": "A-B-C-D",
    "zhAnalysis": "扩张→完成率低→加导师→改善。",
    "vocab": []
  },
  {
    "id": 20,
    "type": "RO",
    "en": "A) Local shops lost customers to the mall.\nB) A large shopping centre opened nearby.\nC) The council offered small-business grants.\nD) Some retailers diversified their services.",
    "answer": "B-A-C-D",
    "zhAnalysis": "商场开业→小店流失→补助→多元化。",
    "vocab": []
  },
  {
    "id": 21,
    "type": "MCQ",
    "en": "Passage: Bees pollinate many crops. Colony collapse has been linked to pesticides and habitat loss.\nQuestion: What does the passage suggest about bee decline?",
    "answer": "It is linked to pesticides and habitat loss.",
    "zhAnalysis": "阅读MCQ：答案在原文直接对应。",
    "vocab": []
  },
  {
    "id": 22,
    "type": "MCQ",
    "en": "Passage: Remote work saves commute time but may weaken informal mentoring.\nQuestion: What is a possible drawback mentioned?",
    "answer": "Weaker informal mentoring.",
    "zhAnalysis": "抓转折 but 后的弊端。",
    "vocab": []
  },
  {
    "id": 23,
    "type": "MCQ",
    "en": "Passage: Libraries now lend e-books and run coding workshops for teens.\nQuestion: How have libraries changed?",
    "answer": "They offer digital loans and tech workshops.",
    "zhAnalysis": "综合两处信息。",
    "vocab": []
  },
  {
    "id": 24,
    "type": "MCQ",
    "en": "Passage: Seawalls protect property but can worsen erosion elsewhere.\nQuestion: What trade-off is described?",
    "answer": "Protection vs. erosion elsewhere.",
    "zhAnalysis": "trade-off 题。",
    "vocab": []
  },
  {
    "id": 25,
    "type": "MCQ",
    "en": "Passage: Apprentices earn while learning under workplace mentors.\nQuestion: What is a key feature of apprenticeships?",
    "answer": "Paid learning with mentors.",
    "zhAnalysis": "定义题。",
    "vocab": []
  },
  {
    "id": 26,
    "type": "MCQ",
    "en": "Passage: Crowdfunding lets creators validate demand before manufacturing.\nQuestion: What advantage is highlighted?",
    "answer": "Testing demand before production.",
    "zhAnalysis": "advantage 题。",
    "vocab": []
  },
  {
    "id": 27,
    "type": "MCQ",
    "en": "Passage: Food deserts often lack fresh produce within walking distance.\nQuestion: What defines a food desert here?",
    "answer": "Lack of nearby fresh produce.",
    "zhAnalysis": "定义。",
    "vocab": []
  },
  {
    "id": 28,
    "type": "MCQ",
    "en": "Passage: Open peer review makes reviewer comments public.\nQuestion: How does open peer review differ?",
    "answer": "Comments are made public.",
    "zhAnalysis": "对比差异。",
    "vocab": []
  },
  {
    "id": 29,
    "type": "MCQ",
    "en": "Passage: Noise-cancelling headphones help focus but may isolate workers.\nQuestion: What dual effect is noted?",
    "answer": "Better focus yet possible isolation.",
    "zhAnalysis": "双重影响。",
    "vocab": []
  },
  {
    "id": 30,
    "type": "MCQ",
    "en": "Passage: Citizen science apps lower barriers to collecting environmental data.\nQuestion: What do the apps mainly do?",
    "answer": "Make data collection easier for volunteers.",
    "zhAnalysis": "主要功能。",
    "vocab": []
  }
];
  READING_BANK.forEach(function (item) {
    if (!item.sentence && item.en) item.sentence = item.en;
    if (!item.analysis && item.zhAnalysis) item.analysis = item.zhAnalysis;
  });
  global.READING_BANK = READING_BANK;
})(typeof window !== "undefined" ? window : globalThis);
