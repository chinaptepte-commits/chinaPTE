/**
 * chinaPTE · Reading practice
 * Total: 64 items
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
  },
  {
    "id": 31,
    "type": "FIB",
    "en": "Researchers must _____ ethics approval before interviewing participants.",
    "answer": "obtain / get / secure",
    "zhAnalysis": "FIB：obtain/get/secure 获得伦理批准。",
    "vocab": []
  },
  {
    "id": 32,
    "type": "FIB",
    "en": "The results _____ that online tutoring improves writing scores.",
    "answer": "indicate / suggest / show",
    "zhAnalysis": "FIB：indicate/suggest/show 表明。",
    "vocab": []
  },
  {
    "id": 33,
    "type": "FIB",
    "en": "Students are advised to _____ sources carefully to avoid plagiarism.",
    "answer": "cite / acknowledge / reference",
    "zhAnalysis": "FIB：cite/acknowledge/reference 引用。",
    "vocab": []
  },
  {
    "id": 34,
    "type": "FIB",
    "en": "Public transport can _____ congestion in densely populated cities.",
    "answer": "reduce / ease / alleviate",
    "zhAnalysis": "FIB：reduce/ease/alleviate 减少拥堵。",
    "vocab": []
  },
  {
    "id": 35,
    "type": "FIB",
    "en": "The sample was not large _____ to detect a small effect.",
    "answer": "enough / sufficient",
    "zhAnalysis": "FIB：enough/sufficient 足够。",
    "vocab": []
  },
  {
    "id": 36,
    "type": "FIB",
    "en": "Climate models _____ rising temperatures over the coming decades.",
    "answer": "predict / forecast / project",
    "zhAnalysis": "FIB：predict/forecast/project 预测。",
    "vocab": []
  },
  {
    "id": 37,
    "type": "FIB",
    "en": "Please _____ your assignment via the online portal by Friday.",
    "answer": "submit / upload",
    "zhAnalysis": "FIB：submit/upload 提交。",
    "vocab": []
  },
  {
    "id": 38,
    "type": "FIB",
    "en": "Peer review improves the _____ of academic publications.",
    "answer": "quality / credibility / reliability",
    "zhAnalysis": "FIB：quality/credibility/reliability。",
    "vocab": []
  },
  {
    "id": 39,
    "type": "FIB",
    "en": "Enrolment _____ significantly after scholarships were expanded.",
    "answer": "increased / rose / grew",
    "zhAnalysis": "FIB：increased/rose/grew 上升。",
    "vocab": []
  },
  {
    "id": 40,
    "type": "FIB",
    "en": "The lecture provided a brief _____ of key economic theories.",
    "answer": "overview / summary / outline",
    "zhAnalysis": "FIB：overview/summary/outline 概述。",
    "vocab": []
  },
  {
    "id": 41,
    "type": "RO",
    "en": "A) Funding was approved in March.\nB) The laboratory opened in September.\nC) Construction began in May.\nD) Equipment was installed in August.\nOrder:",
    "answer": "A-C-D-B",
    "zhAnalysis": "RO：批准→开工→装设备→开放。",
    "vocab": []
  },
  {
    "id": 42,
    "type": "RO",
    "en": "A) Students analysed the survey data.\nB) A questionnaire was distributed online.\nC) Findings were presented at a seminar.\nD) Ethics approval was obtained.\nOrder:",
    "answer": "D-B-A-C",
    "zhAnalysis": "RO：伦理→发问卷→分析→报告。",
    "vocab": []
  },
  {
    "id": 43,
    "type": "RO",
    "en": "A) Draft feedback was returned by tutors.\nB) Students submitted revised essays.\nC) The essay brief was published.\nD) First drafts were uploaded.\nOrder:",
    "answer": "C-D-A-B",
    "zhAnalysis": "RO：简报→初稿→反馈→修订稿。",
    "vocab": []
  },
  {
    "id": 44,
    "type": "RO",
    "en": "A) Sea levels continued to rise.\nB) Coastal defences were upgraded.\nC) Flooding damaged several districts.\nD) An emergency was declared.\nOrder:",
    "answer": "A-C-D-B",
    "zhAnalysis": "RO：海平面升→洪水→紧急状态→升级防御。",
    "vocab": []
  },
  {
    "id": 45,
    "type": "RO",
    "en": "A) Graduates attended a careers fair.\nB) Internship offers were negotiated.\nC) CVs were prepared in workshops.\nD) Some students accepted placements.\nOrder:",
    "answer": "C-A-B-D",
    "zhAnalysis": "RO：准备CV→招聘会→谈实习→接受。",
    "vocab": []
  },
  {
    "id": 46,
    "type": "RO",
    "en": "A) The hypothesis was revised.\nB) Pilot results were unexpected.\nC) A new experiment was designed.\nD) Final data supported the revised model.\nOrder:",
    "answer": "B-A-C-D",
    "zhAnalysis": "RO：试点意外→改假设→新实验→数据支持。",
    "vocab": []
  },
  {
    "id": 47,
    "type": "RO",
    "en": "A) Tickets sold out within hours.\nB) The guest lecture was announced.\nC) An overflow room was opened.\nD) Students queued outside early.\nOrder:",
    "answer": "B-A-D-C",
    "zhAnalysis": "RO：公告→售罄→排队→开溢流教室。",
    "vocab": []
  },
  {
    "id": 48,
    "type": "RO",
    "en": "A) Recommendations were sent to policymakers.\nB) Researchers collected air-quality data.\nC) A report summarised the findings.\nD) Pollution peaks were identified.\nOrder:",
    "answer": "B-D-C-A",
    "zhAnalysis": "RO：采集→识别峰值→报告→政策建议。",
    "vocab": []
  },
  {
    "id": 49,
    "type": "RO",
    "en": "A) Orientation week concluded on Friday.\nB) New students collected campus maps.\nC) Welcome talks were held on Monday.\nD) Library tours ran mid-week.\nOrder:",
    "answer": "C-B-D-A",
    "zhAnalysis": "RO：周一欢迎→领地图→周中参观→周五结束。",
    "vocab": []
  },
  {
    "id": 50,
    "type": "RO",
    "en": "A) The paper was peer-reviewed.\nB) Authors submitted a manuscript.\nC) Revisions were completed.\nD) The article was published online.\nOrder:",
    "answer": "B-A-C-D",
    "zhAnalysis": "RO：投稿→评审→修改→在线发表。",
    "vocab": []
  },
  {
    "id": 51,
    "type": "MCQ",
    "en": "The passage states that urban parks reduce stress and encourage exercise. What is one benefit of urban parks?",
    "answer": "They reduce stress / encourage exercise",
    "zhAnalysis": "MCQ：抓住 parks→stress/exercise。",
    "vocab": []
  },
  {
    "id": 52,
    "type": "MCQ",
    "en": "According to the text, peer review can be slow but improves quality. What is a drawback of peer review?",
    "answer": "It can be slow",
    "zhAnalysis": "MCQ：drawback=slow。",
    "vocab": []
  },
  {
    "id": 53,
    "type": "MCQ",
    "en": "The author argues that correlation is not causation. What does the author warn against?",
    "answer": "Treating correlation as causation",
    "zhAnalysis": "MCQ：勿把相关当因果。",
    "vocab": []
  },
  {
    "id": 54,
    "type": "MCQ",
    "en": "Students without reliable internet struggle with online exams. What problem is highlighted?",
    "answer": "Unequal access to internet / digital divide",
    "zhAnalysis": "MCQ：网络获取不平等。",
    "vocab": []
  },
  {
    "id": 55,
    "type": "MCQ",
    "en": "The study found scholarships increased enrolment among low-income applicants. What was the effect of scholarships?",
    "answer": "Increased enrolment among low-income applicants",
    "zhAnalysis": "MCQ：奖学金→低收入入学升。",
    "vocab": []
  },
  {
    "id": 56,
    "type": "MCQ",
    "en": "Noise pollution raises stress and disrupts sleep. Which health effect is mentioned?",
    "answer": "Stress / sleep disruption",
    "zhAnalysis": "MCQ：噪声→压力/睡眠。",
    "vocab": []
  },
  {
    "id": 57,
    "type": "MCQ",
    "en": "The module requires both a midterm test and a final essay. What assessments are required?",
    "answer": "A midterm test and a final essay",
    "zhAnalysis": "MCQ：两种考核。",
    "vocab": []
  },
  {
    "id": 58,
    "type": "MCQ",
    "en": "Desalination is energy-intensive but useful where water is scarce. What is a disadvantage of desalination?",
    "answer": "It is energy-intensive / high energy use",
    "zhAnalysis": "MCQ：能耗高。",
    "vocab": []
  },
  {
    "id": 59,
    "type": "MCQ",
    "en": "The career fair connects students with employers and mentors. What is the purpose of the career fair?",
    "answer": "To connect students with employers and mentors",
    "zhAnalysis": "MCQ：连接学生与雇主导师。",
    "vocab": []
  },
  {
    "id": 60,
    "type": "MCQ",
    "en": "Transparent marking criteria help students understand grades. Why are transparent criteria useful?",
    "answer": "They help students understand grades",
    "zhAnalysis": "MCQ：透明标准帮助理解成绩。",
    "vocab": []
  },
  {
    "id": 61,
    "type": "RFIB",
    "en": "Researchers must obtain ______ consent before collecting personal data from participants.",
    "answer": "informed",
    "zhAnalysis": "研究者在收集参与者个人数据前须获得知情同意。",
    "vocab": []
  },
  {
    "id": 62,
    "type": "RFIB",
    "en": "The ______ of the study was limited by the small sample size.",
    "answer": "validity",
    "zhAnalysis": "该研究的效度受限于较小的样本量。",
    "vocab": []
  },
  {
    "id": 63,
    "type": "RWFIB",
    "en": "Climate ______ has become a central topic in environmental policy debates worldwide.",
    "answer": "change",
    "zhAnalysis": "气候变化已成为全球环境政策辩论的中心议题。",
    "vocab": []
  },
  {
    "id": 64,
    "type": "RWFIB",
    "en": "Students are encouraged to ______ critically with academic texts rather than memorise them.",
    "answer": "engage",
    "zhAnalysis": "鼓励学生批判性接触学术文本，而非死记硬背。",
    "vocab": []
  }
];
  READING_BANK.forEach(function (item) {
    if (!item.sentence && item.en) item.sentence = item.en;
    if (!item.analysis && item.zhAnalysis) item.analysis = item.zhAnalysis;
  });

  global.READING_BANK = READING_BANK;
})(typeof window !== "undefined" ? window : globalThis);
