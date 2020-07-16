const resolvers = {
    Query: {
        users: (parent, args, context) => context.models.User.findAll(),
        user: (parent, { id }, { models }) => {
            return models.User.findByPk(id);
            // console.log('user : ', user);
            // return user[0];
        },
        // me: (parent, args, context) => context.me,
    },

    Mutation: {
        makeUser: (parent, args, context) => {
            // console.log('args: ', args);
            const { name } = args;
            const newUser = { name };
            // context.models.users.push(newUser);
            // return newUser;
            //Id is auto generate
            return context.models.User.create(newUser);
        },
        removeUser: (parent, { id }, { models }) => {
            return models.User.destroy({
                where: {
                    id,
                },
            });
        },
        register: async (parent, args, { models }) => {
            const { name, username, password } = args;
            const newUser = {
                name,
                username,
                password,
            };
            const registeredUser = await models.User.create(newUser);
            try {
                if (typeof registeredUser.id === 'number') {
                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                console.log('err: ', err);
                return false;
            }
        },
    },

    User: {
        cars: (parent, args, context) => {
            // return parent.cars.map((carId) =>
            //     context.models.cars.find((carEl) => carEl.id === carId)
            // );
            return context.models.Car.findAll({
                where: {
                    userId: parent.id,
                },
            });
        },
    },
};

module.exports = resolvers;
