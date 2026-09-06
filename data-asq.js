/**
 * chinaPTE · ASQ — Answer Short Question
 * Total: 42 items
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
  }
];
  ASQ_BANK.forEach(function (item) {
    if (!item.sentence && item.en) item.sentence = item.en;
    if (!item.analysis && item.zhAnalysis) item.analysis = item.zhAnalysis;
  });
  global.ASQ_BANK = ASQ_BANK;
})(typeof window !== "undefined" ? window : globalThis);
