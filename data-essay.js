/**
 * chinaPTE · Essay — Write Essay
 * Total: 32 items
 */
(function (global) {
  "use strict";
  var ESSAY_BANK = [
  {
    "id": 1,
    "en": "Some people believe universities should focus mainly on practical job skills. Others argue that broader academic education is more important. Discuss both views and give your opinion.",
    "prompt": "Some people believe universities should focus mainly on practical job skills. Others argue that broader academic education is more important. Discuss both views and give your opinion.",
    "zhAnalysis": "提纲：开头改写表态；一边实用技能；一边通识批判思维；你的观点兼顾；结尾重申。200–300词。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 2,
    "en": "In many cities, private car use is increasing. What problems does this cause, and what solutions can you suggest?",
    "prompt": "In many cities, private car use is increasing. What problems does this cause, and what solutions can you suggest?",
    "zhAnalysis": "提纲：问题=拥堵污染健康；方案=公交/拥堵费/远程；结论综合治理。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 3,
    "en": "Do the advantages of social media outweigh the disadvantages for young people?",
    "prompt": "Do the advantages of social media outweigh the disadvantages for young people?",
    "zhAnalysis": "提纲：利=连接信息；弊=分心隐私心理；权衡后给立场。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 4,
    "en": "Governments should spend more money on public transport than on roads for private cars. To what extent do you agree?",
    "prompt": "Governments should spend more money on public transport than on roads for private cars. To what extent do you agree?",
    "zhAnalysis": "提纲：同意侧重公交；让步道路需维护；结论优先公交。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 5,
    "en": "Some educators think exams are the best way to assess students. Others prefer continuous assessment. Discuss.",
    "prompt": "Some educators think exams are the best way to assess students. Others prefer continuous assessment. Discuss.",
    "zhAnalysis": "提纲：考试标准化；形成性评价全面；建议混合。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 6,
    "en": "International tourism creates more problems than benefits in some destinations. Discuss.",
    "prompt": "International tourism creates more problems than benefits in some destinations. Discuss.",
    "zhAnalysis": "提纲：益=收入就业；害=环境过载；可持续管理。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 7,
    "en": "Is it better for children to grow up in the countryside than in a big city?",
    "prompt": "Is it better for children to grow up in the countryside than in a big city?",
    "zhAnalysis": "提纲：乡村空气社区；城市教育机会；折中取决于资源。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 8,
    "en": "Technology has made people less creative. Do you agree or disagree?",
    "prompt": "Technology has made people less creative. Do you agree or disagree?",
    "zhAnalysis": "提纲：工具激发创作 vs 依赖模板；技术双刃看用法。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 9,
    "en": "Companies should provide exercise facilities for employees. To what extent do you agree?",
    "prompt": "Companies should provide exercise facilities for employees. To what extent do you agree?",
    "zhAnalysis": "提纲：健康生产力留人；成本公平；中小企业替代方案。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 10,
    "en": "The best way to reduce crime is through education rather than punishment. Discuss.",
    "prompt": "The best way to reduce crime is through education rather than punishment. Discuss.",
    "zhAnalysis": "提纲：教育预防；惩罚威慑；综合政策。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 11,
    "en": "Fast food is becoming more popular. What are the effects on individuals and society?",
    "prompt": "Fast food is becoming more popular. What are the effects on individuals and society?",
    "zhAnalysis": "提纲：个人健康；医疗负担；饮食文化；监管教育。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 12,
    "en": "Should university education be free for everyone?",
    "prompt": "Should university education be free for everyone?",
    "zhAnalysis": "提纲：免费促公平；财政压力；定向资助更现实。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 13,
    "en": "Working from home will replace office work in the future. Do you agree?",
    "prompt": "Working from home will replace office work in the future. Do you agree?",
    "zhAnalysis": "提纲：部分可行；协作需面对面；混合更可能。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 14,
    "en": "Advertising aimed at children should be banned. To what extent do you agree?",
    "prompt": "Advertising aimed at children should be banned. To what extent do you agree?",
    "zhAnalysis": "提纲：保护儿童；家长责任；限制不健康广告。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 15,
    "en": "Learning a foreign language is unnecessary because of translation technology. Discuss.",
    "prompt": "Learning a foreign language is unnecessary because of translation technology. Discuss.",
    "zhAnalysis": "提纲：技术有助非完美；语言含文化职业优势。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 16,
    "en": "Space exploration is a waste of money when there are problems on Earth. Discuss.",
    "prompt": "Space exploration is a waste of money when there are problems on Earth. Discuss.",
    "zhAnalysis": "提纲：地球优先 vs 航天外溢；适度预算平衡。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 17,
    "en": "Some people think governments should invest more in public transport than in roads for private cars. To what extent do you agree or disagree?",
    "prompt": "Some people think governments should invest more in public transport than in roads for private cars. To what extent do you agree or disagree?",
    "zhAnalysis": "提纲：同意侧重公交→减拥堵污染公平；反方道路必要；折中优先公交兼顾货运；200–300词。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 18,
    "en": "Online education is becoming more popular. What are the advantages and disadvantages of studying online rather than on campus?",
    "prompt": "Online education is becoming more popular. What are the advantages and disadvantages of studying online rather than on campus?",
    "zhAnalysis": "提纲：优势灵活低成本；劣势自律社交实验；结论混合模式。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "moreover",
        "spelling": "M-O-R-E-O-V-E-R",
        "gloss": "而且",
        "tip": ""
      },
      {
        "word": "in conclusion",
        "spelling": "I-N-C-O-N-C-L-U-S-I-O-N",
        "gloss": "总之",
        "tip": ""
      }
    ]
  },
  {
    "id": 19,
    "en": "Many cities face housing shortages. What are the causes of this problem, and what measures can be taken to solve it?",
    "prompt": "Many cities face housing shortages. What are the causes of this problem, and what measures can be taken to solve it?",
    "zhAnalysis": "提纲：原因=人口涌入供给慢投机；措施=保障房规划税调控；结论综合。",
    "vocab": [
      {
        "word": "causes",
        "spelling": "C-A-U-S-E-S",
        "gloss": "原因",
        "tip": ""
      },
      {
        "word": "measures",
        "spelling": "M-E-A-S-U-R-E-S",
        "gloss": "措施",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 20,
    "en": "Some educators believe examinations are the best way to assess students. Others prefer continuous assessment. Discuss both views and give your opinion.",
    "prompt": "Some educators believe examinations are the best way to assess students. Others prefer continuous assessment. Discuss both views and give your opinion.",
    "zhAnalysis": "提纲：考试公平可比；持续评估减压力促学习；你的观点结合；结尾。",
    "vocab": [
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "whereas",
        "spelling": "W-H-E-R-E-A-S",
        "gloss": "而",
        "tip": ""
      },
      {
        "word": "in my view",
        "spelling": "I-N-M-Y-V-I-E-W",
        "gloss": "我认为",
        "tip": ""
      }
    ]
  },
  {
    "id": 21,
    "en": "The use of plastic packaging continues to grow. What problems does this cause, and what solutions can you suggest?",
    "prompt": "The use of plastic packaging continues to grow. What problems does this cause, and what solutions can you suggest?",
    "zhAnalysis": "提纲：问题=污染海洋微塑料；方案=禁塑回收替代品教育；结论多方。",
    "vocab": [
      {
        "word": "problems",
        "spelling": "P-R-O-B-L-E-M-S",
        "gloss": "问题",
        "tip": ""
      },
      {
        "word": "solutions",
        "spelling": "S-O-L-U-T-I-O-N-S",
        "gloss": "方案",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      }
    ]
  },
  {
    "id": 22,
    "en": "Do the benefits of international tourism outweigh the drawbacks for local communities?",
    "prompt": "Do the benefits of international tourism outweigh the drawbacks for local communities?",
    "zhAnalysis": "提纲：益=就业收入文化交流；弊=物价拥挤环境；总体有条件支持。",
    "vocab": [
      {
        "word": "outweigh",
        "spelling": "O-U-T-W-E-I-G-H",
        "gloss": "超过",
        "tip": ""
      },
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      },
      {
        "word": "overall",
        "spelling": "O-V-E-R-A-L-L",
        "gloss": "总体",
        "tip": ""
      }
    ]
  },
  {
    "id": 23,
    "en": "Some people argue that unpaid internships should be banned. Discuss the advantages and disadvantages of unpaid internships.",
    "prompt": "Some people argue that unpaid internships should be banned. Discuss the advantages and disadvantages of unpaid internships.",
    "zhAnalysis": "提纲：利=经验入行；弊=排斥低收入不公；建议规范有薪或学分。",
    "vocab": [
      {
        "word": "advantages",
        "spelling": "A-D-V-A-N-T-A-G-E-S",
        "gloss": "优点",
        "tip": ""
      },
      {
        "word": "disadvantages",
        "spelling": "D-I-S-A-D-V-A-N-T-A-G-E-S",
        "gloss": "缺点",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 24,
    "en": "Climate change is a global problem. Who should take the main responsibility for solving it: individuals, companies, or governments?",
    "prompt": "Climate change is a global problem. Who should take the main responsibility for solving it: individuals, companies, or governments?",
    "zhAnalysis": "提纲：政府政策减排；企业技术；个人习惯；三者共担政府主导。",
    "vocab": [
      {
        "word": "responsibility",
        "spelling": "R-E-S-P-O-N-S-I-B-I-L-I-T-Y",
        "gloss": "责任",
        "tip": ""
      },
      {
        "word": "furthermore",
        "spelling": "F-U-R-T-H-E-R-M-O-R-E",
        "gloss": "此外",
        "tip": ""
      },
      {
        "word": "in conclusion",
        "spelling": "I-N-C-O-N-C-L-U-S-I-O-N",
        "gloss": "总之",
        "tip": ""
      }
    ]
  },
  {
    "id": 25,
    "en": "In some countries, a growing number of people work from home. Is this a positive or negative development?",
    "prompt": "In some countries, a growing number of people work from home. Is this a positive or negative development?",
    "zhAnalysis": "提纲：正=灵活减通勤；负=孤立协作难；总体积极但需管理。",
    "vocab": [
      {
        "word": "positive",
        "spelling": "P-O-S-I-T-I-V-E",
        "gloss": "积极的",
        "tip": ""
      },
      {
        "word": "negative",
        "spelling": "N-E-G-A-T-I-V-E",
        "gloss": "消极的",
        "tip": ""
      },
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      }
    ]
  },
  {
    "id": 26,
    "en": "Universities should teach practical skills rather than theoretical knowledge. To what extent do you agree?",
    "prompt": "Universities should teach practical skills rather than theoretical knowledge. To what extent do you agree?",
    "zhAnalysis": "提纲：部分同意；理论奠基实践转化；课程应兼顾；结论平衡。",
    "vocab": [
      {
        "word": "practical",
        "spelling": "P-R-A-C-T-I-C-A-L",
        "gloss": "实用的",
        "tip": ""
      },
      {
        "word": "theoretical",
        "spelling": "T-H-E-O-R-E-T-I-C-A-L",
        "gloss": "理论的",
        "tip": ""
      },
      {
        "word": "balance",
        "spelling": "B-A-L-A-N-C-E",
        "gloss": "平衡",
        "tip": ""
      }
    ]
  },
  {
    "id": 27,
    "en": "Traffic congestion is a serious problem in many large cities. What are the causes and what solutions can you propose?",
    "prompt": "Traffic congestion is a serious problem in many large cities. What are the causes and what solutions can you propose?",
    "zhAnalysis": "提纲：原因=私车多公交弱规划；方案=拥堵费轨道远程；综合治理。",
    "vocab": [
      {
        "word": "congestion",
        "spelling": "C-O-N-G-E-S-T-I-O-N",
        "gloss": "拥堵",
        "tip": ""
      },
      {
        "word": "causes",
        "spelling": "C-A-U-S-E-S",
        "gloss": "原因",
        "tip": ""
      },
      {
        "word": "solutions",
        "spelling": "S-O-L-U-T-I-O-N-S",
        "gloss": "方案",
        "tip": ""
      }
    ]
  },
  {
    "id": 28,
    "en": "Some people think children should start learning a foreign language at primary school. Others think it is better to wait until secondary school. Discuss both views.",
    "prompt": "Some people think children should start learning a foreign language at primary school. Others think it is better to wait until secondary school. Discuss both views.",
    "zhAnalysis": "提纲：小学优势语音敏感；中学优势元认知；建议小学趣味启蒙。",
    "vocab": [
      {
        "word": "primary",
        "spelling": "P-R-I-M-A-R-Y",
        "gloss": "小学的",
        "tip": ""
      },
      {
        "word": "secondary",
        "spelling": "S-E-C-O-N-D-A-R-Y",
        "gloss": "中学的",
        "tip": ""
      },
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      }
    ]
  },
  {
    "id": 29,
    "en": "Is it better for the environment if people buy local food rather than imported food? Discuss.",
    "prompt": "Is it better for the environment if people buy local food rather than imported food? Discuss.",
    "zhAnalysis": "提纲：本地降运输碳；进口或更高效农业；应看生命周期非仅距离。",
    "vocab": [
      {
        "word": "environment",
        "spelling": "E-N-V-I-R-O-N-M-E-N-T",
        "gloss": "环境",
        "tip": ""
      },
      {
        "word": "local",
        "spelling": "L-O-C-A-L",
        "gloss": "本地的",
        "tip": ""
      },
      {
        "word": "imported",
        "spelling": "I-M-P-O-R-T-E-D",
        "gloss": "进口的",
        "tip": ""
      }
    ]
  },
  {
    "id": 30,
    "en": "Many museums charge an entry fee while others are free. What are the advantages of each approach?",
    "prompt": "Many museums charge an entry fee while others are free. What are the advantages of each approach?",
    "zhAnalysis": "提纲：收费维运精品；免费扩大获取教育；折中捐赠日/居民免费。",
    "vocab": [
      {
        "word": "advantages",
        "spelling": "A-D-V-A-N-T-A-G-E-S",
        "gloss": "优点",
        "tip": ""
      },
      {
        "word": "approach",
        "spelling": "A-P-P-R-O-A-C-H",
        "gloss": "方法",
        "tip": ""
      },
      {
        "word": "therefore",
        "spelling": "T-H-E-R-E-F-O-R-E",
        "gloss": "因此",
        "tip": ""
      }
    ]
  },
  {
    "id": 31,
    "en": "Technology has made it easier for people to work longer hours. Is this a positive or negative development for society?",
    "prompt": "Technology has made it easier for people to work longer hours. Is this a positive or negative development for society?",
    "zhAnalysis": "提纲：正=灵活产出；负=过劳界限模糊；总体需劳动保护。",
    "vocab": [
      {
        "word": "technology",
        "spelling": "T-E-C-H-N-O-L-O-G-Y",
        "gloss": "技术",
        "tip": ""
      },
      {
        "word": "positive",
        "spelling": "P-O-S-I-T-I-V-E",
        "gloss": "积极",
        "tip": ""
      },
      {
        "word": "negative",
        "spelling": "N-E-G-A-T-I-V-E",
        "gloss": "消极",
        "tip": ""
      }
    ]
  },
  {
    "id": 32,
    "en": "Some governments spend large amounts on space research. Should this money be spent on solving problems on Earth instead?",
    "prompt": "Some governments spend large amounts on space research. Should this money be spent on solving problems on Earth instead?",
    "zhAnalysis": "提纲：太空促创新溢出；地球贫困教育紧迫；可设上限兼顾。",
    "vocab": [
      {
        "word": "research",
        "spelling": "R-E-S-E-A-R-C-H",
        "gloss": "研究",
        "tip": ""
      },
      {
        "word": "problems",
        "spelling": "P-R-O-B-L-E-M-S",
        "gloss": "问题",
        "tip": ""
      },
      {
        "word": "however",
        "spelling": "H-O-W-E-V-E-R",
        "gloss": "然而",
        "tip": ""
      }
    ]
  }
];

  ESSAY_BANK.forEach(function (item) {
    if (!item.sentence && item.en) item.sentence = item.en;
    if (!item.analysis && item.zhAnalysis) item.analysis = item.zhAnalysis;
  });

  global.ESSAY_BANK = ESSAY_BANK;
})(typeof window !== "undefined" ? window : globalThis);
