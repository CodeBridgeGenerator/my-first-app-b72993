
import { faker } from "@faker-js/faker";
export default (user,count,departmentIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
courseID: faker.lorem.sentence(1),
courseName: faker.lorem.sentence(1),
departmentID: departmentIDIds[i % departmentIDIds.length],
Lecturer: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
