const courseData = {
  1: {
    id: 1,
    title: "Парикмахерский курс 1",
    description: "Полный курс по основам парикмахерского искусства.",
    duration: "4 недели",
    totalLessons: 21,
    modules: [
      {
        id: 1,
        title: "Введение в профессию",
        lessons: [
          {
            id: 1,
            title: "История парикмахерского искусства",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Эволюция стилей",
              description: "Подберите 5 старинных причесок, сравните технику.",
              deadline: "2024-12-20",
              maxFileSize: 50,
              allowedFormats: [".pdf", ".jpg"]
            }
          },
          {
            id: 2,
            title: "Инструменты и их назначение",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Каталог инструментов",
              description: "Создайте короткий каталог с фото каждого инструмента.",
              deadline: "2024-12-21",
              maxFileSize: 4,
              allowedFormats: [".jpg", ".png", ".pdf"]
            }
          },
          {
            id: 3,
            title: "Техника безопасности",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Правила безопасности",
              description: "Напишите список правил и оформите в документе.",
              deadline: "2024-12-21",
              maxFileSize: 3,
              allowedFormats: [".docx", ".pdf"]
            }
          }
        ]
      },
      {
        id: 2,
        title: "Инструменты и материалы",
        lessons: [
          {
            id: 4,
            title: "Ножницы и их виды",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Сравнение ножниц",
              description: "Сравните прямые, филировочные и текстурирующие ножницы.",
              deadline: "2024-12-22",
              maxFileSize: 8,
              allowedFormats: [".jpg", ".png", ".pdf"]
            }
          },
          {
            id: 5,
            title: "Расчески и щетки",
            videoId: "761d5f177b954eb2c72302e8c79f604c",
            homework: {
              title: "Обзор расчесок",
              description: "Сделайте фото 3 видов расчесок и опишите назначение.",
              deadline: "2024-12-22",
              maxFileSize: 6,
              allowedFormats: [".jpg", ".png"]
            }
          },
          {
            id: 6,
            title: "Стайлинговые средства",
            videoId: "22a315582fceb6b9d8b090ff114e2c0e",
            homework: {
              title: "Каталог средств",
              description: "Соберите 5 популярных средств и составьте таблицу.",
              deadline: "2024-12-23",
              maxFileSize: 10,
              allowedFormats: [".docx", ".jpg", ".png"]
            }
          },
          {
            id: 7,
            title: "Уход за инструментами",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Чистка инструментов",
              description: "Запишите пошаговый процесс ухода за инструментами.",
              deadline: "2024-12-23",
              maxFileSize: 4,
              allowedFormats: [".pdf", ".docx"]
            }
          }
        ]
      },
      {
        id: 3,
        title: "Базовые техники стрижек",
        lessons: [
          {
            id: 8,
            title: "Техника тушевки",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Тушевка на манекене",
              description: "Сделайте фото до/после тушевки.",
              deadline: "2024-12-24",
              maxFileSize: 15,
              allowedFormats: [".jpg", ".png"]
            }
          },
          {
            id: 9,
            title: "Техника градуировки",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Градуировка",
              description: "Снимите короткое видео выполнения градуировки.",
              deadline: "2024-12-25",
              maxFileSize: 20,
              allowedFormats: [".mp4"]
            }
          },
          {
            id: 10,
            title: "Техника каскада",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Каскадная схема",
              description: "Нарисуйте схему каскадной стрижки.",
              deadline: "2024-12-25",
              maxFileSize: 5,
              allowedFormats: [".jpg", ".png"]
            }
          },
          {
            id: 11,
            title: "Техника асимметрии",
            videoId: "761d5f177b954eb2c72302e8c79f604c",
            homework: {
              title: "Асимметричная стрижка",
              description: "Сделайте 3 фото результата с разных ракурсов.",
              deadline: "2024-12-26",
              maxFileSize: 20,
              allowedFormats: [".jpg", ".png"]
            }
          },
          {
            id: 12,
            title: "Работа с машинкой",
            videoId: "22a315582fceb6b9d8b090ff114e2c0e",
            homework: {
              title: "Смена насадок",
              description: "Снимите короткое видео демонстрации 3 насадок.",
              deadline: "2024-12-26",
              maxFileSize: 10,
              allowedFormats: [".mp4"]
            }
          },
          {
            id: 13,
            title: "Финализация стрижки",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Финишная обработка",
              description: "Покажите обработку контуров.",
              deadline: "2024-12-27",
              maxFileSize: 12,
              allowedFormats: [".jpg", ".png", ".mp4"]
            }
          }
        ]
      },
      {
        id: 4,
        title: "Укладки и стайлинг",
        lessons: [
          {
            id: 14,
            title: "Основные виды укладок",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Брашинг",
              description: "Сделайте видео процесса брашинга.",
              deadline: "2024-12-28",
              maxFileSize: 25,
              allowedFormats: [".mp4", ".jpg"]
            }
          },
          {
            id: 15,
            title: "Работа с феном",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Направления потока",
              description: "Снимите фото правильного угла подачи воздуха.",
              deadline: "2024-12-28",
              maxFileSize: 8,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 16,
            title: "Укладка на брашинг",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Работа с объемом",
              description: "Покажите приемы создания объема у корня.",
              deadline: "2024-12-29",
              maxFileSize: 10,
              allowedFormats: [".mp4", ".jpg"]
            }
          },
          {
            id: 17,
            title: "Вечерние прически",
            videoId: "761d5f177b954eb2c72302e8c79f604c",
            homework: {
              title: "Вечерний образ",
              description: "Сделайте фото прически в 4 ракурсах.",
              deadline: "2024-12-29",
              maxFileSize: 12,
              allowedFormats: [".jpg", ".png"]
            }
          },
          {
            id: 18,
            title: "Создание локонов",
            videoId: "22a315582fceb6b9d8b090ff114e2c0e",
            homework: {
              title: "Локоны",
              description: "Сделайте фото до/после накрутки.",
              deadline: "2024-12-30",
              maxFileSize: 15,
              allowedFormats: [".jpg"]
            }
          }
        ]
      },
      {
        id: 5,
        title: "Работа с клиентами",
        lessons: [
          {
            id: 19,
            title: "Консультация клиента",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Диалог",
              description: "Запишите короткий аудио-диалог консультации.",
              deadline: "2024-12-30",
              maxFileSize: 5,
              allowedFormats: [".mp3", ".pdf"]
            }
          },
          {
            id: 20,
            title: "Подбор стрижки по типу лица",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Таблица подборов",
              description: "Создайте таблицу: тип лица → подходящие стрижки.",
              deadline: "2024-12-30",
              maxFileSize: 6,
              allowedFormats: [".pdf", ".docx"]
            }
          },
          {
            id: 21,
            title: "Заключительный этап обслуживания",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Полный сервис",
              description: "Задокументируйте полный цикл работы с клиентом.",
              deadline: "2024-12-31",
              maxFileSize: 30,
              allowedFormats: [".jpg", ".mp4", ".pdf"]
            }
          }
        ]
      }
    ]
  },

  2: {
    id: 2,
    title: "Стрижки и укладки",
    description: "Продвинутый курс по техникам стрижек.",
    duration: "3 недели",
    totalLessons: 11,
    modules: [
      {
        id: 1,
        title: "Мужские стрижки",
        lessons: [
          {
            id: 1,
            title: "Классическая мужская стрижка",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Классика",
              description: "Фото до/после, описание техники.",
              deadline: "2024-12-27",
              maxFileSize: 15,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 2,
            title: "Модные тенденции 2024",
            videoId: "761d5f177b954eb2c72302e8c79f604c",
            homework: {
              title: "Тенденции",
              description: "Подборка 5 трендов в мужских стрижках.",
              deadline: "2024-12-28",
              maxFileSize: 8,
              allowedFormats: [".pdf"]
            }
          },
          {
            id: 3,
            title: "Стрижка канадка",
            videoId: "22a315582fceb6b9d8b090ff114e2c0e",
            homework: {
              title: "Канадка",
              description: "Видео выполнения стрижки.",
              deadline: "2024-12-28",
              maxFileSize: 20,
              allowedFormats: [".mp4"]
            }
          },
          {
            id: 4,
            title: "Фейд и текстурирование",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Фейд",
              description: "Фото с разных ракурсов.",
              deadline: "2024-12-29",
              maxFileSize: 18,
              allowedFormats: [".jpg", ".png"]
            }
          },
          {
            id: 5,
            title: "Борода и усы",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Моделирование бороды",
              description: "Покажите линию окантовки.",
              deadline: "2024-12-29",
              maxFileSize: 10,
              allowedFormats: [".jpg"]
            }
          }
        ]
      },
      {
        id: 2,
        title: "Женские стрижки",
        lessons: [
          {
            id: 6,
            title: "Короткие женские стрижки",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Короткая стрижка",
              description: "Документируйте этапы выполнения.",
              deadline: "2024-12-30",
              maxFileSize: 20,
              allowedFormats: [".jpg", ".mp4"]
            }
          },
          {
            id: 7,
            title: "Стрижки на средние волосы",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Средняя длина",
              description: "Фото схемы срезов.",
              deadline: "2024-12-30",
              maxFileSize: 6,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 8,
            title: "Длинные волосы: техники",
            videoId: "761d5f177b954eb2c72302e8c79f604c",
            homework: {
              title: "Работа с длиной",
              description: "Покажите градуировку на длинных волосах.",
              deadline: "2024-12-31",
              maxFileSize: 14,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 9,
            title: "Челки и их виды",
            videoId: "22a315582fceb6b9d8b090ff114e2c0e",
            homework: {
              title: "Челки",
              description: "Фото 3 видов челок на манекене.",
              deadline: "2024-12-31",
              maxFileSize: 10,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 10,
            title: "Асимметричные стрижки",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Асимметрия длинных волос",
              description: "Сделайте фото до/после.",
              deadline: "2024-12-31",
              maxFileSize: 22,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 11,
            title: "Многослойные стрижки",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Слои",
              description: "Нарисуйте схему уровней срезов.",
              deadline: "2024-12-31",
              maxFileSize: 5,
              allowedFormats: [".jpg", ".png"]
            }
          }
        ]
      }
    ]
  },

  3: {
    id: 3,
    title: "Колористика",
    description: "Курс по современным техникам окрашивания.",
    duration: "2 недели",
    totalLessons: 8,
    modules: [
      {
        id: 1,
        title: "Основы цветоведения",
        lessons: [
          {
            id: 1,
            title: "Цветовой круг",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Цветовой круг",
              description: "Нарисуйте цветовой круг вручную.",
              deadline: "2024-12-22",
              maxFileSize: 10,
              allowedFormats: [".jpg", ".pdf"]
            }
          },
          {
            id: 2,
            title: "Теплые и холодные тона",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Тональность",
              description: "Сравните 6 оттенков по теплоте.",
              deadline: "2024-12-22",
              maxFileSize: 6,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 3,
            title: "Нюансы и полутона",
            videoId: "761d5f177b954eb2c72302e8c79f604c",
            homework: {
              title: "Полутона",
              description: "Создайте таблицу градаций оттенков.",
              deadline: "2024-12-23",
              maxFileSize: 8,
              allowedFormats: [".pdf"]
            }
          },
          {
            id: 4,
            title: "Сочетаемость цветов",
            videoId: "22a315582fceb6b9d8b090ff114e2c0e",
            homework: {
              title: "Цветовые пары",
              description: "Подберите 5 гармоничных комбинаций.",
              deadline: "2024-12-23",
              maxFileSize: 8,
              allowedFormats: [".pdf", ".jpg"]
            }
          }
        ]
      },
      {
        id: 2,
        title: "Техники окрашивания",
        lessons: [
          {
            id: 5,
            title: "Однотонное окрашивание",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Однотон",
              description: "Фото до/после окрашивания.",
              deadline: "2024-12-24",
              maxFileSize: 25,
              allowedFormats: [".jpg", ".mp4"]
            }
          },
          {
            id: 6,
            title: "Мелирование",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Мелирование",
              description: "Покажите 3 зоны мелирования.",
              deadline: "2024-12-24",
              maxFileSize: 10,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 7,
            title: "Омбре и балаяж",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Омбре",
              description: "Документируйте процесс окрашивания.",
              deadline: "2024-12-25",
              maxFileSize: 30,
              allowedFormats: [".mp4", ".jpg"]
            }
          },
          {
            id: 8,
            title: "Шатуш и сомбре",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Шатуш",
              description: "Сделайте фото результата.",
              deadline: "2024-12-25",
              maxFileSize: 18,
              allowedFormats: [".jpg"]
            }
          }
        ]
      }
    ]
  }
};