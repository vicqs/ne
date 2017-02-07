// export class Patient {
//   id: number;
//   name: string;
//   side: string;
//   description: string;
// }

interface IPatient {
    //reales
    patientId: number,
    patientCode: string,
    patientName: string,
    patientLastName: string,
    patientHeight: number,
    patientActualWeight: number,
    patientBirthdate: string,
    patientScholarship: number,
    patientCivilStatus: number,
    patientNationality: string,
    patientAge: number,
    patientGender: number,
    patientemail: string,
    authorized: number,
    responsibleName: string,
    patientStarRating: number,
    imageUrl: string,
    patientCountry: string,
    patientState: string,
    patientCity: string,
    patientAddress: string,
    patientZipCode: number,
    patientHomePhone: number,
    patientCellPhone: number,
    reference: string,
    referenceClinicName: string,
    price: number,
    id: number,
    name: string,
    side: string,
    description: string
}

export class Patient implements IPatient { // solo si usamos metodos

    patientId: number;
    patientCode: "string";
    patientName: "string";
    patientLastName: "string";
    patientHeight: 0;
    patientActualWeight: 0;
    patientBirthdate: "string";
    patientScholarship: 0;
    patientCivilStatus: 0;
    patientNationality: "string";
    patientAge: 0;
    patientGender: 0;
    patientemail: "string";
    authorized: 0;
    responsibleName: "string";
    patientStarRating: 0;
    imageUrl: "string";
    patientCountry: "string";
    patientState: "string";
    patientCity: "string";
    patientAddress: "string";
    patientZipCode: 0;
    patientHomePhone: 0;
    patientCellPhone: 0;
    reference: "string";
    referenceClinicName: "string";
    price: 0;
    id: 1;
    name: "string";
    side: "string";
    description: "string";


    // constructor(public productId: number,
    //     public productName: string,
    //     public productCode: string,
    //     public releaseDate: string,
    //     public price: number,
    //     public description: string,
    //     public starRating: number,
    //     public imageUrl: string) {
    // }

    calculateDiscount(percent: number): number {
        return this.price - (this.price * percent / 100);
    }
}