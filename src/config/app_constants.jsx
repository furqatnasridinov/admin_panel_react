class AppConstants {
  // base url
  static get baseUrl() {
    return "http://77.222.53.122:/";
  }

  // end points
  static get getGyms() {
    return "api/admin/gyms";
  }

  // keys
  static get keyToken() {
    return "token";
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

  // yandex geocoding api key
  static get yandexApiKey() {
    return "55bfdcdc-b638-4a5e-81f0-404dc3e9060e";
  }
}

export default AppConstants;
