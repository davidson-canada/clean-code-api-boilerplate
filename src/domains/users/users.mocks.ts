import { User } from "./users.models";

export const getUserMock = (): User => {
  const user = new User();
  user._id = "5f99c424b16f876472979101";
  user.createdAt = "2020-10-28T19:19:00.343Z";
  user.updatedAt = "2020-10-28T19:19:00.343Z";
  user.email = "admin@admin.com";
  user.firstName = "Alexandre";
  user.isAdmin = true;
  user.lastName = "Theve";
  user.phone = "(555) 555-5555";
  user.status = true;

  return user;
};
