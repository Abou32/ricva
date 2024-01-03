// import { Injectable } from '@angular/core';
// import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import { YourDataInterface } from './your-data-interface'; // Remplacez par votre interface de données

// @Injectable({
//   providedIn: 'root'
// })
// export class FirestoreService {
//   constructor(private afs: AngularFirestore) {}

//   addData(data: YourDataInterface): Promise<DocumentReference<YourDataInterface>> {
//     return this.afs.collection<YourDataInterface>('yourCollectionName').add(data);
//   }
  
//   // ... Autres méthodes et fonctionnalités Firestore ...
// }