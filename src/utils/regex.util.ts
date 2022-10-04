export class RegexUtil {
    static get uuidV4() {
        return /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    }

    static get mygesEmailAdress() {
        return /^[a-zA-Z0-9]+@myges.fr$/;
    }

    static get fullName(){
        return /^[A-Za-zéèêùüûàâäïîôöç -]+$/i;
    }
}