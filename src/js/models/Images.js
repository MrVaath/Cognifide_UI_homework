import axios from 'axios';

export default class Image {
  constructor() {}

  async getImages() {
    try {
      const res = await axios(
        `http://www.splashbase.co/api/v1/images/search?query=tree`
      );
      this.result = res.data.images;
      // console.log(this.result);
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  }
}
