import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Guest } from '../resources/data/guest-object';

@inject(Router, Guest)
export class Guests {
    constructor(router, guests) {
        this.router = router;
        this.guests = guests;
        this.message = 'Guests List';
        this.showGuestEditForm = false;

    }
    async activate() {
        await this.getGuests();
    }
    async getGuests() {
        await this.guests.getGuests();
    }
    attached() {
        feather.replace()
    }
    newGuest() {
        this.guest = {
            firstName: "",
            lastName: "",
            rspv: false,
            email: "",
            numberOfPeople: 1
        }
        this.openEditForm();
    }
    editGuest(guest) {

        this.guest = guest;
        this.openEditForm();
    }
    openEditForm() {
        this.showGuestEditForm = true;
        setTimeout(() => { $("#firstName").focus(); }, 500);
    }
    async save() {
        if (this.guest && this.guest.firstName && this.guest.lastName
            && this.guest.email) {
            await this.guests.saveGuest(this.guest);
            await this.getGuests();
            this.back();
        }
    }
    async delete() {
        if (this.guest) {
            await this.guests.delete(this.guest);
            await this.getGuests();
            this.back();
        }
    }

    changeActive(guest) {
        this.guest = guest;
        this.save();
    }
    back() {
        this.showGuestEditForm = false;
    }
    logout() {
        this.router.navigate('home');
    }
}