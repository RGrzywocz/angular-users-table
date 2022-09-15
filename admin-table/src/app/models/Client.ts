export class Client
{
    id: number;
    firstName: string;
    lastName: string;
    birthday: string;
    industry: string;
    constructor(id: number, firstName: string, lastName: string, birthday: string, industry: string){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.industry = industry;

    }
}