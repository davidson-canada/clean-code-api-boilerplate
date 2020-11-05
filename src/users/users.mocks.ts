import User from "./users.models";

// @ts-ignore
export const getUserMock = (user?: Partial<typeof User>): User => {
  return new User({
    id: "test",
    createdAt: "1",
    email: "email@email.com",
    firstName: "firstName",
    isAdmin: true,
    lastName: "lastName",
    phone: "000000000",
    status: "1",
    ...user,
  });
};