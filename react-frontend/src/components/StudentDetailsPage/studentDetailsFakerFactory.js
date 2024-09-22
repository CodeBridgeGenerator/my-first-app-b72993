
import { faker } from "@faker-js/faker";
export default (user,count,courseIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
stuId: faker.lorem.sentence(""),
stuName: faker.lorem.sentence(""),
DOB: faker.lorem.sentence(""),
courseID: courseIDIds[i % courseIDIds.length],
address: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
