/**
 * chinaPTE · SST — Summarize Spoken Text
 * Total: 21 items
 */
(function (global) {
  "use strict";
  var SST_BANK = [
  {
    "id": 1,
    "en": "Climate scientists warn that rising temperatures will intensify extreme weather. Heatwaves, floods, and storms are becoming more frequent. Adaptation strategies include stronger infrastructure and early warning systems. Individuals can also reduce personal carbon footprints.",
    "passage": "Climate scientists warn that rising temperatures will intensify extreme weather. Heatwaves, floods, and storms are becoming more frequent. Adaptation strategies include stronger infrastructure and early warning systems. Individuals can also reduce personal carbon footprints.",
    "zhAnalysis": "总结：升温加剧极端天气→热浪洪水风暴→基建预警→个人减排。SST写50–70词。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 2,
    "en": "Online education expanded rapidly during the pandemic. It offers flexibility but requires self-discipline. Not all students have equal access to devices and broadband. Hybrid models may become the long-term norm.",
    "passage": "Online education expanded rapidly during the pandemic. It offers flexibility but requires self-discipline. Not all students have equal access to devices and broadband. Hybrid models may become the long-term norm.",
    "zhAnalysis": "总结：在线教育扩张→灵活但需自律→数字鸿沟→混合模式或成常态。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 3,
    "en": "Urban farming turns rooftops and vacant lots into food gardens. It shortens supply chains and builds community. Challenges include soil contamination and limited space. Cities are revising zoning rules to support growers.",
    "passage": "Urban farming turns rooftops and vacant lots into food gardens. It shortens supply chains and builds community. Challenges include soil contamination and limited space. Cities are revising zoning rules to support growers.",
    "zhAnalysis": "总结：都市农业→缩短供应链→土壤污染与空间限制→区划支持。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 4,
    "en": "Reading fiction improves empathy according to several studies. Readers practice imagining others' perspectives. Schools that include diverse literature report better social outcomes. Screen time may compete with reading habits.",
    "passage": "Reading fiction improves empathy according to several studies. Readers practice imagining others' perspectives. Schools that include diverse literature report better social outcomes. Screen time may compete with reading habits.",
    "zhAnalysis": "总结：读小说提升共情→换位思考→多元文学有助社交→屏幕竞争阅读。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 5,
    "en": "Electric vehicles reduce roadside emissions but depend on battery supply chains. Mining for lithium raises environmental concerns. Recycling programs are expanding. Grid capacity must grow with adoption rates.",
    "passage": "Electric vehicles reduce roadside emissions but depend on battery supply chains. Mining for lithium raises environmental concerns. Recycling programs are expanding. Grid capacity must grow with adoption rates.",
    "zhAnalysis": "总结：电动车减排依赖电池链→锂矿问题→回收扩展→电网扩容。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 6,
    "en": "Workplace remote policies vary widely after the pandemic. Some firms prefer full return; others stay hybrid. Productivity data is mixed. Employee retention often improves with flexibility.",
    "passage": "Workplace remote policies vary widely after the pandemic. Some firms prefer full return; others stay hybrid. Productivity data is mixed. Employee retention often improves with flexibility.",
    "zhAnalysis": "总结：远程政策分化→生产力数据不一→灵活有助留人。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 7,
    "en": "Ocean plastic pollution harms marine life and enters food chains. Cleanup campaigns help but prevention is more effective. Bans on single-use plastics are spreading. Consumer habits remain decisive.",
    "passage": "Ocean plastic pollution harms marine life and enters food chains. Cleanup campaigns help but prevention is more effective. Bans on single-use plastics are spreading. Consumer habits remain decisive.",
    "zhAnalysis": "总结：海洋塑料伤害食物链→预防优于清理→禁塑令→消费习惯关键。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 8,
    "en": "Space telescopes have revealed thousands of exoplanets. Some may lie in habitable zones. Detecting atmospheres is the next frontier. Public interest in astronomy continues to grow.",
    "passage": "Space telescopes have revealed thousands of exoplanets. Some may lie in habitable zones. Detecting atmospheres is the next frontier. Public interest in astronomy continues to grow.",
    "zhAnalysis": "总结：发现系外行星→宜居带→探测大气→公众兴趣上升。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 9,
    "en": "Fast fashion produces cheap clothes with high environmental costs. Textile waste fills landfills. Consumers can choose durable brands and repair items. Regulation of labeling is under discussion.",
    "passage": "Fast fashion produces cheap clothes with high environmental costs. Textile waste fills landfills. Consumers can choose durable brands and repair items. Regulation of labeling is under discussion.",
    "zhAnalysis": "总结：快时尚环境成本高→废料填埋→选耐用修旧→标签监管。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 10,
    "en": "Mental health services face long waiting lists in many countries. Teletherapy expands access but is not suitable for all cases. Schools are adding counselors. Stigma still prevents some from seeking help.",
    "passage": "Mental health services face long waiting lists in many countries. Teletherapy expands access but is not suitable for all cases. Schools are adding counselors. Stigma still prevents some from seeking help.",
    "zhAnalysis": "总结：心理健康排队长→远程治疗有限→学校增顾问→污名阻碍。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 11,
    "en": "Ancient libraries preserved knowledge across generations. The Library of Alexandria is the most famous example. Digitization now protects texts from physical decay. Open access policies widen readership.",
    "passage": "Ancient libraries preserved knowledge across generations. The Library of Alexandria is the most famous example. Digitization now protects texts from physical decay. Open access policies widen readership.",
    "zhAnalysis": "总结：古代图书馆传承知识→数字化防损→开放获取。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 12,
    "en": "Cycling infrastructure encourages healthier commuting. Protected bike lanes reduce accidents. Cities that invest see higher cycling rates. Weather and hills remain barriers in some places.",
    "passage": "Cycling infrastructure encourages healthier commuting. Protected bike lanes reduce accidents. Cities that invest see higher cycling rates. Weather and hills remain barriers in some places.",
    "zhAnalysis": "总结：骑行基建促健康通勤→隔离车道降事故→天气地形障碍。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 13,
    "en": "Antibiotic resistance is a growing global threat. Overuse in medicine and agriculture accelerates the problem. New drugs are expensive to develop. Stewardship programs promote careful prescribing.",
    "passage": "Antibiotic resistance is a growing global threat. Overuse in medicine and agriculture accelerates the problem. New drugs are expensive to develop. Stewardship programs promote careful prescribing.",
    "zhAnalysis": "总结：抗生素耐药威胁→滥用加速→新药贵→合理用药。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 14,
    "en": "Museum free-entry days attract more diverse visitors. Accessibility includes language support and physical access. Interactive exhibits engage younger audiences. Funding cuts threaten education programs.",
    "passage": "Museum free-entry days attract more diverse visitors. Accessibility includes language support and physical access. Interactive exhibits engage younger audiences. Funding cuts threaten education programs.",
    "zhAnalysis": "总结：免费日吸引多元访客→无障碍→互动展→经费威胁教育。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 15,
    "en": "Noise pollution in cities affects sleep and concentration. Traffic and construction are main sources. Quiet zones and better insulation help. Regulations set maximum decibel levels.",
    "passage": "Noise pollution in cities affects sleep and concentration. Traffic and construction are main sources. Quiet zones and better insulation help. Regulations set maximum decibel levels.",
    "zhAnalysis": "总结：噪声影响睡眠专注→交通施工→静音区隔音→分贝法规。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 16,
    "en": "Volunteer tourism can help communities if projects are well designed. Poorly planned trips may burden locals. Skills matching matters more than short photo opportunities. Ethical operators emphasize sustainability.",
    "passage": "Volunteer tourism can help communities if projects are well designed. Poorly planned trips may burden locals. Skills matching matters more than short photo opportunities. Ethical operators emphasize sustainability.",
    "zhAnalysis": "总结：志愿旅行设计好可助社区→技能匹配重于拍照→可持续。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 17,
    "en": "3D printing is used in medicine for custom implants. Prototyping is faster and cheaper. Material limitations still restrict some applications. Training for technicians is expanding.",
    "passage": "3D printing is used in medicine for custom implants. Prototyping is faster and cheaper. Material limitations still restrict some applications. Training for technicians is expanding.",
    "zhAnalysis": "总结：3D打印定制植入物→原型更快→材料限制→技师培训。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 18,
    "en": "Food waste occurs at farms, shops, and homes. Better storage and date-label clarity reduce waste. Surplus redistribution feeds people in need. Composting returns nutrients to soil.",
    "passage": "Food waste occurs at farms, shops, and homes. Better storage and date-label clarity reduce waste. Surplus redistribution feeds people in need. Composting returns nutrients to soil.",
    "zhAnalysis": "总结：食物浪费多环节→储存日期标注→余粮再分配→堆肥。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 19,
    "en": "Podcasts have become a major source of informal learning. Listeners multitask during commutes. Quality varies widely. Creators monetize through ads and subscriptions.",
    "passage": "Podcasts have become a major source of informal learning. Listeners multitask during commutes. Quality varies widely. Creators monetize through ads and subscriptions.",
    "zhAnalysis": "总结：播客非正式学习→通勤并行→质量参差→广告订阅变现。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 20,
    "en": "Wetlands filter water and buffer floods. They also store carbon and host wildlife. Drainage for agriculture has destroyed many wetlands. Restoration projects are underway in several countries.",
    "passage": "Wetlands filter water and buffer floods. They also store carbon and host wildlife. Drainage for agriculture has destroyed many wetlands. Restoration projects are underway in several countries.",
    "zhAnalysis": "总结：湿地滤水缓冲洪水→储碳野生动物→农业排水破坏→多国恢复。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  },
  {
    "id": 21,
    "en": "Peer review is central to scientific publishing. Experts evaluate methods and claims before publication. The system is imperfect but improves reliability. Open peer review is an emerging experiment.",
    "passage": "Peer review is central to scientific publishing. Experts evaluate methods and claims before publication. The system is imperfect but improves reliability. Open peer review is an emerging experiment.",
    "zhAnalysis": "总结：同行评议是科学出版核心→专家评方法→不完美但提高可靠性。",
    "vocab": [
      {
        "word": "strategy",
        "spelling": "S-T-R-A-T-E-G-Y",
        "gloss": "策略",
        "tip": ""
      },
      {
        "word": "impact",
        "spelling": "I-M-P-A-C-T",
        "gloss": "影响",
        "tip": ""
      }
    ]
  }
];
  SST_BANK.forEach(function (item) {
    if (!item.sentence && item.en) item.sentence = item.en;
    if (!item.analysis && item.zhAnalysis) item.analysis = item.zhAnalysis;
  });
  global.SST_BANK = SST_BANK;
})(typeof window !== "undefined" ? window : globalThis);
