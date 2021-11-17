import { Expose } from 'class-transformer';

export default class User {
    @Expose()
    public id: string;

    @Expose()
    public phone: string;

    @Expose({ name: 'first-name' })
    public firstName: string;

    @Expose({ name: 'last-name' })
    public lastName: string;

    @Expose({ name: 'auth-token' })
    public authToken: string;

    @Expose({ name: 'profile-pic' })
    public profilePic: string;

    constructor(id: string, phone: string, firstName: string, lastName: string, authToken: string, profilePic: string) {
        this.id = id;
        this.phone = phone;
        this.firstName = firstName;
        this.lastName = lastName;
        this.authToken = authToken;
        this.profilePic = profilePic;
    }
}