/**
 * chinaPTE · RA — Read Aloud
 * Total: 90 items
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
  },
  {
    "id": 42,
    "en": "Consistent practice and targeted feedback are essential for improving spoken fluency in academic English.",
    "zhAnalysis": "持续练习与有针对性的反馈对提高学术英语口语流利度至关重要。",
    "vocab": [
      {
        "word": "Consistent",
        "spelling": "C-O-N-S-I-S-T-E-N-T",
        "gloss": "持续的",
        "tip": ""
      },
      {
        "word": "targeted",
        "spelling": "T-A-R-G-E-T-E-D",
        "gloss": "有针对性的",
        "tip": ""
      },
      {
        "word": "fluency",
        "spelling": "F-L-U-E-N-C-Y",
        "gloss": "流利度",
        "tip": ""
      }
    ]
  },
  {
    "id": 43,
    "en": "Universities increasingly encourage interdisciplinary collaboration to address complex global challenges.",
    "zhAnalysis": "大学日益鼓励跨学科合作以应对复杂全球挑战。",
    "vocab": [
      {
        "word": "increasingly",
        "spelling": "I-N-C-R-E-A-S-I-N-G-L-Y",
        "gloss": "日益",
        "tip": ""
      },
      {
        "word": "interdisciplinary",
        "spelling": "I-N-T-E-R-D-I-S-C-I-P-L-I-N-A-R-Y",
        "gloss": "跨学科的",
        "tip": ""
      },
      {
        "word": "collaboration",
        "spelling": "C-O-L-L-A-B-O-R-A-T-I-O-N",
        "gloss": "合作",
        "tip": ""
      }
    ]
  },
  {
    "id": 44,
    "en": "Access to peer-reviewed journals enables students to engage with current research debates.",
    "zhAnalysis": "获取同行评审期刊使学生能参与当前研究辩论。",
    "vocab": [
      {
        "word": "Access",
        "spelling": "A-C-C-E-S-S",
        "gloss": "获取",
        "tip": ""
      },
      {
        "word": "peer-reviewed",
        "spelling": "P-E-E-R-R-E-V-I-E-W-E-D",
        "gloss": "同行评审的",
        "tip": ""
      },
      {
        "word": "engage",
        "spelling": "E-N-G-A-G-E",
        "gloss": "参与",
        "tip": ""
      }
    ]
  },
  {
    "id": 45,
    "en": "Effective time management helps students balance coursework, revision and extracurricular activities.",
    "zhAnalysis": "有效时间管理帮助学生平衡课业、复习与课外活动。",
    "vocab": [
      {
        "word": "Effective",
        "spelling": "E-F-F-E-C-T-I-V-E",
        "gloss": "有效的",
        "tip": ""
      },
      {
        "word": "balance",
        "spelling": "B-A-L-A-N-C-E",
        "gloss": "平衡",
        "tip": ""
      },
      {
        "word": "extracurricular",
        "spelling": "E-X-T-R-A-C-U-R-R-I-C-U-L-A-R",
        "gloss": "课外的",
        "tip": ""
      }
    ]
  },
  {
    "id": 46,
    "en": "Urban planners must consider sustainability when designing transport networks and housing.",
    "zhAnalysis": "城市规划者在设计交通网络与住房时必须考虑可持续性。",
    "vocab": [
      {
        "word": "planners",
        "spelling": "P-L-A-N-N-E-R-S",
        "gloss": "规划者",
        "tip": ""
      },
      {
        "word": "sustainability",
        "spelling": "S-U-S-T-A-I-N-A-B-I-L-I-T-Y",
        "gloss": "可持续性",
        "tip": ""
      },
      {
        "word": "transport",
        "spelling": "T-R-A-N-S-P-O-R-T",
        "gloss": "交通",
        "tip": ""
      }
    ]
  },
  {
    "id": 47,
    "en": "Critical reading involves questioning assumptions and evaluating the strength of evidence.",
    "zhAnalysis": "批判性阅读包括质疑假设并评估证据力度。",
    "vocab": [
      {
        "word": "Critical",
        "spelling": "C-R-I-T-I-C-A-L",
        "gloss": "批判的",
        "tip": ""
      },
      {
        "word": "assumptions",
        "spelling": "A-S-S-U-M-P-T-I-O-N-S",
        "gloss": "假设",
        "tip": ""
      },
      {
        "word": "evaluating",
        "spelling": "E-V-A-L-U-A-T-I-N-G",
        "gloss": "评估",
        "tip": ""
      }
    ]
  },
  {
    "id": 48,
    "en": "Laboratory safety protocols protect researchers and ensure reliable experimental results.",
    "zhAnalysis": "实验室安全规程保护研究者并确保可靠实验结果。",
    "vocab": [
      {
        "word": "protocols",
        "spelling": "P-R-O-T-O-C-O-L-S",
        "gloss": "规程",
        "tip": ""
      },
      {
        "word": "ensure",
        "spelling": "E-N-S-U-R-E",
        "gloss": "确保",
        "tip": ""
      },
      {
        "word": "reliable",
        "spelling": "R-E-L-I-A-B-L-E",
        "gloss": "可靠的",
        "tip": ""
      }
    ]
  },
  {
    "id": 49,
    "en": "Scholarship schemes aim to widen participation among students from diverse backgrounds.",
    "zhAnalysis": "奖学金计划旨在扩大不同背景学生的参与。",
    "vocab": [
      {
        "word": "Scholarship",
        "spelling": "S-C-H-O-L-A-R-S-H-I-P",
        "gloss": "奖学金",
        "tip": ""
      },
      {
        "word": "widen",
        "spelling": "W-I-D-E-N",
        "gloss": "扩大",
        "tip": ""
      },
      {
        "word": "diverse",
        "spelling": "D-I-V-E-R-S-E",
        "gloss": "多样的",
        "tip": ""
      }
    ]
  },
  {
    "id": 50,
    "en": "Climate models predict rising sea levels that threaten coastal infrastructure and communities.",
    "zhAnalysis": "气候模型预测海平面上升威胁沿海基础设施与社区。",
    "vocab": [
      {
        "word": "predict",
        "spelling": "P-R-E-D-I-C-T",
        "gloss": "预测",
        "tip": ""
      },
      {
        "word": "threaten",
        "spelling": "T-H-R-E-A-T-E-N",
        "gloss": "威胁",
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
    "id": 51,
    "en": "Academic integrity requires honest citation practices and original work in all assessments.",
    "zhAnalysis": "学术诚信要求所有考核中诚实引用与原创作品。",
    "vocab": [
      {
        "word": "integrity",
        "spelling": "I-N-T-E-G-R-I-T-Y",
        "gloss": "诚信",
        "tip": ""
      },
      {
        "word": "citation",
        "spelling": "C-I-T-A-T-I-O-N",
        "gloss": "引用",
        "tip": ""
      },
      {
        "word": "assessments",
        "spelling": "A-S-S-E-S-S-M-E-N-T-S",
        "gloss": "考核",
        "tip": ""
      }
    ]
  },
  {
    "id": 52,
    "en": "Digital platforms have transformed how lectures are delivered and how students collaborate.",
    "zhAnalysis": "数字平台转变了讲座交付与学生协作方式。",
    "vocab": [
      {
        "word": "platforms",
        "spelling": "P-L-A-T-F-O-R-M-S",
        "gloss": "平台",
        "tip": ""
      },
      {
        "word": "transformed",
        "spelling": "T-R-A-N-S-F-O-R-M-E-D",
        "gloss": "转变",
        "tip": ""
      },
      {
        "word": "collaborate",
        "spelling": "C-O-L-L-A-B-O-R-A-T-E",
        "gloss": "合作",
        "tip": ""
      }
    ]
  },
  {
    "id": 53,
    "en": "Demographic change is reshaping labour markets and demand for lifelong learning.",
    "zhAnalysis": "人口结构变化正在重塑劳动力市场与终身学习需求。",
    "vocab": [
      {
        "word": "Demographic",
        "spelling": "D-E-M-O-G-R-A-P-H-I-C",
        "gloss": "人口结构的",
        "tip": ""
      },
      {
        "word": "labour",
        "spelling": "L-A-B-O-U-R",
        "gloss": "劳动",
        "tip": ""
      },
      {
        "word": "lifelong",
        "spelling": "L-I-F-E-L-O-N-G",
        "gloss": "终身的",
        "tip": ""
      }
    ]
  },
  {
    "id": 54,
    "en": "Clear structure and precise vocabulary improve the clarity of academic writing.",
    "zhAnalysis": "清晰结构与精确词汇提高学术写作清晰度。",
    "vocab": [
      {
        "word": "structure",
        "spelling": "S-T-R-U-C-T-U-R-E",
        "gloss": "结构",
        "tip": ""
      },
      {
        "word": "precise",
        "spelling": "P-R-E-C-I-S-E",
        "gloss": "精确的",
        "tip": ""
      },
      {
        "word": "clarity",
        "spelling": "C-L-A-R-I-T-Y",
        "gloss": "清晰",
        "tip": ""
      }
    ]
  },
  {
    "id": 55,
    "en": "Renewable energy investment supports economic growth while reducing carbon emissions.",
    "zhAnalysis": "可再生能源投资在减少碳排放的同时支持经济增长。",
    "vocab": [
      {
        "word": "Renewable",
        "spelling": "R-E-N-E-W-A-B-L-E",
        "gloss": "可再生的",
        "tip": ""
      },
      {
        "word": "investment",
        "spelling": "I-N-V-E-S-T-M-E-N-T",
        "gloss": "投资",
        "tip": ""
      },
      {
        "word": "emissions",
        "spelling": "E-M-I-S-S-I-O-N-S",
        "gloss": "排放",
        "tip": ""
      }
    ]
  },
  {
    "id": 56,
    "en": "Tutorials provide opportunities for students to discuss complex ideas in small groups.",
    "zhAnalysis": "辅导课为学生在小组中讨论复杂观点提供机会。",
    "vocab": [
      {
        "word": "Tutorials",
        "spelling": "T-U-T-O-R-I-A-L-S",
        "gloss": "辅导课",
        "tip": ""
      },
      {
        "word": "opportunities",
        "spelling": "O-P-P-O-R-T-U-N-I-T-I-E-S",
        "gloss": "机会",
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
    "id": 57,
    "en": "Empirical studies show that sleep quality significantly affects cognitive performance.",
    "zhAnalysis": "实证研究表明睡眠质量显著影响认知表现。",
    "vocab": [
      {
        "word": "Empirical",
        "spelling": "E-M-P-I-R-I-C-A-L",
        "gloss": "实证的",
        "tip": ""
      },
      {
        "word": "significantly",
        "spelling": "S-I-G-N-I-F-I-C-A-N-T-L-Y",
        "gloss": "显著地",
        "tip": ""
      },
      {
        "word": "cognitive",
        "spelling": "C-O-G-N-I-T-I-V-E",
        "gloss": "认知的",
        "tip": ""
      }
    ]
  },
  {
    "id": 58,
    "en": "Library workshops teach students how to search databases and evaluate sources critically.",
    "zhAnalysis": "图书馆工作坊教学生如何检索数据库并批判性评估来源。",
    "vocab": [
      {
        "word": "workshops",
        "spelling": "W-O-R-K-S-H-O-P-S",
        "gloss": "工作坊",
        "tip": ""
      },
      {
        "word": "databases",
        "spelling": "D-A-T-A-B-A-S-E-S",
        "gloss": "数据库",
        "tip": ""
      },
      {
        "word": "evaluate",
        "spelling": "E-V-A-L-U-A-T-E",
        "gloss": "评估",
        "tip": ""
      }
    ]
  },
  {
    "id": 59,
    "en": "Inflation reduces purchasing power and can increase the real cost of higher education.",
    "zhAnalysis": "通胀降低购买力并可能提高高等教育实际成本。",
    "vocab": [
      {
        "word": "Inflation",
        "spelling": "I-N-F-L-A-T-I-O-N",
        "gloss": "通货膨胀",
        "tip": ""
      },
      {
        "word": "purchasing",
        "spelling": "P-U-R-C-H-A-S-I-N-G",
        "gloss": "购买",
        "tip": ""
      },
      {
        "word": "education",
        "spelling": "E-D-U-C-A-T-I-O-N",
        "gloss": "教育",
        "tip": ""
      }
    ]
  },
  {
    "id": 60,
    "en": "Orientation programmes help international students adapt to campus life and academic expectations.",
    "zhAnalysis": "迎新项目帮助国际学生适应校园生活与学术期望。",
    "vocab": [
      {
        "word": "Orientation",
        "spelling": "O-R-I-E-N-T-A-T-I-O-N",
        "gloss": "迎新",
        "tip": ""
      },
      {
        "word": "adapt",
        "spelling": "A-D-A-P-T",
        "gloss": "适应",
        "tip": ""
      },
      {
        "word": "expectations",
        "spelling": "E-X-P-E-C-T-A-T-I-O-N-S",
        "gloss": "期望",
        "tip": ""
      }
    ]
  },
  {
    "id": 61,
    "en": "Peer feedback encourages reflection and often leads to more polished final drafts.",
    "zhAnalysis": "同伴反馈鼓励反思，常带来更精炼的终稿。",
    "vocab": [
      {
        "word": "Peer",
        "spelling": "P-E-E-R",
        "gloss": "同伴",
        "tip": ""
      },
      {
        "word": "reflection",
        "spelling": "R-E-F-L-E-C-T-I-O-N",
        "gloss": "反思",
        "tip": ""
      },
      {
        "word": "polished",
        "spelling": "P-O-L-I-S-H-E-D",
        "gloss": "精炼的",
        "tip": ""
      }
    ]
  },
  {
    "id": 62,
    "en": "Biodiversity conservation requires coordinated action across governments and local communities.",
    "zhAnalysis": "生物多样性保护需要政府与地方社区的协调行动。",
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
      },
      {
        "word": "coordinated",
        "spelling": "C-O-O-R-D-I-N-A-T-E-D",
        "gloss": "协调的",
        "tip": ""
      }
    ]
  },
  {
    "id": 63,
    "en": "Assessment rubrics make marking criteria transparent and support fair grading decisions.",
    "zhAnalysis": "评分量表使评分标准透明并支持公平评分。",
    "vocab": [
      {
        "word": "rubrics",
        "spelling": "R-U-B-R-I-C-S",
        "gloss": "评分量表",
        "tip": ""
      },
      {
        "word": "transparent",
        "spelling": "T-R-A-N-S-P-A-R-E-N-T",
        "gloss": "透明的",
        "tip": ""
      },
      {
        "word": "grading",
        "spelling": "G-R-A-D-I-N-G",
        "gloss": "评分",
        "tip": ""
      }
    ]
  },
  {
    "id": 64,
    "en": "Public transport improvements can reduce congestion and improve air quality in cities.",
    "zhAnalysis": "公共交通改善可减少拥堵并提高城市空气质量。",
    "vocab": [
      {
        "word": "transport",
        "spelling": "T-R-A-N-S-P-O-R-T",
        "gloss": "交通",
        "tip": ""
      },
      {
        "word": "congestion",
        "spelling": "C-O-N-G-E-S-T-I-O-N",
        "gloss": "拥堵",
        "tip": ""
      },
      {
        "word": "quality",
        "spelling": "Q-U-A-L-I-T-Y",
        "gloss": "质量",
        "tip": ""
      }
    ]
  },
  {
    "id": 65,
    "en": "Research methodology must be described clearly so that studies can be replicated.",
    "zhAnalysis": "研究方法必须清晰描述以便研究可复现。",
    "vocab": [
      {
        "word": "methodology",
        "spelling": "M-E-T-H-O-D-O-L-O-G-Y",
        "gloss": "方法论",
        "tip": ""
      },
      {
        "word": "replicated",
        "spelling": "R-E-P-L-I-C-A-T-E-D",
        "gloss": "复现",
        "tip": ""
      }
    ]
  },
  {
    "id": 66,
    "en": "Student wellbeing services provide counselling and support during periods of high stress.",
    "zhAnalysis": "学生福祉服务在高压时期提供咨询与支持。",
    "vocab": [
      {
        "word": "wellbeing",
        "spelling": "W-E-L-L-B-E-I-N-G",
        "gloss": "福祉",
        "tip": ""
      },
      {
        "word": "counselling",
        "spelling": "C-O-U-N-S-E-L-L-I-N-G",
        "gloss": "咨询",
        "tip": ""
      },
      {
        "word": "stress",
        "spelling": "S-T-R-E-S-S",
        "gloss": "压力",
        "tip": ""
      }
    ]
  },
  {
    "id": 67,
    "en": "Technological innovation continues to reshape manufacturing and service sector employment.",
    "zhAnalysis": "技术创新继续重塑制造业与服务业就业。",
    "vocab": [
      {
        "word": "innovation",
        "spelling": "I-N-N-O-V-A-T-I-O-N",
        "gloss": "创新",
        "tip": ""
      },
      {
        "word": "manufacturing",
        "spelling": "M-A-N-U-F-A-C-T-U-R-I-N-G",
        "gloss": "制造业",
        "tip": ""
      },
      {
        "word": "employment",
        "spelling": "E-M-P-L-O-Y-M-E-N-T",
        "gloss": "就业",
        "tip": ""
      }
    ]
  },
  {
    "id": 68,
    "en": "A well-organised essay presents a clear thesis supported by relevant evidence.",
    "zhAnalysis": "结构良好的作文提出由相关证据支撑的清晰论点。",
    "vocab": [
      {
        "word": "organised",
        "spelling": "O-R-G-A-N-I-S-E-D",
        "gloss": "有组织的",
        "tip": ""
      },
      {
        "word": "thesis",
        "spelling": "T-H-E-S-I-S",
        "gloss": "论点",
        "tip": ""
      },
      {
        "word": "relevant",
        "spelling": "R-E-L-E-V-A-N-T",
        "gloss": "相关的",
        "tip": ""
      }
    ]
  },
  {
    "id": 69,
    "en": "Enrolment procedures require careful attention to deadlines and supporting documentation.",
    "zhAnalysis": "注册程序需要仔细关注截止日期与证明文件。",
    "vocab": [
      {
        "word": "Enrolment",
        "spelling": "E-N-R-O-L-M-E-N-T",
        "gloss": "注册",
        "tip": ""
      },
      {
        "word": "deadlines",
        "spelling": "D-E-A-D-L-I-N-E-S",
        "gloss": "截止日期",
        "tip": ""
      },
      {
        "word": "documentation",
        "spelling": "D-O-C-U-M-E-N-T-A-T-I-O-N",
        "gloss": "文件",
        "tip": ""
      }
    ]
  },
  {
    "id": 70,
    "en": "Habitat restoration projects aim to reverse biodiversity loss in damaged ecosystems.",
    "zhAnalysis": "栖息地修复项目旨在扭转受损生态系统中的生物多样性丧失。",
    "vocab": [
      {
        "word": "Habitat",
        "spelling": "H-A-B-I-T-A-T",
        "gloss": "栖息地",
        "tip": ""
      },
      {
        "word": "restoration",
        "spelling": "R-E-S-T-O-R-A-T-I-O-N",
        "gloss": "修复",
        "tip": ""
      },
      {
        "word": "ecosystems",
        "spelling": "E-C-O-S-Y-S-T-E-M-S",
        "gloss": "生态系统",
        "tip": ""
      }
    ]
  },
  {
    "id": 71,
    "en": "Listening carefully to lectures improves note-taking accuracy and subsequent revision.",
    "zhAnalysis": "仔细听讲座提高记笔记准确度与随后复习。",
    "vocab": [
      {
        "word": "Listening",
        "spelling": "L-I-S-T-E-N-I-N-G",
        "gloss": "听力",
        "tip": ""
      },
      {
        "word": "accuracy",
        "spelling": "A-C-C-U-R-A-C-Y",
        "gloss": "准确度",
        "tip": ""
      },
      {
        "word": "subsequent",
        "spelling": "S-U-B-S-E-Q-U-E-N-T",
        "gloss": "随后的",
        "tip": ""
      }
    ]
  },
  {
    "id": 72,
    "en": "Graduate employment rates vary across disciplines and economic conditions.",
    "zhAnalysis": "毕业生就业率因学科与经济状况而异。",
    "vocab": [
      {
        "word": "Graduate",
        "spelling": "G-R-A-D-U-A-T-E",
        "gloss": "毕业生",
        "tip": ""
      },
      {
        "word": "employment",
        "spelling": "E-M-P-L-O-Y-M-E-N-T",
        "gloss": "就业",
        "tip": ""
      },
      {
        "word": "disciplines",
        "spelling": "D-I-S-C-I-P-L-I-N-E-S",
        "gloss": "学科",
        "tip": ""
      }
    ]
  },
  {
    "id": 73,
    "en": "Transparent governance builds public trust in educational institutions and research.",
    "zhAnalysis": "透明治理建立公众对教育机构与研究的信任。",
    "vocab": [
      {
        "word": "Transparent",
        "spelling": "T-R-A-N-S-P-A-R-E-N-T",
        "gloss": "透明的",
        "tip": ""
      },
      {
        "word": "governance",
        "spelling": "G-O-V-E-R-N-A-N-C-E",
        "gloss": "治理",
        "tip": ""
      },
      {
        "word": "institutions",
        "spelling": "I-N-S-T-I-T-U-T-I-O-N-S",
        "gloss": "机构",
        "tip": ""
      }
    ]
  },
  {
    "id": 74,
    "en": "Paraphrasing source material correctly is a key skill for avoiding plagiarism.",
    "zhAnalysis": "正确改述来源材料是避免抄袭的关键技能。",
    "vocab": [
      {
        "word": "Paraphrasing",
        "spelling": "P-A-R-A-P-H-R-A-S-I-N-G",
        "gloss": "改述",
        "tip": ""
      },
      {
        "word": "skill",
        "spelling": "S-K-I-L-L",
        "gloss": "技能",
        "tip": ""
      },
      {
        "word": "plagiarism",
        "spelling": "P-L-A-G-I-A-R-I-S-M",
        "gloss": "抄袭",
        "tip": ""
      }
    ]
  },
  {
    "id": 75,
    "en": "Urban green spaces contribute to mental health and encourage outdoor physical activity.",
    "zhAnalysis": "城市绿地有益心理健康并鼓励户外运动。",
    "vocab": [
      {
        "word": "contribute",
        "spelling": "C-O-N-T-R-I-B-U-T-E",
        "gloss": "促成",
        "tip": ""
      },
      {
        "word": "mental",
        "spelling": "M-E-N-T-A-L",
        "gloss": "心理的",
        "tip": ""
      },
      {
        "word": "activity",
        "spelling": "A-C-T-I-V-I-T-Y",
        "gloss": "活动",
        "tip": ""
      }
    ]
  },
  {
    "id": 76,
    "en": "Language proficiency tests measure speaking, writing, reading and listening skills.",
    "zhAnalysis": "语言熟练度测试测量说、写、读、听技能。",
    "vocab": [
      {
        "word": "proficiency",
        "spelling": "P-R-O-F-I-C-I-E-N-C-Y",
        "gloss": "熟练度",
        "tip": ""
      },
      {
        "word": "measure",
        "spelling": "M-E-A-S-U-R-E",
        "gloss": "测量",
        "tip": ""
      }
    ]
  },
  {
    "id": 77,
    "en": "Funding cuts have forced some departments to reduce elective module offerings.",
    "zhAnalysis": "经费削减迫使一些系减少选修模块供给。",
    "vocab": [
      {
        "word": "Funding",
        "spelling": "F-U-N-D-I-N-G",
        "gloss": "经费",
        "tip": ""
      },
      {
        "word": "departments",
        "spelling": "D-E-P-A-R-T-M-E-N-T-S",
        "gloss": "系",
        "tip": ""
      },
      {
        "word": "elective",
        "spelling": "E-L-E-C-T-I-V-E",
        "gloss": "选修的",
        "tip": ""
      }
    ]
  },
  {
    "id": 78,
    "en": "Statistical significance does not always indicate practical importance in research findings.",
    "zhAnalysis": "统计显著性并不总表示研究发现具有实际重要性。",
    "vocab": [
      {
        "word": "Statistical",
        "spelling": "S-T-A-T-I-S-T-I-C-A-L",
        "gloss": "统计的",
        "tip": ""
      },
      {
        "word": "significance",
        "spelling": "S-I-G-N-I-F-I-C-A-N-C-E",
        "gloss": "显著性",
        "tip": ""
      },
      {
        "word": "practical",
        "spelling": "P-R-A-C-T-I-C-A-L",
        "gloss": "实际的",
        "tip": ""
      }
    ]
  },
  {
    "id": 79,
    "en": "Campus sustainability initiatives include recycling programmes and energy-efficient buildings.",
    "zhAnalysis": "校园可持续倡议包括回收项目与节能建筑。",
    "vocab": [
      {
        "word": "sustainability",
        "spelling": "S-U-S-T-A-I-N-A-B-I-L-I-T-Y",
        "gloss": "可持续性",
        "tip": ""
      },
      {
        "word": "recycling",
        "spelling": "R-E-C-Y-C-L-I-N-G",
        "gloss": "回收",
        "tip": ""
      },
      {
        "word": "energy-efficient",
        "spelling": "E-N-E-R-G-Y-E-F-F-I-C-I-E-N-T",
        "gloss": "节能的",
        "tip": ""
      }
    ]
  },
  {
    "id": 80,
    "en": "Mentoring relationships support academic progress and professional development for students.",
    "zhAnalysis": "导师关系支持学生的学业进步与专业发展。",
    "vocab": [
      {
        "word": "Mentoring",
        "spelling": "M-E-N-T-O-R-I-N-G",
        "gloss": "导师指导",
        "tip": ""
      },
      {
        "word": "progress",
        "spelling": "P-R-O-G-R-E-S-S",
        "gloss": "进步",
        "tip": ""
      },
      {
        "word": "professional",
        "spelling": "P-R-O-F-E-S-S-I-O-N-A-L",
        "gloss": "专业的",
        "tip": ""
      }
    ]
  },
  {
    "id": 81,
    "en": "Global supply chains face disruption from extreme weather and geopolitical tensions.",
    "zhAnalysis": "全球供应链面临极端天气与地缘政治紧张带来的中断。",
    "vocab": [
      {
        "word": "supply",
        "spelling": "S-U-P-P-L-Y",
        "gloss": "供给",
        "tip": ""
      },
      {
        "word": "disruption",
        "spelling": "D-I-S-R-U-P-T-I-O-N",
        "gloss": "中断",
        "tip": ""
      },
      {
        "word": "geopolitical",
        "spelling": "G-E-O-P-O-L-I-T-I-C-A-L",
        "gloss": "地缘政治的",
        "tip": ""
      }
    ]
  },
  {
    "id": 82,
    "en": "Concise summaries capture main ideas without reproducing unnecessary detail from sources.",
    "zhAnalysis": "简洁摘要抓住主旨而不复制来源中不必要细节。",
    "vocab": [
      {
        "word": "Concise",
        "spelling": "C-O-N-C-I-S-E",
        "gloss": "简洁的",
        "tip": ""
      },
      {
        "word": "summaries",
        "spelling": "S-U-M-M-A-R-I-E-S",
        "gloss": "摘要",
        "tip": ""
      },
      {
        "word": "unnecessary",
        "spelling": "U-N-N-E-C-E-S-S-A-R-Y",
        "gloss": "不必要的",
        "tip": ""
      }
    ]
  },
  {
    "id": 83,
    "en": "Renewable energy investment has accelerated across developed and emerging economies.",
    "zhAnalysis": "可再生能源投资在发达与新兴经济体中加速。",
    "vocab": [
      {
        "word": "Renewable",
        "spelling": "R-E-N-E-W-A-B-L-E",
        "gloss": "可再生的",
        "tip": ""
      },
      {
        "word": "accelerated",
        "spelling": "A-C-C-E-L-E-R-A-T-E-D",
        "gloss": "加速",
        "tip": ""
      },
      {
        "word": "emerging",
        "spelling": "E-M-E-R-G-I-N-G",
        "gloss": "新兴的",
        "tip": ""
      }
    ]
  },
  {
    "id": 84,
    "en": "Academic integrity policies outline procedures for investigating suspected misconduct.",
    "zhAnalysis": "学术诚信政策概述调查涉嫌不当行为的程序。",
    "vocab": [
      {
        "word": "integrity",
        "spelling": "I-N-T-E-G-R-I-T-Y",
        "gloss": "诚信",
        "tip": ""
      },
      {
        "word": "outline",
        "spelling": "O-U-T-L-I-N-E",
        "gloss": "概述",
        "tip": ""
      },
      {
        "word": "misconduct",
        "spelling": "M-I-S-C-O-N-D-U-C-T",
        "gloss": "不当行为",
        "tip": ""
      }
    ]
  },
  {
    "id": 85,
    "en": "Urban heat islands intensify during prolonged summer heatwaves in dense cities.",
    "zhAnalysis": "密集城市中，城市热岛在漫长夏季热浪期间加剧。",
    "vocab": [
      {
        "word": "intensify",
        "spelling": "I-N-T-E-N-S-I-F-Y",
        "gloss": "加剧",
        "tip": ""
      },
      {
        "word": "prolonged",
        "spelling": "P-R-O-L-O-N-G-E-D",
        "gloss": "漫长的",
        "tip": ""
      },
      {
        "word": "heatwaves",
        "spelling": "H-E-A-T-W-A-V-E-S",
        "gloss": "热浪",
        "tip": ""
      }
    ]
  },
  {
    "id": 86,
    "en": "Longitudinal studies track the same participants over extended periods of time.",
    "zhAnalysis": "纵向研究在较长时期内追踪同一批参与者。",
    "vocab": [
      {
        "word": "Longitudinal",
        "spelling": "L-O-N-G-I-T-U-D-I-N-A-L",
        "gloss": "纵向的",
        "tip": ""
      },
      {
        "word": "track",
        "spelling": "T-R-A-C-K",
        "gloss": "追踪",
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
    "id": 87,
    "en": "Digital archives preserve rare manuscripts for future scholarly access worldwide.",
    "zhAnalysis": "数字档案为全球未来学术获取保存稀有手稿。",
    "vocab": [
      {
        "word": "archives",
        "spelling": "A-R-C-H-I-V-E-S",
        "gloss": "档案",
        "tip": ""
      },
      {
        "word": "preserve",
        "spelling": "P-R-E-S-E-R-V-E",
        "gloss": "保存",
        "tip": ""
      },
      {
        "word": "manuscripts",
        "spelling": "M-A-N-U-S-C-R-I-P-T-S",
        "gloss": "手稿",
        "tip": ""
      },
      {
        "word": "scholarly",
        "spelling": "S-C-H-O-L-A-R-L-Y",
        "gloss": "学术的",
        "tip": ""
      }
    ]
  },
  {
    "id": 88,
    "en": "Effective paraphrasing demonstrates understanding rather than mere substitution of synonyms.",
    "zhAnalysis": "有效改述体现理解，而非仅仅替换同义词。",
    "vocab": [
      {
        "word": "paraphrasing",
        "spelling": "P-A-R-A-P-H-R-A-S-I-N-G",
        "gloss": "改述",
        "tip": ""
      },
      {
        "word": "demonstrates",
        "spelling": "D-E-M-O-N-S-T-R-A-T-E-S",
        "gloss": "体现",
        "tip": ""
      },
      {
        "word": "substitution",
        "spelling": "S-U-B-S-T-I-T-U-T-I-O-N",
        "gloss": "替换",
        "tip": ""
      },
      {
        "word": "synonyms",
        "spelling": "S-Y-N-O-N-Y-M-S",
        "gloss": "同义词",
        "tip": ""
      }
    ]
  },
  {
    "id": 89,
    "en": "Public health campaigns aim to reduce tobacco use among adolescents and young adults.",
    "zhAnalysis": "公共卫生运动旨在减少青少年与年轻人的烟草使用。",
    "vocab": [
      {
        "word": "campaigns",
        "spelling": "C-A-M-P-A-I-G-N-S",
        "gloss": "运动",
        "tip": ""
      },
      {
        "word": "reduce",
        "spelling": "R-E-D-U-C-E",
        "gloss": "减少",
        "tip": ""
      },
      {
        "word": "adolescents",
        "spelling": "A-D-O-L-E-S-C-E-N-T-S",
        "gloss": "青少年",
        "tip": ""
      }
    ]
  },
  {
    "id": 90,
    "en": "Interdisciplinary research bridges gaps between traditionally separate academic fields.",
    "zhAnalysis": "跨学科研究弥合传统上分离的学术领域之间的差距。",
    "vocab": [
      {
        "word": "Interdisciplinary",
        "spelling": "I-N-T-E-R-D-I-S-C-I-P-L-I-N-A-R-Y",
        "gloss": "跨学科的",
        "tip": ""
      },
      {
        "word": "bridges",
        "spelling": "B-R-I-D-G-E-S",
        "gloss": "弥合",
        "tip": ""
      },
      {
        "word": "traditionally",
        "spelling": "T-R-A-D-I-T-I-O-N-A-L-L-Y",
        "gloss": "传统上",
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
