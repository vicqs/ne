// export class Patient {
//   id: number;
//   name: string;
//   side: string;
//   description: string;
// }
"use strict";
var Patient = (function () {
    function Patient() {
    }
    // constructor(public productId: number,
    //     public productName: string,
    //     public productCode: string,
    //     public releaseDate: string,
    //     public price: number,
    //     public description: string,
    //     public starRating: number,
    //     public imageUrl: string) {
    // }
    Patient.prototype.calculateDiscount = function (percent) {
        return this.price - (this.price * percent / 100);
    };
    return Patient;
}());
exports.Patient = Patient;
//# sourceMappingURL=patient.model.js.map