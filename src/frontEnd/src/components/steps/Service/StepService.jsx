export const StepService = {
    getData() {
        return [
            {
                "id": 1,
                "name": "Hephaestus - Sagittarius",
                "stepNum": 1,
                "description": "I don't understand how people live. It's amazing to me that people wake up every morning and say: 'Yeah, another day, let's do it.' How do people do it? I don't know how"
            },
            {
                "id": 2,
                "name": "Artemis - Taurus",
                "stepNum": 2,
                "description": "Beer before liquor, never sicker, liquor before beer, never fear, don't do heroin"
            },
            {
                "id": 3,
                "name": "Apollo - Virgo",
                "stepNum": 1,
                "description": "I need to go take a shower so I can't tell if I'm crying or not"
            },
            {
                "id": 4,
                "name": "Apollo - Cancer",
                "stepNum": 1,
                "description": "You know what the problem is with everybody? They all just want to hear what they already believe. No one ever wants to hear the truth"
            },
            {
                "id": 5,
                "name": "Hermes - Cancer",
                "stepNum": 2,
                "description": "I need to go take a shower so I can't tell if I'm crying or not"
            },
            {
                "id": 6,
                "name": "Hephaestus - Capricorn",
                "stepNum": 1,
                "description": "I don't understand how people live. It's amazing to me that people wake up every morning and say: 'Yeah, another day, let's do it.' How do people do it? I don't know how"
            },
            {
                "id": 7,
                "name": "Hestia - Scorpio",
                "stepNum": 1,
                "description": "I need to go take a shower so I can't tell if I'm crying or not"
            },
            {
                "id": 8,
                "name": "Hermes - Cancer",
                "stepNum": 2,
                "description": "I don't understand how people live. It's amazing to me that people wake up every morning and say: 'Yeah, another day, let's do it.' How do people do it? I don't know how"
            },
            {
                "id": 9,
                "name": "Apollo - Pisces",
                "stepNum": 1,
                "description": "I do love you, by the way. I mean as much as I'm capable of loving anyone"
            },
            {
                "id": 10,
                "name": "Athena - Scorpio",
                "stepNum": 2,
                "description": "It gets easier. But you have to do it every day, that's the hard part. But it does get easier"
            }
        ];
    },

    getStepsSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    },

    getStepsMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    },

    getStepsLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    },

    getStepsXLarge() {
        return Promise.resolve(this.getData());
    },

};
