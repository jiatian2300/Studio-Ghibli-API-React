const fetchItems = async (target) => {
    const data = await fetch(target);
    const items = await data.json();
    return items;
};

export function randomUniqueNum(range) {
    if (range === 1) {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    let arr = [];
    for (let i = 1; i < range; i++) {
        arr.push(i);
    }

    let result = [];

    for (let i = 1; i < range; i++) {
        const random = Math.floor(Math.random() * (range - i));
        result.push(arr[random]);
        arr.splice(random, 1);
    }

    return result;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max - 1));
}

export async function generateQns(quizCat) {
    const items = await fetchItems(
        `https://ghibliapi.herokuapp.com/${quizCat}`
    );
    const films = await fetchItems(`https://ghibliapi.herokuapp.com/films`);

    switch (quizCat) {
        case "people":
            return people(items, films);
        case "locations":
            return locations(items, films);
        case "species":
            return species(items, films);
        // case "vehicles":
        //     return vehicles(items, films);
        default:
            return [];
    }
}

async function people(items, films) {
    const questions = [];
    const human = await fetchItems(
        "https://ghibliapi.herokuapp.com/species/af3910a6-429f-4c74-9ad5-dfe1c4aa04f2"
    );

    items.map((item) => {
        /* ==================
            Question Type 1: Is this person from this film?
        =====================*/
        const film_url = item.films[0].split("/");
        const film_ans = films.filter(
            (x) => x.id === film_url[film_url.length - 1]
        );
        //ensure that there is always a 50% chance of each of the options being correct
        const film_option =
            Math.random() < 0.5
                ? films[getRandomInt(films.length)]
                : film_ans[0];

        const question_1 = `${item.name} is a character from the movie, ${film_option.title}.`;

        questions.push({
            question: question_1,
            option: film_option.id,
            answer: film_ans[0].id,
        });

        /* ==================
            Question Type 2: What is this person's gender?
        =====================*/
        const gender_ans = item.gender;
        const gender_option = Math.random() < 0.5 ? "female" : "male";

        const question_2 = `${item.name} is a ${gender_option} character.`;
        questions.push({
            question: question_2,
            option: gender_option,
            answer: gender_ans,
        });

        /* ==================
            Question Type 3: What is this person's eye colour?
        =====================*/
        const all_eye_colours = human.eye_colors.split(",");
        const eye_ans = item.eye_color;
        const eye_option =
            Math.random() < 0.5
                ? all_eye_colours[getRandomInt(all_eye_colours.length)]
                : item.eye_color;
        const question_3 = `${item.name} has ${eye_option} coloured eyes.`;
        questions.push({
            question: question_3,
            option: eye_option,
            answer: eye_ans,
        });

        /* ==================
            Question Type 4: What is this person's hair colour?
        =====================*/
        const all_hair_colours = human.hair_colors.split(",");
        const hair_ans = item.hair_color;
        const hair_option =
            Math.random() < 0.5
                ? all_hair_colours[getRandomInt(all_hair_colours.length)]
                : item.hair_color;
        const question_4 = `${item.name} has ${hair_option} coloured hair.`;
        questions.push({
            question: question_4,
            option: hair_option,
            answer: hair_ans,
        });

        return true;
    });
    return questions;
}

async function locations(items, films) {
    const questions = [];

    items.map((item) => {
        /* ==================
            Question Type 1: Is this location from this film?
        =====================*/
        const film_url = item.films[0].split("/");
        const film_ans = films.filter(
            (x) => x.id === film_url[film_url.length - 1]
        );
        const film_option =
            Math.random() < 0.5
                ? films[getRandomInt(films.length)]
                : film_ans[0];

        const question_1 = `${item.name} is a location from the movie, ${film_option.title}.`;

        questions.push({
            question: question_1,
            option: film_option.id,
            answer: film_ans[0].id,
        });

        /* ==================
            Question Type 2: What is the climate of this location?
        =====================*/
        const all_climates = ["Continental", "Mild", "Tropical", "Dry", "Wet"];
        const climate_ans = item.climate;
        if (climate_ans !== "TODO") {
            const climate_option =
                Math.random() < 0.5
                    ? all_climates[getRandomInt(all_climates.length)]
                    : item.climate;
            const question_2 = `The climate of ${item.name} is ${climate_option}`;
            questions.push({
                question: question_2,
                option: climate_option,
                answer: climate_ans,
            });
        }

        /* ==================
            Question Type 3: What is the terrain of this location?
        =====================*/
        const all_terrain = [
            "Mountain",
            "Hill",
            "Plain",
            "Marsh",
            "Forest",
            "City",
            "River",
            "Ocean",
        ];
        const terrain_ans = item.climate;
        if (terrain_ans !== "TODO") {
            const terrain_option =
                Math.random() < 0.5
                    ? all_terrain[getRandomInt(all_terrain.length)]
                    : item.terrain;
            const question_3 = `The terrain of ${item.name} is ${terrain_option}`;
            questions.push({
                question: question_3,
                option: terrain_option,
                answer: terrain_ans,
            });
        }

        return true;
    });

    return questions;
}
async function species(items, films) {
    const questions = [];

    // items.map((item)=>{
    //     const all_present_films = item.films;
    //     films.map((film)=>{
    //         const film_option
    //         if(all_present_films.includes(film.url)){
    //             const film_ans = films.filter(
    //             (x) => x.id === film_url[film_url.length - 1]
    //         );
    //         }
    //     })
    // })

    items.map((item) => {
        /* ==================
            Question Type 1: Is this species in this film?
        =====================*/
        const all_present_films = item.films;
        const wrong = films.filter((x) => !all_present_films.includes(x.url));
        const random = randomUniqueNum(wrong.length);
        all_present_films.map((film_present, index) => {
            const film_url = film_present.split("/");
            const film_ans = films.filter(
                (x) => x.id === film_url[film_url.length - 1]
            );
            const film_option = wrong[random[index]];

            const question_1 = `${item.name}s appear in the movie, ${film_option.title}.`;

            questions.push({
                question: question_1,
                option: film_option.id,
                answer: film_ans[0].id,
            });

            const question_2 = `${item.name}s appear in the movie, ${film_ans[0].title}.`;

            questions.push({
                question: question_2,
                option: film_ans[0].id,
                answer: film_ans[0].id,
            });

            return true;
        });
        return true;
    });

    const map = new Map();
    questions.forEach((qn) => {
        if (!map.has(qn.question)) {
            map.set(qn.question, qn);
        }
    });

    return [...map.values()];

    // return questions;
}
// async function vehicles(items, films) {}
