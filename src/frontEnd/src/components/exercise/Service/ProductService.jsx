export const ExerciseService = {
  getExercisesWithStepsData() {
    return [
      {
        id: 1,
        name: "Ms. Tish Gaylord",
        description:
          "Exercise - If you care about what other people think, you're never gonna do anything",
        steps: [
          {
            id: 1,
            name: "Aphrodite - Aries",
            stepNum: 1,
            description:
              "Step - The universe is a cruel, uncaring void. The key to being happy isn't a search for meaning. It's to just keep yourself busy with unimportant nonsense, and eventually, you'll be dead",
          },
          {
            id: 2,
            name: "Aphrodite - Libra",
            stepNum: 2,
            description:
              "Step - I need to go take a shower so I can't tell if I'm crying or not",
          },
          {
            id: 3,
            name: "Hades - Virgo",
            stepNum: 3,
            description:
              "Step - For a lot of people, life is just one long, hard kick in the urethra",
          },
        ],
      },
      {
        id: 2,
        name: "Isreal Walker",
        description:
          "Exercise - That's the problem with life, either you know what you want and you don't get what you want, or you get what you want and then you don't know what you want",
        steps: [
          {
            id: 4,
            name: "Hermes - Aries",
            stepNum: 1,
            description:
              "Step - The universe is a cruel, uncaring void. The key to being happy isn't a search for meaning. It's to just keep yourself busy with unimportant nonsense, and eventually, you'll be dead",
          },
        ],
      },
      {
        id: 3,
        name: "Marlena Schowalter",
        description: "Exercise - Dead on the inside, dead on the outside",
        steps: [
          {
            id: 5,
            name: "Apollo - Cancer",
            stepNum: 1,
            description: "Step - Spaghetti or not, here I come",
          },
          {
            id: 6,
            name: "Aphrodite - Gemini",
            stepNum: 2,
            description:
              "Step - Ow, crap. I hate this. Running is terrible. Everything is the worst",
          },
          {
            id: 7,
            name: "Athena - Sagittarius",
            stepNum: 3,
            description:
              "Step - Not understanding that you're a horrible person doesn't make you less of a horrible person",
          },
        ],
      },
      {
        id: 4,
        name: "Virgilio Schowalter",
        description:
          "Exercise - It gets easier. But you have to do it every day, that's the hard part. But it does get easier",
        steps: [
          {
            id: 8,
            name: "Artemis - Cancer",
            stepNum: 1,
            description:
              "Step - If you care about what other people think, you're never gonna do anything",
          },
          {
            id: 9,
            name: "Dionysus - Pisces",
            stepNum: 2,
            description:
              "Step - I do love you, by the way. I mean as much as I'm capable of loving anyone",
          },
          {
            id: 10,
            name: "Apollo - Capricorn",
            stepNum: 3,
            description:
              "Step - I do love you, by the way. I mean as much as I'm capable of loving anyone",
          },
        ],
      },
      {
        id: 5,
        name: "Jacalyn Larson",
        description:
          "Exercise - You know what the problem is with everybody? They all just want to hear what they already believe. No one ever wants to hear the truth",
        steps: [],
      },
      {
        id: 6,
        name: "Eva Wunsch",
        description:
          "Exercise - It gets easier. But you have to do it every day, that's the hard part. But it does get easier",
        steps: [
          {
            id: 11,
            name: "Zeus - Aquarius",
            stepNum: 1,
            description:
              "Step - Not understanding that you're a horrible person doesn't make you less of a horrible person",
          },
          {
            id: 12,
            name: "Hera - Taurus",
            stepNum: 2,
            description:
              "Step - It gets easier. But you have to do it every day, that's the hard part. But it does get easier",
          },
          {
            id: 13,
            name: "Demeter - Leo",
            stepNum: 3,
            description:
              "Step - You know what the problem is with everybody? They all just want to hear what they already believe. No one ever wants to hear the truth",
          },
        ],
      },
      {
        id: 7,
        name: "Jonas Considine",
        description:
          "Exercise - Not understanding that you're a horrible person doesn't make you less of a horrible person",
        steps: [
          {
            id: 14,
            name: "Artemis - Virgo",
            stepNum: 1,
            description:
              "Step - It gets easier. But you have to do it every day, that's the hard part. But it does get easier",
          },
        ],
      },
      {
        id: 8,
        name: "Will Marvin",
        description:
          "Exercise - If you care about what other people think, you're never gonna do anything",
        steps: [],
      },
      {
        id: 9,
        name: "Exercise - Karena Lueilwitz DDS",
        steps: [],
      },
      {
        id: 10,
        name: "Exercise - Petronila Wisozk",
        steps: [
          {
            id: 15,
            name: "Aphrodite - Aries",
            stepNum: 1,
            description: "Step - Dead on the inside, dead on the outside",
          },
          {
            id: 16,
            name: "Zeus - Leo",
            stepNum: 2,
            description:
              "Step - That's the problem with life, either you know what you want and you don't get what you want, or you get what you want and then you don't know what you want",
          },
          {
            id: 17,
            name: "Poseidon - Pisces",
            stepNum: 3,
            description:
              "Step - If you care about what other people think, you're never gonna do anything",
          },
        ],
      },
    ];
  },

  getExercisesData() {
    return this.getExercisesWithStepsData();
  },

  getExercisesMini() {
    return Promise.resolve(this.getExercisesData().slice(0, 5));
  },

  getExercisesSmall() {
    return Promise.resolve(this.getExercisesData().slice(0, 10));
  },

  getExercises() {
    return Promise.resolve(this.getExercisesData());
  },

  getExercisesWithStepsSmall() {
    return Promise.resolve(this.getExercisesWithStepsData().slice(0, 10));
  },

  getExercisesWithSteps() {
    return Promise.resolve(this.getExercisesWithStepsData());
  },
};
