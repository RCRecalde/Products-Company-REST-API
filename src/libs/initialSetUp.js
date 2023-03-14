import Role from "../models/Role";

export const createRoles = async () => {
    try {
        //cuenta si ya existen documentos
        const count = await Role.estimatedDocumentCount()
        if (count > 0) return;

        await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'moderador' }).save(),
            new Role({ name: 'admin' }).save()
        ])

        console.log(values);
    } catch (error) {
        console.log(error)
    }
}