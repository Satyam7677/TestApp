export type ActionType = {
  type: string;
  payload: any;
};

export class AuthModal {
  _id: number = 0;
  email: string = '';
  countryCode: string = '';
  appleId: string = '';
  city: string = '';
  country: string = '';
  createdAt: string = '';
  emailVerified: boolean = false;
  fullName: string = '';
  // googleId: null;
  // homeAddress: null;
  // houseNumber: null;
  latitude: number = 0;
  longitude: number = 0;
  mobileNumber: string = '';
  // otpCounter: 4;
  // otpDateAt: '2022-12-01T06:31:26.915Z';
  // password: '49abc5027d4c952076b96af59a2870c96c9b0135e156148775341b3dd5d77e6a';
  phoneVerified: boolean = false;
  // pincode: null;
  // profileImage: null;
  signupType: string = '';
  status: string = '';
  // streetName: null;
  token: string = '';
  type: any = 'USER';
  userId: string = '';
  contactOnGeoFirm: object = {};
  tcVerified: boolean = false;
  isNotificationAllow: boolean = false;
  isNotificationMute: boolean = false;
  houseNumber: string = '';
  streetName: string = '';
  state: string = '';
  pincode: string = '';
  profileImage: string = '';
  tutorial: boolean = false;
  address: string = '';
  lat: any = '';
  lng: any = '';
  fcmToken: any = '';
  isInternetConnected: boolean = true;
  roomId: string = '';
}
export type ReducersModal = {
  AuthReducer: AuthModal;
};
