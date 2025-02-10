import Role from "../types/role";

// Pattern for each right: action_resource
// Example: "Super Admin": ["read_user", "create_user", "update_user", "delete_user"]

const roles: { [key: string]: Role } = {
    "Super Admin": {
        id: 1,
        name: "Super Admin",
        rights: ["read_user", "create_user", "update_user", "delete_user", "read_role", "create_role", "update_role"],
    },
    Admin: {
        id: 2,
        name: "Admin",
        rights: ["read_user", "create_user", "update_user", "delete_user", "read_role"],
    },
    Veterinario: {
        id: 3,
        name: "Veterinario",
        rights: ["read_user", "update_user"],
    },
    Vendedor: {
        id: 4,
        name: "Vendedor",
        rights: ["read_user", "update_user"],
    },
    Cliente: {
        id: 5,
        name: "Cliente",
        rights: ["read_user"],
    },
};

export default roles;
