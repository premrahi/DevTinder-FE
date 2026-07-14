export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  age?: number | string;
  gender?: string;
  photoUrl?: string;
  about?: string;
  skills?: string[] | string;
  createdAt?: string;
  updatedAt?: string;
}


export interface ConnectionRequest {
  _id: string;
  fromUserId: User;
  toUserId: string;
  status: "interested" | "accepted" | "rejected" | "ignored";
  createdAt?: string;
  updatedAt?: string;
}