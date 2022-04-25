import { User } from "../../../../commons/Interface/User";

export interface UserStateInterface {
  user: User|null;
}

function state(): UserStateInterface {
  return {
    user: null,
  }
};

export default state;
