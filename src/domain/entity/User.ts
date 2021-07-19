export default class User {
    constructor(
        public user: string,
        private pwd: string,
        public createdAt: Date
    ) {}
}
