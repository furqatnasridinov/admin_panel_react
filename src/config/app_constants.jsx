class AppConstants {
  // base url
  static get baseUrl() {
    return "https://myfit-russia.ru/";
  }

  // end points
  static get getGyms() {
    return "api/admin/gyms";
  }

  // keys
  static get keyToken() {
    return "token";
  }

  static get keyFcmToken(){
    return "fcm";
  }

  static get keyGymId() {
    return "gymId";
  }

  static get keyUserId() {
    return "userId";
  }

  static get keyUserFirstname() {
    return "firstName";
  }

  static get keyUserLastname() {
    return "lastName";
  }

  static get keyPatronymic() {
    return "patronymic";
  }

  static get keyPhoto() {
    return "photo";
  }

  static get keyPhone() {
    return "phone";
  }

  static get keyNotification() {
    return "notification";
  }

  static get keyAppState() {
    return "appState";
  }

  static get keyRoleId() {
    return "roleId";
  }

  static keyCanSeeCalendar() {
    return "canSeeCalendar";
  }

  static get vapidKey() {
    return "BKtMN6wjJ9LaMI3lhESMVyzTEMxTwC45q1hjAxgKijOf-e2uEYAmXSZrHirgj4lzx6XIkfxfybYDUgxdQWdTi9g";
  }

  // yandex geocoding api key
  static get yandexApiKey() {
    return "55bfdcdc-b638-4a5e-81f0-404dc3e9060e";
  }
}

export default AppConstants;
