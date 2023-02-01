export default (userId: number, userRoleName: string, ownerId: number) => {
    if (userRoleName === "ADMIN") {
        return true;
    }

    if (userId === ownerId) {
        return true;
    }

    return false;
}