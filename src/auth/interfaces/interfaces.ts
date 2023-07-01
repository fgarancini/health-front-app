export interface GenderOption {
    label: string;
    value: number;
  }
  export interface UserInitialState {
    first_name: string;
    last_name: string;
    gender: GenderOption | undefined;
    birthdate: Date;
    email: string;
    password: string;
  }
  