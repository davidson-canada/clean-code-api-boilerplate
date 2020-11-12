// @ts-ignore
db.createUser({
  user: "mongomaster",
  pwd: "ImTheMongoMasterBendTheKnee",
  roles: [
    {
      role: "readWrite",
      db: "clean-code-api-local",
    },
  ],
});

db.users.insert({
  email: "admin@admin.com",
  firstName: "Alexandre",
  lastName: "Theve",
  password: "$2b$12$31ufD1KweQp1jP6z1.hvlucQohu/N55Wk1BsXyjDZsjk8UCd70Qy.",
  phone: "(555) 555-5555",
  isAdmin: true,
  status: true,
});
