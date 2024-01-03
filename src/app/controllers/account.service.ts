import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  O_UserSession: BehaviorSubject<any> = new BehaviorSubject(null);
  userInfo = null
  constructor(private firestore: Firestore) {}

  async F_signIn(data): Promise<any> {
    try {
      addDoc(collection(this.firestore, 'Utilisateur'), data).then((res) => {
        // the documentReference provides access to the newly created document
        console.log(res);
      });
      return {
        statut: 200,
        message: 'Enregistré',
        data: [],
      };
    } catch (error) {
      // Gérer les erreurs ici si nécessaire
      console.error("Erreur lors de l'engistrement de l'utilisateur :", error);
      return {
        message: 'Pas enregistré',
      }; // Ou une autre valeur par défaut
    }
  }

  async F_login(data): Promise<any> {
    try {
      const collectionRef = collection(this.firestore, 'Utilisateur');
      const queryByEmail = query(
        collectionRef,
        where('email', '==', data.login),
        where('password', '==', data.password)
      );
      const queryByTelephone = query(
        collectionRef,
        where('telephone', '==', data.login),
        where('password', '==', data.password)
      );

      const results = await Promise.all([
        getDocs(queryByEmail),
        getDocs(queryByTelephone),
      ]);

      const mergedResults = results.reduce((acc, querySnapshot) => {
        const res = querySnapshot.docs.map(doc => ({ 
          id: doc.id, ...doc.data() 
        }));
        acc.push(...res); // Ajouter les éléments de res à l'accumulateur acc
        return acc;
      }, []);

      console.log('Résultats combinés:', mergedResults);
      if (mergedResults.length > 0) {
        
        localStorage.setItem('userInfo',JSON.stringify(mergedResults[0]))
        let data =  localStorage.getItem('userInfo')
        this.userInfo = JSON.parse(data)
         console.log(data)
        this.O_UserSession.next(this.userInfo)
        return {
          statut: 200,
          message: 'Autorisé',
        };
      } else {
        return {
          statut: 201,
          message: 'Non autorisé',
        };
      }
    } catch (error) {
      // Gérer les erreurs ici si nécessaire
      console.error('Erreur lors de la connexion :', error);
      return []; // Ou une autre valeur par défaut
    }
  }
  
  async F_checkUserExistance(data): Promise<any> {
    try {
      const collectionRef = collection(this.firestore, 'Utilisateur');
      const queryByEmail = query(
        collectionRef,
        where('email', '==', data.email),
      );
      const queryByTelephone = query(
        collectionRef,
        where('telephone', '==', data.telephone)
      );

      const results = await Promise.all([
        getDocs(queryByEmail),
        getDocs(queryByTelephone),
      ]);
      const mergedResults = results.reduce((acc, querySnapshot) => {
        querySnapshot.forEach((doc) => {
          acc.push(doc.data());
        });
        return acc;
      }, []);

      console.log('Résultats combinés:', mergedResults);
      if (mergedResults.length > 0) {
        return {
          statut: 201,
          message: 'Non autorisé',
        };
      } else {
        return {
          statut: 200,
          message: 'Autorisé',
        };
      }
    } catch (error) {
      // Gérer les erreurs ici si nécessaire
      console.error('Erreur lors de la connexion :', error);
      return []; // Ou une autre valeur par défaut
    }
  }

  
}
