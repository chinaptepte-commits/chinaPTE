/**
 * chinaPTE · RA — Read Aloud
 * Total: 41 items
 */
(function (global) {
  "use strict";
  var RA_BANK = [
  {
    "id": 1,
    "en": "Academic success depends on consistent study habits and effective time management.",
    "zhAnalysis": "学术成功取决于持续的学习习惯和有效的时间管理。",
    "vocab": [
      {
        "word": "Academic",
        "spelling": "A-C-A-D-E-M-I-C",
        "gloss": "学术的",
        "tip": ""
      },
      {
        "word": "success",
        "spelling": "S-U-C-C-E-S-S",
        "gloss": "成功",
        "tip": ""
      }
    ]
  },
  {
    "id": 2,
    "en": "The university campus stretches across several hills overlooking the bay.",
    "zhAnalysis": "大学校园横跨几座山丘，俯瞰海湾。",
    "vocab": [
      {
        "word": "university",
        "spelling": "U-N-I-V-E-R-S-I-T-Y",
        "gloss": "大学",
        "tip": ""
      },
      {
        "word": "stretches",
        "spelling": "S-T-R-E-T-C-H-E-S",
        "gloss": "延伸",
        "tip": ""
      }
    ]
  },
  {
    "id": 3,
    "en": "Researchers analyzed soil samples collected from contaminated industrial sites.",
    "zhAnalysis": "研究人员分析了从受污染工业场地采集的土壤样本。",
    "vocab": [
      {
        "word": "Researchers",
        "spelling": "R-E-S-E-A-R-C-H-E-R-S",
        "gloss": "研究人员",
        "tip": ""
      },
      {
        "word": "analyzed",
        "spelling": "A-N-A-L-Y-Z-E-D",
        "gloss": "分析了",
        "tip": ""
      }
    ]
  },
  {
    "id": 4,
    "en": "International students often struggle with academic writing conventions at first.",
    "zhAnalysis": "国际学生起初常常难以适应学术写作规范。",
    "vocab": [
      {
        "word": "International",
        "spelling": "I-N-T-E-R-N-A-T-I-O-N-A-L",
        "gloss": "国际的",
        "tip": ""
      },
      {
        "word": "students",
        "spelling": "S-T-U-D-E-N-T-S",
        "gloss": "学生",
        "tip": ""
      }
    ]
  },
  {
    "id": 5,
    "en": "The museum's collection includes rare manuscripts from the medieval period.",
    "zhAnalysis": "该博物馆藏品包括中世纪罕见手稿。",
    "vocab": [
      {
        "word": "museum's",
        "spelling": "M-U-S-E-U-M-S",
        "gloss": "博物馆的",
        "tip": ""
      },
      {
        "word": "collection",
        "spelling": "C-O-L-L-E-C-T-I-O-N",
        "gloss": "收藏",
        "tip": ""
      }
    ]
  },
  {
    "id": 6,
    "en": "Sustainable development requires balancing economic growth with environmental protection.",
    "zhAnalysis": "可持续发展需要在经济增长与环境保护之间取得平衡。",
    "vocab": [
      {
        "word": "Sustainable",
        "spelling": "S-U-S-T-A-I-N-A-B-L-E",
        "gloss": "可持续的",
        "tip": ""
      },
      {
        "word": "development",
        "spelling": "D-E-V-E-L-O-P-M-E-N-T",
        "gloss": "发展",
        "tip": ""
      }
    ]
  },
  {
    "id": 7,
    "en": "She presented her findings at an international conference in Singapore.",
    "zhAnalysis": "她在新加坡的一次国际会议上展示了研究成果。",
    "vocab": [
      {
        "word": "presented",
        "spelling": "P-R-E-S-E-N-T-E-D",
        "gloss": "呈现",
        "tip": ""
      },
      {
        "word": "findings",
        "spelling": "F-I-N-D-I-N-G-S",
        "gloss": "发现/研究结果",
        "tip": ""
      }
    ]
  },
  {
    "id": 8,
    "en": "Technological innovation continues to reshape the global manufacturing industry.",
    "zhAnalysis": "技术创新持续重塑全球制造业。",
    "vocab": [
      {
        "word": "Technological",
        "spelling": "T-E-C-H-N-O-L-O-G-I-C-A-L",
        "gloss": "技术的",
        "tip": ""
      },
      {
        "word": "innovation",
        "spelling": "I-N-N-O-V-A-T-I-O-N",
        "gloss": "创新",
        "tip": ""
      }
    ]
  },
  {
    "id": 9,
    "en": "The scholarship committee evaluates applicants based on merit and need.",
    "zhAnalysis": "奖学金委员会根据成绩与需求评估申请人。",
    "vocab": [
      {
        "word": "scholarship",
        "spelling": "S-C-H-O-L-A-R-S-H-I-P",
        "gloss": "奖学金",
        "tip": ""
      },
      {
        "word": "committee",
        "spelling": "C-O-M-M-I-T-T-E-E",
        "gloss": "委员会",
        "tip": ""
      }
    ]
  },
  {
    "id": 10,
    "en": "Historical evidence suggests that trade flourished along these ancient routes.",
    "zhAnalysis": "历史证据表明，这些古代路线上曾贸易繁荣。",
    "vocab": [
      {
        "word": "Historical",
        "spelling": "H-I-S-T-O-R-I-C-A-L",
        "gloss": "历史的",
        "tip": ""
      },
      {
        "word": "evidence",
        "spelling": "E-V-I-D-E-N-C-E",
        "gloss": "证据",
        "tip": ""
      }
    ]
  },
  {
    "id": 11,
    "en": "Please ensure that laboratory safety protocols are strictly followed.",
    "zhAnalysis": "请务必严格遵守实验室安全规程。",
    "vocab": [
      {
        "word": "laboratory",
        "spelling": "L-A-B-O-R-A-T-O-R-Y",
        "gloss": "实验室",
        "tip": ""
      },
      {
        "word": "protocols",
        "spelling": "P-R-O-T-O-C-O-L-S",
        "gloss": "规程",
        "tip": ""
      }
    ]
  },
  {
    "id": 12,
    "en": "Climate scientists publish peer-reviewed studies in leading academic journals.",
    "zhAnalysis": "气候科学家在一流学术期刊上发表同行评议研究。",
    "vocab": [
      {
        "word": "Climate",
        "spelling": "C-L-I-M-A-T-E",
        "gloss": "气候",
        "tip": ""
      },
      {
        "word": "scientists",
        "spelling": "S-C-I-E-N-T-I-S-T-S",
        "gloss": "科学家",
        "tip": ""
      }
    ]
  },
  {
    "id": 13,
    "en": "The temporary exhibition explores themes of migration and identity.",
    "zhAnalysis": "临时展览探讨移民与身份认同等主题。",
    "vocab": [
      {
        "word": "temporary",
        "spelling": "T-E-M-P-O-R-A-R-Y",
        "gloss": "暂时的",
        "tip": ""
      },
      {
        "word": "exhibition",
        "spelling": "E-X-H-I-B-I-T-I-O-N",
        "gloss": "展览",
        "tip": ""
      }
    ]
  },
  {
    "id": 14,
    "en": "Students may borrow up to ten books from the main library.",
    "zhAnalysis": "学生可从主图书馆借阅最多十本书。",
    "vocab": [
      {
        "word": "Students",
        "spelling": "S-T-U-D-E-N-T-S",
        "gloss": "学生",
        "tip": ""
      },
      {
        "word": "library",
        "spelling": "L-I-B-R-A-R-Y",
        "gloss": "图书馆",
        "tip": ""
      }
    ]
  },
  {
    "id": 15,
    "en": "Economic forecasts predict moderate growth over the next fiscal year.",
    "zhAnalysis": "经济预测显示下一财年将温和增长。",
    "vocab": [
      {
        "word": "Economic",
        "spelling": "E-C-O-N-O-M-I-C",
        "gloss": "经济的",
        "tip": ""
      },
      {
        "word": "forecasts",
        "spelling": "F-O-R-E-C-A-S-T-S",
        "gloss": "预测",
        "tip": ""
      }
    ]
  },
  {
    "id": 16,
    "en": "Volunteers organized a community cleanup along the riverbank last weekend.",
    "zhAnalysis": "志愿者上周末在河岸组织了社区清洁活动。",
    "vocab": [
      {
        "word": "Volunteers",
        "spelling": "V-O-L-U-N-T-E-E-R-S",
        "gloss": "志愿者",
        "tip": ""
      },
      {
        "word": "organized",
        "spelling": "O-R-G-A-N-I-Z-E-D",
        "gloss": "组织了",
        "tip": ""
      }
    ]
  },
  {
    "id": 17,
    "en": "The architecture of the building reflects both classical and modern influences.",
    "zhAnalysis": "这座建筑的风格融合了古典与现代影响。",
    "vocab": [
      {
        "word": "architecture",
        "spelling": "A-R-C-H-I-T-E-C-T-U-R-E",
        "gloss": "建筑",
        "tip": ""
      },
      {
        "word": "building",
        "spelling": "B-U-I-L-D-I-N-G",
        "gloss": "建筑",
        "tip": ""
      }
    ]
  },
  {
    "id": 18,
    "en": "Medical professionals recommend regular screening for early disease detection.",
    "zhAnalysis": "医学专业人士建议定期筛查以尽早发现疾病。",
    "vocab": [
      {
        "word": "Medical",
        "spelling": "M-E-D-I-C-A-L",
        "gloss": "医学的",
        "tip": ""
      },
      {
        "word": "professionals",
        "spelling": "P-R-O-F-E-S-S-I-O-N-A-L-S",
        "gloss": "专业人士",
        "tip": ""
      }
    ]
  },
  {
    "id": 19,
    "en": "Digital literacy skills are essential for success in higher education.",
    "zhAnalysis": "数字素养技能对高等教育成功至关重要。",
    "vocab": [
      {
        "word": "Digital",
        "spelling": "D-I-G-I-T-A-L",
        "gloss": "数字的",
        "tip": ""
      },
      {
        "word": "literacy",
        "spelling": "L-I-T-E-R-A-C-Y",
        "gloss": "读写能力",
        "tip": ""
      }
    ]
  },
  {
    "id": 20,
    "en": "The experiment demonstrated a clear correlation between the two variables.",
    "zhAnalysis": "实验证明了这两个变量之间存在明显相关性。",
    "vocab": [
      {
        "word": "experiment",
        "spelling": "E-X-P-E-R-I-M-E-N-T",
        "gloss": "实验",
        "tip": ""
      },
      {
        "word": "demonstrated",
        "spelling": "D-E-M-O-N-S-T-R-A-T-E-D",
        "gloss": "证明",
        "tip": ""
      }
    ]
  },
  {
    "id": 21,
    "en": "Public libraries provide free access to information and community programs.",
    "zhAnalysis": "公共图书馆免费提供信息获取与社区项目。",
    "vocab": [
      {
        "word": "libraries",
        "spelling": "L-I-B-R-A-R-I-E-S",
        "gloss": "图书馆",
        "tip": ""
      },
      {
        "word": "provide",
        "spelling": "P-R-O-V-I-D-E",
        "gloss": "提供",
        "tip": ""
      }
    ]
  },
  {
    "id": 22,
    "en": "Agricultural practices have evolved significantly over the past century.",
    "zhAnalysis": "农业做法在过去一个世纪发生了显著演变。",
    "vocab": [
      {
        "word": "Agricultural",
        "spelling": "A-G-R-I-C-U-L-T-U-R-A-L",
        "gloss": "农业的",
        "tip": ""
      },
      {
        "word": "practices",
        "spelling": "P-R-A-C-T-I-C-E-S",
        "gloss": "做法",
        "tip": ""
      }
    ]
  },
  {
    "id": 23,
    "en": "She completed her dissertation on renewable energy policy last spring.",
    "zhAnalysis": "她去年春天完成了关于可再生能源政策的学位论文。",
    "vocab": [
      {
        "word": "completed",
        "spelling": "C-O-M-P-L-E-T-E-D",
        "gloss": "完成",
        "tip": ""
      },
      {
        "word": "dissertation",
        "spelling": "D-I-S-S-E-R-T-A-T-I-O-N",
        "gloss": "学位论文",
        "tip": ""
      }
    ]
  },
  {
    "id": 24,
    "en": "Transportation infrastructure investment stimulates regional economic development.",
    "zhAnalysis": "交通基础设施投资能刺激地区经济发展。",
    "vocab": [
      {
        "word": "Transportation",
        "spelling": "T-R-A-N-S-P-O-R-T-A-T-I-O-N",
        "gloss": "交通",
        "tip": ""
      },
      {
        "word": "infrastructure",
        "spelling": "I-N-F-R-A-S-T-R-U-C-T-U-R-E",
        "gloss": "基础设施",
        "tip": ""
      }
    ]
  },
  {
    "id": 25,
    "en": "The questionnaire was distributed to participants after the workshop.",
    "zhAnalysis": "问卷在工作坊结束后分发给参与者。",
    "vocab": [
      {
        "word": "questionnaire",
        "spelling": "Q-U-E-S-T-I-O-N-N-A-I-R-E",
        "gloss": "问卷",
        "tip": ""
      },
      {
        "word": "distributed",
        "spelling": "D-I-S-T-R-I-B-U-T-E-D",
        "gloss": "分发",
        "tip": ""
      }
    ]
  },
  {
    "id": 26,
    "en": "Biodiversity conservation efforts protect endangered species and habitats.",
    "zhAnalysis": "生物多样性保护工作保护濒危物种及其栖息地。",
    "vocab": [
      {
        "word": "Biodiversity",
        "spelling": "B-I-O-D-I-V-E-R-S-I-T-Y",
        "gloss": "生物多样性",
        "tip": ""
      },
      {
        "word": "conservation",
        "spelling": "C-O-N-S-E-R-V-A-T-I-O-N",
        "gloss": "保护",
        "tip": ""
      }
    ]
  },
  {
    "id": 27,
    "en": "He negotiated a partnership agreement with an overseas university.",
    "zhAnalysis": "他与一所海外大学谈成了合作协议。",
    "vocab": [
      {
        "word": "negotiated",
        "spelling": "N-E-G-O-T-I-A-T-E-D",
        "gloss": "谈判",
        "tip": ""
      },
      {
        "word": "partnership",
        "spelling": "P-A-R-T-N-E-R-S-H-I-P",
        "gloss": "合作关系",
        "tip": ""
      }
    ]
  },
  {
    "id": 28,
    "en": "Statistical analysis revealed unexpected patterns in consumer behavior.",
    "zhAnalysis": "统计分析揭示了消费者行为中的意外模式。",
    "vocab": [
      {
        "word": "Statistical",
        "spelling": "S-T-A-T-I-S-T-I-C-A-L",
        "gloss": "统计的",
        "tip": ""
      },
      {
        "word": "analysis",
        "spelling": "A-N-A-L-Y-S-I-S",
        "gloss": "分析",
        "tip": ""
      }
    ]
  },
  {
    "id": 29,
    "en": "The orientation session introduces new students to campus facilities.",
    "zhAnalysis": "迎新会向新生介绍校园设施。",
    "vocab": [
      {
        "word": "orientation",
        "spelling": "O-R-I-E-N-T-A-T-I-O-N",
        "gloss": "迎新/定向",
        "tip": ""
      },
      {
        "word": "session",
        "spelling": "S-E-S-S-I-O-N",
        "gloss": "场次/课程",
        "tip": ""
      }
    ]
  },
  {
    "id": 30,
    "en": "Philosophical debates about ethics remain relevant in modern medicine.",
    "zhAnalysis": "关于伦理的哲学辩论在现代医学中仍具现实意义。",
    "vocab": [
      {
        "word": "Philosophical",
        "spelling": "P-H-I-L-O-S-O-P-H-I-C-A-L",
        "gloss": "哲学的",
        "tip": ""
      },
      {
        "word": "debates",
        "spelling": "D-E-B-A-T-E-S",
        "gloss": "辩论",
        "tip": ""
      }
    ]
  },
  {
    "id": 31,
    "en": "Construction of the new sports complex will begin next semester.",
    "zhAnalysis": "新体育综合设施的建设将于下学期开始。",
    "vocab": [
      {
        "word": "Construction",
        "spelling": "C-O-N-S-T-R-U-C-T-I-O-N",
        "gloss": "建设",
        "tip": ""
      },
      {
        "word": "complex",
        "spelling": "C-O-M-P-L-E-X",
        "gloss": "复杂的",
        "tip": ""
      }
    ]
  },
  {
    "id": 32,
    "en": "Linguistic diversity enriches cultural life in multicultural societies.",
    "zhAnalysis": "语言多样性丰富了多元文化社会的文化生活。",
    "vocab": [
      {
        "word": "Linguistic",
        "spelling": "L-I-N-G-U-I-S-T-I-C",
        "gloss": "语言的",
        "tip": ""
      },
      {
        "word": "diversity",
        "spelling": "D-I-V-E-R-S-I-T-Y",
        "gloss": "多样性",
        "tip": ""
      }
    ]
  },
  {
    "id": 33,
    "en": "The advisory board meets quarterly to review strategic priorities.",
    "zhAnalysis": "顾问委员会每季度开会审查战略优先事项。",
    "vocab": [
      {
        "word": "advisory",
        "spelling": "A-D-V-I-S-O-R-Y",
        "gloss": "顾问的",
        "tip": ""
      },
      {
        "word": "quarterly",
        "spelling": "Q-U-A-R-T-E-R-L-Y",
        "gloss": "每季度",
        "tip": ""
      }
    ]
  },
  {
    "id": 34,
    "en": "Photographic evidence was presented during the archaeological symposium.",
    "zhAnalysis": "摄影证据在考古研讨会上被展示。",
    "vocab": [
      {
        "word": "Photographic",
        "spelling": "P-H-O-T-O-G-R-A-P-H-I-C",
        "gloss": "摄影的",
        "tip": ""
      },
      {
        "word": "evidence",
        "spelling": "E-V-I-D-E-N-C-E",
        "gloss": "证据",
        "tip": ""
      }
    ]
  },
  {
    "id": 35,
    "en": "Employees receive comprehensive training on data privacy regulations.",
    "zhAnalysis": "员工接受关于数据隐私法规的全面培训。",
    "vocab": [
      {
        "word": "Employees",
        "spelling": "E-M-P-L-O-Y-E-E-S",
        "gloss": "员工",
        "tip": ""
      },
      {
        "word": "receive",
        "spelling": "R-E-C-E-I-V-E",
        "gloss": "接收",
        "tip": ""
      }
    ]
  },
  {
    "id": 36,
    "en": "Ocean currents influence weather patterns across continental regions.",
    "zhAnalysis": "洋流影响各大洲地区的天气模式。",
    "vocab": [
      {
        "word": "currents",
        "spelling": "C-U-R-R-E-N-T-S",
        "gloss": "洋流",
        "tip": ""
      },
      {
        "word": "influence",
        "spelling": "I-N-F-L-U-E-N-C-E",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 37,
    "en": "The curriculum emphasizes critical thinking and collaborative problem-solving.",
    "zhAnalysis": "课程强调批判性思维与协作解决问题。",
    "vocab": [
      {
        "word": "curriculum",
        "spelling": "C-U-R-R-I-C-U-L-U-M",
        "gloss": "课程",
        "tip": ""
      },
      {
        "word": "emphasizes",
        "spelling": "E-M-P-H-A-S-I-Z-E-S",
        "gloss": "强调",
        "tip": ""
      }
    ]
  },
  {
    "id": 38,
    "en": "Fundraising campaigns support scholarships for underprivileged students.",
    "zhAnalysis": "筹款活动支持贫困学生的奖学金。",
    "vocab": [
      {
        "word": "Fundraising",
        "spelling": "F-U-N-D-R-A-I-S-I-N-G",
        "gloss": "筹款",
        "tip": ""
      },
      {
        "word": "campaigns",
        "spelling": "C-A-M-P-A-I-G-N-S",
        "gloss": "活动",
        "tip": ""
      }
    ]
  },
  {
    "id": 39,
    "en": "Geological surveys map underground resources before mining operations begin.",
    "zhAnalysis": "地质调查在采矿作业开始前测绘地下资源。",
    "vocab": [
      {
        "word": "Geological",
        "spelling": "G-E-O-L-O-G-I-C-A-L",
        "gloss": "地质的",
        "tip": ""
      },
      {
        "word": "surveys",
        "spelling": "S-U-R-V-E-Y-S",
        "gloss": "调查",
        "tip": ""
      }
    ]
  },
  {
    "id": 40,
    "en": "She attributed her success to perseverance and excellent mentorship.",
    "zhAnalysis": "她把自己的成功归因于毅力与优秀指导。",
    "vocab": [
      {
        "word": "attributed",
        "spelling": "A-T-T-R-I-B-U-T-E-D",
        "gloss": "归因于",
        "tip": ""
      },
      {
        "word": "success",
        "spelling": "S-U-C-C-E-S-S",
        "gloss": "成功",
        "tip": ""
      }
    ]
  },
  {
    "id": 41,
    "en": "Interactive exhibits engage visitors of all ages at the science centre.",
    "zhAnalysis": "互动展品吸引各年龄段参观者走进科学中心。",
    "vocab": [
      {
        "word": "Interactive",
        "spelling": "I-N-T-E-R-A-C-T-I-V-E",
        "gloss": "互动的",
        "tip": ""
      },
      {
        "word": "exhibits",
        "spelling": "E-X-H-I-B-I-T-S",
        "gloss": "展品",
        "tip": ""
      }
    ]
  }
];
  RA_BANK.forEach(function (item) {
    if (!item.sentence && item.en) item.sentence = item.en;
    if (!item.analysis && item.zhAnalysis) item.analysis = item.zhAnalysis;
  });
  global.RA_BANK = RA_BANK;
})(typeof window !== "undefined" ? window : globalThis);
