const quizQuestions = [
  {
    id: "5f51b8d1-3e9e-41c9-b98b-6b6d6b11e2b3",
    question:
      "What is the capital city of Nigeria? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam at non consectetur excepturi praesentium dolore autem necessitatibus hic. Harum repudiandae obcaecati ab voluptatum rerum ipsa optio totam, perferendis quia similique eos commodi fuga asperiores!",
    image: "/img/quiz/q1.png",
    options: [
      { id: "c8cb0ca5-ce50-441d-b670-8a2dbf7e94c6", name: "Lagos" },
      { id: "b2f21517-89e5-48f7-87ff-4ce9a5fcc92b", name: "Abuja" },
      { id: "c531209d-e772-48ae-8c6b-d2a84695cc7c", name: "Kano" },
      { id: "3c5de782-6184-4757-adcc-7089e21b0b8a", name: "Port Harcourt" },
    ],
    correctAnswer: "b2f21517-89e5-48f7-87ff-4ce9a5fcc92b",
    category: "1fa4c3a7-967c-4bd6-b1cd-fb7644e7d01b",
  },
  {
    id: "ac7e8f88-fc7c-4efb-9b9f-72d8f6be0cf4",
    question: "Which planet is known as the Red Planet?",
    options: [
      { id: "3f7d60d2-c670-48bc-a23d-06edcf1767a7", name: "Earth" },
      { id: "a8df635d-105b-45d7-8ae3-531cfbaf8d8a", name: "Venus" },
      { id: "d9c9a0c8-458f-4b9e-8c5c-b4b67e0e3ed8", name: "Mars" },
      { id: "abe3f67b-b5bb-499b-8a32-72e1efab4c8b", name: "Jupiter" },
    ],
    correctAnswer: "d9c9a0c8-458f-4b9e-8c5c-b4b67e0e3ed8",
    category: "d6b6f7bb-1e13-49db-81a5-5a5cf967ef8d",
  },
  {
    id: "432fd8f4-2ad4-4b34-b324-b70fc8d05e69",
    question: "What is the square root of 64?",
    options: [
      { id: "89bf4183-6f27-42f3-8e6d-53e2b9b7cb19", name: "6" },
      { id: "aa57ec3c-3dbd-485a-b20a-f687b1fd1c3d", name: "7" },
      { id: "342f30bb-2ec3-4648-95b2-1bdc9c58ae73", name: "8" },
      { id: "eaa80792-b61a-4b11-a15b-73960a9e9282", name: "9" },
    ],
    correctAnswer: "342f30bb-2ec3-4648-95b2-1bdc9c58ae73",
    category: "98e41e0f-1534-4e24-83f1-7a3fbf6df6be",
  },
  {
    id: "3b3c4d9c-e432-4985-85b9-28a56f5a7cb6",
    question: "What does 'www' stand for in a web address?",
    options: [
      { id: "ba4e1bda-2fd2-4096-9154-e01a1baf8f10", name: "World Wide Web" },
      {
        id: "917c1f35-d8c8-4a60-b623-d2a8c83b5277",
        name: "World Wide Website",
      },
      { id: "aed815f3-37b7-42db-9636-b9dc08d5b1a4", name: "Web World Wide" },
      {
        id: "ad1e34ab-0f7e-4093-bda1-5cd7266f1b73",
        name: "Website World Wide",
      },
    ],
    correctAnswer: "ba4e1bda-2fd2-4096-9154-e01a1baf8f10",
    category: "b3e5d8e8-fc7c-4c1b-a9f7-3d9ef64e7cb7",
  },
  {
    id: "c3a4e8f9-16d3-4f2f-b2c7-bf47c94afcbc",
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      {
        id: "ee6159f4-8e65-4a33-9b24-e4bb95a9c7f2",
        name: "William Shakespeare",
      },
      { id: "17c9f8f3-9648-4ba5-a0b9-2f7638f4bc99", name: "Mark Twain" },
      { id: "cc9c5f82-285b-4511-9b25-d8d39e52f5b3", name: "Charles Dickens" },
      { id: "2b6dfb9f-7d2b-4f5d-b2e2-5a3fc8d3cbe2", name: "Jane Austen" },
    ],
    correctAnswer: "ee6159f4-8e65-4a33-9b24-e4bb95a9c7f2",
    category: "dd9c1b8f-4fb5-4d1b-b7c7-e1a4b84f8d3c",
  },
];

const quizOptionNames = ["A", "B", "C", "D"];

const subjects = [
  { id: "d6b6f7bb-1e13-49db-81a5-5a5cf967ef8d", name: "Mathematics" },
  { id: "98e41e0f-1534-4e24-83f1-7a3fbf6df6be", name: "Science" },
  { id: "b3e5d8e8-fc7c-4c1b-a9f7-3d9ef64e7cb7", name: "Literature" },
  { id: "dd9c1b8f-4fb5-4d1b-b7c7-e1a4b84f8d3c", name: "English" },
];

module.exports = { quizQuestions, quizOptionNames, subjects };
