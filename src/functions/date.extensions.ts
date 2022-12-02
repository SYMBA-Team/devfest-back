interface Date {
    addHours(h: number): Date;
}
Date.prototype.addHours = function (h: number) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
};
