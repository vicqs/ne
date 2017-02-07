// export class Patient {
//   id: number;
//   name: string;
//   side: string;
//   description: string;
// }

interface IPatient {
    //reales
    patientId: 1,
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
   
}


export class Patient implements IPatient { // solo si usamos metodos


  id: number;
  name: string;
  side: string;
  description: string;

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