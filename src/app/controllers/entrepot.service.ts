import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { collection, getDocs, addDoc, Firestore, DocumentReference, CollectionReference, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Entrepot } from '../models/entrepot';
@Injectable({
  providedIn: 'root'
})
export class EntrepotService {
  // Collection: CollectionReference
  constructor(private firestore: Firestore) {

  }


  async F_updateEntrepot(id,data): Promise<any> {
    try {
    const collectionRef = collection(this.firestore, 'Entrepot')
    const documentRef = doc(collectionRef,id);
    updateDoc(documentRef, data).then(() => {
    console.log('Entrepot mis à jour avec succès!');
  })
  .catch((error) => {
    console.error("Erreur lors de la mise à jour de l'entrepot :", error);
  });
    return {
      statut:200, 
      message:"Enregistré",
      data: []
    }
    } catch (error) {
      // Gérer les erreurs ici si nécessaire
      console.error("Erreur lors de la modification de l'entrepôt :", error);
      return  {
        message:"Pas enregistré"
      }; // Ou une autre valeur par défaut
    }
  }

  async F_deleteEntrepot(id): Promise<any> {
    try {
    const collectionRef = collection(this.firestore, 'Entrepot')
    const documentRef = doc(collectionRef,id);
    deleteDoc(documentRef).then(() => {
    console.log('Entrepot supprimé avec succès!');
  })
    return {
      statut:200, 
      message:"Enregistré",
      data: []
    }
    } catch (error) {
      // Gérer les erreurs ici si nécessaire
      console.error("Erreur lors de la suppresion de l'entrepôt :", error);
      return  {
        message:"Pas enregistré"
      }; // Ou une autre valeur par défaut
    }
  }

  async F_saveEntrepot(data): Promise<any> {
    try {
      addDoc(collection(this.firestore, 'Entrepot'),data).then((res) => {
        // the documentReference provides access to the newly created document
        console.log(res)
    });
    return {
      statut:200, 
      message:"Enregistré",
      data: []
    }
    } catch (error) {
      // Gérer les erreurs ici si nécessaire
      console.error("Erreur lors de l'engistrement de l'entrepôt :", error);
      return  {
        message:"Pas enregistré"
      }; // Ou une autre valeur par défaut
    }
  }

  async F_getEntrepot(): Promise<any> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'Entrepot'));
      const res = querySnapshot.docs.map(doc => ({ 
        id: doc.id, ...doc.data() 
      }));
      return res;
    } catch (error) {
      // Gérer les erreurs ici si nécessaire
      console.error("Erreur lors de la récupération des entrepôts :", error);
      return []; // Ou une autre valeur par défaut
    }
  }

}
