/**
 * chinaPTE · ASQ — Answer Short Question
 * Total: 90 items
 */
(function (global) {
  "use strict";
  var ASQ_BANK = [
  {
    "id": 1,
    "en": "What do we call a doctor who specializes in treating children?",
    "question": "What do we call a doctor who specializes in treating children?",
    "answer": "pediatrician / a pediatrician",
    "zhAnalysis": "儿科医生。听清 who specializes in。",
    "vocab": []
  },
  {
    "id": 2,
    "en": "How many days are there in a leap year?",
    "question": "How many days are there in a leap year?",
    "answer": "366",
    "zhAnalysis": "闰年366天。",
    "vocab": []
  },
  {
    "id": 3,
    "en": "What organ pumps blood throughout the body?",
    "question": "What organ pumps blood throughout the body?",
    "answer": "the heart / heart",
    "zhAnalysis": "心脏。",
    "vocab": []
  },
  {
    "id": 4,
    "en": "What is the capital city of Australia?",
    "question": "What is the capital city of Australia?",
    "answer": "Canberra",
    "zhAnalysis": "堪培拉，不是悉尼。",
    "vocab": []
  },
  {
    "id": 5,
    "en": "Which planet is closest to the Sun?",
    "question": "Which planet is closest to the Sun?",
    "answer": "Mercury",
    "zhAnalysis": "水星。",
    "vocab": []
  },
  {
    "id": 6,
    "en": "What do bees produce that people eat?",
    "question": "What do bees produce that people eat?",
    "answer": "honey",
    "zhAnalysis": "蜂蜜。",
    "vocab": []
  },
  {
    "id": 7,
    "en": "How many sides does a triangle have?",
    "question": "How many sides does a triangle have?",
    "answer": "three / 3",
    "zhAnalysis": "三角形三边。",
    "vocab": []
  },
  {
    "id": 8,
    "en": "What is H2O commonly known as?",
    "question": "What is H2O commonly known as?",
    "answer": "water",
    "zhAnalysis": "水。",
    "vocab": []
  },
  {
    "id": 9,
    "en": "Which animal is known as the king of the jungle?",
    "question": "Which animal is known as the king of the jungle?",
    "answer": "lion / the lion",
    "zhAnalysis": "狮子。",
    "vocab": []
  },
  {
    "id": 10,
    "en": "What do you call a person who writes books?",
    "question": "What do you call a person who writes books?",
    "answer": "author / writer",
    "zhAnalysis": "作者/作家。",
    "vocab": []
  },
  {
    "id": 11,
    "en": "In which season do leaves usually fall from trees?",
    "question": "In which season do leaves usually fall from trees?",
    "answer": "autumn / fall",
    "zhAnalysis": "秋天。",
    "vocab": []
  },
  {
    "id": 12,
    "en": "What instrument measures temperature?",
    "question": "What instrument measures temperature?",
    "answer": "thermometer",
    "zhAnalysis": "温度计。",
    "vocab": []
  },
  {
    "id": 13,
    "en": "How many hours are there in a day?",
    "question": "How many hours are there in a day?",
    "answer": "24 / twenty-four",
    "zhAnalysis": "24小时。",
    "vocab": []
  },
  {
    "id": 14,
    "en": "What is the largest ocean on Earth?",
    "question": "What is the largest ocean on Earth?",
    "answer": "Pacific / the Pacific Ocean",
    "zhAnalysis": "太平洋。",
    "vocab": []
  },
  {
    "id": 15,
    "en": "What color do you get when you mix red and blue?",
    "question": "What color do you get when you mix red and blue?",
    "answer": "purple / violet",
    "zhAnalysis": "紫色。",
    "vocab": []
  },
  {
    "id": 16,
    "en": "Which gas do plants absorb from the air?",
    "question": "Which gas do plants absorb from the air?",
    "answer": "carbon dioxide / CO2",
    "zhAnalysis": "二氧化碳。",
    "vocab": []
  },
  {
    "id": 17,
    "en": "What do we call frozen water?",
    "question": "What do we call frozen water?",
    "answer": "ice",
    "zhAnalysis": "冰。",
    "vocab": []
  },
  {
    "id": 18,
    "en": "How many legs does a spider typically have?",
    "question": "How many legs does a spider typically have?",
    "answer": "eight / 8",
    "zhAnalysis": "蜘蛛八条腿。",
    "vocab": []
  },
  {
    "id": 19,
    "en": "What is the opposite of hot?",
    "question": "What is the opposite of hot?",
    "answer": "cold",
    "zhAnalysis": "冷。",
    "vocab": []
  },
  {
    "id": 20,
    "en": "Which continent is the Sahara Desert located on?",
    "question": "Which continent is the Sahara Desert located on?",
    "answer": "Africa",
    "zhAnalysis": "非洲。",
    "vocab": []
  },
  {
    "id": 21,
    "en": "What do you use to look at distant stars?",
    "question": "What do you use to look at distant stars?",
    "answer": "telescope",
    "zhAnalysis": "望远镜。",
    "vocab": []
  },
  {
    "id": 22,
    "en": "How many months have twenty-eight days?",
    "question": "How many months have twenty-eight days?",
    "answer": "all of them / 12",
    "zhAnalysis": "所有月份都至少有28天。",
    "vocab": []
  },
  {
    "id": 23,
    "en": "What is a baby cat called?",
    "question": "What is a baby cat called?",
    "answer": "kitten",
    "zhAnalysis": "小猫。",
    "vocab": []
  },
  {
    "id": 24,
    "en": "Which sense organ do we use to smell?",
    "question": "Which sense organ do we use to smell?",
    "answer": "nose / the nose",
    "zhAnalysis": "鼻子。",
    "vocab": []
  },
  {
    "id": 25,
    "en": "What metal is liquid at room temperature?",
    "question": "What metal is liquid at room temperature?",
    "answer": "mercury",
    "zhAnalysis": "汞/水银。",
    "vocab": []
  },
  {
    "id": 26,
    "en": "How many wheels does a bicycle have?",
    "question": "How many wheels does a bicycle have?",
    "answer": "two / 2",
    "zhAnalysis": "两轮。",
    "vocab": []
  },
  {
    "id": 27,
    "en": "What do we call the study of living organisms?",
    "question": "What do we call the study of living organisms?",
    "answer": "biology",
    "zhAnalysis": "生物学。",
    "vocab": []
  },
  {
    "id": 28,
    "en": "Which direction does the sun rise from?",
    "question": "Which direction does the sun rise from?",
    "answer": "east",
    "zhAnalysis": "东方。",
    "vocab": []
  },
  {
    "id": 29,
    "en": "What is the main language spoken in Brazil?",
    "question": "What is the main language spoken in Brazil?",
    "answer": "Portuguese",
    "zhAnalysis": "葡萄牙语。",
    "vocab": []
  },
  {
    "id": 30,
    "en": "How many strings does a standard guitar have?",
    "question": "How many strings does a standard guitar have?",
    "answer": "six / 6",
    "zhAnalysis": "六弦。",
    "vocab": []
  },
  {
    "id": 31,
    "en": "What do birds use to fly?",
    "question": "What do birds use to fly?",
    "answer": "wings",
    "zhAnalysis": "翅膀。",
    "vocab": []
  },
  {
    "id": 32,
    "en": "Which vitamin do we get from sunlight?",
    "question": "Which vitamin do we get from sunlight?",
    "answer": "vitamin D / D",
    "zhAnalysis": "维生素D。",
    "vocab": []
  },
  {
    "id": 33,
    "en": "What is the boiling point of water in Celsius?",
    "question": "What is the boiling point of water in Celsius?",
    "answer": "100 / one hundred degrees",
    "zhAnalysis": "100摄氏度。",
    "vocab": []
  },
  {
    "id": 34,
    "en": "Who paints pictures as a profession?",
    "question": "Who paints pictures as a profession?",
    "answer": "painter / an artist",
    "zhAnalysis": "画家。",
    "vocab": []
  },
  {
    "id": 35,
    "en": "What do we call water falling from clouds?",
    "question": "What do we call water falling from clouds?",
    "answer": "rain",
    "zhAnalysis": "雨。",
    "vocab": []
  },
  {
    "id": 36,
    "en": "How many players are on a soccer team on the field?",
    "question": "How many players are on a soccer team on the field?",
    "answer": "eleven / 11",
    "zhAnalysis": "场上11人。",
    "vocab": []
  },
  {
    "id": 37,
    "en": "What part of a plant grows underground?",
    "question": "What part of a plant grows underground?",
    "answer": "roots",
    "zhAnalysis": "根。",
    "vocab": []
  },
  {
    "id": 38,
    "en": "Which animal gives us wool?",
    "question": "Which animal gives us wool?",
    "answer": "sheep",
    "zhAnalysis": "羊。",
    "vocab": []
  },
  {
    "id": 39,
    "en": "What do you call a shape with four equal sides?",
    "question": "What do you call a shape with four equal sides?",
    "answer": "square",
    "zhAnalysis": "正方形。",
    "vocab": []
  },
  {
    "id": 40,
    "en": "How many letters are in the English alphabet?",
    "question": "How many letters are in the English alphabet?",
    "answer": "26 / twenty-six",
    "zhAnalysis": "26个字母。",
    "vocab": []
  },
  {
    "id": 41,
    "en": "What force keeps us on the ground?",
    "question": "What force keeps us on the ground?",
    "answer": "gravity",
    "zhAnalysis": "重力。",
    "vocab": []
  },
  {
    "id": 42,
    "en": "Which meal is typically eaten in the morning?",
    "question": "Which meal is typically eaten in the morning?",
    "answer": "breakfast",
    "zhAnalysis": "早餐。",
    "vocab": []
  },
  {
    "id": 43,
    "en": "What do we call the study of living organisms?",
    "question": "What do we call the study of living organisms?",
    "answer": "biology / biology.",
    "zhAnalysis": "生物学。",
    "vocab": []
  },
  {
    "id": 44,
    "en": "How many sides does a hexagon have?",
    "question": "How many sides does a hexagon have?",
    "answer": "six / 6",
    "zhAnalysis": "六边形有六条边。",
    "vocab": []
  },
  {
    "id": 45,
    "en": "What planet is known as the Red Planet?",
    "question": "What planet is known as the Red Planet?",
    "answer": "Mars",
    "zhAnalysis": "火星。",
    "vocab": []
  },
  {
    "id": 46,
    "en": "What do bees produce?",
    "question": "What do bees produce?",
    "answer": "honey",
    "zhAnalysis": "蜜蜂产蜜。",
    "vocab": []
  },
  {
    "id": 47,
    "en": "What is the opposite of hot?",
    "question": "What is the opposite of hot?",
    "answer": "cold",
    "zhAnalysis": "hot 的反义是 cold。",
    "vocab": []
  },
  {
    "id": 48,
    "en": "Which ocean is the largest?",
    "question": "Which ocean is the largest?",
    "answer": "the Pacific / Pacific Ocean",
    "zhAnalysis": "太平洋最大。",
    "vocab": []
  },
  {
    "id": 49,
    "en": "What do we call a baby cat?",
    "question": "What do we call a baby cat?",
    "answer": "kitten / a kitten",
    "zhAnalysis": "小猫叫 kitten。",
    "vocab": []
  },
  {
    "id": 50,
    "en": "How many minutes are there in an hour?",
    "question": "How many minutes are there in an hour?",
    "answer": "sixty / 60",
    "zhAnalysis": "一小时六十分钟。",
    "vocab": []
  },
  {
    "id": 51,
    "en": "What gas do plants absorb from the air?",
    "question": "What gas do plants absorb from the air?",
    "answer": "carbon dioxide / CO2",
    "zhAnalysis": "植物吸收二氧化碳。",
    "vocab": []
  },
  {
    "id": 52,
    "en": "What is H2O commonly known as?",
    "question": "What is H2O commonly known as?",
    "answer": "water",
    "zhAnalysis": "H2O即水。",
    "vocab": []
  },
  {
    "id": 53,
    "en": "Who writes a novel?",
    "question": "Who writes a novel?",
    "answer": "an author / a novelist / writer",
    "zhAnalysis": "小说作者。",
    "vocab": []
  },
  {
    "id": 54,
    "en": "What do we call frozen water?",
    "question": "What do we call frozen water?",
    "answer": "ice",
    "zhAnalysis": "冰。",
    "vocab": []
  },
  {
    "id": 55,
    "en": "Which sense do we use to hear?",
    "question": "Which sense do we use to hear?",
    "answer": "hearing / the sense of hearing",
    "zhAnalysis": "听觉。",
    "vocab": []
  },
  {
    "id": 56,
    "en": "What is the past tense of go?",
    "question": "What is the past tense of go?",
    "answer": "went",
    "zhAnalysis": "go 的过去式是 went。",
    "vocab": []
  },
  {
    "id": 57,
    "en": "How many legs does a spider have?",
    "question": "How many legs does a spider have?",
    "answer": "eight / 8",
    "zhAnalysis": "蜘蛛有八条腿。",
    "vocab": []
  },
  {
    "id": 58,
    "en": "What do we call the middle of the day?",
    "question": "What do we call the middle of the day?",
    "answer": "noon / midday",
    "zhAnalysis": "正午。",
    "vocab": []
  },
  {
    "id": 59,
    "en": "Which instrument has black and white keys?",
    "question": "Which instrument has black and white keys?",
    "answer": "piano / a piano",
    "zhAnalysis": "钢琴。",
    "vocab": []
  },
  {
    "id": 60,
    "en": "What do we call a place where books are kept for borrowing?",
    "question": "What do we call a place where books are kept for borrowing?",
    "answer": "library / a library",
    "zhAnalysis": "图书馆。",
    "vocab": []
  },
  {
    "id": 61,
    "en": "What colour do you get when you mix red and yellow?",
    "question": "What colour do you get when you mix red and yellow?",
    "answer": "orange",
    "zhAnalysis": "红+黄=橙。",
    "vocab": []
  },
  {
    "id": 62,
    "en": "What is the capital of Japan?",
    "question": "What is the capital of Japan?",
    "answer": "Tokyo",
    "zhAnalysis": "东京。",
    "vocab": []
  },
  {
    "id": 63,
    "en": "What do we call animals that eat only plants?",
    "question": "What do we call animals that eat only plants?",
    "answer": "herbivores / herbivore",
    "zhAnalysis": "食草动物。",
    "vocab": []
  },
  {
    "id": 64,
    "en": "How many wheels does a bicycle have?",
    "question": "How many wheels does a bicycle have?",
    "answer": "two / 2",
    "zhAnalysis": "自行车两轮。",
    "vocab": []
  },
  {
    "id": 65,
    "en": "What do we call the person who flies an aeroplane?",
    "question": "What do we call the person who flies an aeroplane?",
    "answer": "pilot / a pilot",
    "zhAnalysis": "飞行员。",
    "vocab": []
  },
  {
    "id": 66,
    "en": "Which season comes after winter?",
    "question": "Which season comes after winter?",
    "answer": "spring",
    "zhAnalysis": "冬后是春。",
    "vocab": []
  },
  {
    "id": 67,
    "en": "What is the largest mammal on Earth?",
    "question": "What is the largest mammal on Earth?",
    "answer": "blue whale / the blue whale",
    "zhAnalysis": "蓝鲸。",
    "vocab": []
  },
  {
    "id": 68,
    "en": "What do we use to measure temperature?",
    "question": "What do we use to measure temperature?",
    "answer": "thermometer / a thermometer",
    "zhAnalysis": "温度计。",
    "vocab": []
  },
  {
    "id": 69,
    "en": "What is the currency of the United Kingdom?",
    "question": "What is the currency of the United Kingdom?",
    "answer": "pound / pound sterling",
    "zhAnalysis": "英镑。",
    "vocab": []
  },
  {
    "id": 70,
    "en": "What do we call a word with the same meaning as another?",
    "question": "What do we call a word with the same meaning as another?",
    "answer": "synonym / a synonym",
    "zhAnalysis": "同义词。",
    "vocab": []
  },
  {
    "id": 71,
    "en": "How many continents are there?",
    "question": "How many continents are there?",
    "answer": "seven / 7",
    "zhAnalysis": "七大洲。",
    "vocab": []
  },
  {
    "id": 72,
    "en": "What organ do we use to breathe?",
    "question": "What organ do we use to breathe?",
    "answer": "lungs / the lungs",
    "zhAnalysis": "肺。",
    "vocab": []
  },
  {
    "id": 73,
    "en": "What is the boiling point of water in Celsius?",
    "question": "What is the boiling point of water in Celsius?",
    "answer": "100 / one hundred degrees",
    "zhAnalysis": "摄氏100度。",
    "vocab": []
  },
  {
    "id": 74,
    "en": "What do we call a shape with three sides?",
    "question": "What do we call a shape with three sides?",
    "answer": "triangle / a triangle",
    "zhAnalysis": "三角形。",
    "vocab": []
  },
  {
    "id": 75,
    "en": "Which bird cannot fly but is a fast runner?",
    "question": "Which bird cannot fly but is a fast runner?",
    "answer": "ostrich / an ostrich",
    "zhAnalysis": "鸵鸟。",
    "vocab": []
  },
  {
    "id": 76,
    "en": "What do we call the study of the past?",
    "question": "What do we call the study of the past?",
    "answer": "history",
    "zhAnalysis": "历史学。",
    "vocab": []
  },
  {
    "id": 77,
    "en": "What is the opposite of expensive?",
    "question": "What is the opposite of expensive?",
    "answer": "cheap / inexpensive",
    "zhAnalysis": "expensive 反义 cheap。",
    "vocab": []
  },
  {
    "id": 78,
    "en": "What do we call rain when it freezes?",
    "question": "What do we call rain when it freezes?",
    "answer": "hail / sleet / snow (accept hail)",
    "zhAnalysis": "冰雹/冻雨。",
    "vocab": []
  },
  {
    "id": 79,
    "en": "Who treats sick animals?",
    "question": "Who treats sick animals?",
    "answer": "veterinarian / vet / a vet",
    "zhAnalysis": "兽医。",
    "vocab": []
  },
  {
    "id": 80,
    "en": "What is the first meal of the day called?",
    "question": "What is the first meal of the day called?",
    "answer": "breakfast",
    "zhAnalysis": "早餐。",
    "vocab": []
  },
  {
    "id": 81,
    "en": "How many days are there in a fortnight?",
    "question": "How many days are there in a fortnight?",
    "answer": "fourteen / 14",
    "zhAnalysis": "两周十四天。",
    "vocab": []
  },
  {
    "id": 82,
    "en": "What do we call a baby dog?",
    "question": "What do we call a baby dog?",
    "answer": "puppy / a puppy",
    "zhAnalysis": "小狗。",
    "vocab": []
  },
  {
    "id": 83,
    "en": "Which metal is liquid at room temperature?",
    "question": "Which metal is liquid at room temperature?",
    "answer": "mercury",
    "zhAnalysis": "汞。",
    "vocab": []
  },
  {
    "id": 84,
    "en": "What do we call the top of a mountain?",
    "question": "What do we call the top of a mountain?",
    "answer": "peak / summit",
    "zhAnalysis": "山顶。",
    "vocab": []
  },
  {
    "id": 85,
    "en": "What do you call a book of maps?",
    "question": "What do you call a book of maps?",
    "answer": "An atlas",
    "zhAnalysis": "装订成册的地图集叫什么？图集/地图册。",
    "vocab": []
  },
  {
    "id": 86,
    "en": "How many sides does a hexagon have?",
    "question": "How many sides does a hexagon have?",
    "answer": "Six",
    "zhAnalysis": "六边形有几条边？六条。",
    "vocab": []
  },
  {
    "id": 87,
    "en": "What instrument is used to measure temperature?",
    "question": "What instrument is used to measure temperature?",
    "answer": "A thermometer",
    "zhAnalysis": "用来测量温度的仪器是什么？温度计。",
    "vocab": []
  },
  {
    "id": 88,
    "en": "What is the opposite of artificial?",
    "question": "What is the opposite of artificial?",
    "answer": "Natural",
    "zhAnalysis": "artificial 的反义词是什么？natural（自然的）。",
    "vocab": []
  },
  {
    "id": 89,
    "en": "Where do students borrow books on campus?",
    "question": "Where do students borrow books on campus?",
    "answer": "The library",
    "zhAnalysis": "学生在校园哪里借书？图书馆。",
    "vocab": []
  },
  {
    "id": 90,
    "en": "What do we call water in solid form?",
    "question": "What do we call water in solid form?",
    "answer": "Ice",
    "zhAnalysis": "固态的水叫什么？冰。",
    "vocab": []
  }
];
  ASQ_BANK.forEach(function (item) {
    if (!item.sentence && item.en) item.sentence = item.en;
    if (!item.analysis && item.zhAnalysis) item.analysis = item.zhAnalysis;
  });

  global.ASQ_BANK = ASQ_BANK;
})(typeof window !== "undefined" ? window : globalThis);
