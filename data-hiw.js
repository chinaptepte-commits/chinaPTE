/**
 * chinaPTE · HIW — Highlight Incorrect Words
 * Total: 42 items
 */
(function (global) {
  "use strict";
  var HIW_BANK = [
  {
    "id": 1,
    "en": "The research indicates that regular exercise improves cardiovascular health significantly.",
    "transcript": "The research indicates that regular exercise improves cardiovascular health significantly.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 2,
    "en": "Students are encouraged to participate actively in seminar discussions each week.",
    "transcript": "Students are encouraged to participate actively in seminar discussions each week.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 3,
    "en": "The library catalogue can be accessed remotely using your student credentials.",
    "transcript": "The library catalogue can be accessed remotely using your student credentials.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 4,
    "en": "Climate models predict more frequent extreme weather events in coming decades.",
    "transcript": "Climate models predict more frequent extreme weather events in coming decades.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 5,
    "en": "All laboratory equipment must be sterilized before each experiment begins.",
    "transcript": "All laboratory equipment must be sterilized before each experiment begins.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 6,
    "en": "The scholarship covers tuition fees and provides a modest living allowance.",
    "transcript": "The scholarship covers tuition fees and provides a modest living allowance.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 7,
    "en": "Archaeologists discovered pottery fragments dating from the Bronze Age.",
    "transcript": "Archaeologists discovered pottery fragments dating from the Bronze Age.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 8,
    "en": "Public transport subsidies make commuting more affordable for low-income residents.",
    "transcript": "Public transport subsidies make commuting more affordable for low-income residents.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 9,
    "en": "The committee will review all proposals submitted before the December deadline.",
    "transcript": "The committee will review all proposals submitted before the December deadline.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 10,
    "en": "Vaccination campaigns have dramatically reduced the incidence of measles worldwide.",
    "transcript": "Vaccination campaigns have dramatically reduced the incidence of measles worldwide.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 11,
    "en": "Urban planners recommend mixed-use developments to reduce car dependency.",
    "transcript": "Urban planners recommend mixed-use developments to reduce car dependency.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 12,
    "en": "The manuscript was carefully edited before it was sent to the publisher.",
    "transcript": "The manuscript was carefully edited before it was sent to the publisher.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 13,
    "en": "Renewable energy investments have increased steadily over the past decade.",
    "transcript": "Renewable energy investments have increased steadily over the past decade.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 14,
    "en": "Volunteers distribute food packages to families affected by the flood.",
    "transcript": "Volunteers distribute food packages to families affected by the flood.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 15,
    "en": "The hypothesis was rejected because the sample size was too small.",
    "transcript": "The hypothesis was rejected because the sample size was too small.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 16,
    "en": "Digital archives preserve historical documents for future generations.",
    "transcript": "Digital archives preserve historical documents for future generations.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 17,
    "en": "Employees must complete mandatory safety training within their first month.",
    "transcript": "Employees must complete mandatory safety training within their first month.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 18,
    "en": "The exhibition features paintings from both classical and modern periods.",
    "transcript": "The exhibition features paintings from both classical and modern periods.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 19,
    "en": "Researchers collected data through interviews and anonymous online surveys.",
    "transcript": "Researchers collected data through interviews and anonymous online surveys.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 20,
    "en": "Please ensure that all references are formatted according to the style guide.",
    "transcript": "Please ensure that all references are formatted according to the style guide.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 21,
    "en": "Biodiversity loss threatens ecosystems that provide essential services to humans.",
    "transcript": "Biodiversity loss threatens ecosystems that provide essential services to humans.",
    "zhAnalysis": "对照正确文本，标出与录音不符的词。",
    "vocab": [
      {
        "word": "transcript",
        "spelling": "T-R-A-N-S-C-R-I-P-T",
        "gloss": "文字稿",
        "tip": "对照听"
      },
      {
        "word": "incorrect",
        "spelling": "I-N-C-O-R-R-E-C-T",
        "gloss": "错误的",
        "tip": ""
      }
    ]
  },
  {
    "id": 22,
    "en": "Climate policy requires coordinated action across national and local governments.",
    "transcript": "Climate policy requires coordinated action across national and local governments.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "coordinated",
        "spelling": "C-O-O-R-D-I-N-A-T-E-D",
        "gloss": "协调的",
        "tip": ""
      },
      {
        "word": "governments",
        "spelling": "G-O-V-E-R-N-M-E-N-T-S",
        "gloss": "政府",
        "tip": ""
      }
    ]
  },
  {
    "id": 23,
    "en": "The library database provides access to thousands of academic journals.",
    "transcript": "The library database provides access to thousands of academic journals.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "database",
        "spelling": "D-A-T-A-B-A-S-E",
        "gloss": "数据库",
        "tip": ""
      },
      {
        "word": "journals",
        "spelling": "J-O-U-R-N-A-L-S",
        "gloss": "期刊",
        "tip": ""
      }
    ]
  },
  {
    "id": 24,
    "en": "Students should allocate time each week for independent reading.",
    "transcript": "Students should allocate time each week for independent reading.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "allocate",
        "spelling": "A-L-L-O-C-A-T-E",
        "gloss": "分配",
        "tip": ""
      },
      {
        "word": "independent",
        "spelling": "I-N-D-E-P-E-N-D-E-N-T",
        "gloss": "独立的",
        "tip": ""
      }
    ]
  },
  {
    "id": 25,
    "en": "Renewable energy capacity has expanded rapidly in the past decade.",
    "transcript": "Renewable energy capacity has expanded rapidly in the past decade.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "Renewable",
        "spelling": "R-E-N-E-W-A-B-L-E",
        "gloss": "可再生的",
        "tip": ""
      },
      {
        "word": "capacity",
        "spelling": "C-A-P-A-C-I-T-Y",
        "gloss": "容量",
        "tip": ""
      },
      {
        "word": "decade",
        "spelling": "D-E-C-A-D-E",
        "gloss": "十年",
        "tip": ""
      }
    ]
  },
  {
    "id": 26,
    "en": "Peer feedback can improve draft quality before final submission.",
    "transcript": "Peer feedback can improve draft quality before final submission.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "feedback",
        "spelling": "F-E-E-D-B-A-C-K",
        "gloss": "反馈",
        "tip": ""
      },
      {
        "word": "submission",
        "spelling": "S-U-B-M-I-S-S-I-O-N",
        "gloss": "提交",
        "tip": ""
      }
    ]
  },
  {
    "id": 27,
    "en": "Urban transport planning must balance efficiency with environmental goals.",
    "transcript": "Urban transport planning must balance efficiency with environmental goals.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "transport",
        "spelling": "T-R-A-N-S-P-O-R-T",
        "gloss": "交通",
        "tip": ""
      },
      {
        "word": "efficiency",
        "spelling": "E-F-F-I-C-I-E-N-C-Y",
        "gloss": "效率",
        "tip": ""
      },
      {
        "word": "environmental",
        "spelling": "E-N-V-I-R-O-N-M-E-N-T-A-L",
        "gloss": "环境的",
        "tip": ""
      }
    ]
  },
  {
    "id": 28,
    "en": "The ethics committee reviews all proposals involving human participants.",
    "transcript": "The ethics committee reviews all proposals involving human participants.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "ethics",
        "spelling": "E-T-H-I-C-S",
        "gloss": "伦理",
        "tip": ""
      },
      {
        "word": "participants",
        "spelling": "P-A-R-T-I-C-I-P-A-N-T-S",
        "gloss": "参与者",
        "tip": ""
      }
    ]
  },
  {
    "id": 29,
    "en": "Scholarship recipients must maintain satisfactory academic progress.",
    "transcript": "Scholarship recipients must maintain satisfactory academic progress.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "Scholarship",
        "spelling": "S-C-H-O-L-A-R-S-H-I-P",
        "gloss": "奖学金",
        "tip": ""
      },
      {
        "word": "satisfactory",
        "spelling": "S-A-T-I-S-F-A-C-T-O-R-Y",
        "gloss": "令人满意的",
        "tip": ""
      },
      {
        "word": "progress",
        "spelling": "P-R-O-G-R-E-S-S",
        "gloss": "进步",
        "tip": ""
      }
    ]
  },
  {
    "id": 30,
    "en": "Laboratory experiments require careful measurement and accurate recording.",
    "transcript": "Laboratory experiments require careful measurement and accurate recording.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "measurement",
        "spelling": "M-E-A-S-U-R-E-M-E-N-T",
        "gloss": "测量",
        "tip": ""
      },
      {
        "word": "accurate",
        "spelling": "A-C-C-U-R-A-T-E",
        "gloss": "准确的",
        "tip": ""
      }
    ]
  },
  {
    "id": 31,
    "en": "Inflation affects household budgets and long-term savings plans.",
    "transcript": "Inflation affects household budgets and long-term savings plans.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "Inflation",
        "spelling": "I-N-F-L-A-T-I-O-N",
        "gloss": "通货膨胀",
        "tip": ""
      },
      {
        "word": "household",
        "spelling": "H-O-U-S-E-H-O-L-D",
        "gloss": "家庭",
        "tip": ""
      },
      {
        "word": "savings",
        "spelling": "S-A-V-I-N-G-S",
        "gloss": "储蓄",
        "tip": ""
      }
    ]
  },
  {
    "id": 32,
    "en": "Orientation sessions help new students navigate campus services.",
    "transcript": "Orientation sessions help new students navigate campus services.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "Orientation",
        "spelling": "O-R-I-E-N-T-A-T-I-O-N",
        "gloss": "迎新",
        "tip": ""
      },
      {
        "word": "navigate",
        "spelling": "N-A-V-I-G-A-T-E",
        "gloss": "导航",
        "tip": ""
      }
    ]
  },
  {
    "id": 33,
    "en": "Biodiversity surveys monitor changes in local plant and animal species.",
    "transcript": "Biodiversity surveys monitor changes in local plant and animal species.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "Biodiversity",
        "spelling": "B-I-O-D-I-V-E-R-S-I-T-Y",
        "gloss": "生物多样性",
        "tip": ""
      },
      {
        "word": "monitor",
        "spelling": "M-O-N-I-T-O-R",
        "gloss": "监测",
        "tip": ""
      },
      {
        "word": "species",
        "spelling": "S-P-E-C-I-E-S",
        "gloss": "物种",
        "tip": ""
      }
    ]
  },
  {
    "id": 34,
    "en": "Assessment deadlines are published at the beginning of each semester.",
    "transcript": "Assessment deadlines are published at the beginning of each semester.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "Assessment",
        "spelling": "A-S-S-E-S-S-M-E-N-T",
        "gloss": "考核",
        "tip": ""
      },
      {
        "word": "deadlines",
        "spelling": "D-E-A-D-L-I-N-E-S",
        "gloss": "截止日期",
        "tip": ""
      },
      {
        "word": "semester",
        "spelling": "S-E-M-E-S-T-E-R",
        "gloss": "学期",
        "tip": ""
      }
    ]
  },
  {
    "id": 35,
    "en": "Digital literacy includes evaluating the reliability of online sources.",
    "transcript": "Digital literacy includes evaluating the reliability of online sources.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "literacy",
        "spelling": "L-I-T-E-R-A-C-Y",
        "gloss": "素养",
        "tip": ""
      },
      {
        "word": "reliability",
        "spelling": "R-E-L-I-A-B-I-L-I-T-Y",
        "gloss": "可靠性",
        "tip": ""
      }
    ]
  },
  {
    "id": 36,
    "en": "Public health measures reduced the spread of infectious diseases.",
    "transcript": "Public health measures reduced the spread of infectious diseases.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "measures",
        "spelling": "M-E-A-S-U-R-E-S",
        "gloss": "措施",
        "tip": ""
      },
      {
        "word": "infectious",
        "spelling": "I-N-F-E-C-T-I-O-U-S",
        "gloss": "传染的",
        "tip": ""
      }
    ]
  },
  {
    "id": 37,
    "en": "The lecture summarised key theories of language acquisition.",
    "transcript": "The lecture summarised key theories of language acquisition.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "summarised",
        "spelling": "S-U-M-M-A-R-I-S-E-D",
        "gloss": "总结",
        "tip": ""
      },
      {
        "word": "acquisition",
        "spelling": "A-C-Q-U-I-S-I-T-I-O-N",
        "gloss": "习得",
        "tip": ""
      }
    ]
  },
  {
    "id": 38,
    "en": "Infrastructure projects create jobs but require substantial investment.",
    "transcript": "Infrastructure projects create jobs but require substantial investment.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "Infrastructure",
        "spelling": "I-N-F-R-A-S-T-R-U-C-T-U-R-E",
        "gloss": "基础设施",
        "tip": ""
      },
      {
        "word": "substantial",
        "spelling": "S-U-B-S-T-A-N-T-I-A-L",
        "gloss": "大量的",
        "tip": ""
      }
    ]
  },
  {
    "id": 39,
    "en": "Academic writing benefits from clear topic sentences and transitions.",
    "transcript": "Academic writing benefits from clear topic sentences and transitions.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "benefits",
        "spelling": "B-E-N-E-F-I-T-S",
        "gloss": "受益",
        "tip": ""
      },
      {
        "word": "transitions",
        "spelling": "T-R-A-N-S-I-T-I-O-N-S",
        "gloss": "过渡",
        "tip": ""
      }
    ]
  },
  {
    "id": 40,
    "en": "Enrolment numbers rose after the university expanded online courses.",
    "transcript": "Enrolment numbers rose after the university expanded online courses.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "Enrolment",
        "spelling": "E-N-R-O-L-M-E-N-T",
        "gloss": "入学人数",
        "tip": ""
      },
      {
        "word": "expanded",
        "spelling": "E-X-P-A-N-D-E-D",
        "gloss": "扩大",
        "tip": ""
      }
    ]
  },
  {
    "id": 41,
    "en": "Conservation groups work with farmers to protect wildlife habitats.",
    "transcript": "Conservation groups work with farmers to protect wildlife habitats.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "Conservation",
        "spelling": "C-O-N-S-E-R-V-A-T-I-O-N",
        "gloss": "保护",
        "tip": ""
      },
      {
        "word": "habitats",
        "spelling": "H-A-B-I-T-A-T-S",
        "gloss": "栖息地",
        "tip": ""
      }
    ]
  },
  {
    "id": 42,
    "en": "Statistical analysis revealed a significant difference between the groups.",
    "transcript": "Statistical analysis revealed a significant difference between the groups.",
    "zhAnalysis": "对照正确文本标出不符词。",
    "vocab": [
      {
        "word": "Statistical",
        "spelling": "S-T-A-T-I-S-T-I-C-A-L",
        "gloss": "统计的",
        "tip": ""
      },
      {
        "word": "significant",
        "spelling": "S-I-G-N-I-F-I-C-A-N-T",
        "gloss": "显著的",
        "tip": ""
      },
      {
        "word": "difference",
        "spelling": "D-I-F-F-E-R-E-N-C-E",
        "gloss": "差异",
        "tip": ""
      }
    ]
  }
];

  HIW_BANK.forEach(function (item) {
    if (!item.sentence && item.en) item.sentence = item.en;
    if (!item.analysis && item.zhAnalysis) item.analysis = item.zhAnalysis;
  });

  global.HIW_BANK = HIW_BANK;
})(typeof window !== "undefined" ? window : globalThis);
