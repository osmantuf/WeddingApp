import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Guest {
  constructor(data) {
    this.data = data;
    this.GUEST_SERVICE = 'guests';
  }
  
  async saveGuest(guest) 
  {
          //  console.log(guest);
          let serverResponse;
            if (guest) {
              
                if (guest._id) {
                     serverResponse = await this.data.put(guest, this.GUEST_SERVICE);
                } else {
                     serverResponse = await this.data.post(guest, this.GUEST_SERVICE);
                }
                // let serverResponse = await this.data.post(guest, this.guest_SERVICE);
                return serverResponse;
            }
        }

  async getGuests() {
    let response = await this.data.get(this.GUEST_SERVICE);
    if (!response.error) {
      this.guestsArray = response;

    } else {
      this.guestsArray = [];
    }
  }

  async delete(guest){
    if(guest && guest._id){
      await this.data.delete(this.GUEST_SERVICE + '/' + guest._id)
    }
    }
}