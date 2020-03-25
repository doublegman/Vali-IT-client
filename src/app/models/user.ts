export class User {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: boolean;
  profilePicture: string;


  constructor(username: string, password: string, email: string, firstName: string, lastName: string, gender: boolean, profilePicture: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.profilePicture = profilePicture;
  }
}
