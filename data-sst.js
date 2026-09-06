/**
 * chinaPTE · SST — Summarize Spoken Text
 * Total: 45 items
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
  },
  {
    "id": 22,
    "en": "Universities are investing in mental health services as student demand rises. Counselling wait times remain a challenge. Peer support programmes and digital tools offer additional options. Early intervention is linked to better academic outcomes.",
    "passage": "Universities are investing in mental health services as student demand rises. Counselling wait times remain a challenge. Peer support programmes and digital tools offer additional options. Early intervention is linked to better academic outcomes.",
    "zhAnalysis": "总结：心理健康需求升→咨询等待→同伴与数字工具→早期干预利学业。",
    "vocab": [
      {
        "word": "counselling",
        "spelling": "C-O-U-N-S-E-L-L-I-N-G",
        "gloss": "咨询",
        "tip": ""
      },
      {
        "word": "intervention",
        "spelling": "I-N-T-E-R-V-E-N-T-I-O-N",
        "gloss": "干预",
        "tip": ""
      }
    ]
  },
  {
    "id": 23,
    "en": "Cities are redesigning streets to prioritise walking and cycling. Fewer cars can mean cleaner air and safer neighbourhoods. Retailers sometimes fear losing customers. Evidence from pilot schemes often shows increased foot traffic.",
    "passage": "Cities are redesigning streets to prioritise walking and cycling. Fewer cars can mean cleaner air and safer neighbourhoods. Retailers sometimes fear losing customers. Evidence from pilot schemes often shows increased foot traffic.",
    "zhAnalysis": "总结：街道重设优先步行骑行→空气更安全→商户担忧→试点常增客流。",
    "vocab": [
      {
        "word": "prioritise",
        "spelling": "P-R-I-O-R-I-T-I-S-E",
        "gloss": "优先",
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
    "id": 24,
    "en": "Open-access publishing makes research freely available online. Authors may pay article fees. Critics worry about quality control. Supporters argue it accelerates scientific progress and equity of access.",
    "passage": "Open-access publishing makes research freely available online. Authors may pay article fees. Critics worry about quality control. Supporters argue it accelerates scientific progress and equity of access.",
    "zhAnalysis": "总结：开放获取→作者付费→质量担忧→加速科学与获取公平。",
    "vocab": [
      {
        "word": "publishing",
        "spelling": "P-U-B-L-I-S-H-I-N-G",
        "gloss": "出版",
        "tip": ""
      },
      {
        "word": "accelerates",
        "spelling": "A-C-C-E-L-E-R-A-T-E-S",
        "gloss": "加速",
        "tip": ""
      },
      {
        "word": "equity",
        "spelling": "E-Q-U-I-T-Y",
        "gloss": "公平",
        "tip": ""
      }
    ]
  },
  {
    "id": 25,
    "en": "Droughts threaten agriculture and urban water supplies. Governments promote water-saving irrigation and restrictions. Desalination is costly but used in some coastal regions. Long-term planning must account for climate trends.",
    "passage": "Droughts threaten agriculture and urban water supplies. Governments promote water-saving irrigation and restrictions. Desalination is costly but used in some coastal regions. Long-term planning must account for climate trends.",
    "zhAnalysis": "总结：干旱威胁农业城市供水→节水与限制→淡化成本高→长期规划。",
    "vocab": [
      {
        "word": "Droughts",
        "spelling": "D-R-O-U-G-H-T-S",
        "gloss": "干旱",
        "tip": ""
      },
      {
        "word": "irrigation",
        "spelling": "I-R-R-I-G-A-T-I-O-N",
        "gloss": "灌溉",
        "tip": ""
      },
      {
        "word": "Desalination",
        "spelling": "D-E-S-A-L-I-N-A-T-I-O-N",
        "gloss": "淡化",
        "tip": ""
      }
    ]
  },
  {
    "id": 26,
    "en": "Internships help students gain workplace experience before graduation. Unpaid placements raise fairness concerns. Structured feedback improves learning value. Employers use internships to identify future hires.",
    "passage": "Internships help students gain workplace experience before graduation. Unpaid placements raise fairness concerns. Structured feedback improves learning value. Employers use internships to identify future hires.",
    "zhAnalysis": "总结：实习获经验→无薪公平问题→结构化反馈→雇主识别人才。",
    "vocab": [
      {
        "word": "Internships",
        "spelling": "I-N-T-E-R-N-S-H-I-P-S",
        "gloss": "实习",
        "tip": ""
      },
      {
        "word": "placements",
        "spelling": "P-L-A-C-E-M-E-N-T-S",
        "gloss": "安置",
        "tip": ""
      },
      {
        "word": "employers",
        "spelling": "E-M-P-L-O-Y-E-R-S",
        "gloss": "雇主",
        "tip": ""
      }
    ]
  },
  {
    "id": 27,
    "en": "Noise from traffic and construction affects urban sleep quality. Chronic sleep loss harms concentration and health. Zoning and quieter technologies can reduce exposure. Public awareness campaigns also play a role.",
    "passage": "Noise from traffic and construction affects urban sleep quality. Chronic sleep loss harms concentration and health. Zoning and quieter technologies can reduce exposure. Public awareness campaigns also play a role.",
    "zhAnalysis": "总结：交通建筑噪声→损睡眠与健康→分区与静音技术→公众意识。",
    "vocab": [
      {
        "word": "Noise",
        "spelling": "N-O-I-S-E",
        "gloss": "噪声",
        "tip": ""
      },
      {
        "word": "Chronic",
        "spelling": "C-H-R-O-N-I-C",
        "gloss": "慢性的",
        "tip": ""
      },
      {
        "word": "exposure",
        "spelling": "E-X-P-O-S-U-R-E",
        "gloss": "暴露",
        "tip": ""
      }
    ]
  },
  {
    "id": 28,
    "en": "Micro-credentials offer short courses that certify specific skills. They appeal to working adults needing flexible study. Recognition by employers varies. Universities debate how they fit degree pathways.",
    "passage": "Micro-credentials offer short courses that certify specific skills. They appeal to working adults needing flexible study. Recognition by employers varies. Universities debate how they fit degree pathways.",
    "zhAnalysis": "总结：微证书短课认证技能→吸引在职者→雇主认可不一→学位路径争议。",
    "vocab": [
      {
        "word": "credentials",
        "spelling": "C-R-E-D-E-N-T-I-A-L-S",
        "gloss": "证书",
        "tip": ""
      },
      {
        "word": "flexible",
        "spelling": "F-L-E-X-I-B-L-E",
        "gloss": "灵活的",
        "tip": ""
      },
      {
        "word": "pathways",
        "spelling": "P-A-T-H-W-A-Y-S",
        "gloss": "路径",
        "tip": ""
      }
    ]
  },
  {
    "id": 29,
    "en": "Coral reefs support fisheries and tourism but face bleaching from warming seas. Local pollution worsens stress. Marine protected areas help recovery. Global emission cuts remain essential.",
    "passage": "Coral reefs support fisheries and tourism but face bleaching from warming seas. Local pollution worsens stress. Marine protected areas help recovery. Global emission cuts remain essential.",
    "zhAnalysis": "总结：珊瑚礁支撑渔业旅游→升温白化→保护地有助→减排必要。",
    "vocab": [
      {
        "word": "reefs",
        "spelling": "R-E-E-F-S",
        "gloss": "礁",
        "tip": ""
      },
      {
        "word": "bleaching",
        "spelling": "B-L-E-A-C-H-I-N-G",
        "gloss": "白化",
        "tip": ""
      },
      {
        "word": "emission",
        "spelling": "E-M-I-S-S-I-O-N",
        "gloss": "排放",
        "tip": ""
      }
    ]
  },
  {
    "id": 30,
    "en": "Library makerspaces provide tools for design and prototyping. Students learn collaboration and practical problem-solving. Staff training and safety rules are required. Usage data guides equipment purchases.",
    "passage": "Library makerspaces provide tools for design and prototyping. Students learn collaboration and practical problem-solving. Staff training and safety rules are required. Usage data guides equipment purchases.",
    "zhAnalysis": "总结：创客空间提供原型工具→协作解题→安全培训→数据指导采购。",
    "vocab": [
      {
        "word": "makerspaces",
        "spelling": "M-A-K-E-R-S-P-A-C-E-S",
        "gloss": "创客空间",
        "tip": ""
      },
      {
        "word": "collaboration",
        "spelling": "C-O-L-L-A-B-O-R-A-T-I-O-N",
        "gloss": "协作",
        "tip": ""
      },
      {
        "word": "equipment",
        "spelling": "E-Q-U-I-P-M-E-N-T",
        "gloss": "设备",
        "tip": ""
      }
    ]
  },
  {
    "id": 31,
    "en": "Food waste occurs across supply chains from farms to households. Better storage and date-label clarity reduce losses. Redistribution to charities helps. Education about leftovers also matters.",
    "passage": "Food waste occurs across supply chains from farms to households. Better storage and date-label clarity reduce losses. Redistribution to charities helps. Education about leftovers also matters.",
    "zhAnalysis": "总结：食物浪费贯穿供应链→储存与标签→捐赠→剩菜教育。",
    "vocab": [
      {
        "word": "waste",
        "spelling": "W-A-S-T-E",
        "gloss": "浪费",
        "tip": ""
      },
      {
        "word": "Redistribution",
        "spelling": "R-E-D-I-S-T-R-I-B-U-T-I-O-N",
        "gloss": "再分配",
        "tip": ""
      },
      {
        "word": "leftovers",
        "spelling": "L-E-F-T-O-V-E-R-S",
        "gloss": "剩菜",
        "tip": ""
      }
    ]
  },
  {
    "id": 32,
    "en": "Remote sensing satellites monitor deforestation in near real time. Data support enforcement of environmental laws. Cloud cover and resolution limits remain challenges. Combining satellite and ground data improves accuracy.",
    "passage": "Remote sensing satellites monitor deforestation in near real time. Data support enforcement of environmental laws. Cloud cover and resolution limits remain challenges. Combining satellite and ground data improves accuracy.",
    "zhAnalysis": "总结：遥感监测砍伐→支持执法→云层分辨率限制→天地结合提准。",
    "vocab": [
      {
        "word": "sensing",
        "spelling": "S-E-N-S-I-N-G",
        "gloss": "遥感",
        "tip": ""
      },
      {
        "word": "deforestation",
        "spelling": "D-E-F-O-R-E-S-T-A-T-I-O-N",
        "gloss": "砍伐",
        "tip": ""
      },
      {
        "word": "accuracy",
        "spelling": "A-C-C-U-R-A-C-Y",
        "gloss": "准确度",
        "tip": ""
      }
    ]
  },
  {
    "id": 33,
    "en": "University incubators support student start-ups with mentoring and space. Access to seed funding is competitive. Failure rates are high but learning is valuable. Links to industry partners strengthen outcomes.",
    "passage": "University incubators support student start-ups with mentoring and space. Access to seed funding is competitive. Failure rates are high but learning is valuable. Links to industry partners strengthen outcomes.",
    "zhAnalysis": "总结：孵化器支持学生创业→种子资金竞争→失败率高但有学习→产业链接。",
    "vocab": [
      {
        "word": "incubators",
        "spelling": "I-N-C-U-B-A-T-O-R-S",
        "gloss": "孵化器",
        "tip": ""
      },
      {
        "word": "mentoring",
        "spelling": "M-E-N-T-O-R-I-N-G",
        "gloss": "导师指导",
        "tip": ""
      },
      {
        "word": "funding",
        "spelling": "F-U-N-D-I-N-G",
        "gloss": "经费",
        "tip": ""
      }
    ]
  },
  {
    "id": 34,
    "en": "Air quality alerts warn residents when pollution levels are high. Vulnerable groups are advised to limit outdoor activity. Long-term solutions require cleaner transport and industry standards.",
    "passage": "Air quality alerts warn residents when pollution levels are high. Vulnerable groups are advised to limit outdoor activity. Long-term solutions require cleaner transport and industry standards.",
    "zhAnalysis": "总结：空气质量预警→脆弱人群少出门→长期需清洁交通与产业标准。",
    "vocab": [
      {
        "word": "alerts",
        "spelling": "A-L-E-R-T-S",
        "gloss": "预警",
        "tip": ""
      },
      {
        "word": "Vulnerable",
        "spelling": "V-U-L-N-E-R-A-B-L-E",
        "gloss": "脆弱的",
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
    "id": 35,
    "en": "Peer assessment can deepen learning when criteria are clear. Students may worry about fairness. Training and anonymous marking reduce bias. Tutors still provide moderation.",
    "passage": "Peer assessment can deepen learning when criteria are clear. Students may worry about fairness. Training and anonymous marking reduce bias. Tutors still provide moderation.",
    "zhAnalysis": "总结：同伴互评加深学习→公平担忧→培训匿名减偏→导师调控。",
    "vocab": [
      {
        "word": "assessment",
        "spelling": "A-S-S-E-S-S-M-E-N-T",
        "gloss": "评估",
        "tip": ""
      },
      {
        "word": "criteria",
        "spelling": "C-R-I-T-E-R-I-A",
        "gloss": "标准",
        "tip": ""
      },
      {
        "word": "moderation",
        "spelling": "M-O-D-E-R-A-T-I-O-N",
        "gloss": "调控",
        "tip": ""
      }
    ]
  },
  {
    "id": 36,
    "en": "Green roofs reduce stormwater runoff and building heat. Installation costs remain a barrier. Cities offer incentives to encourage adoption. Maintenance planning is essential for long-term benefits.",
    "passage": "Green roofs reduce stormwater runoff and building heat. Installation costs remain a barrier. Cities offer incentives to encourage adoption. Maintenance planning is essential for long-term benefits.",
    "zhAnalysis": "总结：绿屋顶减径流与热→成本障碍→城市激励→维护关键。",
    "vocab": [
      {
        "word": "stormwater",
        "spelling": "S-T-O-R-M-W-A-T-E-R",
        "gloss": "雨水",
        "tip": ""
      },
      {
        "word": "incentives",
        "spelling": "I-N-C-E-N-T-I-V-E-S",
        "gloss": "激励",
        "tip": ""
      },
      {
        "word": "Maintenance",
        "spelling": "M-A-I-N-T-E-N-A-N-C-E",
        "gloss": "维护",
        "tip": ""
      }
    ]
  },
  {
    "id": 37,
    "en": "Language exchange programmes pair learners of different languages. Regular conversation builds fluency and cultural awareness. Online tools expand access beyond campus. Commitment from both partners is needed.",
    "passage": "Language exchange programmes pair learners of different languages. Regular conversation builds fluency and cultural awareness. Online tools expand access beyond campus. Commitment from both partners is needed.",
    "zhAnalysis": "总结：语言交换配对→流利与文化意识→线上扩大获取→双方承诺。",
    "vocab": [
      {
        "word": "exchange",
        "spelling": "E-X-C-H-A-N-G-E",
        "gloss": "交换",
        "tip": ""
      },
      {
        "word": "fluency",
        "spelling": "F-L-U-E-N-C-Y",
        "gloss": "流利度",
        "tip": ""
      },
      {
        "word": "Commitment",
        "spelling": "C-O-M-M-I-T-M-E-N-T",
        "gloss": "承诺",
        "tip": ""
      }
    ]
  },
  {
    "id": 38,
    "en": "Battery storage helps renewable energy supply electricity when the sun or wind is weak. Costs have fallen rapidly. Grid integration and recycling of batteries need further investment.",
    "passage": "Battery storage helps renewable energy supply electricity when the sun or wind is weak. Costs have fallen rapidly. Grid integration and recycling of batteries need further investment.",
    "zhAnalysis": "总结：储能支撑可再生→成本下降→并网与电池回收需投资。",
    "vocab": [
      {
        "word": "storage",
        "spelling": "S-T-O-R-A-G-E",
        "gloss": "储能",
        "tip": ""
      },
      {
        "word": "renewable",
        "spelling": "R-E-N-E-W-A-B-L-E",
        "gloss": "可再生的",
        "tip": ""
      },
      {
        "word": "recycling",
        "spelling": "R-E-C-Y-C-L-I-N-G",
        "gloss": "回收",
        "tip": ""
      }
    ]
  },
  {
    "id": 39,
    "en": "Campus food cooperatives source produce from local farms. Students gain business experience. Prices may be higher than supermarket chains. Education about seasonal food is a side benefit.",
    "passage": "Campus food cooperatives source produce from local farms. Students gain business experience. Prices may be higher than supermarket chains. Education about seasonal food is a side benefit.",
    "zhAnalysis": "总结：校园食品合作社本地采购→学生获经验→价格或更高→季节食品教育。",
    "vocab": [
      {
        "word": "cooperatives",
        "spelling": "C-O-O-P-E-R-A-T-I-V-E-S",
        "gloss": "合作社",
        "tip": ""
      },
      {
        "word": "produce",
        "spelling": "P-R-O-D-U-C-E",
        "gloss": "农产品",
        "tip": ""
      },
      {
        "word": "seasonal",
        "spelling": "S-E-A-S-O-N-A-L",
        "gloss": "季节性的",
        "tip": ""
      }
    ]
  },
  {
    "id": 40,
    "en": "Wildfire seasons are lengthening in several regions. Smoke affects air quality far from flames. Preparedness includes early warnings and land management. Climate mitigation remains a long-term necessity.",
    "passage": "Wildfire seasons are lengthening in several regions. Smoke affects air quality far from flames. Preparedness includes early warnings and land management. Climate mitigation remains a long-term necessity.",
    "zhAnalysis": "总结：野火季延长→烟雾影响远处空气→预警与土地管理→减缓气候必要。",
    "vocab": [
      {
        "word": "Wildfire",
        "spelling": "W-I-L-D-F-I-R-E",
        "gloss": "野火",
        "tip": ""
      },
      {
        "word": "Preparedness",
        "spelling": "P-R-E-P-A-R-E-D-N-E-S-S",
        "gloss": "准备",
        "tip": ""
      },
      {
        "word": "mitigation",
        "spelling": "M-I-T-I-G-A-T-I-O-N",
        "gloss": "减缓",
        "tip": ""
      }
    ]
  },
  {
    "id": 41,
    "en": "Transcriptomics helps scientists study which genes are active in tissues. Applications include disease research and agriculture. Data analysis requires substantial computing resources. Ethical rules govern human genetic data.",
    "passage": "Transcriptomics helps scientists study which genes are active in tissues. Applications include disease research and agriculture. Data analysis requires substantial computing resources. Ethical rules govern human genetic data.",
    "zhAnalysis": "总结：转录组学研基因活性→疾病农业应用→需算力→伦理规则。",
    "vocab": [
      {
        "word": "genes",
        "spelling": "G-E-N-E-S",
        "gloss": "基因",
        "tip": ""
      },
      {
        "word": "substantial",
        "spelling": "S-U-B-S-T-A-N-T-I-A-L",
        "gloss": "大量的",
        "tip": ""
      },
      {
        "word": "Ethical",
        "spelling": "E-T-H-I-C-A-L",
        "gloss": "伦理的",
        "tip": ""
      }
    ]
  },
  {
    "id": 42,
    "en": "Citizen science projects invite the public to collect environmental data. Smartphone apps lower participation barriers. Data quality control is important. Engagement also builds scientific literacy.",
    "passage": "Citizen science projects invite the public to collect environmental data. Smartphone apps lower participation barriers. Data quality control is important. Engagement also builds scientific literacy.",
    "zhAnalysis": "总结：公民科学公众采集数据→手机降门槛→质量控制→提升科学素养。",
    "vocab": [
      {
        "word": "Citizen",
        "spelling": "C-I-T-I-Z-E-N",
        "gloss": "公民",
        "tip": ""
      },
      {
        "word": "participation",
        "spelling": "P-A-R-T-I-C-I-P-A-T-I-O-N",
        "gloss": "参与",
        "tip": ""
      },
      {
        "word": "literacy",
        "spelling": "L-I-T-E-R-A-C-Y",
        "gloss": "素养",
        "tip": ""
      }
    ]
  },
  {
    "id": 43,
    "en": "Researchers compared hybrid and fully online courses across three universities. Hybrid learners reported higher satisfaction and slightly better grades. Access to campus facilities appeared to matter. The study recommends flexible blending rather than fully remote delivery for first-year students.",
    "zhAnalysis": "总结：混合与全线上课对比→混合满意度与成绩略高→校园设施重要→建议一年级灵活混合而非全远程。",
    "vocab": [
      {
        "word": "hybrid",
        "spelling": "H-Y-B-R-I-D",
        "gloss": "混合的",
        "tip": ""
      },
      {
        "word": "satisfaction",
        "spelling": "S-A-T-I-S-F-A-C-T-I-O-N",
        "gloss": "满意度",
        "tip": ""
      },
      {
        "word": "facilities",
        "spelling": "F-A-C-I-L-I-T-I-E-S",
        "gloss": "设施",
        "tip": ""
      },
      {
        "word": "blending",
        "spelling": "B-L-E-N-D-I-N-G",
        "gloss": "混合",
        "tip": ""
      }
    ],
    "passage": "Researchers compared hybrid and fully online courses across three universities. Hybrid learners reported higher satisfaction and slightly better grades. Access to campus facilities appeared to matter. The study recommends flexible blending rather than fully remote delivery for first-year students."
  },
  {
    "id": 44,
    "en": "A coastal city piloted permeable pavements to reduce flood risk. Early data showed faster drainage after storms. Maintenance costs were higher than expected. Officials plan a wider rollout with better contractor training.",
    "zhAnalysis": "总结：透水铺装试点减洪涝→暴雨后排水更快→维护成本偏高→扩大推广并加强承包商培训。",
    "vocab": [
      {
        "word": "permeable",
        "spelling": "P-E-R-M-E-A-B-L-E",
        "gloss": "透水的",
        "tip": ""
      },
      {
        "word": "drainage",
        "spelling": "D-R-A-I-N-A-G-E",
        "gloss": "排水",
        "tip": ""
      },
      {
        "word": "Maintenance",
        "spelling": "M-A-I-N-T-E-N-A-N-C-E",
        "gloss": "维护",
        "tip": ""
      },
      {
        "word": "rollout",
        "spelling": "R-O-L-L-O-U-T",
        "gloss": "推广",
        "tip": ""
      }
    ],
    "passage": "A coastal city piloted permeable pavements to reduce flood risk. Early data showed faster drainage after storms. Maintenance costs were higher than expected. Officials plan a wider rollout with better contractor training."
  },
  {
    "id": 45,
    "en": "Language support workshops helped international students improve academic writing. Attendance correlated with higher essay scores. Evening sessions attracted more participants than daytime ones. The university will expand the programme next year.",
    "zhAnalysis": "总结：语言工作坊助国际生写作→出勤与论文分数相关→晚间更受欢迎→明年扩大项目。",
    "vocab": [
      {
        "word": "workshops",
        "spelling": "W-O-R-K-S-H-O-P-S",
        "gloss": "工作坊",
        "tip": ""
      },
      {
        "word": "correlated",
        "spelling": "C-O-R-R-E-L-A-T-E-D",
        "gloss": "相关",
        "tip": ""
      },
      {
        "word": "participants",
        "spelling": "P-A-R-T-I-C-I-P-A-N-T-S",
        "gloss": "参与者",
        "tip": ""
      },
      {
        "word": "expand",
        "spelling": "E-X-P-A-N-D",
        "gloss": "扩大",
        "tip": ""
      }
    ],
    "passage": "Language support workshops helped international students improve academic writing. Attendance correlated with higher essay scores. Evening sessions attracted more participants than daytime ones. The university will expand the programme next year."
  }
];
  SST_BANK.forEach(function (item) {
    if (!item.sentence && item.en) item.sentence = item.en;
    if (!item.analysis && item.zhAnalysis) item.analysis = item.zhAnalysis;
  });

  global.SST_BANK = SST_BANK;
})(typeof window !== "undefined" ? window : globalThis);
