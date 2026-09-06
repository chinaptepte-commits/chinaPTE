/**
 * chinaPTE · Essay — Write Essay
 * Total: 16 items
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
  }
];
  ESSAY_BANK.forEach(function (item) {
    if (!item.sentence && item.en) item.sentence = item.en;
    if (!item.analysis && item.zhAnalysis) item.analysis = item.zhAnalysis;
  });
  global.ESSAY_BANK = ESSAY_BANK;
})(typeof window !== "undefined" ? window : globalThis);
