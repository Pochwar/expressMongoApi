import HttpStatusService from "../services/HttpStatusService";

export default class RootController {

  constructor() {
    this.httpStatusService = new HttpStatusService();
  }

  index(req, res) {
    return res.render('index');
  }
}
