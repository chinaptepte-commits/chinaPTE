/**
 * chinaPTE · RA — Read Aloud
 * Total: 90 items · exam-length passages (~45–65 words)
 * Audio: prefer speechSynthesis (audioPreferTts); no RA MP3s in manifest
 */
(function (global) {
  "use strict";
  var RA_BANK = [
  {
    "id": 1,
    "en": "Academic success depends on consistent study habits and effective time management across an entire semester. Students who plan weekly goals, review lecture notes soon after class, and seek help early tend to retain more information. Tutors often remind learners that short, focused study sessions usually outperform last-minute cramming before major examinations.",
    "zhAnalysis": "学术成功取决于贯穿整学期的持续学习习惯与有效时间管理。那些制定每周目标、课后及时复习笔记并尽早求助的学生，往往能记住更多内容。导师常提醒学习者：短而专注的学习时段，通常优于考前临时抱佛脚。",
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
      },
      {
        "word": "examinations",
        "spelling": "E-X-A-M-I-N-A-T-I-O-N-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 2,
    "en": "The university campus stretches across several hills overlooking the bay, with libraries, laboratories, and student residences linked by shaded walkways. Visitors notice how the landscape shapes daily routines, from morning lectures to evening seminars. Careful planning of pathways and open spaces encourages walking between faculties and reduces unnecessary vehicle traffic on busy weekdays.",
    "zhAnalysis": "大学校园横跨几座俯瞰海湾的山丘，图书馆、实验室与学生宿舍由林荫步道相连。访客会注意到地貌如何塑造日常节奏，从早课到晚间研讨。对步道与开放空间的精心规划鼓励院系间步行，并减少工作日不必要的车流。",
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
      },
      {
        "word": "laboratories",
        "spelling": "L-A-B-O-R-A-T-O-R-I-E-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 3,
    "en": "Researchers analyzed soil samples collected from contaminated industrial sites to measure heavy metal concentrations and microbial activity. Their findings will inform remediation strategies that restore land for community parks and future housing. Local councils rely on such evidence when deciding which areas require urgent cleanup and long-term environmental monitoring programmes.",
    "zhAnalysis": "研究人员分析了从受污染工业场地采集的土壤样本，以测量重金属浓度与微生物活性。研究结果将为修复策略提供依据，使土地可恢复为社区公园或未来住宅。地方议会依赖此类证据，决定哪些区域需要紧急清理与长期环境监测。",
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
      },
      {
        "word": "concentrations",
        "spelling": "C-O-N-C-E-N-T-R-A-T-I-O-N-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 4,
    "en": "International students often struggle with academic writing conventions at first, especially citation rules, paragraph structure, and formal tone. Workshops that model sample essays and provide staged feedback help newcomers adapt more quickly. Many universities now pair language support with subject tutoring so that students improve both content knowledge and written expression.",
    "zhAnalysis": "国际学生起初常常难以适应学术写作规范，尤其是引用规则、段落结构与正式语气。示范范文并提供分阶段反馈的工作坊，有助于新生更快适应。许多大学现将语言支持与学科辅导结合，使学生同时提升内容知识与书面表达。",
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
      },
      {
        "word": "universities",
        "spelling": "U-N-I-V-E-R-S-I-T-I-E-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 5,
    "en": "The museum's collection includes rare manuscripts from the medieval period, carefully preserved under controlled temperature and humidity. Curators digitize fragile pages so researchers worldwide can study the texts without handling originals. Temporary exhibitions highlight how these documents illuminate trade, religion, and daily life in earlier centuries.",
    "zhAnalysis": "该博物馆藏品包括中世纪罕见手稿，在受控温湿度下妥善保存。策展人将脆弱页面数字化，使全球研究者无需接触原件即可研读。临时展览突出这些文献如何揭示早期世纪的贸易、宗教与日常生活。",
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
      },
      {
        "word": "exhibitions",
        "spelling": "E-X-H-I-B-I-T-I-O-N-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 6,
    "en": "Sustainable development requires balancing economic growth with environmental protection and social equity over long time horizons. Policymakers debate how to price carbon, protect biodiversity, and still create jobs in transitioning industries. Communities that invest in renewable energy and green skills training often find new opportunities while reducing pollution.",
    "zhAnalysis": "可持续发展需要在长期视野中平衡经济增长、环境保护与社会公平。政策制定者讨论如何为碳定价、保护生物多样性，同时仍在转型产业中创造就业。投资可再生能源与绿色技能培训的社区，往往在减少污染的同时发现新机遇。",
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
      },
      {
        "word": "environmental",
        "spelling": "E-N-V-I-R-O-N-M-E-N-T-A-L",
        "gloss": "环境的",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 7,
    "en": "She presented her findings at an international conference in Singapore, summarizing methods, limitations, and implications for future research. Audience questions focused on data quality and whether results would generalize across different cultural contexts. Presenting early work publicly also helped her refine arguments before submitting the manuscript to a peer-reviewed journal.",
    "zhAnalysis": "她在新加坡的国际会议上报告了研究结果，概括方法、局限与对未来研究的启示。听众提问集中在数据质量，以及结论能否推广到不同文化情境。尽早公开报告也帮助她在向同行评审期刊投稿前完善论证。",
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
      },
      {
        "word": "international",
        "spelling": "I-N-T-E-R-N-A-T-I-O-N-A-L",
        "gloss": "国际的",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 8,
    "en": "Technological innovation continues to reshape the global manufacturing sector by automating routine tasks and enabling precision production. Factories that adopt advanced sensors and data analytics can reduce waste and improve product quality. Workers need continuous training so that new systems complement human expertise rather than simply displacing experienced staff.",
    "zhAnalysis": "技术创新通过自动化常规任务并实现精密生产，持续重塑全球制造业。采用先进传感器与数据分析的工厂能够减少浪费并提升产品质量。工人需要持续培训，使新系统补充人类专长，而不是简单取代有经验的员工。",
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
      },
      {
        "word": "manufacturing",
        "spelling": "M-A-N-U-F-A-C-T-U-R-I-N-G",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 9,
    "en": "The scholarship committee evaluates applicants based on merit, financial need, and potential contribution to campus life. Candidates submit transcripts, personal statements, and references that demonstrate resilience and academic curiosity. Clear criteria help ensure that awards support talented students from diverse backgrounds who might otherwise leave university early.",
    "zhAnalysis": "奖学金委员会根据学业表现、经济需求以及对校园生活的潜在贡献评估申请人。候选人提交成绩单、个人陈述与推荐信，以展现韧性与学术好奇心。清晰标准有助于确保奖项支持来自多元背景、否则可能提前退学的优秀学生。",
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
      },
      {
        "word": "contribution",
        "spelling": "C-O-N-T-R-I-B-U-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 10,
    "en": "Historical evidence suggests that trade flourished along the ancient routes connecting cities across continents for centuries. Merchants exchanged textiles, spices, and ideas that influenced art, language, and technology far from their origins. Archaeologists still uncover warehouses and coins that confirm how extensive these commercial networks once were.",
    "zhAnalysis": "历史证据表明，连接各大洲城市的古代商路曾繁荣数百年。商人交换纺织品、香料与观念，影响了远离其起源地的艺术、语言与技术。考古学家仍不断发现仓库与钱币，证实这些商业网络曾经多么广阔。",
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
      },
      {
        "word": "Archaeologists",
        "spelling": "A-R-C-H-A-E-O-L-O-G-I-S-T-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 11,
    "en": "Please ensure that laboratory safety protocols are strictly followed during every experiment involving chemicals or biological materials. Protective clothing, clear labelling, and supervised waste disposal reduce preventable accidents. Supervisors must verify that students understand emergency procedures before independent work begins, and incidents should be reported promptly for investigation and improvement.",
    "zhAnalysis": "请确保在涉及化学品或生物材料的每次实验中都严格遵守实验室安全规程。防护服、清晰标签与受监督的废弃物处置可减少可预防事故。导师必须在学生独立操作前确认其理解应急程序，事故应及时报告以便调查与改进。",
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
      },
      {
        "word": "investigation",
        "spelling": "I-N-V-E-S-T-I-G-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 12,
    "en": "Climate scientists publish peer-reviewed studies in leading journals to share models, observations, and uncertainty estimates with the wider research community. Transparent methods allow other teams to replicate analyses and challenge assumptions. Public communication of findings must balance urgency about environmental risks with careful explanation of what the evidence does and does not show.",
    "zhAnalysis": "气候科学家在领先期刊发表同行评审研究，与更广泛研究界分享模型、观测与不确定性估计。透明方法使其他团队能够复现分析并质疑假设。面向公众的发现传播须在强调环境风险紧迫性与审慎说明证据所能及不能说明之处之间取得平衡。",
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
      },
      {
        "word": "communication",
        "spelling": "C-O-M-M-U-N-I-C-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 13,
    "en": "The temporary exhibition explores themes of migration and identity through photographs, oral histories, and personal objects donated by local families. Visitors walk through rooms that recreate journeys, arrivals, and the rebuilding of community life. Educators design workshops so school groups can discuss belonging, language change, and cultural memory in a respectful setting.",
    "zhAnalysis": "该临时展览通过照片、口述史与本地家庭捐赠的个人物品，探讨迁徙与身份认同主题。访客穿行于再现旅程、抵达与社区生活重建的展厅。教育工作者设计工作坊，使学校团体能在尊重的环境中讨论归属感、语言变化与文化记忆。",
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
      },
      {
        "word": "photographs",
        "spelling": "P-H-O-T-O-G-R-A-P-H-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 14,
    "en": "Students may borrow up to ten books from the main library, renewing online if no other reader has placed a hold. Quiet zones support concentrated study, while group rooms allow collaborative projects without disturbing others. Librarians run short sessions on database searching so that assignments draw on reliable academic sources rather than unverified websites.",
    "zhAnalysis": "学生可从主图书馆借阅最多十本书，若无其他读者预约则可在线续借。静音区支持专注学习，而小组室允许协作项目而不打扰他人。图书馆员开设数据库检索短课，使作业依据可靠学术来源而非未经验证的网站。",
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
      },
      {
        "word": "collaborative",
        "spelling": "C-O-L-L-A-B-O-R-A-T-I-V-E",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 15,
    "en": "Economic forecasts predict moderate growth over the next fiscal year, assuming stable interest rates and gradual recovery in consumer spending. Analysts warn that unexpected shocks in energy prices could revise these projections downward. Governments use such forecasts when planning budgets, infrastructure investment, and support for households facing higher living costs.",
    "zhAnalysis": "经济预测假定利率稳定且消费支出逐步复苏，预计下一财年将实现温和增长。分析人士警告，能源价格的意外冲击可能使预测下调。政府在规划预算、基础设施投资以及对面临更高生活成本家庭的支持时会使用此类预测。",
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
      },
      {
        "word": "infrastructure",
        "spelling": "I-N-F-R-A-S-T-R-U-C-T-U-R-E",
        "gloss": "基础设施",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 16,
    "en": "Volunteers organized a community cleanup along the riverbank, removing litter that threatened fish habitats and recreational swimming areas. Local businesses donated gloves, bags, and refreshments to support the weekend event. Participants learned how small actions, repeated regularly, can improve water quality and strengthen neighbourhood pride in shared public spaces.",
    "zhAnalysis": "志愿者组织了河岸社区清理，清除威胁鱼类栖息地与休闲游泳区的垃圾。本地商家捐赠手套、袋子与茶点以支持周末活动。参与者了解到，经常重复的小行动可以改善水质，并增强邻里对共享公共空间的自豪感。",
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
      },
      {
        "word": "neighbourhood",
        "spelling": "N-E-I-G-H-B-O-U-R-H-O-O-D",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 17,
    "en": "The architecture of the building reflects both classical and modern influences, combining stone facades with glass atriums that fill interiors with natural light. Designers aimed to create spaces that feel welcoming for students while meeting strict energy efficiency standards. Public tours explain how materials and orientation reduce heating and cooling demands throughout the year.",
    "zhAnalysis": "该建筑的结构反映了古典与现代双重影响，将石材立面与为室内引入自然光的玻璃中庭相结合。设计师力求创造对学生友好的空间，同时满足严格的能效标准。公共导览说明材料与朝向如何全年降低供暖与制冷需求。",
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
      },
      {
        "word": "orientation",
        "spelling": "O-R-I-E-N-T-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 18,
    "en": "Medical professionals recommend regular screening for early detection of conditions that respond best to timely treatment. Clinics schedule reminders and offer multilingual information so that more residents can access services. Public health campaigns emphasize prevention through lifestyle changes while ensuring that diagnostic tools remain affordable and widely available.",
    "zhAnalysis": "医疗专业人士建议定期筛查，以便尽早发现对及时治疗反应最好的病症。诊所安排提醒并提供多语言信息，使更多居民能够获得服务。公共卫生宣传强调通过生活方式改变进行预防，同时确保诊断工具保持可负担且广泛可得。",
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
      },
      {
        "word": "multilingual",
        "spelling": "M-U-L-T-I-L-I-N-G-U-A-L",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 19,
    "en": "Digital literacy skills are essential for success in higher education, from evaluating online sources to collaborating on shared documents securely. Universities integrate these competencies into first-year courses rather than treating them as optional extras. Students who can manage information critically are better prepared for research projects and future workplaces that rely on digital tools.",
    "zhAnalysis": "数字素养技能对高等教育成功至关重要，从评估在线来源到安全地协作共享文档。大学将这些能力纳入一年级课程，而非视其为可选附加项。能够批判性管理信息的学生，更能为依赖数字工具的研究项目与未来职场做好准备。",
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
      },
      {
        "word": "collaborating",
        "spelling": "C-O-L-L-A-B-O-R-A-T-I-N-G",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 20,
    "en": "The experiment demonstrated a clear correlation between the two variables under carefully controlled laboratory conditions. Researchers repeated trials to confirm that the pattern was not caused by random measurement error. They cautioned, however, that correlation alone cannot prove causation and that further studies are needed in real-world settings.",
    "zhAnalysis": "该实验在严格控制的实验室条件下证明了两个变量之间存在明确相关。研究者重复试验以确认该模式并非由随机测量误差引起。不过他们提醒，仅凭相关不能证明因果，还需在真实环境中开展进一步研究。",
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
      },
      {
        "word": "correlation",
        "spelling": "C-O-R-R-E-L-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 21,
    "en": "Public libraries provide free access to information and community programmes that support lifelong learning for residents of all ages. Story sessions, homework clubs, and digital skills classes attract diverse audiences throughout the week. In an era of paid online content, these institutions remain vital spaces where people can study, connect, and explore ideas without financial barriers.",
    "zhAnalysis": "公共图书馆为各年龄段居民提供免费信息获取与社区项目，支持终身学习。故事会、作业俱乐部与数字技能课程整周吸引多元受众。在付费在线内容盛行的时代，这些机构仍是人们可以无经济门槛地学习、交流与探索思想的重要空间。",
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
      },
      {
        "word": "institutions",
        "spelling": "I-N-S-T-I-T-U-T-I-O-N-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 22,
    "en": "Agricultural practices have evolved significantly over the past century as machinery, fertilizers, and crop science increased yields. Farmers now face pressure to reduce environmental impacts while feeding growing populations. Precision techniques that match water and nutrients to field conditions can raise productivity and limit runoff that harms nearby rivers and wetlands.",
    "zhAnalysis": "过去一个世纪，农业实践因机械、肥料与作物科学提高产量而显著演变。农民现面临在养活不断增长人口的同时减少环境影响的压力。按田间条件匹配水分与养分的精准技术可提高生产力，并限制损害附近河流与湿地的径流。",
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
      },
      {
        "word": "environmental",
        "spelling": "E-N-V-I-R-O-N-M-E-N-T-A-L",
        "gloss": "环境的",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 23,
    "en": "She completed her dissertation on renewable energy policy last spring after years of fieldwork, interviews, and statistical analysis. The study examined how incentives influence household adoption of solar technology in suburban regions. Examiners praised the clarity of her argument and recommended publishing selected chapters as journal articles for a broader audience.",
    "zhAnalysis": "她在数年田野调查、访谈与统计分析后，于去年春天完成了关于可再生能源政策的学位论文。研究考察了激励措施如何影响郊区家庭采用太阳能技术。评审赞扬其论证清晰，并建议将部分章节作为期刊论文发表，以面向更广读者。",
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
      },
      {
        "word": "recommended",
        "spelling": "R-E-C-O-M-M-E-N-D-E-D",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 24,
    "en": "Transportation infrastructure investment stimulates regional development by shortening travel times and connecting workers to employment centres. Roads, rail, and cycling networks must be planned together so that growth does not increase congestion and pollution. Communities benefit most when projects include reliable public transit options alongside freight corridors for industry.",
    "zhAnalysis": "交通基础设施投资通过缩短出行时间并将劳动者连接到就业中心来刺激区域发展。道路、铁路与骑行网络须统筹规划，以免增长加剧拥堵与污染。当项目在货运走廊之外同时包含可靠公交选项时，社区受益最大。",
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
      },
      {
        "word": "Communities",
        "spelling": "C-O-M-M-U-N-I-T-I-E-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 25,
    "en": "The questionnaire was distributed to participants after the workshop to gather feedback on clarity, pacing, and usefulness of materials. Responses helped organizers adjust future sessions and identify topics that needed more examples. Anonymous comments encouraged honest critique while protecting the privacy of students who might hesitate to speak publicly.",
    "zhAnalysis": "问卷在工作坊结束后发给参与者，以收集对材料清晰度、节奏与实用性的反馈。回答帮助组织者调整后续场次，并识别需要更多例证的主题。匿名评论鼓励诚实批评，同时保护可能不愿公开发言的学生隐私。",
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
      },
      {
        "word": "participants",
        "spelling": "P-A-R-T-I-C-I-P-A-N-T-S",
        "gloss": "参与者",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 26,
    "en": "Biodiversity conservation efforts protect endangered species and the habitats that sustain entire ecosystems across land and sea. Coordinated action among governments, scientists, and local communities is essential when threats cross political borders. Monitoring programmes track population trends so that interventions can be adjusted before declines become irreversible.",
    "zhAnalysis": "生物多样性保护工作保护濒危物种以及维系陆地与海洋整个生态系统的栖息地。当威胁跨越政治边界时，政府、科学家与地方社区的协调行动至关重要。监测项目追踪种群趋势，以便在衰退变得不可逆之前调整干预措施。",
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
        "word": "interventions",
        "spelling": "I-N-T-E-R-V-E-N-T-I-O-N-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 27,
    "en": "He negotiated a partnership agreement with an overseas university to expand student exchanges and joint research projects. Both institutions committed resources for scholarships, shared laboratories, and annual academic conferences. Clear governance clauses defined intellectual property rights and quality standards so that collaboration would remain sustainable over many years.",
    "zhAnalysis": "他与一所海外大学谈判达成合作协议，以扩大学生交流与联合研究项目。双方承诺为奖学金、共享实验室与年度学术会议投入资源。清晰的治理条款界定知识产权与质量标准，使合作可在多年间持续。",
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
      },
      {
        "word": "collaboration",
        "spelling": "C-O-L-L-A-B-O-R-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 28,
    "en": "Statistical analysis revealed unexpected patterns in consumer behaviour during the holiday shopping period across several regions. Online purchases rose sharply in the evenings, while in-store visits concentrated on weekends. Retailers used these insights to adjust staffing, inventory, and targeted promotions without relying solely on anecdotal manager reports.",
    "zhAnalysis": "统计分析揭示了多个地区假日购物期间消费者行为的意外模式。晚间网购急剧上升，而到店访问集中在周末。零售商利用这些洞察调整人员配置、库存与定向促销，而不再仅依赖经理的轶事报告。",
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
      },
      {
        "word": "concentrated",
        "spelling": "C-O-N-C-E-N-T-R-A-T-E-D",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 29,
    "en": "The orientation session introduces new students to campus facilities, academic expectations, and available support services in their first week. Guides lead tours of libraries, laboratories, and counselling centres so newcomers know where to seek help. Early familiarity with these resources reduces anxiety and improves retention during the demanding first semester.",
    "zhAnalysis": "迎新会在第一周向新生介绍校园设施、学业期望与可用支持服务。向导带领参观图书馆、实验室与咨询中心，使新人知道何处求助。尽早熟悉这些资源可减轻焦虑，并改善艰难第一学期的留存率。",
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
      },
      {
        "word": "expectations",
        "spelling": "E-X-P-E-C-T-A-T-I-O-N-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 30,
    "en": "Philosophical debates about ethics remain relevant in modern society as technology raises new questions about privacy, autonomy, and responsibility. Classroom discussions encourage students to examine competing principles rather than memorizing single correct answers. Engaging with classic texts alongside contemporary case studies builds skills needed for professional decision-making.",
    "zhAnalysis": "随着技术提出关于隐私、自主与责任的新问题，关于伦理的哲学辩论在现代社会仍然相关。课堂讨论鼓励学生审视相互竞争的原则，而非背诵唯一正确答案。将经典文本与当代案例结合，培养专业决策所需技能。",
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
      },
      {
        "word": "responsibility",
        "spelling": "R-E-S-P-O-N-S-I-B-I-L-I-T-Y",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 31,
    "en": "Construction of the new sports complex will begin next semester after final approvals from planning authorities and campus stakeholders. The design includes indoor courts, a fitness centre, and accessible pathways for athletes with disabilities. Project managers emphasize noise control and traffic management so nearby residences and lecture halls experience minimal disruption.",
    "zhAnalysis": "新体育综合体将在规划当局与校园各方最终批准后于下学期开工。设计包括室内球场、健身中心以及供残障运动员使用的无障碍步道。项目经理强调噪音控制与交通管理，使附近住宅与讲堂所受干扰降至最低。",
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
      },
      {
        "word": "disabilities",
        "spelling": "D-I-S-A-B-I-L-I-T-I-E-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 32,
    "en": "Linguistic diversity enriches cultural life in multicultural cities by bringing multiple languages into schools, markets, and public media. Residents who speak more than one language often act as bridges between communities during civic events. Education policies that value heritage languages alongside the national language support identity while improving communication skills.",
    "zhAnalysis": "语言多样性通过将多种语言带入学校、市场与公共媒体，丰富多元文化城市的文化生活。会说一种以上语言的居民常在公共活动中充当社区之间的桥梁。在重视国家语言的同时珍视传承语言的教育政策，支持身份认同并提升沟通技能。",
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
      },
      {
        "word": "communication",
        "spelling": "C-O-M-M-U-N-I-C-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 33,
    "en": "The advisory board meets quarterly to review strategic priorities, budget allocations, and progress toward long-term institutional goals. Members bring expertise from academia, industry, and public service to challenge assumptions constructively. Transparent minutes and follow-up actions help staff understand how recommendations translate into practical changes on campus.",
    "zhAnalysis": "顾问委员会每季度开会，审议战略优先事项、预算分配以及朝向长期机构目标的进展。成员来自学术、产业与公共服务，以建设性方式质疑假设。透明会议纪要与后续行动帮助教职员工理解建议如何转化为校园中的实际改变。",
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
      },
      {
        "word": "recommendations",
        "spelling": "R-E-C-O-M-M-E-N-D-A-T-I-O-N-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 34,
    "en": "Photographic evidence was presented during the archaeological conference to illustrate excavation layers and artifact contexts in detail. High-resolution images allowed remote specialists to contribute interpretations without travelling to the site. Researchers stressed that photographs complement, rather than replace, careful written records and measured drawings of each find.",
    "zhAnalysis": "考古会议上展示了摄影证据，以详细说明发掘层位与器物出土情境。高分辨率图像使远程专家无需亲临现场即可贡献解读。研究者强调，照片是对每件发现的仔细文字记录与测绘图的补充，而非替代。",
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
      },
      {
        "word": "interpretations",
        "spelling": "I-N-T-E-R-P-R-E-T-A-T-I-O-N-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 35,
    "en": "Employees receive comprehensive training on data privacy regulations before handling customer records or research datasets containing personal information. Modules cover consent, secure storage, and procedures for reporting suspected breaches quickly. Regular refresher courses keep teams aligned with evolving legal requirements and organizational security standards. Regular audits confirm that policies stay aligned with national legislation and industry best practice.",
    "zhAnalysis": "员工在处理客户记录或含个人信息的研究数据集之前，接受关于数据隐私法规的全面培训。模块涵盖同意、安全存储以及快速报告可疑泄露的程序。定期进修课程使团队与不断演变的法律要求及组织安全标准保持一致。 定期审计确认政策与国家立法及行业最佳实践保持一致。",
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
      },
      {
        "word": "organizational",
        "spelling": "O-R-G-A-N-I-Z-A-T-I-O-N-A-L",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 36,
    "en": "Ocean currents influence weather patterns across continental regions by transporting heat and moisture over vast distances. Scientists combine satellite data with buoy measurements to improve forecasts of storms and seasonal rainfall. Understanding these systems helps coastal communities prepare for flooding risks linked to changing climate conditions.",
    "zhAnalysis": "洋流通过长距离输送热量与水汽，影响大陆地区的天气模式。科学家结合卫星数据与浮标测量，以改进风暴与季节降雨预报。理解这些系统帮助沿海社区为与气候变化相关的洪水风险做好准备。",
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
      },
      {
        "word": "Understanding",
        "spelling": "U-N-D-E-R-S-T-A-N-D-I-N-G",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 37,
    "en": "The curriculum emphasizes critical thinking and collaborative problem solving rather than passive memorization of disconnected facts. Group projects require students to evaluate evidence, negotiate roles, and present reasoned conclusions. Assessment rubrics make expectations explicit so that learners understand how analytical skills will be judged. Lecturers model these approaches so that assessment rewards thinking rather than rote recall alone.",
    "zhAnalysis": "课程强调批判性思维与协作问题解决，而非被动记忆彼此脱节的事实。小组项目要求学生评估证据、协商角色并陈述有理据的结论。评分量规使期望明确，使学习者理解分析技能将如何被评判。 教师示范这些方法，使评估奖励思考而非仅死记硬背。",
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
      },
      {
        "word": "collaborative",
        "spelling": "C-O-L-L-A-B-O-R-A-T-I-V-E",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 38,
    "en": "Fundraising campaigns support scholarships for underprivileged students who demonstrate academic promise but lack sufficient financial resources. Alumni networks and corporate partners contribute both donations and mentoring opportunities. Transparent reporting shows donors how funds are allocated and what outcomes graduates achieve after completing their degrees. Impact stories shared online further motivate prospective donors to continue supporting access programmes.",
    "zhAnalysis": "筹款活动为展现学术潜力但缺乏足够经济资源的弱势学生提供奖学金支持。校友网络与企业伙伴既捐款也提供导师机会。透明报告向捐赠者展示资金如何分配，以及毕业生完成学位后取得何种成果。 在线分享的影响故事进一步激励潜在捐赠者继续支持入学机会项目。",
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
      },
      {
        "word": "underprivileged",
        "spelling": "U-N-D-E-R-P-R-I-V-I-L-E-G-E-D",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 39,
    "en": "Geological surveys map underground resources before mining operations begin, reducing unexpected hazards and environmental damage. Teams collect rock samples, seismic readings, and groundwater data to build three-dimensional models of the site. Regulators require these assessments so that companies plan extraction methods that meet safety and rehabilitation obligations.",
    "zhAnalysis": "地质调查在采矿作业开始前绘制地下资源图，减少意外危害与环境破坏。团队采集岩石样本、地震读数与地下水数据，以构建场地三维模型。监管机构要求这些评估，使公司规划符合安全与修复义务的开采方法。",
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
      },
      {
        "word": "rehabilitation",
        "spelling": "R-E-H-A-B-I-L-I-T-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 40,
    "en": "She attributed her success to perseverance and excellent mentoring received throughout undergraduate and postgraduate studies. Regular meetings with supervisors helped her overcome setbacks in experiments and refine research questions. She now mentors junior colleagues, emphasizing that seeking feedback early is a strength rather than a sign of weakness.",
    "zhAnalysis": "她将成功归因于毅力以及在本科与研究生阶段获得的优秀指导。与导师的定期会面帮助她克服实验挫折并提炼研究问题。她现指导初级同事，强调尽早寻求反馈是一种优势，而非软弱的表现。",
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
      },
      {
        "word": "undergraduate",
        "spelling": "U-N-D-E-R-G-R-A-D-U-A-T-E",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 41,
    "en": "Interactive exhibits engage visitors of all ages at the science centre by inviting hands-on exploration of physical principles. Children test simple machines while adults examine displays on energy, space, and the human body. Educators circulate to answer questions and connect playful experiments with ideas taught in school science curricula.",
    "zhAnalysis": "互动展项通过邀请动手探索物理原理，吸引各年龄段访客走进科学中心。儿童测试简单机械，成人则观看能源、太空与人体相关展示。教育工作者巡回答疑，并将趣味实验与学校科学课程中的概念联系起来。",
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
      },
      {
        "word": "experiments",
        "spelling": "E-X-P-E-R-I-M-E-N-T-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 42,
    "en": "Consistent practice and targeted feedback are essential for mastering complex skills in language learning and professional communication. Learners who review mistakes systematically improve faster than those who only repeat familiar exercises. Teachers design tasks that stretch abilities gradually while keeping motivation high through achievable short-term goals.",
    "zhAnalysis": "持续练习与有针对性的反馈，对掌握语言学习与专业沟通中的复杂技能至关重要。系统复习错误的学习者，比只重复熟悉练习的人进步更快。教师设计逐步拓展能力的任务，并通过可达成的短期目标保持高动机。",
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
        "word": "systematically",
        "spelling": "S-Y-S-T-E-M-A-T-I-C-A-L-L-Y",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 43,
    "en": "Universities increasingly encourage interdisciplinary collaboration so that researchers from science, humanities, and social sciences address shared problems together. Joint seminars and shared funding schemes reduce barriers between traditionally separate departments. Graduates who can communicate across fields are valued by employers facing challenges that no single discipline can solve alone.",
    "zhAnalysis": "大学日益鼓励跨学科协作，使来自科学、人文与社会科学的研究者共同应对共享问题。联合研讨与共享资助计划减少传统分离院系之间的障碍。能够跨领域沟通的毕业生，受到面临单一学科无法独自解决之挑战的雇主重视。",
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
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 44,
    "en": "Access to peer-reviewed journals enables students to engage with current debates and build arguments on reliable evidence. Library subscriptions and open-access repositories expand what undergraduates can cite in essays and laboratory reports. Training in critical reading helps them distinguish robust findings from preliminary or poorly designed studies.",
    "zhAnalysis": "获取同行评审期刊使学生能够参与当前辩论，并在可靠证据上构建论证。图书馆订阅与开放获取知识库扩展了本科生在论文与实验报告中可引用的范围。批判性阅读训练帮助他们区分扎实发现与初步或设计不佳的研究。",
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
        "word": "undergraduates",
        "spelling": "U-N-D-E-R-G-R-A-D-U-A-T-E-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 45,
    "en": "Effective time management helps students balance coursework, part-time employment, and personal wellbeing during demanding academic terms. Planners who break large assignments into weekly milestones experience less last-minute stress. Counselling services also teach prioritization techniques for those who feel overwhelmed by competing deadlines. Digital calendars and reminder apps can reinforce these habits when used with realistic daily priorities.",
    "zhAnalysis": "有效的时间管理帮助学生在紧张学期中平衡课业、兼职工作与个人福祉。将大型作业拆成每周里程碑的规划者，更少经历最后一刻压力。咨询服务也为那些被相互冲突截止日期压垮的人教授优先级技巧。 数字日历与提醒应用若配合现实的每日优先事项，可强化这些习惯。",
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
        "word": "prioritization",
        "spelling": "P-R-I-O-R-I-T-I-Z-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 46,
    "en": "Urban planners must consider sustainability when designing transport systems, housing density, and green spaces for growing cities. Compact neighbourhoods with reliable transit can reduce car dependence and improve air quality. Community consultation ensures that projects reflect local needs rather than imposing uniform templates that ignore neighbourhood character.",
    "zhAnalysis": "城市规划者在为不断扩张的城市设计交通系统、住房密度与绿地时必须考虑可持续性。配备可靠公交的紧凑街区可减少对汽车的依赖并改善空气质量。社区咨询确保项目反映本地需求，而非强加忽视街区特色的统一模板。",
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
        "word": "neighbourhoods",
        "spelling": "N-E-I-G-H-B-O-U-R-H-O-O-D-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 47,
    "en": "Critical reading involves questioning assumptions and evaluating the strength of evidence presented in academic texts. Students annotate margins, compare sources, and identify where authors acknowledge limitations. These habits prepare them for independent research and for professional roles that require careful judgment of information quality. Seminars that practise these techniques early in a degree reduce later struggles with research writing.",
    "zhAnalysis": "批判性阅读涉及质疑假设并评估学术文本中所呈证据的强度。学生在页边批注、比较来源，并识别作者承认局限之处。这些习惯为独立研究以及需要审慎判断信息质量的专业角色做准备。 学位早期练习这些技巧的研讨课，可减少日后研究写作的困难。",
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
        "word": "professional",
        "spelling": "P-R-O-F-E-S-S-I-O-N-A-L",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 48,
    "en": "Laboratory safety protocols protect researchers and ensure reliable results by preventing contamination and accidental exposure to hazards. Clear signage, trained first-aid officers, and regular equipment checks form part of everyday practice. Institutions audit compliance so that standards remain consistent across departments with different experimental risks.",
    "zhAnalysis": "实验室安全规程通过防止污染与意外接触危害，保护研究人员并确保可靠结果。清晰标识、受训急救人员与定期设备检查构成日常实践的一部分。机构审计合规情况，使不同实验风险的院系保持一致标准。",
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
        "word": "contamination",
        "spelling": "C-O-N-T-A-M-I-N-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 49,
    "en": "Scholarship schemes aim to widen participation among students from underrepresented regions and socioeconomic backgrounds. Selection panels look beyond grades to consider leadership, community involvement, and resilience under difficult circumstances. Ongoing mentoring after the award helps recipients navigate academic culture and make full use of campus opportunities.",
    "zhAnalysis": "奖学金计划旨在扩大来自代表性不足地区与社会经济背景学生的参与。选拔小组超越分数，考虑领导力、社区参与以及在困难环境下的韧性。获奖后的持续指导帮助受助者适应学术文化，并充分利用校园机会。",
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
        "word": "underrepresented",
        "spelling": "U-N-D-E-R-R-E-P-R-E-S-E-N-T-E-D",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 50,
    "en": "Climate models predict rising sea levels that threaten coastal infrastructure, freshwater supplies, and low-lying agricultural land. Cities invest in flood barriers, wetland restoration, and revised building codes to reduce future damage. Accurate local projections help communities decide which adaptation measures deserve priority funding. Insurance markets and property prices already reflect some of these projected coastal risks.",
    "zhAnalysis": "气候模型预测海平面上升将威胁沿海基础设施、淡水供应与低洼农业用地。城市投资防洪屏障、湿地恢复与修订建筑规范以减少未来损害。准确的本地预测帮助社区决定哪些适应措施应获优先资金。 保险市场与房价已在一定程度上反映这些预计的沿海风险。",
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
    ],
    "audioPreferTts": true
  },
  {
    "id": 51,
    "en": "Academic integrity requires honest citation practices and original work that reflects a student's own understanding of the subject. Universities explain plagiarism rules clearly during orientation and provide tools for checking references. Penalties exist, yet education about proper paraphrasing remains the most effective way to prevent unintentional misconduct.",
    "zhAnalysis": "学术诚信要求诚实的引用实践以及反映学生对学科自身理解的原创作业。大学在迎新期间清楚解释抄袭规则，并提供核查参考文献的工具。虽有处罚，但关于正确释义的教育仍是预防无意违规最有效的方式。",
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
        "word": "understanding",
        "spelling": "U-N-D-E-R-S-T-A-N-D-I-N-G",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 52,
    "en": "Digital platforms have transformed how lectures are delivered, recorded, and reviewed by students who cannot attend every class in person. High-quality recordings support revision, yet live discussion still builds deeper understanding through questions and debate. Educators blend both approaches so flexibility does not replace meaningful interaction.",
    "zhAnalysis": "数字平台改变了讲座的交付、录制以及无法每次到场学生的复习方式。高质量录音支持复习，而现场讨论仍通过提问与辩论加深理解。教育者融合两种方式，使灵活性不取代有意义的互动。",
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
        "word": "understanding",
        "spelling": "U-N-D-E-R-S-T-A-N-D-I-N-G",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 53,
    "en": "Demographic change is reshaping labour markets and demand for public services such as healthcare, education, and housing. Aging populations increase the need for aged care workers while youth unemployment remains a concern in some regions. Policymakers study migration, fertility, and training pipelines when planning long-term workforce strategies.",
    "zhAnalysis": "人口结构变化正在重塑劳动力市场以及对医疗、教育与住房等公共服务的需求。老龄化增加对养老护理人员的需要，而部分地区青年失业仍令人担忧。政策制定者在规划长期劳动力战略时研究移民、生育与培训通道。",
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
        "word": "Policymakers",
        "spelling": "P-O-L-I-C-Y-M-A-K-E-R-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 54,
    "en": "Clear structure and precise vocabulary improve the clarity of academic writing for both native and non-native speakers of English. Outlines help writers organize claims, evidence, and counterarguments before drafting full paragraphs. Peer review sessions catch ambiguities that authors may overlook after working closely with a text for weeks.",
    "zhAnalysis": "清晰结构与精确词汇可提升母语与非母语英语使用者的学术写作明晰度。提纲帮助写作者在起草完整段落前组织主张、证据与反驳。同行互评可发现作者在与文本密切相处数周后可能忽略的歧义。",
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
        "word": "counterarguments",
        "spelling": "C-O-U-N-T-E-R-A-R-G-U-M-E-N-T-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 55,
    "en": "Renewable energy investment supports economic growth while reducing greenhouse gas emissions from electricity generation and transport. Falling costs of solar and wind technologies have accelerated adoption in both cities and rural regions. Stable policy frameworks give investors confidence to fund projects that may take years to complete.",
    "zhAnalysis": "可再生能源投资在减少电力与交通温室气体排放的同时支持经济增长。太阳能与风电技术成本下降加速了城市与农村地区的采用。稳定的政策框架使投资者有信心资助可能需要数年完成的项目。",
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
        "word": "technologies",
        "spelling": "T-E-C-H-N-O-L-O-G-I-E-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 56,
    "en": "Tutorials provide opportunities for students to discuss complex readings and practise applying theories to concrete case studies. Smaller groups allow quieter participants to contribute ideas they might withhold in large lectures. Tutors guide conversation without dominating, helping learners develop independent analytical voices. Preparation tasks before class make tutorial time more productive for everyone involved.",
    "zhAnalysis": "辅导课为学生提供讨论复杂阅读并将理论应用于具体案例的机会。较小的小组让较安静的参与者也能提出在大课上可能保留的想法。导师引导对话而不主导，帮助学习者发展独立的分析声音。 课前准备任务使辅导课时间对所有参与者更有成效。",
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
        "word": "conversation",
        "spelling": "C-O-N-V-E-R-S-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 57,
    "en": "Empirical studies show that sleep quality significantly affects memory consolidation, attention, and emotional regulation in university students. Late-night screen use and irregular schedules often undermine rest during examination periods. Campus health campaigns encourage consistent sleep routines as part of academic performance strategies. Departments that schedule major deadlines with recovery days acknowledge the link between rest and performance.",
    "zhAnalysis": "实证研究表明，睡眠质量显著影响大学生的记忆巩固、注意力与情绪调节。深夜使用屏幕与不规律作息常在考试期间损害休息。校园健康宣传鼓励将规律睡眠作为学业表现策略的一部分。 将重要截止日期与恢复日一并安排的院系，承认休息与表现之间的联系。",
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
        "word": "consolidation",
        "spelling": "C-O-N-S-O-L-I-D-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 58,
    "en": "Library workshops teach students how to search databases and evaluate sources for credibility, relevance, and possible bias. Hands-on exercises move from simple keyword searches to advanced filters and citation tracking. Participants leave with practical skills they can apply immediately to upcoming essay and laboratory assignments.",
    "zhAnalysis": "图书馆工作坊教授学生如何检索数据库，并从可信度、相关性与可能偏见方面评估来源。动手练习从简单关键词搜索推进到高级筛选与引文追踪。参与者带着可立即用于即将到来的论文与实验作业的实用技能离开。",
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
        "word": "Participants",
        "spelling": "P-A-R-T-I-C-I-P-A-N-T-S",
        "gloss": "参与者",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 59,
    "en": "Inflation reduces purchasing power and can increase the real cost of education, housing, and everyday essentials for households. Central banks adjust interest rates carefully to stabilize prices without triggering sharp rises in unemployment. Students monitor living costs when budgeting for rent, transport, and study materials across a semester.",
    "zhAnalysis": "通货膨胀削弱购买力，并可能提高家庭在教育、住房与日常必需品上的实际成本。央行审慎调整利率以稳定物价，同时避免失业急剧上升。学生在为整学期房租、交通与学习材料做预算时会关注生活成本。",
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
        "word": "unemployment",
        "spelling": "U-N-E-M-P-L-O-Y-M-E-N-T",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 60,
    "en": "Orientation programmes help international students adapt to academic culture, local services, and everyday practicalities in a new country. Sessions cover enrolment, health insurance, and expectations around independent study and classroom participation. Peer mentors share lived experience that official handbooks cannot fully capture. Follow-up check-ins in the first month catch practical problems before they escalate into withdrawal.",
    "zhAnalysis": "迎新项目帮助国际学生适应新国家的学术文化、本地服务与日常实务。课程涵盖注册、健康保险以及关于独立学习与课堂参与的期望。同伴导师分享官方手册无法完全捕捉的亲身经验。 第一个月的跟进约谈可在问题升级为退学之前发现实际困难。",
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
        "word": "practicalities",
        "spelling": "P-R-A-C-T-I-C-A-L-I-T-I-E-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 61,
    "en": "Peer feedback encourages reflection and often leads to more thoughtful revisions than comments from instructors alone. Students learn to give specific, respectful suggestions focused on clarity and argument structure. Structured rubrics keep discussions productive and reduce the temptation to exchange only vague praise. Online platforms can support this process when anonymity encourages more candid suggestions.",
    "zhAnalysis": "同伴反馈鼓励反思，往往比仅有教师意见带来更深入的修改。学生学会就清晰度与论证结构给出具体、尊重的建议。结构化量规使讨论更有成效，并减少只交换含糊赞美的倾向。 当匿名鼓励更坦诚的建议时，在线平台可支持这一过程。",
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
        "word": "discussions",
        "spelling": "D-I-S-C-U-S-S-I-O-N-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 62,
    "en": "Biodiversity conservation requires coordinated action across national borders when migratory species depend on habitats in multiple countries. International agreements set shared targets, yet local enforcement and community involvement determine real outcomes. Scientists share monitoring data so that protection measures can respond to changing population trends.",
    "zhAnalysis": "当迁徙物种依赖多个国家的栖息地时，生物多样性保护需要跨境协调行动。国际协议设定共同目标，但地方执行与社区参与决定真实结果。科学家共享监测数据，使保护措施能响应不断变化的种群趋势。",
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
        "word": "International",
        "spelling": "I-N-T-E-R-N-A-T-I-O-N-A-L",
        "gloss": "国际的",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 63,
    "en": "Assessment rubrics make marking criteria transparent and support consistent grading across large teaching teams. Students use them while drafting to check whether arguments, evidence, and presentation meet expectations. Reviewing rubrics after receiving marks also clarifies which skills to strengthen before the next assignment. Calibration meetings among markers further reduce unexplained differences in awarded grades.",
    "zhAnalysis": "评分量规使评分标准透明，并支持大型教学团队评分一致。学生在起草时用其检查论证、证据与呈现是否符合期望。得分后复习量规也有助于明确下次作业前应加强哪些技能。 阅卷人之间的校准会议进一步减少分数上无法解释的差异。",
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
        "word": "expectations",
        "spelling": "E-X-P-E-C-T-A-T-I-O-N-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 64,
    "en": "Public transport improvements can reduce congestion and improve air quality in densely populated urban centres. Reliable schedules and integrated tickets encourage travellers to leave private cars at home for daily commuting. Investment must also consider accessibility so that elderly and disabled passengers benefit equally from new services.",
    "zhAnalysis": "公共交通改善可减少人口密集城市中心的拥堵并提升空气质量。可靠班次与一体化票务鼓励出行者日常通勤时把私家车留在家中。投资还必须考虑无障碍性，使老年与残障乘客同样受益于新服务。",
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
        "word": "accessibility",
        "spelling": "A-C-C-E-S-S-I-B-I-L-I-T-Y",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 65,
    "en": "Research methodology must be described clearly so that studies can be evaluated and, where appropriate, replicated by other teams. Authors explain sampling, instruments, and analytical choices along with limitations that affect interpretation. Transparent reporting strengthens trust in findings used to guide education, health, and environmental policy.",
    "zhAnalysis": "研究方法必须清楚描述，以便研究可被评估，并在适当时由其他团队复现。作者说明抽样、工具与分析选择，以及影响解释的局限。透明报告增强对用于指导教育、健康与环境政策之发现的信任。",
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
      },
      {
        "word": "interpretation",
        "spelling": "I-N-T-E-R-P-R-E-T-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 66,
    "en": "Student wellbeing services provide counselling and support during periods of academic pressure, loneliness, or personal crisis. Confidential appointments and peer support groups reduce barriers for those hesitant to seek help. Early intervention often prevents small difficulties from becoming obstacles that interrupt degree progress. Outreach through tutors and residence staff helps identify students who may need support but have not self-referred.",
    "zhAnalysis": "学生福祉服务在学业压力、孤独或个人危机期间提供咨询与支持。保密预约与同伴支持小组降低犹豫求助者的门槛。早期干预往往能防止小困难变成中断学业进展的障碍。 通过导师与宿舍工作人员外联，有助于识别可能需要支持但尚未主动求助的学生。",
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
        "word": "appointments",
        "spelling": "A-P-P-O-I-N-T-M-E-N-T-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 67,
    "en": "Technological innovation continues to reshape manufacturing and service industries through automation, data analytics, and new materials. Firms that invest in workforce reskilling adapt more successfully when routines change. Public education systems share responsibility for preparing graduates who can learn continuously across their careers. Ethical debate about automation also belongs in classrooms that prepare citizens as well as workers.",
    "zhAnalysis": "技术创新通过自动化、数据分析与新材料持续重塑制造业与服务业。投资劳动力再培训的企业在常规改变时适应更成功。公共教育体系共同承担培养能在整个职业生涯持续学习的毕业生的责任。 关于自动化的伦理辩论也应进入培养公民与劳动者的课堂。",
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
        "word": "responsibility",
        "spelling": "R-E-S-P-O-N-S-I-B-I-L-I-T-Y",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 68,
    "en": "A well-organised essay presents a clear thesis supported by coherent paragraphs that each develop a distinct point. Transitions guide readers through the argument without abrupt shifts in focus. Careful editing removes repetition and ensures that citations match the claims they are meant to substantiate. Supervisors often recommend reading strong model essays to internalise patterns of organisation.",
    "zhAnalysis": "组织良好的论文提出由连贯段落支持的清晰论点，每段展开一个明确要点。过渡引导读者穿越论证而不出现突兀的焦点转换。仔细编辑可去除重复，并确保引文与其所要支撑的主张相符。 导师常建议阅读优秀范文，以内化组织结构模式。",
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
        "word": "substantiate",
        "spelling": "S-U-B-S-T-A-N-T-I-A-T-E",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 69,
    "en": "Enrolment procedures require careful attention to deadlines and documentation, especially for students transferring between institutions or programmes. Online portals centralize forms, yet personal advice remains valuable when rules are complex. Missing a key date can delay course access and affect scholarship eligibility for the coming year.",
    "zhAnalysis": "注册程序要求仔细注意截止日期与文件，尤其是在院校或项目间转学的学生。在线门户集中表格，但规则复杂时个人咨询仍有价值。错过关键日期可能推迟选课，并影响来年奖学金资格。",
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
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 70,
    "en": "Habitat restoration projects aim to reverse biodiversity loss by replanting native vegetation and removing invasive species from damaged ecosystems. Success depends on long-term monitoring rather than one-off planting events. Local volunteers often contribute labour while scientists measure recovery of wildlife populations over successive seasons. Funding agencies increasingly require evidence of community partnership in restoration proposals.",
    "zhAnalysis": "栖息地恢复项目通过补种本地植被并清除受损生态系统中的入侵物种，旨在扭转生物多样性丧失。成功取决于长期监测而非一次性种植活动。本地志愿者常贡献劳动力，而科学家则跨连续季节测量野生动物种群的恢复。 资助机构日益要求恢复提案中提供社区合作的证据。",
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
        "word": "biodiversity",
        "spelling": "B-I-O-D-I-V-E-R-S-I-T-Y",
        "gloss": "生物多样性",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 71,
    "en": "Listening carefully to lectures improves note-taking accuracy and helps students identify which ideas the instructor considers most important. Active listeners mark questions to ask later rather than trying to write every sentence. Reviewing notes within twenty-four hours strengthens memory and prepares learners for tutorials and examinations.",
    "zhAnalysis": "认真听讲可提高笔记准确性，并帮助学生识别教师认为最重要的观点。主动倾听者标记稍后要问的问题，而非试图写下每一句。二十四小时内复习笔记可强化记忆，并为辅导课与考试做准备。",
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
        "word": "examinations",
        "spelling": "E-X-A-M-I-N-A-T-I-O-N-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 72,
    "en": "Graduate employment rates vary across disciplines and economic cycles, influencing how students choose majors and additional skill programmes. Career services offer workshops on resumes, interviews, and workplace communication for final-year cohorts. Internships and volunteering often bridge the gap between academic knowledge and employer expectations. Alumni panels describe realistic career paths and the soft skills that often decide hiring outcomes.",
    "zhAnalysis": "毕业生就业率因学科与经济周期而异，影响学生如何选择专业与额外技能课程。职业服务为毕业年级提供简历、面试与职场沟通工作坊。实习与志愿服务常在学术知识与雇主期望之间架起桥梁。 校友座谈描述现实职业路径以及往往决定录用结果的软技能。",
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
        "word": "communication",
        "spelling": "C-O-M-M-U-N-I-C-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 73,
    "en": "Transparent governance builds public trust in educational institutions by clarifying how decisions about budgets, appointments, and academic standards are made. Regular reports and open forums allow staff and students to raise concerns constructively. Accountability mechanisms help correct mistakes before they damage reputation or learning quality.",
    "zhAnalysis": "透明治理通过阐明预算、任命与学术标准相关决策如何作出，建立公众对教育机构的信任。定期报告与公开论坛允许教职员工与学生建设性地提出关切。问责机制帮助在损害声誉或学习质量之前纠正错误。",
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
        "word": "Accountability",
        "spelling": "A-C-C-O-U-N-T-A-B-I-L-I-T-Y",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 74,
    "en": "Paraphrasing source material correctly is a key skill for avoiding plagiarism while demonstrating genuine comprehension of complex ideas. Writers must change structure and wording substantially and still cite the original author. Practice with short academic extracts builds confidence before larger research assignments begin. Detection software assists markers, yet human judgment remains essential for fair decisions.",
    "zhAnalysis": "正确释义来源材料是避免抄袭并展示对复杂观点真正理解的关键技能。写作者必须大幅改变结构与措辞，并仍引用原作者。用短学术摘录练习可在大型研究作业开始前建立信心。 检测软件协助阅卷人，但公平决定仍需人类判断。",
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
        "word": "comprehension",
        "spelling": "C-O-M-P-R-E-H-E-N-S-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 75,
    "en": "Urban green spaces contribute to mental health and encourage physical activity among residents living in densely built neighbourhoods. Parks, tree-lined streets, and community gardens also reduce heat and support local wildlife. Planners argue that equitable access to nature should be treated as essential infrastructure, not a luxury.",
    "zhAnalysis": "城市绿地有益心理健康，并鼓励居住在密集建成区居民的身体活动。公园、林荫街道与社区花园还能降温并支持本地野生动物。规划者主张，公平地亲近自然应被视为必要基础设施，而非奢侈品。",
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
        "word": "infrastructure",
        "spelling": "I-N-F-R-A-S-T-R-U-C-T-U-R-E",
        "gloss": "基础设施",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 76,
    "en": "Language proficiency tests measure speaking, writing, reading, and listening skills that universities and employers use for admission and hiring decisions. Preparation courses focus on strategies, timing, and familiarity with task formats under exam conditions. Candidates benefit most when practice includes detailed feedback rather than only timed mock tests.",
    "zhAnalysis": "语言能力测试衡量口语、写作、阅读与听力技能，供大学与雇主用于录取与招聘决策。备考课程聚焦策略、时间分配以及对考试条件下任务格式的熟悉。当练习包含详细反馈而非仅限时模考时，考生受益最大。",
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
      },
      {
        "word": "universities",
        "spelling": "U-N-I-V-E-R-S-I-T-I-E-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 77,
    "en": "Funding cuts have forced some departments to reduce elective courses and limit laboratory hours for undergraduate programmes. Staff seek creative partnerships and external grants to preserve research training opportunities. Students lobby for transparent consultation whenever curriculum changes may affect degree pathways and graduate outcomes. Alumni giving sometimes offsets losses, though it cannot fully replace stable public funding.",
    "zhAnalysis": "资金削减迫使一些院系减少选修课并限制本科实验课时。教职员工寻求创造性合作与外部资助，以保留研究训练机会。每当课程变化可能影响学位路径与毕业去向时，学生会游说要求透明协商。 校友捐赠有时能弥补损失，但无法完全替代稳定的公共资金。",
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
        "word": "opportunities",
        "spelling": "O-P-P-O-R-T-U-N-I-T-I-E-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 78,
    "en": "Statistical significance does not always indicate practical importance, especially when sample sizes are very large and effects remain tiny. Researchers report effect sizes and confidence intervals so readers can judge real-world relevance. Responsible interpretation prevents overclaiming results that may not change policy or clinical practice.",
    "zhAnalysis": "统计显著性并不总意味着实际重要性，尤其在样本量很大而效应仍然很小时。研究者报告效应量与置信区间，使读者能判断现实相关性。负责任的解释可防止夸大可能不会改变政策或临床实践的结果。",
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
        "word": "interpretation",
        "spelling": "I-N-T-E-R-P-R-E-T-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 79,
    "en": "Campus sustainability initiatives include recycling programmes, energy-efficient buildings, and campaigns that encourage lower-waste food choices in dining halls. Student groups monitor progress and propose further improvements each academic year. Visible successes help normalize environmentally responsible behaviour across the wider university community. Competitions between residences make sustainability goals visible and socially rewarding.",
    "zhAnalysis": "校园可持续发展举措包括回收项目、节能建筑，以及鼓励食堂减少食物浪费的宣传。学生团体监测进展，并在每学年提出进一步改进。可见的成功帮助在更广泛的大学社区中使环保行为常态化。 宿舍之间的竞赛使可持续发展目标变得可见且具有社会激励。",
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
        "word": "environmentally",
        "spelling": "E-N-V-I-R-O-N-M-E-N-T-A-L-L-Y",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 80,
    "en": "Mentoring relationships support academic progress and professional development by pairing experienced guides with newer students or early-career staff. Effective mentors listen carefully, share practical strategies, and help mentees set realistic goals. Institutions that formalize mentoring often see improvements in retention and research productivity. Matching mentors and mentees by shared interests increases the likelihood of lasting engagement.",
    "zhAnalysis": "导师关系通过将有经验的引导者与较新学生或早期职业员工配对，支持学业进展与专业发展。有效的导师认真倾听、分享实用策略，并帮助被指导者设定现实目标。将导师制正式化的机构常在留存与研究生产力上看到改善。 按共同兴趣匹配导师与被指导者，可提高持续参与的可能性。",
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
        "word": "relationships",
        "spelling": "R-E-L-A-T-I-O-N-S-H-I-P-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 81,
    "en": "Global supply chains face disruption from extreme weather and geopolitical tensions that delay shipments of essential components. Companies diversify suppliers and increase inventory buffers to reduce vulnerability to single points of failure. Researchers study how digital tracking systems improve visibility without creating new cybersecurity risks for logistics networks.",
    "zhAnalysis": "全球供应链面临极端天气与地缘政治紧张带来的中断，延误关键零部件运输。公司多元化供应商并增加库存缓冲，以降低对单一故障点的脆弱性。研究者研究数字追踪系统如何在不为物流网络制造新网络安全风险的情况下提升可视性。",
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
        "word": "cybersecurity",
        "spelling": "C-Y-B-E-R-S-E-C-U-R-I-T-Y",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 82,
    "en": "Concise summaries capture main ideas without reproducing unnecessary detail from lengthy academic articles or reports. Writers identify purpose, key findings, and limitations before drafting a short overview for classmates or supervisors. Practising summary skills also strengthens reading comprehension and prepares students for literature reviews. Word limits train writers to distinguish essential claims from supporting examples.",
    "zhAnalysis": "简洁摘要抓住主要观点，而不复现冗长学术文章或报告中的不必要细节。写作者在为同学或导师起草简短概述前，先识别目的、关键发现与局限。练习摘要技能也强化阅读理解，并为文献综述做准备。 字数限制训练写作者区分核心主张与支持性例证。",
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
        "word": "comprehension",
        "spelling": "C-O-M-P-R-E-H-E-N-S-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 83,
    "en": "Renewable energy investment has accelerated across developed and emerging economies as technology costs fall and climate targets tighten. Grid upgrades and storage solutions are needed so that intermittent generation remains reliable. Public engagement helps communities understand both local benefits and the trade-offs of large infrastructure projects.",
    "zhAnalysis": "随着技术成本下降与气候目标收紧，可再生能源投资在发达与新兴经济体加速。电网升级与储能方案是使间歇性发电保持可靠所必需的。公众参与帮助社区理解大型基础设施项目的本地益处与取舍。",
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
        "word": "infrastructure",
        "spelling": "I-N-F-R-A-S-T-R-U-C-T-U-R-E",
        "gloss": "基础设施",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 84,
    "en": "Academic integrity policies outline procedures for investigating alleged misconduct and applying proportionate penalties when violations are confirmed. Clear guidance on collaboration rules prevents confusion in group assignments and take-home assessments. Education remains central, because many breaches stem from misunderstanding rather than deliberate dishonesty. Appeal pathways exist so that students can contest findings when procedures appear unfair.",
    "zhAnalysis": "学术诚信政策概述调查涉嫌不当行为并在确认违规时适用相称处罚的程序。关于协作规则的清晰指引可防止小组作业与带回家评估中的混淆。教育仍是核心，因为许多违规源于误解而非故意不诚实。 申诉途径存在，以便学生在程序看似不公时质疑调查结果。",
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
        "word": "misunderstanding",
        "spelling": "M-I-S-U-N-D-E-R-S-T-A-N-D-I-N-G",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 85,
    "en": "Urban heat islands intensify during prolonged summer heatwaves, raising health risks for elderly residents and outdoor workers. Tree canopy, reflective materials, and shaded transit stops can lower neighbourhood temperatures measurably. City governments prioritize interventions in areas with the least green cover and the highest vulnerability.",
    "zhAnalysis": "城市热岛在漫长夏季热浪期间加剧，提高老年居民与户外工作者的健康风险。树冠、反光材料与遮阴公交站可显著降低街区温度。市政府优先在绿地最少、脆弱性最高的区域进行干预。",
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
        "word": "interventions",
        "spelling": "I-N-T-E-R-V-E-N-T-I-O-N-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 86,
    "en": "Longitudinal studies track the same participants over extended periods to observe how behaviours and outcomes change with time. Although costly and complex, they provide stronger evidence about development than one-off surveys. Researchers must plan carefully for attrition so that remaining samples still represent the original population.",
    "zhAnalysis": "纵向研究在较长时期内追踪同一批参与者，以观察行为与结果如何随时间变化。虽成本高且复杂，但它们比一次性调查提供更强的发展证据。研究者必须仔细规划流失，使剩余样本仍能代表原总体。",
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
    ],
    "audioPreferTts": true
  },
  {
    "id": 87,
    "en": "Digital archives preserve rare manuscripts for future scholarship while allowing wider public access through searchable online catalogues. Conservation teams balance handling restrictions with the educational value of displaying originals in exhibitions. Metadata standards ensure that digitized items remain discoverable as platforms and formats evolve. Partnerships with libraries abroad expand collections without shipping fragile physical volumes.",
    "zhAnalysis": "数字档案为未来学术保存罕见手稿，同时通过可检索在线目录扩大公众访问。保护团队在取用限制与展出原件的教育价值之间取得平衡。元数据标准确保随着平台与格式演变，数字化条目仍可被发现。 与海外图书馆的合作可在无需运送脆弱实体卷册的情况下扩展馆藏。",
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
        "word": "Conservation",
        "spelling": "C-O-N-S-E-R-V-A-T-I-O-N",
        "gloss": "保护",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 88,
    "en": "Effective paraphrasing demonstrates understanding rather than superficial synonym replacement that leaves original sentence structure intact. Students practise restructuring ideas in their own words while preserving accurate meaning and attribution. Tutors highlight successful examples so that learners can see the difference between copying and genuine reformulation.",
    "zhAnalysis": "有效的释义展示理解，而非保留原句结构的表面同义词替换。学生练习用自己的话重组观点，同时保持准确含义与归属。导师突出成功例子，使学习者看出抄写与真正改写的差别。",
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
        "word": "reformulation",
        "spelling": "R-E-F-O-R-M-U-L-A-T-I-O-N",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 89,
    "en": "Public health campaigns aim to reduce tobacco use among adolescents through education, advertising restrictions, and accessible cessation support. Messages focus on immediate social and athletic benefits as well as long-term disease risks. Evaluation studies measure whether exposure to campaigns actually changes attitudes and smoking behaviour over time.",
    "zhAnalysis": "公共卫生宣传旨在通过教育、广告限制与可及的戒烟支持减少青少年烟草使用。信息既关注即时的社交与运动益处，也强调长期疾病风险。评估研究衡量接触宣传是否真正随时间改变态度与吸烟行为。",
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
        "word": "restrictions",
        "spelling": "R-E-S-T-R-I-C-T-I-O-N-S",
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  },
  {
    "id": 90,
    "en": "Interdisciplinary research bridges gaps between traditionally separate fields and generates insights that single-discipline approaches may overlook. Teams negotiate shared vocabulary, methods, and authorship norms before data collection begins. Funding agencies increasingly reward proposals that demonstrate genuine integration rather than loosely connected parallel workstreams. Evaluation criteria now ask teams to show how each discipline shaped the final conclusions.",
    "zhAnalysis": "跨学科研究弥合传统分离领域之间的鸿沟，并产生单一学科方法可能忽略的洞见。团队在开始数据收集前协商共享词汇、方法与署名规范。资助机构日益奖励展示真正整合、而非松散并行工作流的提案。 评估标准现要求团队说明每一学科如何塑造最终结论。",
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
        "gloss": "",
        "tip": ""
      }
    ],
    "audioPreferTts": true
  }
];
  global.RA_BANK = RA_BANK;
  if (typeof module !== "undefined" && module.exports) module.exports = RA_BANK;
})(typeof window !== "undefined" ? window : globalThis);
